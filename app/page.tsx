import HeroLamp from "@/components/HeroSection";
import Imagesection from "@/components/Imagesection";
import SmoothScroll from "@/components/SmoothScroll";
import React from "react";

const page = () => {
  return (
    <SmoothScroll>
      <HeroLamp />
      <Imagesection />
    </SmoothScroll>
  );
};

export default page;
