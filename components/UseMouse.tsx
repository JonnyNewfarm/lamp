"use client";

import { useEffect, useState } from "react";

export default function useMouse() {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const setInitialMousePosition = () => {
      setMouse({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    };

    const updateMouse = (e: MouseEvent | WheelEvent) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    setInitialMousePosition();

    window.addEventListener("mousemove", updateMouse);
    window.addEventListener("wheel", updateMouse, { passive: true });
    window.addEventListener("resize", setInitialMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("wheel", updateMouse);
      window.removeEventListener("resize", setInitialMousePosition);
    };
  }, []);

  return mouse;
}
