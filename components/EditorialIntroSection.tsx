"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function EditorialTextAssembleSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-15% 0px -15% 0px",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const floatingImageY = useTransform(scrollYProgress, [0, 1], [180, -220]);

  return (
    <section
      ref={sectionRef}
      className="
        noise-bg
        relative
        overflow-hidden
        bg-[#eeeeec]
        px-5
        py-20
        text-[#1a1817]
        md:px-12
        md:py-28
        lg:px-16
        lg:py-36
      "
    >
      <div
        className="
          relative
          mx-auto
          grid
          min-h-[95svh]
          max-w-[1800px]
          grid-cols-1
          gap-16
          md:min-h-[100svh]
          md:grid-cols-12
          md:gap-x-6
          lg:gap-x-8
        "
      >
        <motion.div
          initial={{
            y: 42,
            opacity: 0,
          }}
          animate={
            isInView
              ? {
                  y: 0,
                  opacity: 1,
                }
              : {
                  y: 42,
                  opacity: 0,
                }
          }
          transition={{
            duration: 1.1,
            delay: 0.08,
            ease,
          }}
          className="
            relative
            z-30
            md:col-span-8
            md:col-start-1
            lg:col-span-7
          "
        >
          <p
            className="
              max-w-[1150px]
font-morganite              text-[clamp(3.75rem,8vw,9.5rem)]
              font-regular
              leading-[0.9]
              tracking-[-0.001em]
              text-[#131412]
            "
          >
            Lighting and objects selected for rooms that feel slower, softer,
            and more intentional.
          </p>
        </motion.div>

        <div
          className="
            relative
            z-10
            min-h-[600px]
            md:col-span-10
            md:col-start-2
            md:min-h-[820px]
            lg:col-span-9
            lg:col-start-3
            lg:min-h-[920px]
          "
        >
          {/* Stort hovedbilde */}
          <motion.div
            initial={{
              y: 50,
              opacity: 0,
            }}
            animate={
              isInView
                ? {
                    y: 0,
                    opacity: 1,
                  }
                : {
                    y: 50,
                    opacity: 0,
                  }
            }
            transition={{
              duration: 1.2,
              delay: 0.35,
              ease,
            }}
            className="
              absolute
              left-0
              top-[8%]
              h-[72%]
              w-[86%]
              overflow-hidden
              md:left-[4%]
              md:top-[7%]
              md:h-[78%]
              md:w-[75%]
              lg:left-[6%]
              lg:w-[70%]
            "
          >
            <div className="relative h-full w-full">
              <Image
                src="/intro-lamp.jpg"
                alt="Interior with decorative lighting"
                fill
                priority
                sizes="
                  (max-width: 768px) 86vw,
                  (max-width: 1200px) 70vw,
                  58vw
                "
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Lite bilde – drifter vertikalt med scroll */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    scale: 1,
                  }
                : {
                    opacity: 0,
                    scale: 0.94,
                  }
            }
            transition={{
              duration: 1.1,
              delay: 0.72,
              ease,
            }}
            className="
              absolute
              bottom-[5%]
              right-0
              z-20
              h-[40%]
              w-[50%]
              md:bottom-[4%]
              md:right-[2%]
              md:h-[46%]
              md:w-[34%]
              lg:right-[4%]
              lg:h-[48%]
              lg:w-[30%]
            "
          >
            <motion.div
              style={{
                y: floatingImageY,
              }}
              className="
                relative
                h-full
                w-full
                overflow-hidden
                shadow-[0_35px_80px_rgba(22,19,16,0.16)]
                will-change-transform
              "
            >
              <Image
                src="/intro-lamp-3.jpg"
                alt="Close-up of a decorative lamp"
                fill
                sizes="
                  (max-width: 768px) 42vw,
                  (max-width: 1200px) 34vw,
                  25vw
                "
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>

        <div
          className="
            relative
            z-30
            flex
            flex-col
            gap-10
            md:col-span-12
            md:grid
            md:grid-cols-12
            md:items-end
          "
        >
          <motion.p
            initial={{
              y: 25,
              opacity: 0,
            }}
            animate={
              isInView
                ? {
                    y: 0,
                    opacity: 1,
                  }
                : {
                    y: 25,
                    opacity: 0,
                  }
            }
            transition={{
              duration: 0.9,
              delay: 1.1,
              ease,
            }}
            className="
              max-w-[390px]
font-morganite              text-5xl
              leading-[1.1]
              tracking-[-0.001em]
              text-[#0e0d0c]
              md:col-span-4
            "
          >
            A quiet collection built around warm materials, soft silhouettes and
            considered light.
          </motion.p>

          <motion.div
            initial={{
              y: 34,
              opacity: 0,
            }}
            animate={
              isInView
                ? {
                    y: 0,
                    opacity: 1,
                  }
                : {
                    y: 34,
                    opacity: 0,
                  }
            }
            transition={{
              duration: 1,
              delay: 1.18,
              ease,
            }}
            className="
              flex
              justify-start
              md:col-span-4
              md:col-start-9
              md:justify-end
            "
          >
            <Link
              href="/shop"
              className="
                group
                relative
                inline-flex
                overflow-hidden
font-morganite                text-5xl
                font-bold
                leading-none
                md:text-6xl
                lg:text-7xl
                uppercase
              "
            >
              <span>View all</span>

              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  bottom-1
                  left-0
                  h-px
                  w-full
                  origin-right
                  scale-x-0
                  bg-current
                  transition-transform
                  duration-500
                  ease-[cubic-bezier(0.76,0,0.24,1)]
                  group-hover:origin-left
                  group-hover:scale-x-100
                "
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
