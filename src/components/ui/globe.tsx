"use client";

import { useEffect, useRef } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

// Configuration for COBE globe
const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,

  dark: 1,
  diffuse: 1,
  mapSamples: 18000,
  mapBrightness: 1.45,

  baseColor: [0.75, 0.85, 1],
  glowColor: [0.3, 0.85, 1],
  markerColor: [0.4, 0.95, 1],

  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
    { location: [37.7749, -122.4194], size: 0.08 },
    { location: [51.5074, -0.1278], size: 0.07 },
    { location: [52.52, 13.405], size: 0.06 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [-33.8688, 151.2093], size: 0.07 },
    { location: [-26.2041, 28.0473], size: 0.07 },
    { location: [43.6532, -79.3832], size: 0.07 },
    { location: [-34.6037, -58.3816], size: 0.08 },
  ],

  onRender: () => {},
};

// Interactive 3D globe component
export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const zoomRef = useRef(1.8);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);

  const rotationSpeed = useRef(0.005);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    let tick = 0;

    const baseMarkers = config.markers?.map((m) => ({ ...m })) || [];

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        tick += 0.05;

        if (!pointerInteracting.current) {
          phiRef.current += rotationSpeed.current;
        }

        state.phi = phiRef.current + rs.get();
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;

        if (zoomRef.current > 1) zoomRef.current -= 0.01;
        state.zoom = zoomRef.current;

        const glowPulse = (Math.sin(Date.now() / 2500) + 1) / 20;
        state.glowColor = [0.3 + glowPulse, 0.85, 1];

        state.markers = baseMarkers.map((m, i) => {
          const beat = Math.sin(tick + i * 0.5) * 0.015;
          return {
            ...m,
            size: m.size + beat,
          };
        });
      },
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0);
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "relative inset-0 mx-auto aspect-square w-full max-w-[400px]",
        className
      )}
      onHoverStart={() => (rotationSpeed.current = 0.02)}
      onHoverEnd={() => (rotationSpeed.current = 0.005)}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </motion.div>
  );
}
