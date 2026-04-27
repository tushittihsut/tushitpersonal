'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function AnimatedShapes() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 64, 64]} position={[-2, 1, -3]} scale={1.5}>
          <MeshDistortMaterial color="#6366f1" attach="material" distort={0.5} speed={2} roughness={0.2} metalness={0.8} />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere args={[1, 64, 64]} position={[2, -1, -2]} scale={1.2}>
          <MeshDistortMaterial color="#a855f7" attach="material" distort={0.6} speed={3} roughness={0.2} metalness={0.8} />
        </Sphere>
      </Float>
      <Float speed={2.5} rotationIntensity={2} floatIntensity={1.5}>
        <Sphere args={[1, 64, 64]} position={[0, -2, -5]} scale={2}>
          <MeshDistortMaterial color="#ec4899" attach="material" distort={0.4} speed={1.5} roughness={0.3} metalness={0.7} />
        </Sphere>
      </Float>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <AnimatedShapes />
      <Environment preset="city" />
    </Canvas>
  );
}
