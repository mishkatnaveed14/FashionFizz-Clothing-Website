import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { getColorSwatch } from '../lib/productImages';

function createGarmentShape() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.82, -1.55);
  shape.lineTo(0.82, -1.55);
  shape.lineTo(0.72, -0.5);
  shape.lineTo(0.55, 0.35);
  shape.lineTo(0.8, 1.15);
  shape.lineTo(0.53, 1.4);
  shape.lineTo(0.24, 1.23);
  shape.lineTo(0.12, 0.92);
  shape.lineTo(0, 0.72);
  shape.lineTo(-0.12, 0.92);
  shape.lineTo(-0.24, 1.23);
  shape.lineTo(-0.53, 1.4);
  shape.lineTo(-0.8, 1.15);
  shape.lineTo(-0.55, 0.35);
  shape.lineTo(-0.72, -0.5);
  shape.closePath();
  return shape;
}

function createSleeveShape() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.08, 0.46);
  shape.lineTo(-0.38, 0.64);
  shape.lineTo(-0.95, -0.2);
  shape.lineTo(-0.73, -0.38);
  shape.lineTo(-0.34, 0.02);
  shape.closePath();
  return shape;
}

function TailoredGarment({ selectedColor, product }) {
  const fabricColor = getColorSwatch(selectedColor);
  const geometry = useMemo(() => {
    const body = new THREE.ExtrudeGeometry(createGarmentShape(), {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.035,
      bevelThickness: 0.035
    });
    body.translate(0, 0, -0.06);
    const sleeve = new THREE.ExtrudeGeometry(createSleeveShape(), {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.025,
      bevelThickness: 0.025
    });
    sleeve.translate(0, 0, -0.05);
    return { body, sleeve };
  }, []);

  const fabric = useMemo(() => new THREE.MeshStandardMaterial({
    color: fabricColor,
    roughness: 0.88,
    metalness: 0,
    side: THREE.DoubleSide
  }), [fabricColor]);
  const trim = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#B7965C',
    roughness: 0.68,
    metalness: 0.12
  }), []);

  if (product?.category === 'Home & Fragrances') {
    if (product.sub_category === 'Fragrances') {
      return (
        <group position={[0, -0.05, 0]}>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.58, 0.66, 1.55, 48]} />
            <meshPhysicalMaterial color={fabricColor} roughness={0.22} metalness={0.08} transmission={0.12} thickness={0.4} />
          </mesh>
          <mesh position={[0, 0.9, 0]}>
            <cylinderGeometry args={[0.23, 0.23, 0.25, 32]} />
            <primitive object={trim} attach="material" />
          </mesh>
          <mesh position={[0, 1.13, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.22, 32]} />
            <meshStandardMaterial color="#292725" roughness={0.32} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.05, 0.57]}>
            <boxGeometry args={[0.72, 0.42, 0.025]} />
            <meshStandardMaterial color="#F5F1E9" roughness={0.9} />
          </mesh>
        </group>
      );
    }
    return (
      <group position={[0, -0.25, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.7, 0.38, 1.8]} />
          <meshStandardMaterial color={fabricColor} roughness={0.94} />
        </mesh>
        <mesh position={[-0.72, 0.31, -0.42]}>
          <boxGeometry args={[0.82, 0.2, 0.55]} />
          <meshStandardMaterial color="#F0E9DC" roughness={0.92} />
        </mesh>
        <mesh position={[0.72, 0.31, -0.42]}>
          <boxGeometry args={[0.82, 0.2, 0.55]} />
          <meshStandardMaterial color="#F0E9DC" roughness={0.92} />
        </mesh>
        <mesh position={[0, 0.2, 0.91]}>
          <boxGeometry args={[2.55, 0.035, 0.025]} />
          <primitive object={trim} attach="material" />
        </mesh>
      </group>
    );
  }

  const isWaistcoat = product?.title?.toLowerCase().includes('waistcoat');

  return (
    <group rotation={[0.02, -0.16, 0]} position={[0, 0.2, 0]} scale={0.78}>
      <mesh geometry={geometry.body} material={fabric} />
      {!isWaistcoat && (
        <>
          <mesh geometry={geometry.sleeve} material={fabric} position={[-0.53, 0.75, 0]} />
          <mesh geometry={geometry.sleeve} material={fabric} position={[0.53, 0.75, 0]} scale={[-1, 1, 1]} />
        </>
      )}
      <mesh position={[0, -0.03, 0.13]}>
        <boxGeometry args={[0.1, 1.12, 0.025]} />
        <primitive object={trim} attach="material" />
      </mesh>
      {[-0.38, -0.12, 0.14, 0.4, 0.66].map((y) => (
        <mesh key={y} position={[0, y, 0.15]}>
          <sphereGeometry args={[0.026, 12, 12]} />
          <meshStandardMaterial color="#F1E5CD" roughness={0.52} metalness={0.2} />
        </mesh>
      ))}
      {[-0.43, 0.43].map((x) => (
        <mesh key={x} position={[x, -1.16, 0.09]}>
          <boxGeometry args={[0.035, 0.42, 0.012]} />
          <primitive object={trim} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

export default function FabricViewer3D({ selectedColor = 'Crimson Red', product, className = '' }) {
  return (
    <div className={`relative h-full w-full overflow-hidden border border-line bg-[#F5F1E9] ${className}`}>
      <Canvas
        dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : [1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 4.7], fov: 42 }}
      >
        <color attach="background" args={['#F5F1E9']} />
        <ambientLight intensity={1.7} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} color="#FFF8ED" />
        <directionalLight position={[-4, 1, -3]} intensity={0.8} color="#CDBCA4" />
        <TailoredGarment selectedColor={selectedColor} product={product} />
        <OrbitControls
          enableZoom
          enablePan={false}
          minDistance={3.8}
          maxDistance={6}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(Math.PI * 2) / 3}
          enableDamping
          dampingFactor={0.08}
        />
        <Environment resolution={128}>
          <Lightformer form="rect" intensity={1.6} position={[5, 6, 5]} scale={6} color="#FFFFFF" />
          <Lightformer form="rect" intensity={0.6} position={[-5, 2, -4]} scale={5} color="#D1793E" />
        </Environment>
      </Canvas>
      <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-line bg-paper/90 px-3 py-1.5 backdrop-blur-sm">
        <span className="font-body text-[10px] font-medium text-ink">{selectedColor} · {product?.sub_category || '3D garment'} preview</span>
      </div>
    </div>
  );
}
