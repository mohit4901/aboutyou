import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconMapPin,
  IconX,
  IconCalendarEvent,
  IconShieldCheck,
} from "@tabler/icons-react";

/* 🔹 HEADER VISUAL (reusable) */
const SoftHeader = ({ variant = "success" }) => {
  const styles = {
    success:
      "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5",
    danger:
      "bg-gradient-to-br from-red-500/20 to-red-500/5",
    neutral:
      "bg-gradient-to-br from-zinc-500/20 to-zinc-500/5",
  };

  return (
    <div
      className={`flex h-full w-full rounded-xl ${styles[variant]} border border-border`}
    />
  );
};

export default function PostPurchaseBentoGrid() {
  return (
    <section className="w-full py-32">
      {/* SECTION HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-20 px-6">
        <h2 className="font-display text-5xl font-bold text-foreground mb-4">
          You’re always in control
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Make changes, fix issues, or adjust delivery — without stress.
        </p>
      </div>

      {/* BENTO GRID */}
      <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[22rem] px-6">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </section>
  );
}

/* 🔹 GRID ITEMS */
const items = [
  {
    title: "Change delivery address",
    description:
      "Update where your order is going before it gets dispatched.",
    header: <SoftHeader variant="success" />,
    className: "md:col-span-2",
    icon: <IconMapPin className="h-5 w-5 text-emerald-500" />,
  },
  {
    title: "Cancel order",
    description:
      "Cancel before packing begins. No hidden penalties.",
    header: <SoftHeader variant="danger" />,
    className: "md:col-span-1",
    icon: <IconX className="h-5 w-5 text-red-500" />,
  },
  {
    title: "Reschedule or return",
    description:
      "Pick a better delivery date or start a return after delivery.",
    header: <SoftHeader variant="neutral" />,
    className: "md:col-span-1",
    icon: <IconCalendarEvent className="h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Report damaged product",
    description:
      "We’ll handle replacement or refund quickly and fairly.",
    header: <SoftHeader variant="success" />,
    className: "md:col-span-2",
    icon: <IconShieldCheck className="h-5 w-5 text-emerald-500" />,
  },
];
