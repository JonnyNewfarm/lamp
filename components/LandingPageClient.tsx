"use client";
import { Experience } from "@/components/Experience";
import SmoothScroll from "@/components/SmoothScroll";
import { UI } from "@/components/UI";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MagneticComp from "./MagneticComp";
import { motion } from "framer-motion";
import PreLoader from "@/components/PreLoader";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

const subtle = {
  hidden: { opacity: 0, y: 6, filter: "blur(3px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease, delay: 0.15 },
  },
};

const LandingPageClient = () => {
  const [cameraZ, setCameraZ] = useState(4.3);

  const [preloaded, setPreloaded] = useState<boolean | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const update = () => {
      setCameraZ(window.innerWidth > 800 ? 3.35 : 4.3);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const seen = sessionStorage.getItem("seen_home_preloader") === "1";
    setPreloaded(seen ? true : false);
  }, []);

  return (
    <SmoothScroll>
      {preloaded === false && (
        <PreLoader
          holdMs={1200}
          onDone={() => {
            sessionStorage.setItem("seen_home_preloader", "1");
            setPreloaded(true);
          }}
        />
      )}

      <UI />

      <div className="fixed inset-0">
        <Canvas
          key={pathname}
          dpr={[1.25, 2]}
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

        <motion.div
          className="absolute z-10 hidden lg:block left-10 top-1/2 -translate-y-1/2 max-w-xl"
          variants={container}
          initial="hidden"
          animate={preloaded ? "show" : "hidden"}
        >
          <motion.h1
            className="text-4xl leading-[0.95] font-semibold text-[#161310]"
            variants={item}
          >
            Light,
            <br />
            designed for calm.
          </motion.h1>

          <motion.p
            className="mt-5 text-base leading-relaxed text-black/70 max-w-md"
            variants={item}
          >
            A desk lamp designed for calm,
            <br />
            focused work.
          </motion.p>

          <motion.div className="mt-6" variants={item}>
            <MagneticComp>
              <Link
                href={"/shop"}
                className="inline-flex items-center hover:bg-[#161310] hover:text-white border border-black/40 px-5 py-3 text-sm text-[#161310]"
              >
                Buy — €79
              </Link>
            </MagneticComp>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute z-10 right-6 hidden md:block top-1/2 -translate-y-1/2"
          variants={subtle}
          initial="hidden"
          animate={preloaded ? "show" : "hidden"}
        >
          <div className="text-lg tracking-[0.45em] text-black/50 [writing-mode:vertical-rl]">
            CALM BY DESIGN
          </div>
        </motion.div>

        <motion.div
          className="absolute z-10 md:hidden left-6 top-1/2 -translate-y-1/2"
          variants={subtle}
          initial="hidden"
          animate={preloaded ? "show" : "hidden"}
        >
          <div className="text-lg landscape:text-sm tracking-[0.45em] text-black/50 [writing-mode:vertical-rl]">
            CALM BY DESIGN
          </div>
        </motion.div>

        <motion.div
          className="absolute z-10 left-10 bottom-10"
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={
            preloaded
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 10, filter: "blur(4px)" }
          }
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <Link
            href={"/shop"}
            className="inline-flex mb-3 lg:hidden items-center border border-black/40 px-4 py-2.5 text-sm text-black/80"
          >
            Buy — €79
          </Link>

          <div className="sm:text-6xl hidden md:block text-3xl leading-none font-semibold tracking-[0.06em] text-[#161310]">
            CALM BY DESIGN.
          </div>
        </motion.div>
      </div>
    </SmoothScroll>
  );
};

export default LandingPageClient;
