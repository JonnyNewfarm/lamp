"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------
   Scroll progress (GSAP)
-------------------------------- */
function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });
  }, []);

  return progress;
}

/* ------------------------------
   Lamp model
-------------------------------- */
function Lamp({ progress }: { progress: React.MutableRefObject<number> }) {
  const { scene } = useGLTF("/lamp.glb");
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 800) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  }, []);

  useFrame(() => {
    scene.traverse((child: any) => {
      if (child.isMesh && child.material?.emissive) {
        child.material.emissiveIntensity = THREE.MathUtils.lerp(
          0,
          1.2,
          progress.current,
        );
      }
    });
  });

  return <primitive object={scene} scale={isMobileView ? 0.031 : 0.027} />;
}

function Books() {
  const { scene } = useGLTF("/books.glb");

  return (
    <group rotation={[-0.0, 0.5, 0]} position={[0.25, -1, -0.39]}>
      <primitive object={scene} scale={0.28} />
    </group>
  );
}

function Plant() {
  const { scene } = useGLTF("/plant.glb");

  return (
    <group rotation={[-0.0, 0.5, 0]} position={[0.2, -0.6, 0.15]}>
      <primitive object={scene} scale={2} />
    </group>
  );
}

/* ------------------------------
   Scroll-controlled light
-------------------------------- */
function ScrollLight({
  progress,
}: {
  progress: React.MutableRefObject<number>;
}) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!lightRef.current) return;

    const p = progress.current;
    const eased = THREE.MathUtils.smoothstep(p, 0.15, 0.75);

    lightRef.current.intensity = THREE.MathUtils.lerp(0, 3.2, eased);
    lightRef.current.distance = THREE.MathUtils.lerp(2, 7, eased);

    lightRef.current.intensity = THREE.MathUtils.lerp(0, 2.4, p);
    lightRef.current.distance = THREE.MathUtils.lerp(2, 6, p);
    lightRef.current.decay = 2;
  });

  return (
    <pointLight
      ref={lightRef}
      position={[1.1, 1.4, 0.6]}
      color="#ffd9a3"
      castShadow
    />
  );
}

function Scene({ progress }: { progress: React.MutableRefObject<number> }) {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 800) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  }, []);

  return (
    <>
      {/* Slightly dim ambient to let the lamp pop */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} />

      {/* Scroll-controlled lamp light */}
      <ScrollLight progress={progress} />

      <group
        position={[isMobileView ? 1.1 : 0.6, isMobileView ? -1.1 : -0.87, 0]}
      >
        <Lamp progress={progress} />
      </group>
    </>
  );
}

/* ------------------------------
   HERO COMPONENT
-------------------------------- */
export default function HeroLamp() {
  const progress = useScrollProgress();
  const wordsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!titleRef.current || !textRef.current || !buttonRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top 70%",
        once: true,
      },
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
    )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4",
      );
  }, []);

  useEffect(() => {
    if (!wordsRef.current) return;

    const words = Array.from(
      wordsRef.current.querySelectorAll<HTMLElement>(".word"),
    );

    words.forEach((w) => {
      w.style.opacity = "0";
      w.style.transform = "translateY(12px)";
    });

    const update = () => {
      const p = progress.current;

      words.forEach((word, i) => {
        const start = 0.15 + i * 0.12;
        const end = start + 0.12;

        let t = (p - start) / (end - start);
        t = THREE.MathUtils.clamp(t, 0, 1);

        // 🔥 FORCE completion near end of scroll
        if (p > 0.58) t = 1;

        word.style.opacity = String(t);
        word.style.transform = `translateY(${12 - t * 12}px)`;
      });
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, [progress]);

  const bottomTextRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!bottomTextRef.current) return;

    gsap.fromTo(
      bottomTextRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      },
    );
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-[200vh] text-[#161310] bg-[#ecebeb]"
    >
      {/* Sticky Canvas */}
      <div className="sticky top-0 h-screen w-full">
        <Canvas
          camera={{ position: [0, 1.5, 4], fov: 40 }}
          className="w-full h-full"
          dpr={[1, 1.5]}
        >
          <Scene progress={progress} />
        </Canvas>

        {/* Hero Copy (DOM, not canvas) */}
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="max-w-xl px-8">
            <h1
              ref={titleRef}
              className="sm:text-5xl text-2xl font-medium leading-tight"
            >
              Good light
              <br />
              doesn’t shout.
            </h1>
            <p ref={textRef} className="mt-4 sm:text-xl  text-[#3a3734]">
              A desk lamp designed for <br></br> calm, focused work.
            </p>

            <button
              ref={buttonRef}
              className="pointer-events-auto mt-8 border border-black px-6 py-3 text-sm hover:bg-black hover:text-white transition"
            >
              Buy — €79
            </button>
          </div>
        </div>
        {/* Vertical side text */}
        <div className="pointer-events-none hidden md:block absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-20">
          <p
            className="text-xl uppercase tracking-[0.35em] text-[#3a3734] opacity-90"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            Calm By Design
          </p>
        </div>

        <div
          ref={bottomTextRef}
          className="absolute bottom-12 left-6 sm:left-12  z-20 whitespace-nowrap"
        >
          <div
            ref={wordsRef}
            className="flex items-center gap-x-3 leading-none"
          >
            <span className="word text-lg sm:text-2xl uppercase">Calm,</span>
            <span className="word text-lg sm:text-2xl uppercase">Focused,</span>
            <span className="word text-lg sm:text-2xl uppercase">
              Intentional.
            </span>
          </div>

          <h2 className="relative text-4xl sm:text-[clamp(3rem,8vw,6rem)] z-50 font-semibold">
            <span className="highlight uppercase">Calm By Design.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
