import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

function TailoredTunic() {
  const groupRef = useRef();
  const scrollProgress = useRef(0);
  const { viewport } = useThree();

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: '#fashion-hero',
      start: 'top top+=80px',
      end: '+=180%',
      scrub: 1,
      pin: false,
      onUpdate: ({ progress }) => {
        scrollProgress.current = progress;
      },
      onLeaveBack: () => {
        scrollProgress.current = 0;
      },
      invalidateOnRefresh: true
    });

    return () => trigger.kill();
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      const progress = scrollProgress.current;
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.08 + progress * Math.PI * 0.95;
      groupRef.current.rotation.x = progress * 0.12;
      groupRef.current.position.y = Math.sin(time * 0.45) * 0.08 - progress * 0.38;
      groupRef.current.position.x = (viewport.width < 6 ? 0.45 : 1.15) + progress * 1.15;
      groupRef.current.scale.setScalar((viewport.width < 6 ? 0.8 : 1) * (1 + Math.sin(progress * Math.PI) * 0.1));
      state.camera.position.z = 6 - Math.sin(progress * Math.PI) * 0.9;
    }
  });

  const { bodyGeometry, sleeveGeometry, leftLapelGeometry, rightLapelGeometry, clothMaterial } = useMemo(() => {
    const bodyShape = new THREE.Shape();
    bodyShape.moveTo(-0.5, -0.82);
    bodyShape.lineTo(-0.56, -0.3);
    bodyShape.lineTo(-0.4, 0.7);
    bodyShape.lineTo(-0.76, 1.1);
    bodyShape.lineTo(-0.34, 1.34);
    bodyShape.lineTo(0, 1.2);
    bodyShape.lineTo(0.34, 1.34);
    bodyShape.lineTo(0.76, 1.1);
    bodyShape.lineTo(0.4, 0.7);
    bodyShape.lineTo(0.56, -0.3);
    bodyShape.lineTo(0.5, -0.82);
    bodyShape.closePath();
    const sleeveShape = new THREE.Shape();
    sleeveShape.moveTo(-0.28, 0.48);
    sleeveShape.lineTo(-0.65, 0.72);
    sleeveShape.lineTo(-1.38, -0.2);
    sleeveShape.lineTo(-1.1, -0.43);
    sleeveShape.lineTo(-0.42, 0.05);
    sleeveShape.closePath();
    const leftLapelShape = new THREE.Shape();
    leftLapelShape.moveTo(-0.34, 1.33);
    leftLapelShape.lineTo(-0.08, 1.15);
    leftLapelShape.lineTo(-0.02, 0.88);
    leftLapelShape.lineTo(-0.23, 1.04);
    leftLapelShape.closePath();
    const rightLapelShape = new THREE.Shape();
    rightLapelShape.moveTo(0.34, 1.33);
    rightLapelShape.lineTo(0.08, 1.15);
    rightLapelShape.lineTo(0.02, 0.88);
    rightLapelShape.lineTo(0.23, 1.04);
    rightLapelShape.closePath();

    return {
      bodyGeometry: new THREE.ExtrudeGeometry(bodyShape, { depth: 0.18, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.07, bevelThickness: 0.06 }),
      sleeveGeometry: new THREE.ExtrudeGeometry(sleeveShape, { depth: 0.16, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.035, bevelThickness: 0.04 }),
      leftLapelGeometry: new THREE.ExtrudeGeometry(leftLapelShape, { depth: 0.02, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.012, bevelThickness: 0.012 }),
      rightLapelGeometry: new THREE.ExtrudeGeometry(rightLapelShape, { depth: 0.02, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.012, bevelThickness: 0.012 }),
      clothMaterial: new THREE.MeshStandardMaterial({
        color: '#354631',
        roughness: 0.82,
        metalness: 0.02,
        side: THREE.DoubleSide
      })
    };
  }, []);

  return (
    <group ref={groupRef} position={[viewport.width < 6 ? 0.45 : 1.15, -0.08, 0]} rotation={[0, -0.1, 0]}>
      <mesh geometry={bodyGeometry} material={clothMaterial} />
      <mesh geometry={sleeveGeometry} material={clothMaterial} position={[-0.48, 0.4, 0]} rotation={[0, 0, 0.06]} />
      <mesh geometry={sleeveGeometry} material={clothMaterial} position={[0.48, 0.4, 0]} rotation={[0, Math.PI, -0.06]} />
      <mesh geometry={leftLapelGeometry} material={clothMaterial} position={[0, 0, 0.19]} />
      <mesh geometry={rightLapelGeometry} material={clothMaterial} position={[0, 0, 0.19]} />
      <mesh position={[0, 0.08, 0.22]}>
        <boxGeometry args={[0.035, 1.68, 0.025]} />
        <meshStandardMaterial color="#C3BDAE" metalness={0.45} roughness={0.5} />
      </mesh>
      {[-0.52, -0.28, -0.04, 0.2, 0.44, 0.68].map((y) => (
        <mesh key={y} position={[0.03, y, 0.24]}>
          <sphereGeometry args={[0.018, 12, 12]} />
          <meshStandardMaterial color="#C3BDAE" metalness={0.55} roughness={0.4} />
        </mesh>
      ))}
      {[-0.23, 0.23].map((x) => (
        <group key={x} position={[x, 0.48, 0.25]}>
          <mesh>
            <boxGeometry args={[0.27, 0.28, 0.035]} />
            <meshStandardMaterial color="#485A45" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.1, 0.02]}>
            <boxGeometry args={[0.27, 0.025, 0.02]} />
            <meshStandardMaterial color="#A89C8E" roughness={0.55} />
          </mesh>
          <mesh position={[0, 0.11, 0.04]}>
            <sphereGeometry args={[0.018, 10, 10]} />
            <meshStandardMaterial color="#D7C9B3" metalness={0.35} roughness={0.5} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.8, 0.21]}>
        <boxGeometry args={[0.95, 0.035, 0.025]} />
        <meshStandardMaterial color="#485A45" roughness={0.8} />
      </mesh>
    </group>
  );
}

export default function HeroScene3D({ className = '' }) {
  return (
    <div className={`w-full h-full absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6], fov: 42 }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[6, 6, 6]} intensity={1.7} color="#FFF5E8" />
        <directionalLight position={[-6, -3, -2]} intensity={0.9} color="#D1793E" />

        <TailoredTunic />

        <Environment resolution={256}>
          <Lightformer form="rect" intensity={1.2} position={[10, 10, 10]} scale={10} color="#FFFFFF" />
          <Lightformer form="rect" intensity={0.7} position={[-10, -5, -10]} scale={10} color="#D1793E" />
        </Environment>
      </Canvas>
    </div>
  );
}
