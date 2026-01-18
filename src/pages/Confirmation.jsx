import { useState } from "react";
import IntroOverlay from "@/components/IntroOverlay";
import HeroConfirmation from "@/components/confirmation/HeroConfirmation";
import ProductShowcase from "@/components/confirmation/ProductShowcase";
import BillingBreakdown from "@/components/confirmation/BillingBreakdown";
import ConfidenceSignals from "@/components/confirmation/ConfidenceSignals";
import Navbar from "@/components/Navbar";
import PostPurchaseBentoGrid from "../components/Post";

const OrderConfirmationPage = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* INTRO OVERLAY */}
      <IntroOverlay
        show={showIntro}
        title="Order Confirmed"
        onComplete={() => setShowIntro(false)}
      />

      {/* MAIN PAGE */}
      {!showIntro && (
        <div className="scroll-container">
          <Navbar />
          <HeroConfirmation />
          <ProductShowcase />
          <BillingBreakdown />
          <ConfidenceSignals />
          <PostPurchaseBentoGrid />
        </div>
      )}
    </>
  );
};

export default OrderConfirmationPage;
