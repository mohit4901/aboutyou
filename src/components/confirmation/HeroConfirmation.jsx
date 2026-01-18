import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

import Box from "@/assets/box.png";
import Phone from "@/assets/phone.png";
import Shoes from "@/assets/shoes.png";
import Bag from "@/assets/bag.png";

gsap.registerPlugin(ScrollTrigger);

/* 🔤 SPLIT TEXT */
const SplitText = ({ text }) => (
  <>
    {text.split("").map((char, i) => (
      <span key={i} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </>
);

export default function HeroConfirmation() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* 🔤 TEXT BASE STATE (VISIBLE BUT SOFT) */
      gsap.set(".char", { opacity: 0.25 });

      /* 🔥 LETTER BY LETTER CLARITY (IRONHILL STYLE) */
      gsap.to(".char", {
        opacity: 1,
        stagger: 0.035,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      /* ✏️ SVG LINE DRAW */
      const path = pathRef.current;
      const length = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 25%",
          scrub: true,
        },
      });

      /* 🌬️ FLOATING PRODUCTS (ALIVE BUT SUBTLE) */
      gsap.to(".float", {
        y: 26,
        repeat: -1,
        yoyo: true,
        duration: 3.2,
        ease: "sine.inOut",
        stagger: 0.3,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-background overflow-hidden flex items-center justify-center"
    >
      {/* SVG FLOW LINE */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 800"
        fill="none"
      >
        <path
          ref={pathRef}
          d="M100 400
             C250 200, 450 200, 600 400
             C750 600, 950 600, 1100 400"
          stroke="hsl(var(--muted-foreground) / 0.25)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* FLOATING PRODUCTS */}
      <img src={Box} className="float absolute left-[6%] top-[44%] w-32 md:w-40 drop-shadow-xl" />
      <img src={Phone} className="float absolute right-[8%] top-[22%] w-28 md:w-36 drop-shadow-xl" />
      <img src={Shoes} className="float absolute right-[12%] bottom-[18%] w-32 md:w-40 drop-shadow-xl" />
      <img src={Bag} className="float absolute left-[14%] bottom-[20%] w-28 md:w-36 drop-shadow-xl" />

      {/* CENTER CONTENT */}
      <div className="relative z-10 px-6">
        <div className="mx-auto max-w-3xl text-center">

          {/* ICON */}
          <div className="mx-auto mb-10 w-24 h-24 rounded-full bg-success flex items-center justify-center shadow-xl">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>

          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            <SplitText text="Payment successful" />
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
  <SplitText text="Your order is in " />
  <span className="text-success">
    <SplitText text="safe hands" />
  </span>
</h1>

<p className="text-xl sm:text-2xl text-foreground mb-8">
  <SplitText text="Payment received. Process started. No action needed from you." />
</p>

<p className="max-w-xl mx-auto text-lg leading-relaxed text-muted-foreground">
  <SplitText text="We’ve successfully received your payment and your order is now moving forward. From here, we’ll keep everything clear, predictable, and transparent — so you always know what’s happening next." />
</p>


        </div>
      </div>
    </section>
  );
}
