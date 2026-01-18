import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Package, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function OrderConfidenceSection({ onNext }) {
  const sectionRef = useRef(null);
  const productRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.to(productRef.current, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-gradient-to-b from-background to-secondary/30 px-20 py-32"
    >
      {/* MAIN GRID */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        {/* LEFT */}
        <div className="space-y-14">
          {/* Heading */}
          <div className="fade-up">
            <h1 className="font-display text-8xl leading-tight font-semibold text-foreground max-w-xl">
              What’s happening with your order
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Every step is designed to feel clear, calm, and completely
              reliable.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-8 fade-up">
            <Feature
              icon={ShieldCheck}
              title="Secure payment"
              desc="Industry-grade encryption"
            />
            <Feature
              icon={Clock}
              title="Live updates"
              desc="Track every step"
            />
            <Feature
              icon={Package}
              title="Packed with care"
              desc="Handled responsibly"
            />
            <Feature
              icon={ShieldCheck}
              title="No hidden charges"
              desc="Transparent pricing"
            />
          </div>

          {/* CTA */}
          <div className="fade-up">
            <button
              onClick={onNext}
              className="inline-flex items-center justify-center bg-success text-success-foreground px-8 py-4 rounded-xl font-medium shadow-lg hover:scale-[1.03] transition"
            >
              View order timeline →
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex items-center justify-center fade-up">
          {/* Product */}
          <div
            ref={productRef}
            className="w-[320px] aspect-square rounded-3xl bg-white shadow-2xl flex flex-col items-center justify-center"
          >
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=90"
              className="w-56 rounded-2xl"
              alt="Product"
            />
            <p className="mt-4 text-xs tracking-widest text-muted-foreground">
              ORDER
            </p>
            <p className="text-sm font-semibold text-foreground">#ID-847291</p>
          </div>

          {/* Order Summary */}
          <div className="absolute right-[-380px] top-1/2 -translate-y-1/2 w-[360px] bg-card rounded-3xl shadow-xl p-8">
            <p className="text-xs tracking-widest text-muted-foreground mb-4">
              ORDER SUMMARY
            </p>

            <div className="space-y-4 text-sm">
              <Row label="Studio Wireless Pro" value="$349.00" />
              <Row label="Premium Leather Band" value="$89.00" />
              <div className="h-px bg-border" />
              <Row label="Tax" value="$35.04" />
            </div>

            <div className="mt-6 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>$473.04</span>
            </div>

            <p className="mt-4 text-xs text-muted-foreground text-center">
              Paid with VISA •••• 4242
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* SMALL COMPONENTS */

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="h-10 w-10 rounded-full bg-success/10 text-success flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
