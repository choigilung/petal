import { Suspense, useMemo, useRef } from 'react';
import type { PointerEvent, RefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export interface FlowerItem {
  id: string;
  name: string;
  subName?: string;
  imageUrl?: string;
  modelUrl?: string;
}

interface Ctrl {
  dragging: boolean;
  lastX: number;
  lastT: number;
  velocity: number;
  rotation: number;
  autoSpeed: number;
  releasedAt: number;
  tiltX: number;
  tiltY: number;
}

const RADIUS = 3;
const AUTO_SPEED = 0.25;
const IDLE_MS = 2500;
const COLORS = ['#e8a0a8', '#f3c9a8', '#c9b6e4', '#f0d77a', '#a8d5c2', '#f2b5c9'];

const setOpacity = (obj: THREE.Object3D, opacity: number) => {
  obj.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    mats.forEach((m) => {
      m.transparent = true;
      m.opacity = opacity;
    });
  });
};

const Placeholder = ({ color }: { color: string }) => (
  <group>
    <mesh position={[0, 0.55, 0]} rotation={[Math.PI, 0, 0]}>
      <coneGeometry args={[0.45, 0.6, 6]} />
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
    <mesh position={[0, 0.78, 0]}>
      <sphereGeometry args={[0.16, 24, 24]} />
      <meshStandardMaterial color="#f6e7b0" roughness={0.5} />
    </mesh>
    <mesh position={[0, -0.15, 0]}>
      <cylinderGeometry args={[0.03, 0.03, 1, 8]} />
      <meshStandardMaterial color="#8fae8b" roughness={0.8} />
    </mesh>
  </group>
);

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  const obj = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.material = Array.isArray(mesh.material)
        ? mesh.material.map((m) => m.clone())
        : mesh.material.clone();
    });
    return c;
  }, [scene]);
  return <primitive object={obj} />;
};

const Ring = ({ flowers, ctrl }: { flowers: FlowerItem[]; ctrl: RefObject<Ctrl> }) => {
  const group = useRef<THREE.Group>(null);
  const items = useRef<(THREE.Group | null)[]>([]);
  const step = (Math.PI * 2) / Math.max(flowers.length, 1);

  useFrame((_, dt) => {
    const c = ctrl.current;
    const g = group.current;
    if (!g) return;
    const idle = performance.now() - c.releasedAt > IDLE_MS;

    if (!c.dragging) {
      c.velocity *= Math.pow(0.04, dt);
      c.rotation += c.velocity * dt;
      if (!idle && Math.abs(c.velocity) < 0.6) {
        c.rotation = THREE.MathUtils.damp(c.rotation, Math.round(c.rotation / step) * step, 5, dt);
      }
    }
    c.autoSpeed = THREE.MathUtils.damp(c.autoSpeed, idle && !c.dragging ? AUTO_SPEED : 0, 2, dt);
    c.rotation += c.autoSpeed * dt;

    g.rotation.y = c.rotation;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.15 + c.tiltY * 0.1, 3, dt);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, -c.tiltX * 0.08, 3, dt);

    items.current.forEach((item, i) => {
      if (!item) return;
      const front = (Math.cos(i * step + c.rotation) + 1) / 2;
      item.scale.setScalar(0.55 + front * 0.75);
      item.position.y = front * 0.3;
      item.rotation.y += dt * (0.3 + (i % 3) * 0.1);
      setOpacity(item, 0.2 + front * 0.8);
    });
  });

  return (
    <group ref={group}>
      {flowers.map((f, i) => (
        <group
          key={f.id}
          ref={(el) => {
            items.current[i] = el;
          }}
          position={[Math.sin(i * step) * RADIUS, 0, Math.cos(i * step) * RADIUS]}
        >
          <Suspense fallback={<Placeholder color={COLORS[i % COLORS.length]} />}>
            {f.modelUrl ? <Model url={f.modelUrl} /> : <Placeholder color={COLORS[i % COLORS.length]} />}
          </Suspense>
        </group>
      ))}
    </group>
  );
};

const FlowerRing = ({ flowers }: { flowers: FlowerItem[] }) => {
  const ctrl = useRef<Ctrl>({
    dragging: false,
    lastX: 0,
    lastT: 0,
    velocity: 0,
    rotation: 0,
    autoSpeed: AUTO_SPEED,
    releasedAt: -Infinity,
    tiltX: 0,
    tiltY: 0,
  });

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    const c = ctrl.current;
    c.dragging = true;
    c.lastX = e.clientX;
    c.lastT = performance.now();
    c.velocity = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const c = ctrl.current;
    const rect = e.currentTarget.getBoundingClientRect();
    c.tiltX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    c.tiltY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    if (!c.dragging) return;
    const now = performance.now();
    const delta = (e.clientX - c.lastX) * 0.006;
    const dt = Math.max((now - c.lastT) / 1000, 0.001);
    c.rotation += delta;
    c.velocity = THREE.MathUtils.clamp(THREE.MathUtils.lerp(c.velocity, delta / dt, 0.5), -8, 8);
    c.lastX = e.clientX;
    c.lastT = now;
  };

  const onUp = () => {
    const c = ctrl.current;
    if (!c.dragging) return;
    c.dragging = false;
    c.releasedAt = performance.now();
  };

  return (
    <div
      className="flower-ring"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerLeave={onUp}
    >
      <Canvas dpr={[1, 2]} camera={{ position: [0, 1.8, 8], fov: 35 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 5, 4]} intensity={1.2} />
        <Ring flowers={flowers} ctrl={ctrl} />
      </Canvas>
    </div>
  );
};

export default FlowerRing;
