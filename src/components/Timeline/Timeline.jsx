import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Timeline() {
  const lineRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "left",
        duration: 1.2,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="w-full py-24 px-6">
      <h2 className="text-4xl font-bold text-center mb-16">
        Order Journey
      </h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Line */}
        <div
          ref={lineRef}
          className="h-1 bg-success rounded-full mb-16"
        />

        {/* Steps */}
        <div className="grid grid-cols-3 gap-12 text-center">
          <Step title="Order Confirmed" />
          <Step title="Packed & Ready" />
          <Step title="Out for Delivery" />
        </div>
      </div>
    </div>
  );
}

function Step({ title }) {
  return (
    <div className="bg-card rounded-2xl shadow-card p-6">
      <p className="font-semibold">{title}</p>
    </div>
  );
}
