import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ProjectsStageProps {
  activeProjectIndex: number;
}

export function ProjectsStage({ activeProjectIndex }: ProjectsStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(activeProjectIndex);
  activeIdxRef.current = activeProjectIndex;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root Group with sub-groups for all 6 projects
    const root = new THREE.Group();
    scene.add(root);

    // Project Groups
    const pGroups: THREE.Group[] = [];

    // ==========================================
    // 0. AGRIFARM (Marketplace & Bidding nodes)
    // ==========================================
    const g0 = new THREE.Group();
    pGroups.push(g0);
    root.add(g0);

    // Hexagonal lattice floor
    const hexFloorGeo = new THREE.CylinderGeometry(2.4, 2.4, 0.1, 6);
    const hexFloorMat = new THREE.MeshStandardMaterial({
      color: 0x052e16,
      metalness: 0.8,
      roughness: 0.3,
      wireframe: true
    });
    const hexFloor = new THREE.Mesh(hexFloorGeo, hexFloorMat);
    hexFloor.rotation.x = Math.PI / 4;
    g0.add(hexFloor);

    // Farmer and Buyer Pillar Nodes
    const nodeG = new THREE.BoxGeometry(0.5, 1.2, 0.5);
    const nodeM1 = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x059669, emissiveIntensity: 0.6 });
    const nodeM2 = new THREE.MeshStandardMaterial({ color: 0x34d399, emissive: 0x10b981, emissiveIntensity: 0.4 });

    const farmerNode = new THREE.Mesh(nodeG, nodeM1);
    farmerNode.position.set(-1.8, 0.2, 0);
    g0.add(farmerNode);

    const buyerNode = new THREE.Mesh(nodeG, nodeM2);
    buyerNode.position.set(1.8, -0.2, 0);
    g0.add(buyerNode);

    // Central Bidding Holo-Cube
    const bidCubeGeo = new THREE.OctahedronGeometry(0.8, 0);
    const bidCubeMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      wireframe: true,
      emissive: 0x10b981,
      emissiveIntensity: 0.8
    });
    const bidCube = new THREE.Mesh(bidCubeGeo, bidCubeMat);
    g0.add(bidCube);

    // Dynamic Bidding Arc Lines
    const arcPoints = [
      new THREE.Vector3(-1.8, 0.8, 0),
      new THREE.Vector3(0, 1.5, 0.5),
      new THREE.Vector3(1.8, 0.4, 0)
    ];
    const curve = new THREE.CatmullRomCurve3(arcPoints);
    const arcGeo = new THREE.TubeGeometry(curve, 32, 0.03, 8, false);
    const arcMat = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.7 });
    const arcMesh = new THREE.Mesh(arcGeo, arcMat);
    g0.add(arcMesh);

    // ==========================================
    // 1. AI TRIP PLANNER (3D Wireframe Globe & Flight Arcs)
    // ==========================================
    const g1 = new THREE.Group();
    pGroups.push(g1);
    root.add(g1);

    // Wireframe Globe
    const globeGeo = new THREE.SphereGeometry(1.8, 28, 28);
    const globeMat = new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      metalness: 0.9
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    g1.add(globe);

    // Inner glowing planet core
    const innerPlanet = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, emissive: 0x0284c7, emissiveIntensity: 0.4, roughness: 0.3 })
    );
    g1.add(innerPlanet);

    // Flight Arcs
    const flightArc1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.02, 8, 64, Math.PI * 0.8),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    flightArc1.rotation.x = Math.PI / 3;
    flightArc1.rotation.y = Math.PI / 4;
    g1.add(flightArc1);

    const flightArc2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.0, 0.015, 8, 64, Math.PI * 0.9),
      new THREE.MeshBasicMaterial({ color: 0x7dd3fc })
    );
    flightArc2.rotation.z = Math.PI / 3;
    flightArc2.rotation.x = -Math.PI / 6;
    g1.add(flightArc2);

    // Destination Beacon Pins
    const pinGeo = new THREE.ConeGeometry(0.12, 0.4, 8);
    const pinMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const pin1 = new THREE.Mesh(pinGeo, pinMat);
    pin1.position.set(1.2, 1.1, 0.8);
    pin1.rotation.x = Math.PI;
    g1.add(pin1);

    const pin2 = new THREE.Mesh(pinGeo, pinMat);
    pin2.position.set(-1.0, 0.6, 1.4);
    pin2.rotation.z = Math.PI / 4;
    g1.add(pin2);

    // ==========================================
    // 2. PORTFOLIO WEBSITE ("Portfolio inside Portfolio")
    // ==========================================
    const g2 = new THREE.Group();
    pGroups.push(g2);
    root.add(g2);

    // Floating recursive screen viewports
    const screenGeo = new THREE.PlaneGeometry(3.2, 2.0);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      metalness: 0.8,
      roughness: 0.2,
      side: THREE.DoubleSide
    });
    const mainScreen = new THREE.Mesh(screenGeo, screenMat);
    g2.add(mainScreen);

    // Screen frame border
    const borderGeo = new THREE.EdgesGeometry(screenGeo);
    const borderMat = new THREE.LineBasicMaterial({ color: 0xa855f7, linewidth: 2 });
    const screenBorder = new THREE.LineSegments(borderGeo, borderMat);
    mainScreen.add(screenBorder);

    // Miniature inner recursive screen
    const subScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.6, 1.0),
      new THREE.MeshStandardMaterial({ color: 0x3b0764, metalness: 0.9, roughness: 0.1, side: THREE.DoubleSide })
    );
    subScreen.position.set(0.6, -0.2, 0.4);
    subScreen.rotation.y = -0.2;
    g2.add(subScreen);

    const subBorder = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.6, 1.0)), new THREE.LineBasicMaterial({ color: 0xc084fc }));
    subScreen.add(subBorder);

    // Orbiting UI window cards
    const miniCardGeo = new THREE.BoxGeometry(0.6, 0.4, 0.05);
    const miniCardMat = new THREE.MeshStandardMaterial({ color: 0x581c87, emissive: 0xa855f7, emissiveIntensity: 0.3 });
    const card1 = new THREE.Mesh(miniCardGeo, miniCardMat);
    card1.position.set(-1.4, 0.7, 0.6);
    g2.add(card1);

    // ==========================================
    // 3. NIGHTFLIX (Cinematic Movie Wall Environment)
    // ==========================================
    const g3 = new THREE.Group();
    pGroups.push(g3);
    root.add(g3);

    // Floating Cinema Poster Slabs
    const posterGeo = new THREE.BoxGeometry(1.1, 1.7, 0.08);
    const posterColors = [0x9f1239, 0x881337, 0x4c0519, 0xbe123c, 0xe11d48];

    const posterMeshes: THREE.Mesh[] = [];
    for (let i = -2; i <= 2; i++) {
      const pMat = new THREE.MeshStandardMaterial({
        color: posterColors[i + 2],
        roughness: 0.2,
        metalness: 0.7,
        emissive: 0xf43f5e,
        emissiveIntensity: i === 0 ? 0.4 : 0.1
      });
      const pMesh = new THREE.Mesh(posterGeo, pMat);
      pMesh.position.set(i * 1.35, 0, -Math.abs(i) * 0.7);
      pMesh.rotation.y = -i * 0.25;
      g3.add(pMesh);
      posterMeshes.push(pMesh);
    }

    // Overhead cinema spotlight
    const cinemaLight = new THREE.SpotLight(0xf43f5e, 5, 10, Math.PI / 4, 0.5);
    cinemaLight.position.set(0, 3, 2);
    g3.add(cinemaLight);

    // ==========================================
    // 4. WEATHER DASHBOARD (3D Atmospheric Chamber)
    // ==========================================
    const g4 = new THREE.Group();
    pGroups.push(g4);
    root.add(g4);

    // Isobar rings
    for (let r = 0; r < 4; r++) {
      const isoRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.2 + r * 0.5, 0.015, 6, 48),
        new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.35 })
      );
      isoRing.rotation.x = Math.PI / 2.3;
      isoRing.position.y = (r - 1.5) * 0.3;
      g4.add(isoRing);
    }

    // Weather particles / clouds
    const cloudGeo = new THREE.DodecahedronGeometry(0.45, 1);
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      roughness: 0.8,
      transparent: true,
      opacity: 0.7
    });

    for (let c = 0; c < 5; c++) {
      const cloud = new THREE.Mesh(cloudGeo, cloudMat);
      cloud.position.set(
        Math.sin(c * 1.3) * 1.8,
        0.5 + Math.cos(c * 1.8) * 0.6,
        Math.cos(c * 1.3) * 1.2
      );
      g4.add(cloud);
    }

    // Sun / Thermal Core
    const sunCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x06b6d4, emissiveIntensity: 0.9 })
    );
    g4.add(sunCore);

    // ==========================================
    // 5. X-RIDE (Miniature Neon 3D City & Mobility Routes)
    // ==========================================
    const g5 = new THREE.Group();
    pGroups.push(g5);
    root.add(g5);

    // City grid base
    const cityBase = new THREE.Mesh(
      new THREE.PlaneGeometry(4.5, 4.5),
      new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.9, roughness: 0.2 })
    );
    cityBase.rotation.x = -Math.PI / 2.8;
    g5.add(cityBase);

    // Isometric skyscraper blocks
    const bGeo = new THREE.BoxGeometry(0.35, 1.4, 0.35);
    const bMat = new THREE.MeshStandardMaterial({ color: 0x27272a, metalness: 0.7, roughness: 0.3 });

    for (let x = -3; x <= 3; x += 2) {
      for (let z = -2; z <= 2; z += 2) {
        if (x === 0 && z === 0) continue;
        const b = new THREE.Mesh(bGeo, bMat);
        const h = 0.6 + Math.random() * 0.9;
        b.scale.y = h;
        b.position.set(x * 0.65, h * 0.7 - 0.5, z * 0.65 - 0.4);
        g5.add(b);
      }
    }

    // Glowing illuminated route tracks
    const routeMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 });
    const routePts = [
      new THREE.Vector3(-1.8, -0.4, 1.0),
      new THREE.Vector3(-0.4, -0.4, 0.8),
      new THREE.Vector3(0.6, -0.4, -0.5),
      new THREE.Vector3(1.8, -0.4, -0.8)
    ];
    const routeLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(routePts), routeMat);
    g5.add(routeLine);

    // Autonomous vehicle beacon
    const carBeacon = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.1, 0.12),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.8 })
    );
    g5.add(carBeacon);

    // Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(amb);
    const mainDir = new THREE.DirectionalLight(0xffffff, 1.8);
    mainDir.position.set(5, 6, 5);
    scene.add(mainDir);

    // Resize
    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const currentIdx = activeIdxRef.current;

      // Animate active group visibility and transition
      pGroups.forEach((grp, idx) => {
        const isActive = idx === currentIdx;
        const targetScale = isActive ? 1 : 0.001;
        grp.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        grp.visible = grp.scale.x > 0.05;
      });

      // Specific Object Animations
      // 0. Agrifarm: bid cube rotation and farmer/buyer pulse
      bidCube.rotation.y = time * 0.8;
      bidCube.rotation.x = time * 0.4;
      farmerNode.position.y = 0.2 + Math.sin(time * 2) * 0.1;
      buyerNode.position.y = -0.2 - Math.sin(time * 2) * 0.1;

      // 1. Globe: slow axial rotation
      globe.rotation.y = time * 0.25;
      innerPlanet.rotation.y = -time * 0.15;
      flightArc1.rotation.z = time * 0.4;

      // 2. Portfolio: gentle floating tilt
      mainScreen.rotation.y = Math.sin(time * 0.6) * 0.15;
      mainScreen.rotation.x = Math.cos(time * 0.5) * 0.08;
      subScreen.rotation.y = -0.2 + Math.sin(time * 0.8) * 0.1;

      // 3. Nightflix: subtle wave along poster wall
      posterMeshes.forEach((p, idx) => {
        p.position.y = Math.sin(time * 1.5 + idx * 0.8) * 0.12;
      });

      // 4. Weather: clouds drift, thermal pulse
      sunCore.scale.setScalar(1 + Math.sin(time * 2) * 0.08);

      // 5. X-Ride: vehicle runs along track
      const tNorm = (time * 0.5) % 1;
      carBeacon.position.x = -1.8 + tNorm * 3.6;
      carBeacon.position.z = 1.0 - tNorm * 1.8;
      carBeacon.position.y = -0.35 + Math.sin(time * 10) * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      // Dispose materials & geometries
      hexFloorGeo.dispose();
      hexFloorMat.dispose();
      nodeG.dispose();
      nodeM1.dispose();
      nodeM2.dispose();
      bidCubeGeo.dispose();
      bidCubeMat.dispose();
      globeGeo.dispose();
      globeMat.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      posterGeo.dispose();
      bGeo.dispose();
      bMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[480px] rounded-2xl bg-zinc-950/40 border border-white/5 backdrop-blur-sm overflow-hidden flex items-center justify-center"
      aria-hidden="true"
    />
  );
}
