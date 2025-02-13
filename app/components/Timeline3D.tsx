'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect, Suspense } from 'react';
import { OrbitControls, Text, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

const signs = [
  {
    id: 1,
    title: "The Beginning",
    description: "Barefoot shepherds competing in building tall buildings",
    position: [0, 0, 0],
    completed: true
  },
  {
    id: 2,
    title: "Knowledge",
    description: "Knowledge will be taken away and ignorance will prevail",
    position: [2, 1, 2],
    completed: false
  },
  // Add more signs here
];

function TimelineOrb({ position, title, description, completed, onClick }) {
  const orbRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (orbRef.current) {
      // Gentle floating animation
      orbRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.001;
      
      // Rotation animation
      orbRef.current.rotation.y += 0.01;
    }
  });

  useEffect(() => {
    if (hovered) {
      gsap.to(orbRef.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 0.3
      });
    } else {
      gsap.to(orbRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3
      });
    }
  }, [hovered]);

  return (
    <group
      ref={orbRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhysicalMaterial
          color={completed ? "#FFD700" : "#4A90E2"}
          transmission={0.5}
          roughness={0.2}
          metalness={0.8}
          thickness={0.5}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color={completed ? "#FFD700" : "#4A90E2"}
          transparent
          opacity={0.1}
        />
      </mesh>

      <Text
        position={[0, 0.8, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
    </group>
  );
}

function SpiralPath() {
  const points = [];
  const numPoints = 100;
  
  for (let i = 0; i < numPoints; i++) {
    const t = i / numPoints;
    const angle = t * Math.PI * 4; // 2 full rotations
    const radius = 3 + t * 2; // Increasing radius
    const x = Math.cos(angle) * radius;
    const y = t * 5; // Vertical rise
    const z = Math.sin(angle) * radius;
    points.push(new THREE.Vector3(x, y, z));
  }

  const curve = new THREE.CatmullRomCurve3(points);
  const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.05, 8, false);

  return (
    <mesh>
      <primitive object={tubeGeometry} />
      <meshPhysicalMaterial
        color="#FFD700"
        emissive="#FFD700"
        emissiveIntensity={0.2}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

export default function Timeline3D() {
  const [selectedSign, setSelectedSign] = useState(null);
  const controlsRef = useRef();

  const handleSignClick = (sign) => {
    setSelectedSign(sign);
    // Animate camera to focus on selected sign
    if (controlsRef.current) {
      gsap.to(controlsRef.current.target, {
        x: sign.position[0],
        y: sign.position[1],
        z: sign.position[2],
        duration: 1
      });
    }
  };

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [10, 5, 10], fov: 75 }}
        style={{ background: 'radial-gradient(circle at center, #1a1a2e 0%, #0a0a0f 100%)' }}
      >
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          <SpiralPath />
          
          {signs.map((sign) => (
            <TimelineOrb
              key={sign.id}
              {...sign}
              onClick={() => handleSignClick(sign)}
            />
          ))}

          <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enablePan={false}
            minDistance={5}
            maxDistance={20}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      {/* Info Panel */}
      {selectedSign && (
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-dark to-transparent">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              {selectedSign.title}
            </h2>
            <p className="text-xl text-gray-200">
              {selectedSign.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
