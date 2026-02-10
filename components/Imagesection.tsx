"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Imagesection = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Start states (unngå blank skjerm)
      gsap.set(".image-mask", { clipPath: "inset(0 40% 0 0)" });
      gsap.set(".detail-1", { opacity: 1, y: 0 }); // <-- synlig fra start
      gsap.set(".detail-2", { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#details",
          start: "top 80%", // <-- starter før den når helt toppen
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Image reveal (starter med en gang)
      tl.to(
        ".image-mask",
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "none",
          duration: 0.6,
        },
        0,
      );

      // Første tekst ut (etter litt scroll)
      tl.to(
        ".detail-1",
        { opacity: 0, y: -10, ease: "none", duration: 0.2 },
        0.45,
      );

      // Andre tekst inn
      tl.to(
        ".detail-2",
        { opacity: 1, y: 0, ease: "none", duration: 0.2 },
        0.55,
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="details" className="relative bg-[#ecebeb] text-[#161310]">
      <div className="h-[160vh]">
        <div className="sticky top-0 h-screen flex items-center">
          <div className="w-full max-w-6xl mx-auto px-8 grid grid-cols-12 gap-6 sm:gap-8">
            {/* IMAGE */}
            <div className="col-span-7 relative overflow-hidden">
              <div className="image-mask">
                <img
                  src="/lamp.jpeg"
                  alt=""
                  className="w-full h-[70vh] object-cover"
                />
              </div>
            </div>

            {/* TEXT */}
            <div className="col-span-5 flex flex-col justify-center">
              <div className="detail-1">
                <p className="text-sm uppercase tracking-wide mb-4">Material</p>
                <h3 className="text-lg sm:text-4xl font-medium leading-tight">
                  Designed to
                  <br />
                  fade into focus
                </h3>
              </div>

              <div className="detail-2">
                <p className="text-sm uppercase tracking-wide mb-4">
                  Limited drop
                </p>
                <h3 className="text-lg sm:text-4xl font-medium leading-tight mb-6">
                  Ready when
                  <br />
                  you are
                </h3>

                <button
                  type="button"
                  className="inline-flex items-center justify-center border border-[#161310] px-5 py-3 text-sm uppercase tracking-wide hover:bg-[#161310] hover:text-[#ecebeb] transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Imagesection;
