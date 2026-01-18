import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import transitBackground from "../assets/transit-background.png";
import {
  Truck,
  MapPin,
  CheckCircle2,
  Clock,
  Package,
  CircleDot,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

/* ------------------ DATA ------------------ */

const transitSteps = [
  {
    id: 1,
    status: "Order Verified",
    location: "Mumbai Warehouse",
    date: "Jan 14, 2026",
    time: "10:32 AM",
    description: "Payment confirmed and order safely packed at origin.",
    reached: true,
  },
  {
    id: 2,
    status: "In Transit",
    location: "Ahmedabad Hub",
    date: "Jan 15, 2026",
    time: "03:18 PM",
    description: "Package moved through regional sorting center.",
    reached: true,
  },
  {
    id: 3,
    status: "In Transit",
    location: "Jaipur Distribution Center",
    date: "Jan 16, 2026",
    time: "08:45 AM",
    description:
      "Currently preparing for the final delivery leg. Everything on track.",
    reached: true,
    isCurrent: true,
  },
  {
    id: 4,
    status: "Out for Delivery",
    location: "Delhi Delivery Hub",
    date: "Jan 17, 2026",
    time: "Expected",
    description: "Final delivery scheduled to your address.",
    reached: false,
  },
];

const currentProgress = 58;

/* ------------------ COMPONENT ------------------ */

const ShippingSection = () => {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const truckRef = useRef(null);
  const stepsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=80%",
          scrub: 1,
          pin: true,
        },
      });

      // Path animation
      if (pathRef.current) {
        const len = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });

        tl.to(pathRef.current, {
          strokeDashoffset: len * (1 - currentProgress / 100),
          ease: "none",
        });
      }

      // Truck movement
      if (truckRef.current) {
        tl.to(
          truckRef.current,
          { top: `${currentProgress * 0.85}%`, ease: "none" },
          0,
        );
      }

      // Step reveal
      stepsRef.current
        ?.querySelectorAll(".transit-step")
        .forEach((el, i) => {
          tl.to(el, { opacity: 1, x: 0, duration: 0.2 }, i * 0.15);
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative px-4 md:px-6 py-12 bg-background overflow-hidden"
      style={{
        backgroundImage: `url(${transitBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-background/90" />

      <div className="relative max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Truck className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              In Transit • On Schedule
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Your order is moving safely
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Tracking ID: BD7829461052IN
          </p>

          {/* TRUST LINE */}
          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center gap-2 text-xs text-emerald-500 bg-emerald-500/10 px-4 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4" />
              Verified at every step • Human-handled logistics
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="flex relative">
          {/* LEFT SPINE */}
          <div className="relative w-14 flex-shrink-0">
            <svg
              className="absolute left-1/2 -translate-x-1/2 h-full w-8"
              viewBox="0 0 32 400"
              preserveAspectRatio="none"
            >
              <path
                d="M16 20 L16 380"
                stroke="hsl(var(--border))"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                ref={pathRef}
                d="M16 20 L16 380"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            {/* TRUCK */}
            <div
              ref={truckRef}
              className="absolute left-1/2 -translate-x-1/2 z-10"
              style={{ top: "0%" }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                <Truck className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* RIGHT STEPS */}
          <div ref={stepsRef} className="flex-1 flex flex-col gap-4">
            {transitSteps.map((step) => (
              <div
                key={step.id}
                className="transit-step opacity-0 translate-x-4"
              >
                <div
                  className={`p-4 rounded-xl border ${
                    step.isCurrent
                      ? "bg-card border-primary/40 shadow-md"
                      : step.reached
                        ? "bg-card border-border"
                        : "bg-muted/30 border-border/40"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {step.reached ? (
                      step.isCurrent ? (
                        <CircleDot className="w-4 h-4 text-primary" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-primary/70" />
                      )
                    ) : (
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    )}

                    <span
                      className={`text-sm font-semibold ${
                        step.isCurrent
                          ? "text-primary"
                          : step.reached
                            ? "text-foreground"
                            : "text-muted-foreground"
                      }`}
                    >
                      {step.status}
                    </span>

                    {step.isCurrent && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
                        Current step
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{step.location}</span>
                  </div>

                  <p className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </p>

                  <div className="mt-2 pt-2 border-t border-border/40 text-xs text-muted-foreground flex gap-2">
                    <span>{step.date}</span>
                    <span>•</span>
                    <span>{step.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOT ACTIONS */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border">
            <Package className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Delivery partner</p>
              <p className="text-sm font-medium text-foreground">
                BlueDart Express
              </p>
            </div>
          </div>

          <Link to="/all-orders">
            <Button className="gap-2">
              <Package className="w-4 h-4" />
              Track another order
            </Button>
          </Link>

          <Button variant="ghost" className="gap-2 text-muted-foreground">
            <HelpCircle className="w-4 h-4" />
            Need help?
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ShippingSection;
