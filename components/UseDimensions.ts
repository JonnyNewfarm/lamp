"use client";

import { useEffect, useState } from "react";

export default function useDimension() {
  const [dimension, setDimension] = useState({
    width: 1,
    height: 1,
  });

  useEffect(() => {
    const resize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    resize();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return dimension;
}