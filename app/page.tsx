"use client";
import { Experience } from "@/components/Experience";

import SmoothScroll from "@/components/SmoothScroll";
import { UI } from "@/components/UI";
import { Canvas } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const [cameraZ, setCameraZ] = useState(4.5);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => {
      setCameraZ(window.innerWidth > 800 ? 3.5 : 4.5);
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
        <div className="absolute hidden xl:block left-10 top-1/2 -translate-y-1/2 max-w-xl">
          <h1 className="text-4xl  leading-[0.95] font-semibold text-black">
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
            <div className="inline-flex items-center border border-black/40 px-5 py-3 text-sm text-black/80">
              Buy — €79
            </div>
          </div>
        </div>

        {/* Right vertical label */}
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
        {/* Bottom giant type */}
        <div className="absolute left-10 bottom-10">
          <div className="inline-flex mb-3 md:hidden items-center border border-black/40 px-4 py-2.5 text-sm text-black/80 bg-[#ecebeb]">
            Buy — €79
          </div>
          <div className="sm:text-6xl text-3xl leading-none font-semibold tracking-[0.06em] text-black">
            CALM BY DESIGN.
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
};

export default page;
