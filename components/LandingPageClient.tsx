"use client";
import { Experience } from "@/components/Experience";

import SmoothScroll from "@/components/SmoothScroll";
import { UI } from "@/components/UI";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MagneticComp from "./MagneticComp";

const LandingPageClient = () => {
  const [cameraZ, setCameraZ] = useState(4.5);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => {
      setCameraZ(window.innerWidth > 800 ? 3.35 : 4.5);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return (
    <SmoothScroll>
      <UI />
      <div className="fixed inset-0">
        <Canvas
          key={pathname}
          style={{ touchAction: "pan-y" }}
          shadows
          camera={{
            position: [-0.5, 1, cameraZ],
            fov: 45,
          }}
        >
          <color attach="background" args={["#ecebeb"]} />
          <Experience />
        </Canvas>
        <div className="absolute hidden lg:block left-10 top-1/2 -translate-y-1/2 max-w-xl">
          <h1 className="text-4xl  leading-[0.95] font-semibold text-[#161310]">
            Good light
            <br />
            doesn’t shout.
          </h1>

          <p className="mt-6 text-base leading-relaxed text-black/70 max-w-md">
            A desk lamp designed for calm,
            <br />
            focused work.
          </p>

          <div className="mt-8">
            <MagneticComp>
              <Link
                href={"/shop"}
                className="inline-flex items-center hover:bg-[#161310] hover:text-white border border-black/40 px-5 py-3 text-sm text-[#161310]"
              >
                Buy — €79
              </Link>
            </MagneticComp>
          </div>
        </div>

        <div className="absolute right-6 hidden md:block top-1/2 -translate-y-1/2">
          <div className="text-lg tracking-[0.45em] text-black/50 [writing-mode:vertical-rl]">
            CALM BY DESIGN
          </div>
        </div>
        <div className="absolute md:hidden left-6  top-1/2 -translate-y-1/2">
          <div className="text-lg tracking-[0.45em] text-black/50 [writing-mode:vertical-rl]">
            CALM BY DESIGN
          </div>
        </div>
        <div className="absolute left-10 bottom-10">
          <Link
            href={"/shop"}
            className="inline-flex mb-3 lg:hidden items-center border border-black/40 px-4 py-2.5 text-sm text-black/80 "
          >
            Buy — €79
          </Link>
          <div className="sm:text-6xl hidden md:block text-3xl leading-none font-semibold tracking-[0.06em] text-[#161310]">
            CALM BY DESIGN.
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
};

export default LandingPageClient;
