import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Globe, Zap, Radio, Server, ShieldCheck } from 'lucide-react';

const GLOBAL_NODES = [
  { city: 'Mumbai (Core Hub)', lat: 19.076, lon: 72.877, ping: '4ms', status: 'Primary Host' },
  { city: 'Dubai (GCC NRI)', lat: 25.204, lon: 55.27, ping: '24ms', status: 'Edge Accelerated' },
  { city: 'London (UK NRI)', lat: 51.507, lon: -0.127, ping: '38ms', status: 'Edge Accelerated' },
  { city: 'Singapore (APAC)', lat: 1.352, lon: 103.819, ping: '31ms', status: 'Edge Accelerated' },
  { city: 'New York (US NRI)', lat: 40.712, lon: -74.006, ping: '68ms', status: 'Global CDN' },
];

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export default function ThreeGlobalCloudGlobe() {
  const mountRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(GLOBAL_NODES[0]);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const globeGroupRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 350;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x22c55e, 2.5);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    const blueLight = new THREE.DirectionalLight(0x38bdf8, 2);
    blueLight.position.set(-5, -3, -5);
    scene.add(blueLight);

    // Globe Group
    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    scene.add(globeGroup);

    const radius = 1.7;

    // 1. Core Sphere
    const sphereGeo = new THREE.SphereGeometry(radius, 48, 48);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x05050a,
      roughness: 0.9,
      metalness: 0.1,
    });
    const globe = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(globe);

    // 2. Wireframe / Latitude lines
    const wireGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(radius + 0.01, 24, 24));
    const wireMat = new THREE.LineBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.18 });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // 3. Atmosphere halo
    const haloGeo = new THREE.RingGeometry(radius + 0.1, radius + 0.35, 64);
    const haloMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.15, side: THREE.DoubleSide });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    scene.add(halo);

    // 4. Nodes and Connecting Arcs
    const hubPos = latLonToVector3(GLOBAL_NODES[0].lat, GLOBAL_NODES[0].lon, radius + 0.03);

    GLOBAL_NODES.forEach((node, i) => {
      const pos = latLonToVector3(node.lat, node.lon, radius + 0.03);

      // Pin mesh
      const pinGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const pinMat = new THREE.MeshBasicMaterial({ color: i === 0 ? 0x22c55e : 0x38bdf8 });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(pos);
      globeGroup.add(pin);

      // Arc connecting to Mumbai Hub
      if (i > 0) {
        const mid = pos.clone().add(hubPos).multiplyScalar(0.5);
        mid.normalize().multiplyScalar(radius * 1.35); // arc curvature
        const curve = new THREE.QuadraticBezierCurve3(hubPos, mid, pos);
        const points = curve.getPoints(30);
        const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
        const arcMat = new THREE.LineBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.5 });
        const arcLine = new THREE.Line(arcGeo, arcMat);
        globeGroup.add(arcLine);
      }
    });

    // Animate
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      globeGroup.rotation.y += 0.003;
      halo.rotation.z += 0.002;
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

  return (
    <div className="relative w-full h-full min-h-[460px] rounded-3xl overflow-hidden border border-white/10 bg-[#08080c] shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col justify-between p-6">
      <div ref={mountRef} className="absolute inset-0 select-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full luxury-glass border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <Globe className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
          <span>3D GLOBAL WEBGPU STREAMING NODES</span>
        </div>
        <div className="px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
          &lt; 35ms LATENCY
        </div>
      </div>

      {/* Bottom Node Inspector */}
      <div className="relative z-10 mt-auto pt-6">
        <div className="p-4 rounded-2xl luxury-glass border border-white/15 backdrop-blur-2xl">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2 flex items-center justify-between">
            <span>Global Edge POPs</span>
            <span className="text-gray-400">Zero App Installation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {GLOBAL_NODES.map((node) => (
              <button
                key={node.city}
                type="button"
                onClick={() => setSelectedNode(node)}
                className={`flex items-center justify-between p-2 rounded-xl border text-xs font-mono transition-all ${
                  selectedNode.city === node.city
                    ? 'border-emerald-400 bg-emerald-500/10 text-white'
                    : 'border-white/5 bg-white/[0.02] text-gray-400 hover:text-white'
                }`}
              >
                <span>{node.city.split(' ')[0]}</span>
                <span className="text-emerald-400 font-bold">{node.ping}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
