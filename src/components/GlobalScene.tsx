'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Icosahedron, MeshDistortMaterial, Environment, Sparkles } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function SceneContent() {
  const orbRef = useRef<THREE.Mesh>(null);
  const newDimOrbRef = useRef<THREE.Mesh>(null);
  const cameraGroupRef = useRef<THREE.Group>(null);
  const tunnelRef = useRef<THREE.Points>(null);
  const landscapeRef = useRef<THREE.Group>(null);
  const lightDimLightRef = useRef<THREE.PointLight>(null);
  const { scene } = useThree();
  
  // Custom Particle Tunnel
  const tunnelParticlesCount = 8000;
  const tunnelPositions = useMemo(() => {
    const pos = new Float32Array(tunnelParticlesCount * 3);
    for(let i=0; i < tunnelParticlesCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 4 + Math.random() * 2;
      const z = 5 - (Math.random() * 150);
      pos[i*3] = Math.cos(angle) * radius;
      pos[i*3+1] = Math.sin(angle) * radius;
      pos[i*3+2] = z;
    }
    return pos;
  }, [tunnelParticlesCount]);

  // Light-dimension floating shapes (soft pastel)
  const lightDimShapes = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      position: [(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 50, -160 - Math.random() * 80] as [number, number, number],
      scale: Math.random() * 3 + 1,
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      speed: 0.1 + Math.random() * 0.3,
      type: Math.random() > 0.5 ? 'sphere' : 'octa' as string,
    }));
  }, []);

  useFrame((state, delta) => {
    const scrollY = window.scrollY;
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    // ===== CAMERA MOVEMENT (UNTOUCHED WARP) =====
    if (cameraGroupRef.current) {
      let targetZ = 5;
      
      if (progress < 0.1) {
        targetZ = 5;
      } else if (progress >= 0.1 && progress <= 0.3) {
        const warpP = (progress - 0.1) / 0.2;
        const easeWarp = warpP < 0.5 ? 2 * warpP * warpP : -1 + (4 - 2 * warpP) * warpP;
        targetZ = 5 - (easeWarp * 150); 
      } else {
        targetZ = -145 - ((progress - 0.3) * 50);
      }

      cameraGroupRef.current.position.z = THREE.MathUtils.lerp(cameraGroupRef.current.position.z, targetZ, 0.08);
      
      // Camera turbulence during warp (UNTOUCHED)
      if (progress > 0.1 && progress < 0.3) {
        const shake = Math.random() * 0.1;
        cameraGroupRef.current.position.x = Math.sin(state.clock.elapsedTime * 20) * shake;
        cameraGroupRef.current.position.y = Math.cos(state.clock.elapsedTime * 20) * shake;
        cameraGroupRef.current.rotation.z += delta * 2;
        
        const warpP = (progress - 0.1) / 0.2;
        const cam = state.camera as THREE.PerspectiveCamera;
        cam.fov = THREE.MathUtils.lerp(cam.fov, 60 + Math.sin(warpP * Math.PI) * 60, 0.1);
        cam.updateProjectionMatrix();
      } else {
        cameraGroupRef.current.position.x = THREE.MathUtils.lerp(cameraGroupRef.current.position.x, 0, 0.1);
        cameraGroupRef.current.position.y = THREE.MathUtils.lerp(cameraGroupRef.current.position.y, 0, 0.1);
        cameraGroupRef.current.rotation.z = THREE.MathUtils.lerp(cameraGroupRef.current.rotation.z, 0, 0.05);
        
        const cam = state.camera as THREE.PerspectiveCamera;
        cam.fov = THREE.MathUtils.lerp(cam.fov, 60, 0.1);
        cam.updateProjectionMatrix();
      }
    }

    const camZ = cameraGroupRef.current?.position.z || 5;

    // ===== TUNNEL ROTATION (UNTOUCHED) =====
    if (tunnelRef.current) {
      tunnelRef.current.rotation.z -= delta * (progress > 0.1 && progress < 0.3 ? 2 : 0.2);
      tunnelRef.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
    }

    // ===== TRAVELING ORB: PHASE 1 (Dark Matter) =====
    if (orbRef.current) {
      if (progress < 0.25) {
        orbRef.current.visible = true;
        orbRef.current.position.z = camZ - 5 - (progress * 10);
        orbRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
        orbRef.current.scale.setScalar(1.5 + (progress * 5));
        orbRef.current.rotation.x += delta;
      } else {
        orbRef.current.visible = false;
      }
    }

    // ===== TRAVELING ORB: PHASE 2 (Transforms based on dimension) =====
    if (newDimOrbRef.current) {
      if (progress >= 0.25) {
        newDimOrbRef.current.visible = true;
        const targetX = Math.sin(progress * Math.PI * 4) * 4;
        const targetY = Math.cos(progress * Math.PI * 2) * 2;
        
        newDimOrbRef.current.position.x = THREE.MathUtils.lerp(newDimOrbRef.current.position.x, targetX, 0.05);
        newDimOrbRef.current.position.y = THREE.MathUtils.lerp(newDimOrbRef.current.position.y, targetY, 0.05);
        newDimOrbRef.current.position.z = THREE.MathUtils.lerp(newDimOrbRef.current.position.z, camZ - 8, 0.05);
        
        newDimOrbRef.current.rotation.x += delta * 0.3;
        newDimOrbRef.current.rotation.y += delta * 0.2;

        // Orb material evolves: in new dimension, it becomes pearlescent glass
        const mat = newDimOrbRef.current.material as THREE.MeshStandardMaterial;
        if (progress > 0.35) {
          // Gradually shift to warm pearl
          mat.color.lerp(new THREE.Color('#e8ddd3'), 0.02);
          mat.emissive.lerp(new THREE.Color('#c9a87c'), 0.02);
          mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 0.3, 0.02);
        }
      } else {
        newDimOrbRef.current.visible = false;
      }
    }

    // ===== ENVIRONMENTAL SHIFT: The Dimension Change =====
    if (progress > 0.32) {
      // Transition to warm, bright fog
      const t = Math.min((progress - 0.32) / 0.08, 1); // 0-1 over a short range
      const fogColor = new THREE.Color('#050505').lerp(new THREE.Color('#f5f0eb'), t);
      scene.fog = new THREE.Fog(fogColor, 5, 40);
      scene.background = fogColor;
    } else if (progress > 0.28) {
      // Brief dark-to-transition zone
      scene.fog = new THREE.Fog('#0a0510', 5, 30);
      scene.background = new THREE.Color('#050505');
    } else {
      scene.fog = new THREE.Fog('#050505', 5, 20);
      scene.background = new THREE.Color('#050505');
    }

    // Light dimension ambient light intensity shift
    if (lightDimLightRef.current) {
      lightDimLightRef.current.intensity = progress > 0.32 ? THREE.MathUtils.lerp(lightDimLightRef.current.intensity, 15, 0.03) : THREE.MathUtils.lerp(lightDimLightRef.current.intensity, 0, 0.05);
    }

    if (landscapeRef.current) {
      landscapeRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <>
      {/* === DARK DIMENSION LIGHTING === */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={3} color="#a855f7" />
      <pointLight position={[0, 0, -145]} intensity={10} color="#00f0ff" distance={50} />

      {/* === LIGHT DIMENSION LIGHTING (starts off, fades in) === */}
      <pointLight ref={lightDimLightRef} position={[0, 20, -180]} intensity={0} color="#fff5e6" distance={200} />
      <directionalLight position={[-10, 30, -200]} intensity={2} color="#f5f0eb" />

      <group ref={cameraGroupRef}>
      </group>

      {/* === THE VORTEX TUNNEL (UNTOUCHED) === */}
      <points ref={tunnelRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={tunnelParticlesCount} array={tunnelPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.08} color="#ff007f" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </points>

      {/* === PHASE 1: DARK MATTER ORB (UNTOUCHED) === */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <Sphere ref={orbRef} args={[1, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial color="#0f0f0f" emissive="#6366f1" emissiveIntensity={1} distort={0.5} speed={4} roughness={0.1} metalness={1} wireframe={true} />
        </Sphere>
      </Float>

      {/* === PHASE 2: TRANSFORMS FROM NEON → PEARLESCENT GLASS === */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        <Icosahedron ref={newDimOrbRef} args={[1.2, 1]} position={[0, 0, -100]} visible={false}>
          <meshStandardMaterial 
            color="#00f0ff" 
            emissive="#00f0ff" 
            emissiveIntensity={2} 
            wireframe={false} 
            roughness={0.1} 
            metalness={0.9}
            transparent
            opacity={0.85}
          />
        </Icosahedron>
      </Float>
      
      {/* === LIGHT DIMENSION LANDSCAPE (Soft pastel floating forms) === */}
      <group ref={landscapeRef} position={[0, 0, -170]}>
        {lightDimShapes.map((shape, i) => (
          <Float key={i} speed={shape.speed} rotationIntensity={0.3} floatIntensity={0.8}>
            <mesh position={shape.position} rotation={shape.rotation} scale={shape.scale}>
              {shape.type === 'sphere' ? (
                <sphereGeometry args={[1, 32, 32]} />
              ) : (
                <octahedronGeometry args={[1, 0]} />
              )}
              <meshStandardMaterial 
                color={i % 3 === 0 ? '#e8ddd3' : i % 3 === 1 ? '#d4c5b0' : '#c9a87c'} 
                roughness={0.8} 
                metalness={0.1}
                transparent
                opacity={0.6}
              />
            </mesh>
          </Float>
        ))}
      </group>

      {/* Soft warm sparkles in the light dimension */}
      <Sparkles count={600} scale={60} size={3} speed={0.15} opacity={0.15} color="#c9a87c" position={[0, 0, -180]} />
    </>
  );
}

export default function GlobalScene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', background: '#050505' }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 1000 }}>
        <SceneContent />
        <Environment preset="apartment" />
      </Canvas>
    </div>
  );
}
