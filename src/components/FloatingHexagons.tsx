"use client";

import { useEffect, useState } from "react";

interface HexagonPos {
  top: string;
  left: string;
  delay: string;
  duration: string;
}

const FloatingHexagons = () => {
  const [hexagons, setHexagons] = useState<HexagonPos[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 6 }).map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${i * 2}s`,
      duration: `${10 + Math.random() * 10}s`,
    }));

    setHexagons(generated);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {hexagons.map((h, i) => (
        <div
          key={i}
          className="absolute opacity-10 animate-float"
          style={{
            top: h.top,
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
          }}
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            className="text-primary"
          >
            <path
              d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingHexagons;
