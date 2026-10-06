// Catalog of the 50 3D Spatial Elements engineered into Flik Explorer

export const SPATIAL_3D_ELEMENTS = [
  // Category 1: Real-Time WebGL & Three.js 3D Canvases (12 elements)
  { id: 1, name: "Interactive 3D Architectural Tower", cat: "WebGL Engine", tech: "Three.js / MeshStandard", desc: "Procedural skyscraper with illuminated floor slabs and 360° orbit drag." },
  { id: 2, name: "3D Apartment Floor Plan Extrusion", cat: "WebGL Engine", tech: "Three.js ExtrudeGeometry", desc: "3D extruded rooms with walls, doors, balcony vistas, and clickable zones." },
  { id: 3, name: "Dynamic 3D Sun Position & Daylight Dial", cat: "WebGL Engine", tech: "DirectionalLight / PCFSoftShadow", desc: "Real-time solar arc calculating azimuth, elevation, and dynamic shadow cast." },
  { id: 4, name: "3D Orientation Compass & Gyro", cat: "WebGL Engine", tech: "Three.js Torus/Ring", desc: "Real-time compass rose aligning with project north/east/west orientation." },
  { id: 5, name: "3D Volumetric Depth Particle Field", cat: "WebGL Engine", tech: "BufferGeometry Points", desc: "Ambient floating nanite dust particles responding to mouse parallax." },
  { id: 6, name: "3D Physical Material Shader Sphere", cat: "WebGL Engine", tech: "MeshPhysicalMaterial", desc: "Statuario marble, brass, and oak with specular reflection & roughness probes." },
  { id: 7, name: "3D Camera Viewport Frustum Cone", cat: "WebGL Engine", tech: "ConeGeometry Frustum", desc: "Sightline visualizer showing 18mm wide vs 50mm portrait balcony view angles." },
  { id: 8, name: "3D Sightline Horizon Curvature", cat: "WebGL Engine", tech: "FogExp2 Depth Shader", desc: "Atmospheric depth curve indicating altitude from ground to +142m MSL." },
  { id: 9, name: "3D Binaural Acoustic Waveform Sphere", cat: "WebGL Engine", tech: "Icosahedron Wireframe", desc: "Oscillating acoustic wireframe mesh simulating 3D spatial sound propagation." },
  { id: 10, name: "3D Nanite Structural Lattice", cat: "WebGL Engine", tech: "BoxGeometry Wireframe", desc: "Procedural wireframe envelope demonstrating Level-of-Detail geometry." },
  { id: 11, name: "3D Holographic Project Plinth", cat: "WebGL Engine", tech: "RingGeometry Radial", desc: "Floating architectural podium with glowing emerald contour rings." },
  { id: 12, name: "3D Indirect Lumen Bounce Simulator", cat: "WebGL Engine", tech: "Raycaster / PointLight", desc: "Simulated global illumination rays bouncing between ceiling, walls, and floor." },

  // Category 2: 3D Spatial UI & Holographic HUD Elements (14 elements)
  { id: 13, name: "3D Elevation Tower HUD (Floors 01-72)", cat: "Spatial HUD", tech: "CSS 3D Preserve-3D", desc: "Floating vertical elevator slider with live altitude and floor telemetry." },
  { id: 14, name: "3D Spatial Hotspot Pins", cat: "Spatial HUD", tech: "Vector3 Unproject", desc: "Pulsing coordinate pins with depth displacement indicating key viewpoints." },
  { id: 15, name: "3D Gyroscopic Perspective Tilt Cards", cat: "Spatial UI", tech: "perspective(1200px) rotateX/Y", desc: "Cards tracking cursor 3D pitch/roll with dynamic specular gloss glare." },
  { id: 16, name: "3D Architectural Cutaway Layer Stack", cat: "Spatial UI", tech: "TranslateZ Layering", desc: "Isometric stack: Foundation -> Core Structure -> MEP -> Interior Fitout." },
  { id: 17, name: "3D Glassmorphic Floating HUD Console", cat: "Spatial HUD", tech: "Backdrop Filter / Z-Index", desc: "Multi-layer glass console tracking real-time GPU stream and memory status." },
  { id: 18, name: "3D Depth Gyro Badge", cat: "Spatial UI", tech: "Rotate3d Animation", desc: "Holographic chip rotating in 3D on hover with metallic emerald shine." },
  { id: 19, name: "3D Spatial Caliper / Dimension Ruler", cat: "Spatial UI", tech: "SVG 3D Matrix", desc: "Floating dimension lines measuring carpet area, 11.5ft ceiling, & balcony depth." },
  { id: 20, name: "3D Live Inventory Voxel Tower Stacker", cat: "Spatial UI", tech: "CSS 3D Voxel Grid", desc: "Interactive unit blocks color-coded by available, reserved, and sold status." },
  { id: 21, name: "3D Unit Configurator Flipping Tabs", cat: "Spatial UI", tech: "RotateY(180deg) Transition", desc: "Perspective flip switches between 3 BHK Penthouse, Sky Villa, & Presidential." },
  { id: 22, name: "3D Spherical Time-of-Day Globe", cat: "Spatial HUD", tech: "Radial Gradient 3D", desc: "Interactive celestial sphere showing Sunrise, Midday, Golden Hour, & Midnight." },
  { id: 23, name: "3D Spatial Headset Viewport Frame", cat: "Spatial UI", tech: "Perspective Mesh Border", desc: "Floating Vision Pro / Meta Quest spatial goggles frame for WebGPU stream." },
  { id: 24, name: "3D Equalizer Depth Sound Array", cat: "Spatial HUD", tech: "CSS 3D Bar Array", desc: "Multi-channel spatial audio bars oscillating along the z-axis." },
  { id: 25, name: "3D Interactive ROI Prism", cat: "Spatial UI", tech: "CSS 3D Polyhedron", desc: "Geometric rotating prism displaying ₹4.2 Cr physical vs ₹18 Lakh Flik savings." },
  { id: 26, name: "3D Floating Metric Depth Cubes", cat: "Spatial UI", tech: "Transform3d Multi-face", desc: "Depth-layered stat cubes showing 0ms lag, 99.4% NRI trust, & 14-day turnaround." },

  // Category 3: 3D Interactive Controls & Tactile Spatial Widgets (12 elements)
  { id: 27, name: "3D Orbital Rotation Drag Pad", cat: "Tactile Control", tech: "PointerEvent / Matrix4", desc: "Trackpad surface enabling full 360-degree rotational orbit." },
  { id: 28, name: "3D Zoom / FOV Spatial Stepper", cat: "Tactile Control", tech: "Wheel Event / Vector3.lerp", desc: "Camera dolly-in and dolly-out stepper controls with physical button press depth." },
  { id: 29, name: "3D Exploded-View Floor Plate Slider", cat: "Tactile Control", tech: "TranslateY Stacking", desc: "Interactive slider separating the building into individual floating floor plates." },
  { id: 30, name: "3D Section-Plane Cutting Slice Controller", cat: "Tactile Control", tech: "ClippingPlanes WebGL", desc: "Horizontal and vertical cutting planes slicing through architectural layouts." },
  { id: 31, name: "3D Wireframe / Photoreal Shaded Switch", cat: "Tactile Control", tech: "Material.wireframe toggle", desc: "Tactile toggle flipping between CAD wireframe mode and photoreal shaded mode." },
  { id: 32, name: "3D Balcony Sightline Angle Gauge", cat: "Tactile Control", tech: "Rotational Dial 3D", desc: "Dial measuring 270° unobstructed panoramic horizon sightlines." },
  { id: 33, name: "3D Lighting Mood Preset Switches", cat: "Tactile Control", tech: "3D Beveled Buttons", desc: "Recessed buttons switching between Sunrise, Noon, Golden Hour, and Twilight." },
  { id: 34, name: "3D Tactile Material Swatch Selector", cat: "Tactile Control", tech: "CSS 3D Metallic Bevel", desc: "Floating 3D discs with metallic bevels for flooring, veneers, and fixtures." },
  { id: 35, name: "3D Spatial Acoustic Toggle", cat: "Tactile Control", tech: "AudioContext SpatialPanner", desc: "3D switch activating room-impulse reverberation for virtual walkthroughs." },
  { id: 36, name: "3D Live Walkthrough Portal Gateway", cat: "Tactile Control", tech: "Perspective Tunnel Warp", desc: "Floating interactive gateway leading directly into the live Coohom 360° twin." },
  { id: 37, name: "3D Metric Comparison Curtain", cat: "Tactile Control", tech: "Split-plane 3D Shear", desc: "Interactive swipe curtain revealing Physical Sample Flat vs Flik Digital Twin." },
  { id: 38, name: "3D Capital Savings Dial", cat: "Tactile Control", tech: "SVG Circular 3D Gauge", desc: "Dynamic gauge tracking developer capital savings in Crores." },

  // Category 4: 3D Ambient & Scroll-Linked Spatial Environments (12 elements)
  { id: 39, name: "3D Scroll Parallax Depth Camera", cat: "Environment", tech: "Window.scrollY / Parallax", desc: "Multi-layered depth camera subtly pitching and panning with user scroll." },
  { id: 40, name: "3D Polygonal Terrain Wireframe Curtain", cat: "Environment", tech: "Perlin Noise / Mesh", desc: "Floating geometric terrain undulating in response to mouse movement." },
  { id: 41, name: "3D Volumetric Light Shafts & Mist", cat: "Environment", tech: "Radial Conic CSS Shaders", desc: "Simulated architectural atmospheric light shafts across section transitions." },
  { id: 42, name: "3D Floating Mirrored Monoliths", cat: "Environment", tech: "Perspective Reflective Plate", desc: "Monoliths showcasing developer proof and enterprise trust indicators." },
  { id: 43, name: "3D Infinite Perspective Ground Grid", cat: "Environment", tech: "Three.js GridHelper", desc: "Grid receding into the dark horizon with glowing emerald coordinate markers." },
  { id: 44, name: "3D Holographic Blueprint Schematics", cat: "Environment", tech: "Vector Blueprint Layer", desc: "Semi-transparent architectural blueprint hovering above the floor plane." },
  { id: 45, name: "3D Hexagonal Nanite Shield Pattern", cat: "Environment", tech: "CSS 3D Hex Lattice", desc: "Floating hexagonal mesh behind technology benchmarks." },
  { id: 46, name: "3D Floating Architectural Framing Pillars", cat: "Environment", tech: "Transform3d Columns", desc: "Depth pillars framing enterprise capabilities with parallax separation." },
  { id: 47, name: "3D Cursor Depth Ring & Laser Pointer", cat: "Environment", tech: "CustomCursor 3D Parallax", desc: "Cursor with spatial z-axis trails and depth scaling based on target element." },
  { id: 48, name: "3D Perspective Fold FAQ Accordion Panels", cat: "Environment", tech: "RotateX(-15deg) Hinge", desc: "Accordion panels opening with a tactile 3D book-fold hinge animation." },
  { id: 49, name: "3D VIP Walkthrough Priority Keycard", cat: "Environment", tech: "3D Card Flip in Modal", desc: "Metallic holographic access keycard embedded in the Demo Request modal." },
  { id: 50, name: "3D Global Cloud Node Rotating Globe", cat: "Environment", tech: "Three.js QuadraticBezier", desc: "Rotating world globe with glowing cloud nodes showing <35ms latency to NRI buyers." }
];
