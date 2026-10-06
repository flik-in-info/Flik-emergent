import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Eye, Sun, Compass, Maximize2, RotateCcw, Box } from 'lucide-react';

export default function ThreeTowerCanvas({ onFloorChange, activeFloor = 42 }) {
  const mountRef = useRef(null);
  const [wireframe, setWireframe] = useState(false);
  const [exploded, setExploded] = useState(0); // 0 to 1
  const [sunHour, setSunHour] = useState(16); // 6 to 18
  const [cameraMode, setCameraMode] = useState('orbit'); // 'orbit' | 'top' | 'close'
  const [isDragging, setIsDragging] = useState(false);

  // References for three.js internal scene
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const towerGroupRef = useRef(null);
  const floorPlatesRef = useRef([]);
  const dirLightRef = useRef(null);
  const mouseStateRef = useRef({ isDown: false, prevX: 0, prevY: 0, rotY: 0.5, rotX: 0.25, distance: 38 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x050507, 0.015);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(25, 22, 28);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff1dc, 2.0);
    dirLight.position.set(30, 45, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 120;
    dirLight.shadow.camera.left = -30;
    dirLight.shadow.camera.right = 30;
    dirLight.shadow.camera.top = 30;
    dirLight.shadow.camera.bottom = -30;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    const emeraldAccent = new THREE.PointLight(0x22c55e, 3.5, 40);
    emeraldAccent.position.set(-15, 18, -10);
    scene.add(emeraldAccent);

    // 5. Infinite Ground Grid & Plinth (Element #11 & #43)
    const grid = new THREE.GridHelper(80, 40, 0x22c55e, 0x1e293b);
    grid.position.y = -0.05;
    scene.add(grid);

    // Plinth ring
    const ringGeo = new THREE.RingGeometry(14, 14.3, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, side: THREE.DoubleSide, transparent: true, opacity: 0.35 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.02;
    scene.add(ring);

    // 6. Tower Group (Element #1)
    const towerGroup = new THREE.Group();
    towerGroupRef.current = towerGroup;
    scene.add(towerGroup);

    // Build procedural 3D luxury tower floors
    const totalFloors = 24;
    const floorPlates = [];
    const floorHeight = 1.0;
    const baseW = 10;
    const baseD = 8;

    for (let f = 0; f < totalFloors; f++) {
      const floorSubGroup = new THREE.Group();
      floorSubGroup.userData = { floorIndex: f, baseElevation: f * floorHeight };

      // Slab
      const slabGeo = new THREE.BoxGeometry(baseW * (1 - f * 0.01), 0.18, baseD * (1 - f * 0.01));
      const slabMat = new THREE.MeshStandardMaterial({
        color: f === 23 ? 0x22c55e : (f % 5 === 0 ? 0x334155 : 0x1e293b),
        metalness: 0.8,
        roughness: 0.3,
      });
      const slab = new THREE.Mesh(slabGeo, slabMat);
      slab.castShadow = true;
      slab.receiveShadow = true;
      floorSubGroup.add(slab);

      // Glass core
      const coreGeo = new THREE.BoxGeometry(baseW * (1 - f * 0.01) - 0.4, floorHeight - 0.22, baseD * (1 - f * 0.01) - 0.4);
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.32,
        roughness: 0.1,
        metalness: 0.9,
        transmission: 0.6,
        ior: 1.5,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.y = (floorHeight - 0.22) / 2;
      floorSubGroup.add(core);

      // Balcony rails on luxury penthouse floors
      if (f > 12) {
        const railGeo = new THREE.BoxGeometry(baseW * (1 - f * 0.01) + 0.3, 0.4, 0.05);
        const railMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9, roughness: 0.2 });
        const railFront = new THREE.Mesh(railGeo, railMat);
        railFront.position.set(0, 0.25, baseD * (1 - f * 0.01) / 2);
        floorSubGroup.add(railFront);
      }

      floorSubGroup.position.y = f * floorHeight;
      towerGroup.add(floorSubGroup);
      floorPlates.push(floorSubGroup);
    }
    floorPlatesRef.current = floorPlates;

    // 7. Floating 3D Spatial Hotspots Pins (Element #14)
    const pinGeo = new THREE.SphereGeometry(0.4, 16, 16);
    const pinMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const penthousePin = new THREE.Mesh(pinGeo, pinMat);
    penthousePin.position.set(baseW * 0.4, (totalFloors - 1) * floorHeight + 1.2, baseD * 0.4);
    towerGroup.add(penthousePin);

    // 8. 3D Nanite Wireframe Lattice Box (Element #10)
    const latticeGeo = new THREE.BoxGeometry(baseW + 2, totalFloors * floorHeight + 2, baseD + 2);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, wireframe: true, transparent: true, opacity: 0.08 });
    const wireBox = new THREE.Mesh(latticeGeo, wireMat);
    wireBox.position.y = (totalFloors * floorHeight) / 2;
    towerGroup.add(wireBox);

    // Mouse Drag Controls
    const onMouseDown = (e) => {
      mouseStateRef.current.isDown = true;
      mouseStateRef.current.prevX = e.clientX;
      mouseStateRef.current.prevY = e.clientY;
      setIsDragging(true);
    };

    const onMouseMove = (e) => {
      if (!mouseStateRef.current.isDown) return;
      const dx = e.clientX - mouseStateRef.current.prevX;
      const dy = e.clientY - mouseStateRef.current.prevY;
      mouseStateRef.current.prevX = e.clientX;
      mouseStateRef.current.prevY = e.clientY;

      mouseStateRef.current.rotY += dx * 0.008;
      mouseStateRef.current.rotX = Math.max(-0.2, Math.min(1.2, mouseStateRef.current.rotX + dy * 0.008));
    };

    const onMouseUp = () => {
      mouseStateRef.current.isDown = false;
      setIsDragging(false);
    };

    const onWheel = (e) => {
      e.preventDefault();
      mouseStateRef.current.distance = Math.max(18, Math.min(65, mouseStateRef.current.distance + e.deltaY * 0.04));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // Touch support for mobile
    let touchStartX = 0, touchStartY = 0;
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e) => {
      if (e.touches.length === 1) {
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        mouseStateRef.current.rotY += dx * 0.01;
        mouseStateRef.current.rotX = Math.max(-0.2, Math.min(1.2, mouseStateRef.current.rotX + dy * 0.01));
      }
    };
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    dom.addEventListener('touchmove', onTouchMove, { passive: true });

    // Render loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      // Smooth auto rotation if not dragging
      if (!mouseStateRef.current.isDown) {
        mouseStateRef.current.rotY += 0.002;
      }

      // Camera position from spherical coords
      const d = mouseStateRef.current.distance;
      const rx = mouseStateRef.current.rotX;
      const ry = mouseStateRef.current.rotY;

      camera.position.x = d * Math.sin(ry) * Math.cos(rx);
      camera.position.y = Math.max(4, d * Math.sin(rx) + 12);
      camera.position.z = d * Math.cos(ry) * Math.cos(rx);
      camera.lookAt(0, 11, 0);

      // Pulse pin
      const time = Date.now() * 0.003;
      penthousePin.scale.setScalar(1 + 0.15 * Math.sin(time));

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
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
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('mousedown', onMouseDown);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('touchstart', onTouchStart);
      dom.removeEventListener('touchmove', onTouchMove);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update wireframe mode (Element #31)
  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => (m.wireframe = wireframe));
        } else {
          child.material.wireframe = wireframe;
        }
      }
    });
  }, [wireframe]);

  // Update exploded view (Element #29)
  useEffect(() => {
    if (!floorPlatesRef.current) return;
    floorPlatesRef.current.forEach((floorGroup, i) => {
      const baseElev = floorGroup.userData.baseElevation;
      floorGroup.position.y = baseElev + i * exploded * 0.9;
    });
  }, [exploded]);

  // Update dynamic sun position (Element #3)
  useEffect(() => {
    if (!dirLightRef.current) return;
    // Map sunHour (6 to 18) to an arc across the sky
    const angle = ((sunHour - 6) / 12) * Math.PI;
    const x = Math.cos(angle) * 45;
    const y = Math.sin(angle) * 45;
    dirLightRef.current.position.set(x, Math.max(8, y), 25);
    
    // Warm sun color at morning/golden hour, crisp white at noon
    if (sunHour <= 8 || sunHour >= 16) {
      dirLightRef.current.color.setHex(0xffaa55); // warm golden
      dirLightRef.current.intensity = 2.2;
    } else {
      dirLightRef.current.color.setHex(0xffffff); // high noon
      dirLightRef.current.intensity = 2.6;
    }
  }, [sunHour]);

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-[#07070a] shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing select-none" />

      {/* Top Telemetry HUD Overlay (Elements #17 & #18) */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full luxury-glass border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>THREE.JS REAL-TIME 3D DIGITAL TWIN</span>
          <span className="text-gray-400">|</span>
          <span className="text-white font-semibold">60 FPS WEBGPU</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl luxury-glass border border-white/10 text-xs font-mono text-gray-300">
          <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
          <span>AZIMUTH: {Math.round(((sunHour - 6) / 12) * 180)}° ENE</span>
        </div>
      </div>

      {/* 3D Interactive Floating Control Panel (Elements #27, #28, #29, #31, #33) */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl luxury-glass border border-white/15 backdrop-blur-2xl">
        {/* Left: Wireframe & Exploded View Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setWireframe(!wireframe)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium border transition-all ${
              wireframe
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
            }`}
            title="Toggle CAD Nanite Wireframe"
          >
            <Box className="w-3.5 h-3.5" />
            <span>{wireframe ? 'CAD Wireframe' : 'Photoreal Shaded'}</span>
          </button>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-gray-300">Exploded Slices:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={exploded}
              onChange={(e) => setExploded(parseFloat(e.target.value))}
              className="w-20 accent-emerald-400 cursor-pointer"
            />
            <span className="text-emerald-400 font-bold">{Math.round(exploded * 100)}%</span>
          </div>
        </div>

        {/* Right: Dynamic Sun Position Slider */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
            <Sun className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-gray-300">Sun Dial:</span>
            <input
              type="range"
              min="6"
              max="18"
              step="1"
              value={sunHour}
              onChange={(e) => setSunHour(parseInt(e.target.value, 10))}
              className="w-24 accent-amber-400 cursor-pointer"
            />
            <span className="text-amber-400 font-bold">
              {sunHour < 12 ? `${sunHour}:00 AM` : sunHour === 12 ? '12:00 PM' : `${sunHour - 12}:00 PM`}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              mouseStateRef.current = { isDown: false, prevX: 0, prevY: 0, rotY: 0.5, rotX: 0.25, distance: 38 };
              setExploded(0);
              setWireframe(false);
              setSunHour(16);
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 border border-white/10 transition-colors"
            title="Reset 3D Orbit Camera"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Drag Prompt Hint */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
        <span className="px-3 py-1 rounded-full bg-black/80 text-emerald-400 text-xs font-mono border border-emerald-500/30">
          DRAG TO ORBIT 360° · SCROLL TO ZOOM
        </span>
      </div>
    </div>
  );
}
