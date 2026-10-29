import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Globe, Radio, Zap } from 'lucide-react';
import { soundFX } from '../../utils/soundEffects';

const NODES = [
  { id: 'mumbai', name: 'Mumbai (Origin Cluster)', lat: 19.076, lon: 72.8777, type: 'origin', latency: '0ms' },
  { id: 'dubai', name: 'Dubai NRI Hub', lat: 25.2048, lon: 55.2708, type: 'edge', latency: '32ms' },
  { id: 'singapore', name: 'Singapore NRI Hub', lat: 1.3521, lon: 103.8198, type: 'edge', latency: '44ms' },
  { id: 'london', name: 'London NRI Hub', lat: 51.5074, lon: -0.1278, type: 'edge', latency: '68ms' },
  { id: 'newyork', name: 'New York NRI Hub', lat: 40.7128, lon: -74.006, type: 'edge', latency: '110ms' },
];

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function createArc(p1, p2, radius) {
  const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
  const midLength = mid.length();
  mid.normalize().multiplyScalar(radius * 1.35); // arc height

  const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
  const points = curve.getPoints(40);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0x22e55a,
    transparent: true,
    opacity: 0.65,
  });
  return new THREE.Line(geometry, material);
}

const GlobalStreamingGlobe = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const globeGroupRef = useRef(null);
  const animFrameIdRef = useRef(null);

  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0.2, y: -1.2 });
  const rotation = useRef({ x: 0.2, y: -1.2 });

  const [activeNode, setActiveNode] = useState(NODES[1]); // Default Dubai

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const width = container.clientWidth || 400;
      const height = container.clientHeight || 350;

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(45, width / (height || 1), 0.1, 100);
      camera.position.set(0, 0, 16);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      rendererRef.current = renderer;
      container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    const globeRadius = 5.2;

    // 1. Globe wireframe sphere
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 36, 36);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x11221a,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const globeSphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(globeSphere);

    // Inner dark core
    const coreGeo = new THREE.SphereGeometry(globeRadius * 0.98, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x070c09 });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // 2. Dots on Globe (continents simulation)
    const dotCount = 800;
    const dotGeo = new THREE.BufferGeometry();
    const dotPositions = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = globeRadius * 1.01;
      dotPositions[i] = r * Math.sin(phi) * Math.cos(theta);
      dotPositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      dotPositions[i + 2] = r * Math.cos(phi);
    }
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0x22e55a,
      size: 0.08,
      transparent: true,
      opacity: 0.5,
    });
    const dotsMesh = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dotsMesh);

    // 3. Place City Node Pins & Arcs
    const originVec = latLonToVector3(NODES[0].lat, NODES[0].lon, globeRadius);

    NODES.forEach((node) => {
      const pos = latLonToVector3(node.lat, node.lon, globeRadius);

      // Pin marker
      const pinGeo = new THREE.SphereGeometry(node.type === 'origin' ? 0.22 : 0.16, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: node.type === 'origin' ? 0x00f0ff : 0x22e55a,
      });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(pos);
      globeGroup.add(pin);

      // Connect Arcs to Origin (Mumbai)
      if (node.type !== 'origin') {
        const arc = createArc(originVec, pos, globeRadius);
        globeGroup.add(arc);
      }
    });

    // Outer atmosphere glow ring
    const atmosphereGeo = new THREE.RingGeometry(globeRadius * 1.08, globeRadius * 1.15, 64);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x22e55a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphere);

    // Resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animate
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (!isDragging.current) {
        targetRotation.current.y += 0.002;
      }

      rotation.current.y += (targetRotation.current.y - rotation.current.y) * 0.08;
      rotation.current.x += (targetRotation.current.x - rotation.current.x) * 0.08;

      if (globeGroupRef.current) {
        globeGroupRef.current.rotation.y = rotation.current.y;
        globeGroupRef.current.rotation.x = rotation.current.x;
      }

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current && rendererRef.current.domElement && container) {
        try {
          container.removeChild(rendererRef.current.domElement);
        } catch {}
        rendererRef.current.dispose();
      }
    };
    } catch (err) {
      console.warn('GlobalStreamingGlobe WebGL init error:', err);
    }
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    previousMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousMouse.current.x;
    const deltaY = e.clientY - previousMouse.current.y;
    targetRotation.current.y += deltaX * 0.007;
    targetRotation.current.x = Math.max(-0.6, Math.min(0.6, targetRotation.current.x + deltaY * 0.005));
    previousMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#090b0e] p-6 lg:p-8 flex flex-col justify-between shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            Global Pixel Streaming Topology
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <Radio className="w-3.5 h-3.5 text-emerald-400" />
          <span>WebRTC 60 FPS</span>
        </div>
      </div>

      {/* 3D Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-[320px] lg:h-[380px] cursor-grab active:cursor-grabbing relative"
      />

      {/* Node Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-white/10">
        {NODES.filter((n) => n.type === 'edge').map((node) => (
          <button
            key={node.id}
            type="button"
            onClick={() => {
              soundFX.playClick();
              setActiveNode(node);
            }}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              activeNode?.id === node.id
                ? 'bg-emerald-500/15 border-emerald-400 text-white'
                : 'bg-white/[0.02] border-white/5 text-gray-400 hover:border-white/20'
            }`}
          >
            <div className="text-xs font-medium text-white">{node.name.split(' ')[0]}</div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] font-mono text-emerald-400">
              <Zap className="w-3 h-3" />
              <span>{node.latency}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalStreamingGlobe;
