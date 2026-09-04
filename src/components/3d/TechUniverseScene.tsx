import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface TechUniverseSceneProps {
  activeCategory?: string;
}

export function TechUniverseScene({ activeCategory = 'all' }: TechUniverseSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    // 1. Central Core Node: "PIASH"
    const coreGeo = new THREE.DodecahedronGeometry(0.9, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.15
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    root.add(coreMesh);

    const coreWire = new THREE.Mesh(
      new THREE.DodecahedronGeometry(1.15, 1),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.4 })
    );
    coreMesh.add(coreWire);

    // 2. Six Planetary Category Satellites
    // CODE, DESIGN, DATABASE, NETWORK, SYSTEMS, WEB
    const categories = [
      { name: 'CODE', color: 0x38bdf8, radius: 2.5, angle: 0, speed: 0.4 },
      { name: 'DESIGN', color: 0xec4899, radius: 2.8, angle: 1.05, speed: 0.35 },
      { name: 'DATABASE', color: 0x10b981, radius: 2.3, angle: 2.1, speed: 0.45 },
      { name: 'NETWORK', color: 0x06b6d4, radius: 2.9, angle: 3.15, speed: 0.38 },
      { name: 'SYSTEMS', color: 0xa855f7, radius: 2.4, angle: 4.2, speed: 0.42 },
      { name: 'WEB', color: 0xf59e0b, radius: 2.7, angle: 5.25, speed: 0.36 }
    ];

    const satNodes: { mesh: THREE.Mesh; conf: typeof categories[0] }[] = [];
    const satGeo = new THREE.SphereGeometry(0.32, 20, 20);

    // Orbital Rings
    categories.forEach((cat) => {
      const ringGeo = new THREE.TorusGeometry(cat.radius, 0.008, 6, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: cat.color, transparent: true, opacity: 0.2 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.3 + (cat.radius % 0.3);
      root.add(ring);

      const mat = new THREE.MeshStandardMaterial({
        color: cat.color,
        emissive: cat.color,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.8
      });
      const node = new THREE.Mesh(satGeo, mat);
      root.add(node);
      satNodes.push({ mesh: node, conf: cat });

      // Connecting energy beam to central PIASH core
      const beamMat = new THREE.LineBasicMaterial({ color: cat.color, transparent: true, opacity: 0.25 });
      const beamPts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(cat.radius, 0, 0)];
      const beam = new THREE.Line(new THREE.BufferGeometry().setFromPoints(beamPts), beamMat);
      root.add(beam);
    });

    // Particle Cloud around universe
    const pCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      const r = 1.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      pPos[i] = r * Math.cos(theta) * Math.cos(phi);
      pPos[i + 1] = r * Math.sin(phi);
      pPos[i + 2] = r * Math.sin(theta) * Math.cos(phi);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.035, color: 0x38bdf8, transparent: true, opacity: 0.6 });
    const pField = new THREE.Points(pGeo, pMat);
    root.add(pField);

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(amb);
    const d1 = new THREE.DirectionalLight(0x38bdf8, 2);
    d1.position.set(4, 5, 4);
    scene.add(d1);

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

      // Rotate core PIASH
      coreMesh.rotation.y = time * 0.4;
      coreMesh.rotation.x = time * 0.2;
      const corePulse = 1 + Math.sin(time * 3) * 0.05;
      coreMesh.scale.set(corePulse, corePulse, corePulse);

      // Orbit satellites
      satNodes.forEach(({ mesh, conf }) => {
        const curAngle = conf.angle + time * conf.speed * 0.4;
        mesh.position.x = Math.cos(curAngle) * conf.radius;
        mesh.position.z = Math.sin(curAngle) * conf.radius;
        mesh.position.y = Math.sin(time * 1.5 + conf.radius) * 0.4;
      });

      // Universe slow precession
      root.rotation.y = time * 0.08;

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
      coreGeo.dispose();
      coreMat.dispose();
      satGeo.dispose();
      pGeo.dispose();
      pMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[450px] rounded-2xl bg-zinc-950/40 border border-white/5 backdrop-blur-sm overflow-hidden flex items-center justify-center"
      aria-hidden="true"
    />
  );
}
