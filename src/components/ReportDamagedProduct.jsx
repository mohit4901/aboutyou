import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export function DamagedProductCard() {
  return (
    <div className="py-6 px-5">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative rounded-[32px] bg-card border border-border p-10 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-success/10 blur-3xl"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative z-10 flex items-start gap-6">
        <ShieldCheck className="text-success w-10 h-10" />

        <div>
          <h3 className="text-xl font-semibold text-foreground">
            Item arrived damaged?
          </h3>

          <p className="mt-2 text-muted-foreground max-w-sm">
            Report the issue and we’ll handle replacement or refund immediately.
          </p>

          <button className="mt-6 font-medium text-success">
            Report damage →
          </button>
        </div>
      </div>
    </motion.div>
    </div>
  );
}
export default DamagedProductCard;
