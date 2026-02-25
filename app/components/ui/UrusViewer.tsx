'use client';

import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';

const MODEL_PATH = '/urus/source/2023_lamborghini_urus_performante.glb';

// ── The 3D model ────────────────────────────────────────────────────────────
function UrusModel() {
    const { scene } = useGLTF(MODEL_PATH);

    // Make every mesh cast & receive shadows, tweak material roughness for shine
    scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if ((mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
                (mesh.material as THREE.MeshStandardMaterial).envMapIntensity = 0.4;
            }
        }
    });

    return (
        <primitive
            object={scene}
            scale={1.75}
            position={[0, -0.85, 0]}
            rotation={[0, Math.PI / 6, 0]}   // start at a flattering angle
        />
    );
}

// ── Custom studio lighting ───────────────────────────────────────────────────
// Front & back lights you control here. Expose them as props so you can tweak.
function StudioLighting() {
    return (
        <>
            {/* Low ambient to keep shadow drama */}
            <ambientLight intensity={0.25} color="#1a1008" />

            {/* ── FRONT LIGHTS ──────────────────────────────────────── */}
            {/* Key light – warm white, upper-front-left; simulates studio key */}
            <pointLight
                position={[-4, 3, 5]}
                color="#FFF5D0"
                intensity={120}
                distance={22}
                decay={2}
            />
            {/* Fill – soft amber, front-right, lower angle */}
            <pointLight
                position={[4, 1, 4.5]}
                color="#D4961A"
                intensity={60}
                distance={16}
                decay={2}
            />
            {/* Logo / hood highlight – tight white spot directly front */}
            <spotLight
                position={[0, 2, 6]}
                angle={0.3}
                penumbra={0.8}
                color="#FFFFFF"
                intensity={60}
                distance={14}
                decay={2}
                target-position={[0, 0, 0]}
            />

            {/* ── BACK LIGHTS ───────────────────────────────────────── */}
            {/* Tail-light glow – deep red-orange from rear */}
            <pointLight
                position={[0, 0.4, -5.5]}
                color="#FF3300"
                intensity={80}
                distance={12}
                decay={2}
            />
            {/* Rim / halo – blue-white from upper rear for silhouette */}
            <pointLight
                position={[0, 5, -4]}
                color="#99BBFF"
                intensity={35}
                distance={14}
                decay={2}
            />
            {/* Side accent right – gold edge light */}
            <pointLight
                position={[6, 2, -2]}
                color="#D4961A"
                intensity={40}
                distance={12}
                decay={2}
            />
            {/* Side accent left */}
            <pointLight
                position={[-6, 2, -2]}
                color="#D4961A"
                intensity={40}
                distance={12}
                decay={2}
            />

            {/* ── GROUND BOUNCE ─────────────────────────────────────── */}
            <pointLight
                position={[0, -3, 0]}
                color="#C08010"
                intensity={20}
                distance={8}
                decay={2}
            />
        </>
    );
}

// ── Auto-rotate controller (stops on user drag) ──────────────────────────────
function AutoRotate({ controlsRef }: { controlsRef: React.RefObject<OrbitControlsImpl | null> }) {
    const [userInteracting, setUserInteracting] = useState(false);
    const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useFrame((_, delta) => {
        if (!controlsRef.current || userInteracting) return;
        controlsRef.current.setAzimuthalAngle(
            controlsRef.current.getAzimuthalAngle() + delta * 0.35
        );
        controlsRef.current.update();
    });

    // Expose handlers to canvas via a transparent overlay div approach
    // (handled by OrbitControls onStart/onEnd events instead)
    return null;
}

// ── Fallback shown while GLB loads ───────────────────────────────────────────
function LoadingFallback() {
    return (
        <mesh>
            <boxGeometry args={[0.01, 0.01, 0.01]} />
            <meshBasicMaterial transparent opacity={0} />
        </mesh>
    );
}

// ── Main exported component ───────────────────────────────────────────────────
export default function UrusViewer() {
    const controlsRef = useRef<OrbitControlsImpl>(null);
    const [loaded, setLoaded] = useState(false);
    const [interacting, setInteracting] = useState(false);

    return (
        <div className="relative w-full" style={{ height: 'clamp(280px, 45vw, 520px)' }}>

            {/* Loading skeleton */}
            {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
                    <div className="w-16 h-16 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
                    <p className="text-[11px] text-amber-400/60 tracking-widest uppercase">Loading 3D Model</p>
                </div>
            )}

            <Canvas
                camera={{ position: [0, 1.2, 6.5], fov: 38 }}
                gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
                shadows
                style={{ background: 'transparent' }}
                onCreated={() => setLoaded(true)}
            >
                <StudioLighting />

                <Suspense fallback={<LoadingFallback />}>
                    <UrusModel />
                </Suspense>

                <AutoRotate controlsRef={controlsRef} />

                <OrbitControls
                    ref={controlsRef}
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 5}
                    maxPolarAngle={Math.PI / 2.2}
                    onStart={() => setInteracting(true)}
                    onEnd={() => setInteracting(false)}
                    makeDefault
                />
            </Canvas>

            {/* Drag hint */}
            <div
                className={`absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 transition-opacity duration-500 pointer-events-none ${interacting ? 'opacity-0' : 'opacity-70'}`}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4961A" strokeWidth="2">
                    <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M3 12h18" />
                </svg>
                <span className="text-[10px] text-amber-400/80 tracking-widest uppercase">Drag to rotate · 360°</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4961A" strokeWidth="2">
                    <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M3 12h18" />
                </svg>
            </div>

            {/* Subtle ground reflection glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-amber-500/10 blur-2xl rounded-full pointer-events-none" />
        </div>
    );
}

// Preload so it starts fetching immediately
useGLTF.preload(MODEL_PATH);
