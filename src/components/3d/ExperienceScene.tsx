import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ExperienceSceneProps {
  mode?: 'network' | 'community';
}

export function ExperienceScene({ mode = 'network' }: ExperienceSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

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

    // Nodes Definition
    const networkNodes = [
      { id: 'workstations', name: 'Workstations & Printers', pos: [-3.2, 1.2, 0], color: 0x38bdf8, role: 'Hardware & OS Diagnostics' },
      { id: 'network', name: 'Wi-Fi / LAN Gateway', pos: [-1.4, -0.8, 0.6], color: 0x06b6d4, role: 'VLAN, Routers & Switching' },
      { id: 'cctv', name: 'CCTV Surveillance Matrix', pos: [0.3, 1.8, -0.4], color: 0x818cf8, role: 'NVR, IP Feeds & Maintenance' },
      { id: 'server', name: 'Medical Core Server', pos: [1.6, -0.4, 0.8], color: 0x10b981, role: 'Database Backups & Management Portals' },
      { id: 'users', name: 'Institute Staff & Students', pos: [3.4, 0.9, -0.2], color: 0xa855f7, role: 'User Accounts & Department Support' }
    ];

    const communityNodes = [
      { id: 'hub', name: 'Campus Tech Hub', pos: [0, 0, 0], color: 0xf59e0b, role: 'Programming Hero Ambassador Core' },
      { id: 'workshops', name: 'Coding Workshops', pos: [-2.4, 1.5, 0.5], color: 0x38bdf8, role: 'Hands-on Web Dev Sessions' },
      { id: 'hackathons', name: 'Student Hackathons', pos: [2.5, 1.3, -0.5], color: 0x10b981, role: 'Collaborative Problem Solving' },
      { id: 'mentorship', name: 'Peer Mentorship', pos: [-1.8, -1.6, -0.3], color: 0xa855f7, role: 'Guidance for Aspiring Coders' },
      { id: 'outreach', name: 'Brand & Event Socials', pos: [2.1, -1.5, 0.4], color: 0xec4899, role: 'Developer Ecosystem Evangelism' }
    ];

    const activeList = mode === 'network' ? networkNodes : communityNodes;

    // Node Meshes
    const nodeMeshes: THREE.Mesh[] = [];
    const nodeGeo = new THREE.SphereGeometry(0.38, 24, 24);
    const ringGeo = new THREE.TorusGeometry(0.55, 0.015, 8, 32);

    activeList.forEach((n) => {
      const group = new THREE.Group();
      group.position.set(n.pos[0], n.pos[1], n.pos[2]);

      const mat = new THREE.MeshStandardMaterial({
        color: n.color,
        emissive: n.color,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.8
      });
      const sphere = new THREE.Mesh(nodeGeo, mat);
      group.add(sphere);

      const ringMat = new THREE.MeshBasicMaterial({
        color: n.color,
        transparent: true,
        opacity: 0.4
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      root.add(group);
      nodeMeshes.push(sphere);
    });

    // Connecting Data Lines
    const lineMat = new THREE.LineBasicMaterial({
      color: mode === 'network' ? 0x06b6d4 : 0xf59e0b,
      transparent: true,
      opacity: 0.35
    });

    const connections: number[][] = mode === 'network'
      ? [[0, 1], [1, 2], [1, 3], [3, 4], [2, 3], [0, 4]]
      : [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [3, 4]];

    connections.forEach(([from, to]) => {
      const p1 = new THREE.Vector3(...activeList[from].pos);
      const p2 = new THREE.Vector3(...activeList[to].pos);
      const geom = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const line = new THREE.Line(geom, lineMat);
      root.add(line);
    });

    // Traveling Data Packets
    const packetCount = 8;
    const packetGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95
    });

    const packets: { mesh: THREE.Mesh; from: number; to: number; progress: number; speed: number }[] = [];
    for (let i = 0; i < packetCount; i++) {
      const conn = connections[i % connections.length];
      const mesh = new THREE.Mesh(packetGeo, packetMat);
      root.add(mesh);
      packets.push({
        mesh,
        from: conn[0],
        to: conn[1],
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.008
      });
    }

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const pointLight = new THREE.PointLight(0x38bdf8, 2, 15);
    pointLight.position.set(0, 3, 5);
    scene.add(pointLight);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    container.addEventListener('mousemove', handleMouseMove);

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

      root.rotation.y = Math.sin(time * 0.2) * 0.18 + mouseX * 0.25;
      root.rotation.x = Math.cos(time * 0.25) * 0.12 - mouseY * 0.2;

      // Pulse nodes
      nodeMeshes.forEach((mesh, idx) => {
        const s = 1 + Math.sin(time * 2.5 + idx) * 0.07;
        mesh.scale.set(s, s, s);
      });

      // Update Packets
      packets.forEach((pkt) => {
        pkt.progress += pkt.speed;
        if (pkt.progress > 1) pkt.progress = 0;

        const p1 = activeList[pkt.from].pos;
        const p2 = activeList[pkt.to].pos;

        pkt.mesh.position.x = p1[0] + (p2[0] - p1[0]) * pkt.progress;
        pkt.mesh.position.y = p1[1] + (p2[1] - p1[1]) * pkt.progress;
        pkt.mesh.position.z = p1[2] + (p2[2] - p1[2]) * pkt.progress;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      ro.disconnect();
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      nodeGeo.dispose();
      ringGeo.dispose();
      packetGeo.dispose();
      packetMat.dispose();
      lineMat.dispose();
    };
  }, [mode]);

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl bg-zinc-950/60 border border-white/5 backdrop-blur-md overflow-hidden flex items-center justify-center">
      {/* 3D Canvas */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Futuristic HUD overlay */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-mono-tech text-[10px] text-zinc-400 tracking-wider uppercase">
          {mode === 'network' ? 'SYS_TOPOLOGY // NURJAHAN IT CLUSTER' : 'COMMUNITY_GRAPH // PROGRAMMING HERO'}
        </span>
      </div>

      {/* Active telemetry tag */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap justify-between items-center text-[10px] font-mono-tech text-zinc-400 border-t border-white/5 pt-2.5 pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="text-cyan-300">● 5 TOPOLOGY NODES ACTIVE</span>
          <span className="text-emerald-400">● 99.8% UPTIME PIPELINE</span>
        </div>
        <span className="text-zinc-500 hidden sm:inline">ROTATE 3D / HOVER TO EXPLORE</span>
      </div>
    </div>
  );
}
