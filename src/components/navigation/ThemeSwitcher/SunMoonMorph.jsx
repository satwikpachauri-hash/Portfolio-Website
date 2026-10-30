import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

const RAY_LINES = [
  { x1: 12, y1: 1.5, x2: 12, y2: 4 },
  { x1: 12, y1: 20, x2: 12, y2: 22.5 },
  { x1: 1.5, y1: 12, x2: 4, y2: 12 },
  { x1: 20, y1: 12, x2: 22.5, y2: 12 },
  { x1: 4.58, y1: 4.58, x2: 6.35, y2: 6.35 },
  { x1: 17.65, y1: 17.65, x2: 19.42, y2: 19.42 },
  { x1: 4.58, y1: 19.42, x2: 6.35, y2: 17.65 },
  { x1: 17.65, y1: 6.35, x2: 19.42, y2: 4.58 },
];

export default function SunMoonMorph({ isDark }) {
  const shouldReduceMotion = useReducedMotion();

  // 750ms target duration with smooth, premium cubic-bezier easing
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.75, ease: [0.45, 0, 0.2, 1] };

  const rayTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.75, ease: [0.45, 0, 0.2, 1] };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={18}
      height={18}
      aria-hidden="true"
      className="theme-morph-svg"
      style={{ overflow: 'visible', display: 'block' }}
    >
      <defs>
        <mask id="theme-moon-mask">
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <motion.circle
            initial={false}
            animate={{
              cx: isDark ? 17.5 : 28,
              cy: isDark ? 6 : 4,
              r: isDark ? 7.2 : 7,
            }}
            transition={transition}
            fill="black"
          />
        </mask>
      </defs>

      <motion.g
        initial={false}
        animate={{
          rotate: isDark ? 40 : 0,
        }}
        transition={transition}
        style={{ transformOrigin: '12px 12px' }}
      >
        <motion.circle
          initial={false}
          animate={{
            r: isDark ? 8.5 : 5,
          }}
          transition={transition}
          cx="12"
          cy="12"
          fill="currentColor"
          mask="url(#theme-moon-mask)"
        />

        <motion.g
          initial={false}
          animate={{
            scale: isDark ? 0.3 : 1,
            opacity: isDark ? 0 : 1,
          }}
          transition={rayTransition}
          style={{ transformOrigin: '12px 12px' }}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {RAY_LINES.map((line, idx) => (
            <line
              key={idx}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
            />
          ))}
        </motion.g>
      </motion.g>
    </motion.svg>
  );
}
