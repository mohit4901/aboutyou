import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";

const splitText = (text) =>
  text.split("").map((char, i) => (
    <span
      key={i}
      className="intro-char inline-block opacity-0 translate-y-6"
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

const IntroOverlay = ({
  show,
  title = "Order Confirmed",
  onComplete,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!show) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete,
    });

    // reset
    gsap.set(".intro-char", { opacity: 0, y: 24 });

    /* LETTER BY LETTER REVEAL */
    tl.to(".intro-char", {
      opacity: 1,
      y: 0,
      stagger: 0.055,
      duration: 1.05,
    });

    /* CONFIDENT HOLD */
    tl.to({}, { duration: 0.9 });

    /* EXIT */
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 1.025,
      filter: "blur(10px)",
      duration: 1.05,
      ease: "power2.inOut",
    });

    return () => tl.kill();
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={containerRef}
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            bg-gradient-to-b from-white via-neutral-50 to-neutral-100
          "
        >
          {/* subtle grain / depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04),transparent_60%)]" />

          {/* TEXT */}
          <h1
            className="
              relative z-10
              font-display font-semibold
              text-4xl md:text-6xl lg:text-7xl
              tracking-[0.35em] uppercase text-center
              text-neutral-900
            "
          >
            {splitText(title)}
          </h1>

          {/* soft underline glow */}
          <div
            className="
              absolute bottom-1/3
              h-px w-[60%]
              bg-gradient-to-r
              from-transparent via-emerald-400/60 to-transparent
            "
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;
