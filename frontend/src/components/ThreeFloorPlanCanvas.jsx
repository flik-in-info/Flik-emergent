import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Ruler, Maximize2, Sparkles, Navigation, Layers, Compass } from 'lucide-react';

const ROOMS_DATA = [
  { id: 'living', name: 'Grand Living & Dining', size: '28 ft × 18 ft (504 sq.ft)', vastu: 'North-East (Ishan)', x: -3.5, z: 0, w: 7, d: 7, color: 0x10b981 },
  { id: 'terrace', name: 'Sky Cantilever Balcony', size: '24 ft × 9 ft (216 sq.ft)', vastu: 'East (Surya Sunrise)', x: -3.5, z: 5, w: 7, d: 3, color: 0x06b6d4 },
  { id: 'master', name: 'Master Suite + Wardrobe', size: '22 ft × 16 ft (352 sq.ft)', vastu: 'South-West (Nairutya)', x: 4, z: -2, w: 6, d: 6, color: 0x8b5cf6 },
  { id: 'kitchen', name: 'Show Kitchen & Bar', size: '14 ft × 12 ft (168 sq.ft)', vastu: 'South-East (Agni Fire)', x: 4, z: 3, w: 5, d: 4, color: 0xf59e0b },
];

export default function ThreeFloorPlanCanvas() {
  const mountRef = useRef(null);
  const [selectedRoom, setSelectedRoom] = useState(ROOMS_DATA[0]);
  const [showSightlines, setShowSightlines] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const roomMeshesRef = useRef([]);
  const animFrameRef = useRef(null);
  const targetLookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAtRef = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 500);
    camera.position.set(0, 22, 16);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.0);
    keyLight.position.set(15, 25, 10);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x22c55e, 2, 30);
    rimLight.position.set(-10, 10, -10);
    scene.add(rimLight);

    // Ground Grid & Floor Base Plate
    const floorPlateGeo = new THREE.BoxGeometry(18, 0.2, 16);
    const floorPlateMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8, metalness: 0.2 });
    const floorPlate = new THREE.Mesh(floorPlateGeo, floorPlateMat);
    floorPlate.position.y = -0.1;
    scene.add(floorPlate);

    const grid = new THREE.GridHelper(24, 24, 0x22c55e, 0x334155);
    grid.position.y = -0.15;
    scene.add(grid);

    // Extrude 3D Room Zones
    const roomMeshes = [];
    ROOMS_DATA.forEach((room) => {
      const roomGroup = new THREE.Group();
      roomGroup.userData = room;

      // Floor slab of room
      const slabGeo = new THREE.BoxGeometry(room.w, 0.2, room.d);
      const slabMat = new THREE.MeshStandardMaterial({
        color: room.color,
        roughness: 0.3,
        metalness: 0.7,
        transparent: true,
        opacity: 0.85,
      });
      const slabMesh = new THREE.Mesh(slabGeo, slabMat);
      slabMesh.position.set(room.x, 0.1, room.z);
      roomGroup.add(slabMesh);

      // Low architectural perimeter walls
      const wallMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.4, roughness: 0.5 });
      // Front wall
      const wallFrontGeo = new THREE.BoxGeometry(room.w, 0.8, 0.15);
      const wallFront = new THREE.Mesh(wallFrontGeo, wallMat);
      wallFront.position.set(room.x, 0.5, room.z + room.d / 2);
      roomGroup.add(wallFront);

      // Back wall
      const wallBack = new THREE.Mesh(wallFrontGeo, wallMat);
      wallBack.position.set(room.x, 0.5, room.z - room.d / 2);
      roomGroup.add(wallBack);

      // Left wall
      const wallSideGeo = new THREE.BoxGeometry(0.15, 0.8, room.d);
      const wallLeft = new THREE.Mesh(wallSideGeo, wallMat);
      wallLeft.position.set(room.x - room.w / 2, 0.5, room.z);
      roomGroup.add(wallLeft);

      // Right wall
      const wallRight = new THREE.Mesh(wallSideGeo, wallMat);
      wallRight.position.set(room.x + room.w / 2, 0.5, room.z);
      roomGroup.add(wallRight);

      // 3D Floating label pin
      const pinGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 12);
      const pinMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.set(room.x, 1.2, room.z);
      roomGroup.add(pin);

      scene.add(roomGroup);
      roomMeshes.push({ mesh: roomGroup, slabMesh, data: room });
    });
    roomMeshesRef.current = roomMeshes;

    // Sightline Frustum Cone from Balcony (Element #7)
    const frustumGroup = new THREE.Group();
    const coneGeo = new THREE.ConeGeometry(5, 12, 4, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.rotation.x = Math.PI / 2;
    cone.position.set(-3.5, 1.5, 10);
    frustumGroup.add(cone);
    scene.add(frustumGroup);

    // Animation Loop
    let t = 0;
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      t += 0.02;

      // Smooth look-at interpolation
      currentLookAtRef.current.lerp(targetLookAtRef.current, 0.05);
      camera.lookAt(currentLookAtRef.current);

      // Gentle floating animation on balcony frustum
      cone.position.y = 1.5 + Math.sin(t) * 0.15;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update room focus
  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    targetLookAtRef.current.set(room.x, 0.5, room.z);

    // Highlight selected slab
    roomMeshesRef.current.forEach(({ slabMesh, data }) => {
      if (data.id === room.id) {
        slabMesh.material.emissive = new THREE.Color(0x22c55e);
        slabMesh.material.emissiveIntensity = 0.5;
      } else {
        slabMesh.material.emissive = new THREE.Color(0x000000);
        slabMesh.material.emissiveIntensity = 0;
      }
    });
  };

  return (
    <div className="relative w-full h-full min-h-[460px] rounded-3xl overflow-hidden border border-white/10 bg-[#08080c] shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full select-none" />

      {/* Top HUD: Spatial Room Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full luxury-glass border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>3D PROCEDURAL APARTMENT EXTRUSION</span>
          <span className="text-gray-400">|</span>
          <span className="text-white font-semibold">VASTU COMPLIANT</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl luxury-glass border border-white/10 text-xs font-mono text-gray-300">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>CEILING HEIGHT: 11.5 FT CLEAR</span>
        </div>
      </div>

      {/* Interactive 3D Room Switcher Tabs (Element #21) */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl luxury-glass border border-white/15 backdrop-blur-2xl">
        <div className="flex flex-wrap items-center gap-2">
          {ROOMS_DATA.map((room) => (
            <button
              key={room.id}
              type="button"
              onClick={() => handleSelectRoom(room)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                selectedRoom.id === room.id
                  ? 'bg-emerald-500 text-black font-bold shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
              }`}
            >
              {room.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Selected Room Metadata Card */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="text-right hidden sm:block">
            <div className="text-emerald-400 font-bold">{selectedRoom.size}</div>
            <div className="text-gray-400 text-[11px]">{selectedRoom.vastu}</div>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
            INSPECTED
          </div>
        </div>
      </div>
    </div>
  );
}
