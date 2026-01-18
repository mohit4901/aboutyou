import { motion } from "framer-motion";
import { Calendar, RotateCcw } from "lucide-react";

export function RescheduleReturnCard() {
  return (
    <div className="py-6 px-5">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="rounded-[36px] bg-gradient-to-br from-secondary/40 to-background border border-border p-10"
    >
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Delivery flexibility
      </h3>

      <div className="space-y-5">
        <motion.div
          whileHover={{ x: 8 }}
          className="flex items-center gap-4 cursor-pointer"
        >
          <Calendar className="text-success" />
          <span className="text-foreground font-medium">
            Reschedule delivery date
          </span>
        </motion.div>

        <motion.div
          whileHover={{ x: 8 }}
          className="flex items-center gap-4 cursor-pointer"
        >
          <RotateCcw className="text-muted-foreground" />
          <span className="text-muted-foreground">
            Start a return after delivery
          </span>
        </motion.div>
      </div>
    </motion.div>
    </div>
  );
}
export default RescheduleReturnCard;