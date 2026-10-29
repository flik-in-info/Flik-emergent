import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Sun, Sparkles, Move3d, Compass, Palette } from 'lucide-react';
import { soundFX } from '../../utils/soundEffects';

const Floorplan3DViewer = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // 3D Objects
  const apartmentGroupRef = useRef(null);
  const floorMeshRef = useRef(null);
  const sunLightRef = useRef(null);
  const ambientLightRef = useRef(null);

  // Orbit state
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0.55, y: -0.6 });
  const targetRotation = useRef({ x: 0.55, y: -0.6 });

  // UI Interactive States
  const [timeOfDay, setTimeOfDay] = useState(16); // 6 to 22 (hours)
  const [activeFinish, setActiveFinish] = useState('marble'); // 'marble' | 'oak' | 'concrete'
  const [unitType, setUnitType] = useState('3bhk'); // '3bhk' | '4bhk'
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Materials definition
  const materials = useRef({
    marble: new THREE.MeshStandardMaterial({
      color: 0xf5f5f7,
      roughness: 0.15,
      metalness: 0.1,
    }),
    oak: new THREE.MeshStandardMaterial({
      color: 0xa8764a,
      roughness: 0.5,
      metalness: 0.05,
    }),
    concrete: new THREE.MeshStandardMaterial({
      color: 0x6e727a,
      roughness: 0.8,
      metalness: 0.2,
    }),
    wall: new THREE.MeshStandardMaterial({
      color: 0x1f2229,
      roughness: 0.9,
    }),
    wallAccent: new THREE.MeshStandardMaterial({
      color: 0x121418,
      roughness: 0.7,
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0xcfe6ff,
      roughness: 0.05,
      transmission: 0.88,
      transparent: true,
      opacity: 0.6,
    }),
    furnitureDark: new THREE.MeshStandardMaterial({
      color: 0x23272e,
      roughness: 0.6,
    }),
    furnitureLight: new THREE.MeshStandardMaterial({
      color: 0xd8dbe2,
      roughness: 0.5,
    }),
    goldAccent: new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.2,
    }),
    emeraldGlow: new THREE.MeshBasicMaterial({
      color: 0x22e55a,
    }),
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0d0d0e, 0.015);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 500);
    camera.position.set(22, 24, 26);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.8);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const sunLight = new THREE.DirectionalLight(0xffecd2, 2.8);
    sunLight.position.set(18, 25, 12);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 70;
    sunLight.shadow.camera.left = -20;
    sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top = 20;
    sunLight.shadow.camera.bottom = -20;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Interior warm accent light
    const interiorWarm = new THREE.PointLight(0xffb74d, 2.5, 25);
    interiorWarm.position.set(0, 5, 0);
    scene.add(interiorWarm);

    // 5. Grid base plane
    const grid = new THREE.GridHelper(60, 30, 0x22e55a, 0x1e2420);
    grid.position.y = -0.05;
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);

    // 6. Apartment Model Group
    const apartment = new THREE.Group();
    scene.add(apartment);
    apartmentGroupRef.current = apartment;

    // Floor Slab
    const floorGeo = new THREE.BoxGeometry(22, 0.6, 18);
    const floorMesh = new THREE.Mesh(floorGeo, materials.current.marble);
    floorMesh.position.set(0, -0.3, 0);
    floorMesh.receiveShadow = true;
    apartment.add(floorMesh);
    floorMeshRef.current = floorMesh;

    // Outer Edge Border
    const edgeBorderGeo = new THREE.BoxGeometry(22.4, 0.4, 18.4);
    const edgeBorder = new THREE.Mesh(edgeBorderGeo, materials.current.wallAccent);
    edgeBorder.position.set(0, -0.45, 0);
    apartment.add(edgeBorder);

    // Architectural Perimeter & Partition Walls
    const wallHeight = 3.8;
    const wallThick = 0.4;

    const addWall = (w, h, d, x, y, z) => {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, materials.current.wall);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      apartment.add(mesh);
      return mesh;
    };

    // Back wall
    addWall(22, wallHeight, wallThick, 0, wallHeight / 2, -9);
    // Left boundary wall
    addWall(wallThick, wallHeight, 18, -11, wallHeight / 2, 0);
    // Right boundary wall
    addWall(wallThick, wallHeight, 18, 11, wallHeight / 2, 0);

    // Interior Divider: Master Suite vs Living Area
    addWall(wallThick, wallHeight, 11, 2, wallHeight / 2, -3.5);
    // Kitchen Divider
    addWall(7, wallHeight, wallThick, -7.5, wallHeight / 2, 1);

    // Cantilevered Panoramic Balcony (Front)
    const balconyGeo = new THREE.BoxGeometry(14, 0.4, 5);
    const balconyMesh = new THREE.Mesh(balconyGeo, materials.current.concrete);
    balconyMesh.position.set(-3, -0.2, 11.5);
    balconyMesh.receiveShadow = true;
    apartment.add(balconyMesh);

    // Balcony Glass Railing
    const glassRailGeo = new THREE.BoxGeometry(14, 1.8, 0.1);
    const glassRail = new THREE.Mesh(glassRailGeo, materials.current.glass);
    glassRail.position.set(-3, 0.9, 14);
    apartment.add(glassRail);

    // Living Room Furniture
    // Modular L-Sofa
    const sofaMain = new THREE.Mesh(new THREE.BoxGeometry(6.5, 1.2, 2.5), materials.current.furnitureLight);
    sofaMain.position.set(-4, 0.6, 4);
    sofaMain.castShadow = true;
    apartment.add(sofaMain);

    const sofaL = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.2, 4), materials.current.furnitureLight);
    sofaL.position.set(-8, 0.6, 2.5);
    sofaL.castShadow = true;
    apartment.add(sofaL);

    // Modern Coffee Table
    const tableMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.5, 24), materials.current.furnitureDark);
    tableMesh.position.set(-4.5, 0.35, 1.5);
    tableMesh.castShadow = true;
    apartment.add(tableMesh);

    // Media Console on Back Wall
    const mediaUnit = new THREE.Mesh(new THREE.BoxGeometry(8, 1, 0.8), materials.current.furnitureDark);
    mediaUnit.position.set(-4, 0.5, -8.5);
    apartment.add(mediaUnit);

    // Luxury Italian Kitchen Island
    const islandMesh = new THREE.Mesh(new THREE.BoxGeometry(5.5, 1.5, 2.2), materials.current.marble);
    islandMesh.position.set(-7, 0.75, -4);
    islandMesh.castShadow = true;
    apartment.add(islandMesh);

    // Master Bedroom King Platform Bed
    const bedBase = new THREE.Mesh(new THREE.BoxGeometry(5, 0.8, 6), materials.current.furnitureDark);
    bedBase.position.set(6.5, 0.4, -4);
    bedBase.castShadow = true;
    apartment.add(bedBase);

    const mattress = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.6, 5.6), materials.current.furnitureLight);
    mattress.position.set(6.5, 0.9, -4);
    mattress.castShadow = true;
    apartment.add(mattress);

    const headboard = new THREE.Mesh(new THREE.BoxGeometry(5.4, 2.4, 0.4), materials.current.furnitureDark);
    headboard.position.set(6.5, 1.2, -8.6);
    apartment.add(headboard);

    // Balcony Outdoor Loungers
    const lounger1 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.5, 3.2), materials.current.furnitureDark);
    lounger1.position.set(-6, 0.3, 12);
    lounger1.rotation.y = 0.2;
    apartment.add(lounger1);

    const lounger2 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.5, 3.2), materials.current.furnitureDark);
    lounger2.position.set(-1.5, 0.3, 12);
    lounger2.rotation.y = -0.15;
    apartment.add(lounger2);

    // Resize Listener
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Smooth rotation dampening
      rotation.current.y += (targetRotation.current.y - rotation.current.y) * 0.08;
      rotation.current.x += (targetRotation.current.x - rotation.current.x) * 0.08;

      if (apartmentGroupRef.current) {
        apartmentGroupRef.current.rotation.y = rotation.current.y;
        apartmentGroupRef.current.rotation.x = rotation.current.x;
      }

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Update dynamic sunlight based on timeOfDay slider
  useEffect(() => {
    if (!sunLightRef.current || !ambientLightRef.current || !sceneRef.current) return;

    // Calculate sun position along arc from 6 AM to 22 PM
    const progress = (timeOfDay - 6) / 16; // 0 to 1
    const angle = progress * Math.PI;

    const sunX = Math.cos(angle) * 30;
    const sunY = Math.max(1, Math.sin(angle) * 32);
    const sunZ = Math.sin(angle * 0.8) * 20 + 5;

    sunLightRef.current.position.set(sunX, sunY, sunZ);

    if (timeOfDay < 9) {
      // Dawn / Sunrise: Golden orange rays
      sunLightRef.current.color.setHex(0xffaa55);
      sunLightRef.current.intensity = 2.4;
      ambientLightRef.current.color.setHex(0xffe2cc);
      ambientLightRef.current.intensity = 0.7;
    } else if (timeOfDay >= 9 && timeOfDay <= 16) {
      // High Noon / Midday: Bright white crisp daylight
      sunLightRef.current.color.setHex(0xffffff);
      sunLightRef.current.intensity = 3.4;
      ambientLightRef.current.color.setHex(0xebf2fa);
      ambientLightRef.current.intensity = 1.1;
    } else if (timeOfDay > 16 && timeOfDay <= 19) {
      // Golden Hour Sunset: Deep warm amber
      sunLightRef.current.color.setHex(0xff6e2b);
      sunLightRef.current.intensity = 3.6;
      ambientLightRef.current.color.setHex(0xffd0b8);
      ambientLightRef.current.intensity = 0.85;
    } else {
      // Night / Twilight: Cool starlight with illuminated interior
      sunLightRef.current.color.setHex(0x3b6699);
      sunLightRef.current.intensity = 0.6;
      ambientLightRef.current.color.setHex(0x182436);
      ambientLightRef.current.intensity = 0.4;
    }
  }, [timeOfDay]);

  // Update flooring material
  const changeFinish = (finish) => {
    soundFX.playClick();
    setActiveFinish(finish);
    if (floorMeshRef.current && materials.current[finish]) {
      floorMeshRef.current.material = materials.current[finish];
    }
  };

  // Drag interaction
  const handleMouseDown = (e) => {
    isDragging.current = true;
    previousMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousMouse.current.x;
    const deltaY = e.clientY - previousMouse.current.y;
    targetRotation.current.y += deltaX * 0.008;
    targetRotation.current.x = Math.max(
      0.15,
      Math.min(0.9, targetRotation.current.x + deltaY * 0.006)
    );
    previousMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging.current && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - previousMouse.current.x;
      const deltaY = e.touches[0].clientY - previousMouse.current.y;
      targetRotation.current.y += deltaX * 0.009;
      targetRotation.current.x = Math.max(
        0.15,
        Math.min(0.9, targetRotation.current.x + deltaY * 0.007)
      );
      previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // Format time of day display
  const formatTime = (hour) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  const ROOMS = [
    { id: 'living', name: 'Grand Living & Dining Pavilion', dims: "24' × 18'", sqft: '432 sq ft' },
    { id: 'balcony', name: 'Cantilevered Sunset Deck', dims: "18' × 8'", sqft: '144 sq ft' },
    { id: 'master', name: 'Master Sanctuary & Ensuite', dims: "19' × 15'", sqft: '285 sq ft' },
    { id: 'kitchen', name: 'Italian Show Kitchen & Island', dims: "14' × 10'", sqft: '140 sq ft' },
  ];

  return (
    <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0b]/90 shadow-2xl">
      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full h-[540px] lg:h-[620px] cursor-grab active:cursor-grabbing select-none relative"
        style={{ touchAction: 'none' }}
      >
        {/* Top-left HUD Pill */}
        <div className="absolute top-6 left-6 z-10 flex items-center gap-3 pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-emerald-500/30 text-xs font-mono text-emerald-400">
            <Move3d className="w-3.5 h-3.5" />
            <span>INTERACTIVE 3D SPATIAL CUTAWAY</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-mono text-gray-400">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Drag 360° to Orbit</span>
          </div>
        </div>

        {/* Top-right Unit Switcher */}
        <div className="absolute top-6 right-6 z-10 flex items-center rounded-xl bg-black/70 backdrop-blur-md border border-white/10 p-1">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setUnitType('3bhk');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              unitType === '3bhk' ? 'bg-emerald-500 text-black font-semibold shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            3 BHK Villa · 2,850 sq ft
          </button>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setUnitType('4bhk');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              unitType === '4bhk' ? 'bg-emerald-500 text-black font-semibold shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            4 BHK Penthouse · 4,200 sq ft
          </button>
        </div>

        {/* Floating Room HUD Pins (Bottom Left) */}
        <div className="absolute bottom-6 left-6 z-10 flex flex-wrap gap-2 max-w-md pointer-events-auto">
          {ROOMS.map((room) => (
            <button
              key={room.id}
              type="button"
              onClick={() => {
                soundFX.playClick();
                setSelectedRoom(selectedRoom?.id === room.id ? null : room);
              }}
              className={`px-3 py-1.5 rounded-xl backdrop-blur-md text-xs font-mono transition-all border ${
                selectedRoom?.id === room.id
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                  : 'bg-black/60 text-gray-300 border-white/10 hover:border-white/30'
              }`}
            >
              <span>{room.name.split(' ')[0]}</span>
              <span className="text-gray-500 ml-1.5">{room.dims}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Control Console (Bottom Dashboard) */}
      <div className="p-6 lg:p-8 bg-[#0c0e12] border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Dynamic Sun Path & Time Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>Real-Time Sun Path & Daylight Simulation</span>
            </div>
            <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {formatTime(timeOfDay)}
            </span>
          </div>

          <div className="relative flex items-center">
            <input
              type="range"
              min="6"
              max="22"
              step="1"
              value={timeOfDay}
              onChange={(e) => {
                soundFX.playClick();
                setTimeOfDay(parseInt(e.target.value, 10));
              }}
              className="w-full h-2 bg-gradient-to-r from-amber-500 via-sky-400 to-indigo-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-gray-500 mt-2">
            <span>06:00 Sunrise</span>
            <span>12:00 High Noon</span>
            <span>17:30 Golden Hour</span>
            <span>22:00 Night</span>
          </div>
        </div>

        {/* Live Architectural Finishes Selector */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
              <Palette className="w-4 h-4 text-emerald-400" />
              <span>Bespoke Flooring & Surface Finish</span>
            </div>
            <span className="text-[11px] font-mono text-gray-400">Instant 3D Swap</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'marble', label: 'Calacatta Marble', sub: 'Polished Italian' },
              { id: 'oak', label: 'Smoked Oak', sub: 'European Chevron' },
              { id: 'concrete', label: 'Honed Basalt', sub: 'Minimalist Matte' },
            ].map((finish) => (
              <button
                key={finish.id}
                type="button"
                onClick={() => changeFinish(finish.id)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  activeFinish === finish.id
                    ? 'bg-emerald-500/15 border-emerald-400 text-white shadow-md shadow-emerald-500/10'
                    : 'bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200'
                }`}
              >
                <div className="text-xs font-medium">{finish.label}</div>
                <div className="text-[10px] text-gray-500">{finish.sub}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Floorplan3DViewer;
