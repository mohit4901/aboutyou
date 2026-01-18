import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/* 🔤 SCROLL-SCRUB LETTER COMPONENT (INLINE) */
const ScrollSplitText = ({
  text,
  progress,
  start = 0,
  end = 1,
  className = "",
}) => {
  const letters = text.split("");

  return (
    <span className={`inline-block ${className}`}>
      {letters.map((char, i) => {
        const letterPoint = start + (end - start) * (i / letters.length);

        const opacity = useTransform(
          progress,
          [letterPoint - 0.06, letterPoint],
          [0.15, 1]
        );

        return (
          <motion.span
            key={i}
            style={{ opacity }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </span>
  );
};

export default function BillingBreakdown() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 15%"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0]
  );

  const items = [
    { label: "Studio Wireless Pro", value: 349 },
    { label: "Premium Leather Band", value: 89 },
  ];

  const subtotal = items.reduce((s, i) => s + i.value, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <section ref={containerRef} className="relativ w-full">

      <motion.div className="max-w-xl mx-auto" style={{ opacity }}>
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-widest text-muted-foreground block mb-4">
            Order Summary
          </span>

          <h2 className="font-display text-4xl sm:text-5xl text-foreground">
            <ScrollSplitText
              text="The details"
              progress={scrollYProgress}
              start={0}
              end={0.25}
            />
          </h2>
        </div>

        {/* CARD */}
        <div className="bg-card rounded-3xl shadow-card overflow-hidden">
          <div className="p-8 space-y-6">
            {items.map((item, i) => (
              <div key={item.label} className="flex justify-between">
                <span className="text-foreground">
                  <ScrollSplitText
                    text={item.label}
                    progress={scrollYProgress}
                    start={0.25 + i * 0.1}
                    end={0.5 + i * 0.1}
                  />
                </span>

                <span className="font-medium text-foreground">
                  <ScrollSplitText
                    text={`$${item.value.toFixed(2)}`}
                    progress={scrollYProgress}
                    start={0.3 + i * 0.1}
                    end={0.55 + i * 0.1}
                  />
                </span>
              </div>
            ))}

            <div className="h-px bg-border" />

            <div className="flex justify-between">
              <span className="text-muted-foreground">
                <ScrollSplitText
                  text="Tax"
                  progress={scrollYProgress}
                  start={0.6}
                  end={0.7}
                />
              </span>
              <span className="text-foreground">
                <ScrollSplitText
                  text={`$${tax.toFixed(2)}`}
                  progress={scrollYProgress}
                  start={0.6}
                  end={0.7}
                />
              </span>
            </div>
          </div>

          {/* TOTAL */}
          <div className="relative bg-secondary/50 px-8 py-6">
            <div className="absolute inset-0 bg-success/10 blur-2xl" />

            <div className="relative flex justify-between items-center">
              <span className="text-lg font-semibold text-foreground">
                <ScrollSplitText
                  text="Total"
                  progress={scrollYProgress}
                  start={0.75}
                  end={0.9}
                />
              </span>
              <span className="text-2xl font-bold text-foreground">
                <ScrollSplitText
                  text={`$${total.toFixed(2)}`}
                  progress={scrollYProgress}
                  start={0.75}
                  end={0.9}
                />
              </span>
            </div>
          </div>
        </div>

        {/* PAYMENT */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <ScrollSplitText
            text="Paid with VISA •••• 4242"
            progress={scrollYProgress}
            start={0.9}
            end={1}
          />
        </div>
      </motion.div>
    </section>
  );
}
