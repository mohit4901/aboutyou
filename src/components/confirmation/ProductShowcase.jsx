import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Package, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

/* 🔤 SPLIT TEXT HELPER */
const splitText = (text) =>
  text.split("").map((char, i) => (
    <span key={i} className="char inline-block opacity-20">
      {char === " " ? "\u00A0" : char}
    </span>
  ));

const items = [
  { id: 1, title: "Secure Payment", icon: ShieldCheck, side: "left" },
  { id: 2, title: "Packed with Care", icon: Package, side: "left" },
  { id: 3, title: "Live Order Updates", icon: Clock, side: "right" },
  { id: 4, title: "No Hidden Charges", icon: ShieldCheck, side: "right" },
];

export default function ProductShowcase({ onNext }) {
  const sectionRef = useRef(null);
  const productRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 🔤 TEXT SCRUB (IRONHILL STYLE) */
      gsap.to(".char", {
        opacity: 1,
        stagger: 0.025,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      /* FEATURE ENTRY */
      gsap.from(".feature-card", {
        opacity: 0,
        x: (i, el) => (el.dataset.side === "left" ? -120 : 120),
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      /* CENTER FLOAT */
      gsap.to(productRef.current, {
        y: -14,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* SIDE FLOAT */
      gsap.to(".float", {
        y: 14,
        repeat: -1,
        yoyo: true,
        duration: 3.5,
        ease: "sine.inOut",
        stagger: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* 🎯 CENTER TILT */
  const handleMouseMove = (e) => {
    const card = productRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(card, {
      rotateY: (x / rect.width - 0.5) * 26,
      rotateX: -(y / rect.height - 0.5) * 18,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1200,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(productRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-0 bg-transparent w-full py-5 pb-10 overflow-hidden"
    >
      {/* HEADER */}
      <div className="text-center mb-28 px-6">
        <h2 className="font-display font-bold text-8xl text-foreground mb-6">
          {splitText("What’s happening with your order")}
        </h2>
        <p className="max-w-xl mx-auto text-lg text-muted-foreground">
          {splitText(
            "Every step is designed to feel clear, calm, and completely reliable.",
          )}
        </p>
      </div>

      {/* SHOWCASE */}
      <div className="relative mx-auto max-w-6xl grid grid-cols-3 items-center px-6">
        {/* LEFT */}
        <div className="flex flex-col gap-16">
          {items
            .filter((i) => i.side === "left")
            .map((item) => (
              <FeatureCard key={item.id} item={item} />
            ))}
        </div>

        {/* CENTER PRODUCT */}
        <div className="relative flex justify-center">
          <div
            ref={productRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative z-10 w-80 aspect-square rounded-[36px] bg-card shadow-elevated flex flex-col items-center justify-center cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=90"
              className="w-52 rounded-2xl mb-6 pointer-events-none"
              style={{ transform: "translateZ(40px)" }}
              alt="Order product"
            />

            <p
              className="text-sm tracking-widest text-muted-foreground"
              style={{ transform: "translateZ(30px)" }}
            >
              {splitText("ORDER")}
            </p>
            <p
              className="font-semibold text-foreground text-lg"
              style={{ transform: "translateZ(30px)" }}
            >
              {splitText("#ID-847291")}
            </p>
          </div>

          <div className="absolute inset-0 rounded-full bg-success/10 blur-3xl scale-125 pointer-events-none" />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-16">
          {items
            .filter((i) => i.side === "right")
            .map((item) => (
              <FeatureCard key={item.id} item={item} />
            ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-32 text-center px-6">
        <Link
          to={"/tracking"}
          onClick={onNext}
          className="inline-flex items-center gap-3 gradient-success text-success-foreground font-semibold text-lg px-10 py-5 rounded-2xl shadow-elevated hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
        >
          {splitText("What’s happening with my order")}
          <ArrowRight className="w-5 h-5" />
        </Link>

        <p className="mt-6 text-sm text-muted-foreground">
          {splitText(
            "You’ll see all the orders and their after order details there.",
          )}
        </p>
      </div>
    </section>
  );
}

function FeatureCard({ item }) {
  const Icon = item.icon;

  return (
    <div
      data-side={item.side}
      className="feature-card float bg-card border border-border rounded-3xl px-6 py-8 shadow-card flex items-center gap-4"
    >
      <div className="h-12 w-12 rounded-full bg-success/10 text-success flex items-center justify-center">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-lg font-medium text-foreground">
          {splitText(item.title)}
        </p>
        <p className="text-sm text-muted-foreground">
          {splitText("Built for confidence")}
        </p>
      </div>
    </div>
  );
}
