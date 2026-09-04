import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroSceneProps {
  scrollProgress?: number;
}

export function HeroScene({ scrollProgress = 0 }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05060a, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Central Metallic Polyhedron Core ("Digital Core")
    const coreGeo = new THREE.IcosahedronGeometry(1.3, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x111c2e,
      metalness: 0.95,
      roughness: 0.15,
      wireframe: false,
      flatShading: true
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 2. Outer Wireframe Cage ("Design Architecture")
    const wireGeo = new THREE.IcosahedronGeometry(1.65, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    rootGroup.add(wireMesh);

    // 3. Inner Glowing Pulsing Energy Core ("Code Engine")
    const innerGeo = new THREE.OctahedronGeometry(0.7, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    rootGroup.add(innerMesh);

    // 4. Orbiting Technical Rings ("Technology Systems")
    const ringGroup = new THREE.Group();
    rootGroup.add(ringGroup);

    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.015, 8, 64), ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.012, 8, 64), ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    ringGroup.add(ring2);

    // 5. Floating Code & UI Satellites / Nodes
    const satelliteGroup = new THREE.Group();
    rootGroup.add(satelliteGroup);

    const satellites: THREE.Mesh[] = [];
    const satCount = 8;
    const satGeo = new THREE.BoxGeometry(0.22, 0.14, 0.04);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x0284c7,
      emissiveIntensity: 0.3
    });

    for (let i = 0; i < satCount; i++) {
      const angle = (i / satCount) * Math.PI * 2;
      const radius = 2.2 + (i % 2) * 0.5;
      const sat = new THREE.Mesh(satGeo, satMat);
      sat.position.set(
        Math.cos(angle) * radius,
        (Math.sin(i * 1.5) * 0.8),
        Math.sin(angle) * radius
      );
      sat.rotation.y = -angle;
      satelliteGroup.add(sat);
      satellites.push(sat);
    }

    // 6. Glowing Particles Field (Cosmic Tech Dust)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 12;
      posArray[i + 1] = (Math.random() - 0.5) * 12;
      posArray[i + 2] = (Math.random() - 0.5) * 10;

      // Cyan to soft purple
      if (Math.random() > 0.4) {
        colorArray[i] = 0.02; // R
        colorArray[i + 1] = 0.7; // G
        colorArray[i + 2] = 0.9; // B
      } else {
        colorArray[i] = 0.5;
        colorArray[i + 1] = 0.4;
        colorArray[i + 2] = 0.95;
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight1.position.set(5, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 2.0);
    dirLight2.position.set(-5, -4, -2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x06b6d4, 3, 8);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Mouse Interaction Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x;
      targetMouseY = y;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Scroll Progress Transformation
      const progress = scrollRef.current;
      // As user scrolls:
      // - camera moves closer
      // - object rotates and components separate (exploded mechanical view)
      // - satellites expand outwards
      const explosionOffset = progress * 1.8;
      wireMesh.scale.setScalar(1 + progress * 0.9);
      coreMesh.rotation.y = elapsedTime * 0.3 + mouseX * 0.6 + progress * 2.5;
      coreMesh.rotation.x = elapsedTime * 0.15 + mouseY * 0.4 + progress * 1.2;

      innerMesh.rotation.y = -elapsedTime * 0.5 - progress * 3;
      const pulse = 1 + Math.sin(elapsedTime * 3) * 0.08;
      innerMesh.scale.set(pulse, pulse, pulse);

      wireMesh.rotation.y = -elapsedTime * 0.2 + mouseX * 0.3;
      wireMesh.rotation.z = elapsedTime * 0.1;

      ringGroup.rotation.z = elapsedTime * 0.15 + progress * 2;
      ringGroup.rotation.x = Math.PI / 4 + mouseY * 0.2;

      // Orbit satellites & expand with scroll
      satellites.forEach((sat, idx) => {
        const baseAngle = (idx / satCount) * Math.PI * 2 + elapsedTime * 0.4;
        const currentRadius = 2.2 + explosionOffset + (idx % 2) * 0.4;
        sat.position.x = Math.cos(baseAngle) * currentRadius;
        sat.position.z = Math.sin(baseAngle) * currentRadius;
        sat.position.y = Math.sin(elapsedTime + idx) * 0.5 + (idx % 2 === 0 ? 0.3 : -0.3);
        sat.rotation.y = -baseAngle;
      });

      // Particle rotation
      particleField.rotation.y = elapsedTime * 0.03;
      particleField.rotation.x = elapsedTime * 0.015;

      // Camera lerp based on scroll & mouse
      const targetCamZ = 7.5 - progress * 2.8;
      camera.position.z += (targetCamZ - camera.position.z) * 0.08;
      camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.8 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      satGeo.dispose();
      satMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-full w-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
