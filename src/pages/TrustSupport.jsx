import { useState } from "react";
import TrustCard from "../components/TrustCard";
import SupportModal from "../components/SupportModal";
import { COPY } from "../utils/copy";
import FAQSection from "../components/FAQSection";

export default function TrustSupport() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen px-6 py-10">
      <FAQSection />
      <TrustCard />
      <button
        onClick={() => setOpen(true)}
        className="mb-6 w-full rounded-xl border border-gray-300 py-3 text-sm"
      >
        Chat with support
      </button>

      <p className="text-sm text-gray-500">{COPY.exit}</p>

      {open && <SupportModal onClose={() => setOpen(false)} />}
    </div>
  );
}
