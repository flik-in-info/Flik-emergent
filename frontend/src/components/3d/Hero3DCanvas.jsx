import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Layers, Sun, Moon, Eye, Maximize, RotateCcw, Sparkles } from 'lucide-react';
import { soundFX } from '../../utils/soundEffects';

// WebGL support detector
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

const Hero3DCanvas = ({ onOpenDemo }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // 3D Object references for animations
  const towerGroupRef = useRef(null);
  const floorTiersRef = useRef([]);
  const laserBeamRef = useRef(null);
  const particlesRef = useRef(null);
  const pointLightRef = useRef(null);
  const dirLightRef = useRef(null);
  const ambientLightRef = useRef(null);

  // Camera animation target states
  const targetCamPos = useRef({ x: 28, y: 22, z: 32 });
  const targetCamLook = useRef({ x: 0, y: 6, z: 0 });
  const currentCamLook = useRef({ x: 0, y: 6, z: 0 });

  // Interactive mouse drag & parallax state
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const towerRotation = useRef({ x: 0, y: -0.4 });
  const targetTowerRotation = useRef({ x: 0, y: -0.4 });
  const mouseParallax = useRef({ x: 0, y: 0 });

  // UI state
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [lightingMode, setLightingMode] = useState('sunset'); // 'sunset' | 'daylight' | 'cyber' | 'wireframe'
  const [exploded, setExploded] = useState(false);
  const [activePreset, setActivePreset] = useState('orbit');
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [fps, setFps] = useState(60);

  // Initialize Three.js scene
  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebGLSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0a0a0b, 0.012);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(28, 22, 32);
    camera.lookAt(0, 6, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.9);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const dirLight = new THREE.DirectionalLight(0xffaa55, 3.2);
    dirLight.position.set(30, 45, 25);
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    const pointLight = new THREE.PointLight(0x22e55a, 3.5, 60);
    pointLight.position.set(0, 20, 15);
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    // 5. Infinite Spatial Grid Plane
    const gridHelper = new THREE.GridHelper(160, 60, 0x22e55a, 0x1a2e22);
    gridHelper.position.y = -6;
    gridHelper.material.opacity = 0.35;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // 6. Floating Particles Field
    const particleCount = 280;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 80;
      particlePositions[i + 1] = Math.random() * 45 - 5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 80;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x22e55a,
      size: 0.28,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // 7. Architectural Skyscraper Tower Group
    const towerGroup = new THREE.Group();
    towerGroup.position.y = 0;
    scene.add(towerGroup);
    towerGroupRef.current = towerGroup;

    // Materials Palette
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x1b1c20,
      metalness: 0.4,
      roughness: 0.7,
    });
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x242830,
      metalness: 0.85,
      roughness: 0.25,
    });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.82,
      thickness: 1.2,
      transparent: true,
      opacity: 0.75,
    });
    const glowInteriorMat = new THREE.MeshBasicMaterial({
      color: 0xffdf99,
      transparent: true,
      opacity: 0.35,
    });
    const neonEdgeMat = new THREE.LineBasicMaterial({
      color: 0x22e55a,
      transparent: true,
      opacity: 0.65,
    });

    // Helper: Create edge wireframe on mesh
    const addEdges = (mesh, parent) => {
      const edges = new THREE.EdgesGeometry(mesh.geometry);
      const line = new THREE.LineSegments(edges, neonEdgeMat);
      line.position.copy(mesh.position);
      parent.add(line);
      return line;
    };

    // Construct 5 Explodable Tiers (Podium, Mid-Luxury, Club Level, Sky Penthouse, Rooftop Crown)
    const tiers = [];

    // TIER 1: Grand Podium & Arrival Lobby
    const tier1 = new THREE.Group();
    tier1.userData = { baseY: -4, targetY: -4, label: 'L01 Grand Arrival Lobby' };
    const podiumGeo = new THREE.BoxGeometry(16, 3, 16);
    const podiumMesh = new THREE.Mesh(podiumGeo, concreteMat);
    tier1.add(podiumMesh);
    addEdges(podiumMesh, tier1);

    // Lobby glass volume
    const lobbyGlassGeo = new THREE.BoxGeometry(14, 2.4, 14);
    const lobbyGlassMesh = new THREE.Mesh(lobbyGlassGeo, glassMat);
    lobbyGlassMesh.position.y = 0.2;
    tier1.add(lobbyGlassMesh);
    towerGroup.add(tier1);
    tiers.push(tier1);

    // TIER 2: Luxury Residences L02 - L20
    const tier2 = new THREE.Group();
    tier2.userData = { baseY: 2, targetY: 2, label: 'L02–L20 Luxury Residences' };
    const t2CoreGeo = new THREE.BoxGeometry(11, 8, 11);
    const t2CoreMesh = new THREE.Mesh(t2CoreGeo, frameMat);
    tier2.add(t2CoreMesh);
    addEdges(t2CoreMesh, tier2);

    const t2GlassGeo = new THREE.BoxGeometry(11.4, 7.6, 11.4);
    const t2GlassMesh = new THREE.Mesh(t2GlassGeo, glassMat);
    tier2.add(t2GlassMesh);

    // Interior glow core
    const t2GlowGeo = new THREE.BoxGeometry(8, 7, 8);
    const t2GlowMesh = new THREE.Mesh(t2GlowGeo, glowInteriorMat);
    tier2.add(t2GlowMesh);

    // Cantilevered Balconies
    for (let f = -3; f <= 3; f += 2) {
      const balcGeo = new THREE.BoxGeometry(13.5, 0.4, 4);
      const balcMesh = new THREE.Mesh(balcGeo, concreteMat);
      balcMesh.position.set(0, f, 5);
      tier2.add(balcMesh);
      addEdges(balcMesh, tier2);
    }
    towerGroup.add(tier2);
    tiers.push(tier2);

    // TIER 3: L21 Sky Lounge & Infinity Pool
    const tier3 = new THREE.Group();
    tier3.userData = { baseY: 8.5, targetY: 8.5, label: 'L21 Sky Deck & Club' };
    const t3SlabGeo = new THREE.BoxGeometry(15, 1.2, 13);
    const t3SlabMesh = new THREE.Mesh(t3SlabGeo, frameMat);
    tier3.add(t3SlabMesh);
    addEdges(t3SlabMesh, tier3);

    // Pool water plane
    const poolGeo = new THREE.BoxGeometry(7, 0.4, 4);
    const poolMat = new THREE.MeshStandardMaterial({
      color: 0x00d2ff,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.85,
    });
    const poolMesh = new THREE.Mesh(poolGeo, poolMat);
    poolMesh.position.set(3, 0.6, 2);
    tier3.add(poolMesh);
    towerGroup.add(tier3);
    tiers.push(tier3);

    // TIER 4: Sky Penthouse Duplex L22 - L35
    const tier4 = new THREE.Group();
    tier4.userData = { baseY: 14.5, targetY: 14.5, label: 'L22–L35 Penthouse Sky Villas' };
    const t4CoreGeo = new THREE.BoxGeometry(9.5, 9, 9.5);
    const t4CoreMesh = new THREE.Mesh(t4CoreGeo, frameMat);
    tier4.add(t4CoreMesh);
    addEdges(t4CoreMesh, tier4);

    const t4GlassGeo = new THREE.BoxGeometry(10.2, 8.4, 10.2);
    const t4GlassMesh = new THREE.Mesh(t4GlassGeo, glassMat);
    tier4.add(t4GlassMesh);

    // Dynamic architectural cantilevers
    const t4CantileverGeo = new THREE.BoxGeometry(12, 1, 10);
    const t4Cantilever = new THREE.Mesh(t4CantileverGeo, concreteMat);
    t4Cantilever.position.set(1.5, 2.5, 0);
    tier4.add(t4Cantilever);
    addEdges(t4Cantilever, tier4);
    towerGroup.add(tier4);
    tiers.push(tier4);

    // TIER 5: Crown Helipad & Architectural Spire L36
    const tier5 = new THREE.Group();
    tier5.userData = { baseY: 21, targetY: 21, label: 'L36 Crown & Helipad' };
    const crownGeo = new THREE.CylinderGeometry(4.5, 5.5, 1.5, 32);
    const crownMesh = new THREE.Mesh(crownGeo, frameMat);
    tier5.add(crownMesh);
    addEdges(crownMesh, tier5);

    // Spire
    const spireGeo = new THREE.CylinderGeometry(0.15, 0.6, 6, 16);
    const spireMesh = new THREE.Mesh(spireGeo, new THREE.MeshStandardMaterial({ color: 0x22e55a, metalness: 0.9 }));
    spireMesh.position.y = 3.5;
    tier5.add(spireMesh);

    // Helipad 'H' ring
    const ringGeo = new THREE.RingGeometry(2.5, 2.9, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x22e55a, side: THREE.DoubleSide });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.8;
    tier5.add(ringMesh);

    towerGroup.add(tier5);
    tiers.push(tier5);

    floorTiersRef.current = tiers;

    // 8. LiDAR Laser Scanning Ring
    const laserGeo = new THREE.RingGeometry(7, 7.4, 48);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x22e55a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    const laserBeam = new THREE.Mesh(laserGeo, laserMat);
    laserBeam.rotation.x = -Math.PI / 2;
    laserBeam.position.y = 5;
    scene.add(laserBeam);
    laserBeamRef.current = laserBeam;

    // 9. Resize Listener
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = performance.now();

    const animate = (time) => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // FPS tracking
      frameCount++;
      if (time - fpsTimer >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        fpsTimer = time;
      }

      // Smooth tower rotation (inertia + parallax)
      if (!isDragging.current) {
        targetTowerRotation.current.y += 0.0018; // gentle automatic spin
      }
      towerRotation.current.y += (targetTowerRotation.current.y + mouseParallax.current.x - towerRotation.current.y) * 0.06;
      towerRotation.current.x += (targetTowerRotation.current.x + mouseParallax.current.y - towerRotation.current.x) * 0.06;

      if (towerGroupRef.current) {
        towerGroupRef.current.rotation.y = towerRotation.current.y;
        towerGroupRef.current.rotation.x = towerRotation.current.x;
      }

      // Smooth camera interpolation towards target
      if (cameraRef.current) {
        cameraRef.current.position.x += (targetCamPos.current.x - cameraRef.current.position.x) * 0.045;
        cameraRef.current.position.y += (targetCamPos.current.y - cameraRef.current.position.y) * 0.045;
        cameraRef.current.position.z += (targetCamPos.current.z - cameraRef.current.position.z) * 0.045;

        currentCamLook.current.x += (targetCamLook.current.x - currentCamLook.current.x) * 0.05;
        currentCamLook.current.y += (targetCamLook.current.y - currentCamLook.current.y) * 0.05;
        currentCamLook.current.z += (targetCamLook.current.z - currentCamLook.current.z) * 0.05;

        cameraRef.current.lookAt(
          currentCamLook.current.x,
          currentCamLook.current.y,
          currentCamLook.current.z
        );
      }

      // Floor exploding animation (smooth lerp)
      floorTiersRef.current.forEach((tier) => {
        tier.position.y += (tier.userData.targetY - tier.position.y) * 0.08;
      });

      // LiDAR laser beam motion (when in wireframe mode)
      if (laserBeamRef.current && laserBeamRef.current.material.opacity > 0.01) {
        laserBeamRef.current.position.y = -3 + Math.sin(time * 0.003) * 12 + 10;
        laserBeamRef.current.rotation.z += 0.01;
      }

      // Float upward particles
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += 0.04;
          if (positions[i] > 35) positions[i] = -5;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      lastTime = time;
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Update lighting & materials on mode change
  useEffect(() => {
    if (!sceneRef.current) return;

    if (lightingMode === 'daylight') {
      sceneRef.current.fog.color.setHex(0x0e1724);
      if (ambientLightRef.current) {
        ambientLightRef.current.color.setHex(0xe8f0fe);
        ambientLightRef.current.intensity = 1.3;
      }
      if (dirLightRef.current) {
        dirLightRef.current.color.setHex(0xffffff);
        dirLightRef.current.intensity = 3.6;
        dirLightRef.current.position.set(25, 45, 20);
      }
      if (laserBeamRef.current) laserBeamRef.current.material.opacity = 0;
    } else if (lightingMode === 'sunset') {
      sceneRef.current.fog.color.setHex(0x130a10);
      if (ambientLightRef.current) {
        ambientLightRef.current.color.setHex(0xffd1ba);
        ambientLightRef.current.intensity = 1.1;
      }
      if (dirLightRef.current) {
        dirLightRef.current.color.setHex(0xff6e30);
        dirLightRef.current.intensity = 4.2;
        dirLightRef.current.position.set(35, 20, -15);
      }
      if (laserBeamRef.current) laserBeamRef.current.material.opacity = 0;
    } else if (lightingMode === 'cyber') {
      sceneRef.current.fog.color.setHex(0x04090e);
      if (ambientLightRef.current) {
        ambientLightRef.current.color.setHex(0x00ffcc);
        ambientLightRef.current.intensity = 0.5;
      }
      if (dirLightRef.current) {
        dirLightRef.current.color.setHex(0x22e55a);
        dirLightRef.current.intensity = 2.8;
        dirLightRef.current.position.set(-20, 30, 20);
      }
      if (laserBeamRef.current) laserBeamRef.current.material.opacity = 0;
    } else if (lightingMode === 'wireframe') {
      sceneRef.current.fog.color.setHex(0x020603);
      if (ambientLightRef.current) {
        ambientLightRef.current.color.setHex(0x22e55a);
        ambientLightRef.current.intensity = 0.4;
      }
      if (dirLightRef.current) {
        dirLightRef.current.color.setHex(0x00ffaa);
        dirLightRef.current.intensity = 1.5;
        dirLightRef.current.position.set(0, 40, 20);
      }
      if (laserBeamRef.current) laserBeamRef.current.material.opacity = 0.85;
    }
  }, [lightingMode]);

  // Handle floor exploding toggle
  const toggleExploded = useCallback(() => {
    soundFX.playSwoosh();
    setExploded((prev) => {
      const next = !prev;
      floorTiersRef.current.forEach((tier, index) => {
        if (next) {
          // Spread floors outward vertically
          const offsets = [-7, -2, 4, 11, 18];
          tier.userData.targetY = offsets[index];
        } else {
          tier.userData.targetY = tier.userData.baseY;
        }
      });
      return next;
    });
  }, []);

  // Camera presets
  const applyPreset = useCallback((preset) => {
    soundFX.playClick();
    setActivePreset(preset);
    setActiveHotspot(null);

    if (preset === 'orbit') {
      targetCamPos.current = { x: 28, y: 22, z: 32 };
      targetCamLook.current = { x: 0, y: 6, z: 0 };
    } else if (preset === 'penthouse') {
      targetCamPos.current = { x: 12, y: 19, z: 16 };
      targetCamLook.current = { x: 2, y: 15, z: 0 };
    } else if (preset === 'drone') {
      targetCamPos.current = { x: 4, y: 44, z: 22 };
      targetCamLook.current = { x: 0, y: 8, z: 0 };
    } else if (preset === 'balcony') {
      targetCamPos.current = { x: -8, y: 12, z: 18 };
      targetCamLook.current = { x: 0, y: 9, z: 0 };
    }
  }, []);

  // Hotspot click
  const selectHotspot = (spot) => {
    soundFX.playChime(750, 0.12);
    setActiveHotspot(spot);
    if (spot.id === 'penthouse') {
      targetCamPos.current = { x: 14, y: 21, z: 15 };
      targetCamLook.current = { x: 1.5, y: 16, z: 0 };
    } else if (spot.id === 'pool') {
      targetCamPos.current = { x: 16, y: 13, z: 14 };
      targetCamLook.current = { x: 2, y: 9, z: 0 };
    } else if (spot.id === 'lobby') {
      targetCamPos.current = { x: 20, y: 3, z: 22 };
      targetCamLook.current = { x: 0, y: -2, z: 0 };
    }
  };

  // Mouse & Touch Orbit Handlers
  const handleMouseDown = (e) => {
    isDragging.current = true;
    previousMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      const deltaX = e.clientX - previousMouse.current.x;
      const deltaY = e.clientY - previousMouse.current.y;
      targetTowerRotation.current.y += deltaX * 0.007;
      targetTowerRotation.current.x = Math.max(
        -0.4,
        Math.min(0.3, targetTowerRotation.current.x + deltaY * 0.005)
      );
      previousMouse.current = { x: e.clientX, y: e.clientY };
    } else if (containerRef.current) {
      // Subtle cursor parallax
      const rect = containerRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mouseParallax.current = { x: nx * 0.18, y: -ny * 0.12 };
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Touch handlers for mobile
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
      targetTowerRotation.current.y += deltaX * 0.008;
      targetTowerRotation.current.x = Math.max(
        -0.4,
        Math.min(0.3, targetTowerRotation.current.x + deltaY * 0.006)
      );
      previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // Zoom on scroll inside 3D canvas
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * 0.03;
    const currentDist = Math.hypot(targetCamPos.current.x, targetCamPos.current.y, targetCamPos.current.z);
    if ((currentDist > 18 || zoomDelta > 0) && (currentDist < 65 || zoomDelta < 0)) {
      targetCamPos.current.x += (targetCamPos.current.x / currentDist) * zoomDelta;
      targetCamPos.current.y += (targetCamPos.current.y / currentDist) * zoomDelta;
      targetCamPos.current.z += (targetCamPos.current.z / currentDist) * zoomDelta;
    }
  };

  // Hotspots metadata
  const HOTSPOTS = [
    {
      id: 'penthouse',
      label: 'Sky Villa Penthouse',
      sub: '4,200 sq ft Duplex · L32',
      tag: '₹14.5 Cr',
    },
    {
      id: 'pool',
      label: 'Horizon Infinity Pool',
      sub: 'Level 21 Sky Lounge & Deck',
      tag: 'Amenity Deck',
    },
    {
      id: 'lobby',
      label: 'Grand Triple-Height Lobby',
      sub: 'Concierge & Private Valet Arrival',
      tag: 'Podium Level',
    },
  ];

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden"
      style={{ touchAction: 'none' }}
    >
      {/* Fallback if WebGL unsupported */}
      {!webGLSupported && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0b] via-[#111827] to-[#0a0a0b] flex items-center justify-center">
          <p className="text-gray-400 text-sm">3D Real-time canvas running in high-fidelity compatibility mode</p>
        </div>
      )}

      {/* Top HUD Bar: Live 3D Engine Metrics */}
      <div className="absolute top-24 left-6 lg:left-12 z-20 pointer-events-none flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>REAL-TIME 3D SPATIAL ENGINE</span>
          <span className="text-white/40">|</span>
          <span className="text-emerald-300 font-semibold">{fps} FPS</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-mono text-gray-300">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>Interactive 360° Drag & Zoom</span>
        </div>
      </div>

      {/* Floating 3D Controls Dock (Bottom Left / Center) */}
      <div className="absolute bottom-6 left-6 lg:left-12 z-20 flex flex-wrap items-center gap-2 max-w-xl">
        {/* Explode Floors Toggle */}
        <button
          type="button"
          onClick={toggleExploded}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl backdrop-blur-md text-xs font-mono font-medium transition-all duration-300 border ${
            exploded
              ? 'bg-emerald-500 text-black border-emerald-400 shadow-lg shadow-emerald-500/30'
              : 'bg-black/70 text-gray-300 border-white/10 hover:border-emerald-500/40 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{exploded ? 'Collapse Floors' : 'Explode 3D Floors'}</span>
        </button>

        {/* Lighting Mode Selector */}
        <div className="flex items-center rounded-xl bg-black/70 backdrop-blur-md border border-white/10 p-1">
          <button
            type="button"
            title="Golden Sunset"
            onClick={() => {
              soundFX.playClick();
              setLightingMode('sunset');
            }}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              lightingMode === 'sunset' ? 'bg-amber-500/30 text-amber-300' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Daylight"
            onClick={() => {
              soundFX.playClick();
              setLightingMode('daylight');
            }}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              lightingMode === 'daylight' ? 'bg-sky-500/30 text-sky-300' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Cyber Night"
            onClick={() => {
              soundFX.playClick();
              setLightingMode('cyber');
            }}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              lightingMode === 'cyber' ? 'bg-emerald-500/30 text-emerald-300' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="LiDAR Wireframe"
            onClick={() => {
              soundFX.playClick();
              setLightingMode('wireframe');
            }}
            className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-colors ${
              lightingMode === 'wireframe' ? 'bg-emerald-500 text-black font-semibold' : 'text-gray-400 hover:text-white'
            }`}
          >
            LiDAR
          </button>
        </div>

        {/* Camera Preset Quick Buttons */}
        <div className="hidden sm:flex items-center rounded-xl bg-black/70 backdrop-blur-md border border-white/10 p-1">
          {[
            { id: 'orbit', label: 'Orbit' },
            { id: 'penthouse', label: 'Penthouse' },
            { id: 'drone', label: 'Top-Down' },
            { id: 'balcony', label: 'Terrace' },
          ].map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                activePreset === preset.id ? 'bg-white/20 text-white font-medium' : 'text-gray-400 hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Floating 3D Hotspot Chips (Right Side HUD) */}
      <div className="absolute top-36 right-6 lg:right-12 z-20 flex flex-col gap-2.5 max-w-xs">
        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400/80 mb-0.5">
          Interactive Architecture Pins
        </span>
        {HOTSPOTS.map((spot) => (
          <button
            key={spot.id}
            type="button"
            onClick={() => selectHotspot(spot)}
            className={`text-left p-3 rounded-xl backdrop-blur-md border transition-all duration-300 ${
              activeHotspot?.id === spot.id
                ? 'bg-emerald-500/15 border-emerald-400/80 shadow-lg shadow-emerald-500/20 translate-x-[-4px]'
                : 'bg-black/60 border-white/10 hover:border-emerald-500/40 hover:bg-black/80'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-white text-xs font-medium">{spot.label}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300">
                {spot.tag}
              </span>
            </div>
            <p className="text-gray-400 text-[11px]">{spot.sub}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Hero3DCanvas;
