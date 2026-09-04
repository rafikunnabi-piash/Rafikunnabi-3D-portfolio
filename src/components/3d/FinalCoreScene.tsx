import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function FinalCoreScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDeconstructed, setIsDeconstructed] = useState(false);

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

    // Evolved Crystalline Structure (Gold + Titanium + Cyan)
    const geo = new THREE.IcosahedronGeometry(1.4, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.95,
      roughness: 0.1,
      wireframe: false,
      flatShading: true
    });
    const mainCore = new THREE.Mesh(geo, mat);
    root.add(mainCore);

    // Wireframe Cage with intense cyan glow
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.8, 1),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.45 })
    );
    mainCore.add(wire);

    // 5 Dimensional Shards: CODE, DESIGN, NETWORK, SYSTEM, IDEA
    const shards: THREE.Mesh[] = [];
    const shardGeo = new THREE.TetrahedronGeometry(0.5, 0);
    const shardColors = [0x38bdf8, 0xec4899, 0x06b6d4, 0xa855f7, 0x10b981];

    for (let i = 0; i < 5; i++) {
      const sMat = new THREE.MeshStandardMaterial({
        color: shardColors[i],
        emissive: shardColors[i],
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.9
      });
      const shard = new THREE.Mesh(shardGeo, sMat);
      root.add(shard);
      shards.push(shard);
    }

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(amb);
    const p1 = new THREE.PointLight(0x38bdf8, 3, 10);
    p1.position.set(0, 0, 0);
    scene.add(p1);
    const d1 = new THREE.DirectionalLight(0xffffff, 1.5);
    d1.position.set(4, 5, 3);
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

      // Rotation
      mainCore.rotation.y = time * 0.35;
      mainCore.rotation.x = time * 0.2;

      // Shard dynamics: orbit or expand
      shards.forEach((s, idx) => {
        const baseAngle = (idx / 5) * Math.PI * 2 + time * 0.5;
        const radius = 2.4 + Math.sin(time * 2 + idx) * 0.3;
        s.position.x = Math.cos(baseAngle) * radius;
        s.position.z = Math.sin(baseAngle) * radius;
        s.position.y = Math.sin(time * 2 + idx * 1.2) * 0.7;
        s.rotation.x = time * 1.2;
        s.rotation.y = time * 0.8;
      });

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
      geo.dispose();
      mat.dispose();
      shardGeo.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] flex items-center justify-center">
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
}
