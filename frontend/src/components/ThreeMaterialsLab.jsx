import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Sliders, Eye, RefreshCw, CheckCircle2 } from 'lucide-react';

const MATERIALS = [
  {
    id: 'marble',
    name: 'Italian Statuario Marble',
    desc: 'High-gloss polished slab with natural grey-gold veins',
    color: 0xf8fafc,
    roughness: 0.1,
    metalness: 0.15,
    clearcoat: 1.0,
    specular: 0xffffff,
  },
  {
    id: 'brass',
    name: 'Champagne Gold PVD Brass',
    desc: 'Brushed architectural metal with warm golden anisotropic sheen',
    color: 0xd4af37,
    roughness: 0.25,
    metalness: 0.95,
    clearcoat: 0.5,
    specular: 0xffe6a3,
  },
  {
    id: 'wood',
    name: 'Smoked European Oak',
    desc: 'Acoustic fluted timber slats with matte open-grain texture',
    color: 0x5c3d2e,
    roughness: 0.75,
    metalness: 0.05,
    clearcoat: 0.1,
    specular: 0x8c6d5e,
  },
  {
    id: 'glass',
    name: 'Acoustic Low-E Fluted Glass',
    desc: 'Thermal double-glazed facade with emerald tint and 85% transmission',
    color: 0x10b981,
    roughness: 0.05,
    metalness: 0.1,
    clearcoat: 1.0,
    transmission: 0.85,
    specular: 0x6ee7b7,
  },
];

export default function ThreeMaterialsLab() {
  const mountRef = useRef(null);
  const [activeMaterial, setActiveMaterial] = useState(MATERIALS[0]);
  const [shape, setShape] = useState('sphere'); // 'sphere' | 'cube' | 'torus'

  const sceneRef = useRef(null);
  const meshRef = useRef(null);
  const rendererRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 350;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Dynamic 3-point studio lighting for luxury materials
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 3.5);
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    fillLight.position.set(-5, -2, 2);
    scene.add(fillLight);

    const backLight = new THREE.PointLight(0x22c55e, 3, 20);
    backLight.position.set(0, 4, -4);
    scene.add(backLight);

    // Initial Material & Geometry
    const geo = new THREE.SphereGeometry(1.6, 64, 64);
    const mat = new THREE.MeshPhysicalMaterial({
      color: activeMaterial.color,
      roughness: activeMaterial.roughness,
      metalness: activeMaterial.metalness,
      clearcoat: activeMaterial.clearcoat || 0,
      clearcoatRoughness: 0.1,
      transmission: activeMaterial.transmission || 0,
      ior: 1.5,
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    meshRef.current = mesh;

    // Background floating rings
    const ringGeo = new THREE.TorusGeometry(2.3, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.25 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);

    // Animation Loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.008;
        meshRef.current.rotation.x += 0.004;
      }
      ring.rotation.z += 0.005;
      ring.rotation.x += 0.003;
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

  // Update Material attributes
  useEffect(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material;
    mat.color.setHex(activeMaterial.color);
    mat.roughness = activeMaterial.roughness;
    mat.metalness = activeMaterial.metalness;
    mat.clearcoat = activeMaterial.clearcoat || 0;
    mat.transmission = activeMaterial.transmission || 0;
    mat.needsUpdate = true;
  }, [activeMaterial]);

  // Update Geometry shape
  const handleChangeShape = (newShape) => {
    setShape(newShape);
    if (!meshRef.current) return;
    let newGeo;
    if (newShape === 'cube') {
      newGeo = new THREE.BoxGeometry(2.2, 2.2, 2.2);
    } else if (newShape === 'torus') {
      newGeo = new THREE.TorusGeometry(1.4, 0.55, 32, 64);
    } else {
      newGeo = new THREE.SphereGeometry(1.6, 64, 64);
    }
    meshRef.current.geometry.dispose();
    meshRef.current.geometry = newGeo;
  };

  return (
    <div className="relative w-full h-full min-h-[460px] rounded-3xl overflow-hidden border border-white/10 bg-[#08080c] shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col justify-between p-6">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="absolute inset-0 select-none" />

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full luxury-glass border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>3D PHOTOREAL MATERIALS & LUMEN SHADER LAB</span>
        </div>

        {/* Geometry Switcher */}
        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-xl p-1 rounded-xl border border-white/10 text-xs font-mono">
          {['sphere', 'cube', 'torus'].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleChangeShape(s)}
              className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                shape === s ? 'bg-emerald-500 text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Swatch Selector */}
      <div className="relative z-10 mt-auto pt-6">
        <div className="p-4 rounded-2xl luxury-glass border border-white/15 backdrop-blur-2xl">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
            <span>{activeMaterial.name}</span>
            <span className="text-gray-400 text-[10px]">Roughness: {Math.round(activeMaterial.roughness * 100)}%</span>
          </div>
          <p className="text-xs text-gray-300 font-light mb-3">{activeMaterial.desc}</p>

          {/* Swatches Grid */}
          <div className="grid grid-cols-4 gap-2">
            {MATERIALS.map((mat) => (
              <button
                key={mat.id}
                type="button"
                onClick={() => setActiveMaterial(mat)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                  activeMaterial.id === mat.id
                    ? 'border-emerald-400 bg-emerald-500/10 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full border border-white/30 shadow-inner"
                  style={{ backgroundColor: `#${mat.color.toString(16).padStart(6, '0')}` }}
                />
                <span className="text-[10px] font-mono text-gray-300 truncate max-w-full">
                  {mat.name.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
