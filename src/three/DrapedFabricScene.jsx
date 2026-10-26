import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function FoldedTextile() {
  const group = useRef(null);
  const progress = useRef(0);
  const geometry = useMemo(() => {
    const mesh = new THREE.PlaneGeometry(2.7, 3.8, 68, 84);
    const positions = mesh.attributes.position;

    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index);
      const y = positions.getY(index);
      const u = (x + 1.35) / 2.7;
      const v = (y + 1.9) / 3.8;
      const centralFold = Math.sin((u * 4.5 + Math.sin(v * 5) * 0.08) * Math.PI * 2) * 0.1;
      const fineFold = Math.sin((u * 11 + v * 1.3) * Math.PI * 2) * 0.025;
      const curledEdge = Math.pow(Math.abs(u - 0.5) * 2, 3) * 0.14;

      positions.setZ(index, centralFold + fineFold + curledEdge - 0.07);
      positions.setX(index, x + Math.sin(v * Math.PI) * (u < 0.5 ? -0.07 : 0.07));
    }

    mesh.computeVertexNormals();
    return mesh;
  }, []);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: '#fabric-story',
      start: 'top top+=96px',
      end: 'bottom bottom',
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: ({ progress: value }) => {
        progress.current = value;
      },
      onLeaveBack: () => {
        progress.current = 0;
      }
    });

    return () => trigger.kill();
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    const amount = progress.current;
    group.current.rotation.y = -0.24 + amount * 0.8 + Math.sin(time * 0.3) * 0.025;
    group.current.rotation.x = -0.08 + Math.sin(amount * Math.PI) * 0.13;
    group.current.position.y = Math.sin(time * 0.45) * 0.035 - amount * 0.12;
    group.current.position.x = amount * 0.26;
  });

  return (
    <group ref={group} rotation={[0, -0.24, -0.08]}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#641E32"
          roughness={0.76}
          metalness={0.02}
          sheen={0.7}
          sheenColor="#D8B7B3"
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh geometry={geometry} position={[0.04, 0.01, -0.045]} scale={[0.94, 0.94, 1]}>
        <meshStandardMaterial color="#D9C7AE" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function DrapedFabricScene() {
  return (
    <Canvas
      dpr={[1, 1.2]}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 6], fov: 37 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 5, 5]} intensity={2.1} color="#fff8ed" />
      <directionalLight position={[-4, -2, -3]} intensity={1.25} color="#d8b7b3" />
      <FoldedTextile />
    </Canvas>
  );
}
