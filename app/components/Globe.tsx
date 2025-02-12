import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
  return (
    <div className="h-[600px] w-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <GlobeObject />
        <OrbitControls 
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

function GlobeObject() {
  const globeRef = useRef<THREE.Mesh>(null);
  const hotspots = [
    { position: [1, 0, 0], label: "Earthquakes in Turkey" },
    { position: [0, 1, 0], label: "Rising Buildings in Dubai" },
    { position: [-1, 0, 0], label: "Knowledge Centers Declining" },
  ];

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      <Sphere ref={globeRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#000000"
          metalness={0.7}
          roughness={0.3}
          emissive="#FFD700"
          emissiveIntensity={0.2}
        />
      </Sphere>
      
      {hotspots.map((hotspot, index) => (
        <group key={index} position={new THREE.Vector3(...hotspot.position).multiplyScalar(2)}>
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color="#FF4500"
              emissive="#FF4500"
              emissiveIntensity={1}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default Globe;
