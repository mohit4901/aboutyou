import { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import DeliveryBag from "./DeliveryBag";
import ProductReveal from "./ProductReveal";
import BillingCard from "./BillingBreakdown";

export default function StoryCanvas() {
  useEffect(() => {
    const bag = document.querySelector("#bag");
    const product = document.querySelector("#product");
    const bill = document.querySelector("#bill");

    const onScroll = () => {
      const scroll = window.scrollY;
      const max = window.innerHeight * 3;
      const p = Math.min(scroll / max, 1);

      anime.set(bag, {
        opacity: 1 - p * 1.2,
        scale: 1 - p * 0.3
      });

      anime.set(product, {
        opacity: p > 0.25 ? (p - 0.25) * 3 : 0,
        translateY: p < 0.4 ? 80 - p * 200 : 0,
        translateX: p > 0.55 ? -(p - 0.55) * 400 : 0
      });

      anime.set(bill, {
        opacity: p > 0.6 ? (p - 0.6) * 3 : 0,
        translateY: p > 0.6 ? 0 : 20
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <DeliveryBag />
        <ProductReveal />
        <BillingCard />

        <div className="z-10 text-center">
          <h1 className="text-2xl font-semibold">
            Your order is confirmed
          </h1>
          <p className="mt-2 text-gray-500">
            We’ve safely received your payment
          </p>
        </div>
      </div>
    </div>
  );
}
