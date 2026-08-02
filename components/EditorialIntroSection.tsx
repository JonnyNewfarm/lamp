"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
const imageEase = [0.76, 0, 0.24, 1] as const;

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

  /*
   * Det lille bildet starter lavere og beveger seg oppover
   * mens hele seksjonen scroller gjennom viewporten.
   *
   * Øk verdiene for mer drift:
   * [180, -220]
   */
  const floatingImageY = useTransform(scrollYProgress, [0, 1], [180, -220]);

  return (
    <section
      ref={sectionRef}
      className="
        noise-bg
        relative
        overflow-hidden
        bg-[#ecebeb]
        px-5
        py-20
        text-[#161310]
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
              font-merchant
              text-[clamp(2.75rem,7vw,8.5rem)]
              font-light
              leading-[0.9]
              tracking-[-0.055em]
              text-[#28311f]
            "
          >
            Lighting and objects selected for rooms that feel slower, softer,
            and more intentional.
          </p>
        </motion.div>

        <motion.div
          initial={{
            y: 24,
            opacity: 0,
          }}
          animate={
            isInView
              ? {
                  y: 0,
                  opacity: 1,
                }
              : {
                  y: 24,
                  opacity: 0,
                }
          }
          transition={{
            duration: 0.9,
            delay: 0.3,
            ease,
          }}
          className="
            relative
            z-30
            self-start
            md:col-span-3
            md:col-start-10
            md:text-right
          "
        >
          <p
            className="
            font-merchant
              text-[11px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-[#161310]/55
              md:text-xs
            "
          >
            Calero collection
          </p>

          <p
            className="
              mt-2
              max-w-[240px]
              font-merchant
              text-lg
              leading-[1.05]
              tracking-[-0.035em]
              text-[#161310]/75
              md:ml-auto
              md:text-xl
            "
          >
            Objects chosen for atmosphere, not noise.
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
              clipPath: "inset(0 0 100% 0)",
              y: 50,
            }}
            animate={
              isInView
                ? {
                    clipPath: "inset(0 0 0% 0)",
                    y: 0,
                  }
                : {
                    clipPath: "inset(0 0 100% 0)",
                    y: 50,
                  }
            }
            transition={{
              clipPath: {
                duration: 1.35,
                delay: 0.35,
                ease: imageEase,
              },
              y: {
                duration: 1.2,
                delay: 0.35,
                ease,
              },
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
            <motion.div
              initial={{
                scale: 1.08,
              }}
              animate={{
                scale: isInView ? 1 : 1.08,
              }}
              transition={{
                duration: 1.8,
                delay: 0.35,
                ease,
              }}
              className="relative h-full w-full"
            >
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
            </motion.div>
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
              w-[42%]
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
                src="/intro-lamp-2.jpg"
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

          <motion.div
            initial={{
              x: 20,
              opacity: 0,
            }}
            animate={
              isInView
                ? {
                    x: 0,
                    opacity: 1,
                  }
                : {
                    x: 20,
                    opacity: 0,
                  }
            }
            transition={{
              duration: 1,
              delay: 1.05,
              ease,
            }}
            className="
              absolute
              right-0
              top-[3%]
              hidden
              origin-top-right
              items-center
              gap-3
              md:flex
              md:[writing-mode:vertical-rl]
            "
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#161310]">
              Selected lighting and interior objects
            </span>
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
              font-merchant
              text-xl
              leading-[1.1]
              tracking-[-0.035em]
              text-[#161310]/70
              md:col-span-4
              md:text-2xl
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
    pb-2
    text-[28px]
    font-bold
    
    uppercase
    leading-none
    tracking-[-0.025em]
    md:text-[42px]
    lg:text-[52px]
  "
            >
              <span>View all</span>

              <span
                aria-hidden="true"
                className="
      pointer-events-none
      absolute
      bottom-0
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
