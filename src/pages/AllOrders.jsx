import { useNavigate } from "react-router-dom";
import { HoverEffect } from "@/components/ui/hover-card-effect";
import { Button } from "@/components/ui/button";
import { Package, Calendar, ShieldCheck } from "lucide-react";

import headphonesImage from "@/assets/headphones.png";
import airpodsImage from "@/assets/airpods.jpg";
import sonyImage from "@/assets/sony.jpg";
import phoneImage from "@/assets/phone.png";
import shoesImage from "@/assets/shoes.png";
import bagImage from "@/assets/bag.png";

/* 🔹 Mock order data */
const orders = [
  {
    id: "ORD-2024-7829",
    product: "Sony WH-1000XM5 Headphones",
    image: headphonesImage,
    placedOn: "Jan 15, 2026",
    status: "In Transit",
    reassurance:
      "Your package is moving securely through our delivery network.",
  },
  {
    id: "ORD-2024-7830",
    product: "Apple AirPods Pro (2nd Gen)",
    image: airpodsImage,
    placedOn: "Jan 12, 2026",
    status: "Delivered",
    reassurance: "This order was delivered safely without any issues.",
  },
  {
    id: "ORD-2024-7831",
    product: "Bose QuietComfort Ultra",
    image: bagImage,
    placedOn: "Jan 10, 2026",
    status: "Delivered",
    reassurance: "Successfully delivered and confirmed.",
  },
  {
    id: "ORD-2024-7832",
    product: "Nike Air Max Shoes",
    image: shoesImage,
    placedOn: "Jan 8, 2026",
    status: "Delivered",
    reassurance: "Delivered safely to the selected address.",
  },
  {
    id: "ORD-2024-7833",
    product: "Samsung Galaxy S22",
    image: phoneImage,
    placedOn: "Jan 5, 2026",
    status: "Delivered",
    reassurance: "Order completed with no reported issues.",
  },
  {
    id: "ORD-2024-7834",
    product: "Sennheiser Momentum 4",
    image: sonyImage,
    placedOn: "Dec 28, 2025",
    status: "Delivered",
    reassurance: "Delivered successfully and securely.",
  },
];

const AllOrders = () => {
  const navigate = useNavigate();

  /* 🔹 Prioritize active orders */
  const sortedOrders = [...orders].sort((a, b) =>
    a.status === "In Transit" ? -1 : 1
  );

  const orderItems = sortedOrders.map((order) => ({
    title: order.id,
    description: order.product,
    image: order.image,
    link: "/tracking",
    onTrack: () => navigate("/tracking"),

    meta: (
      <div className="space-y-3">
        {/* Date + Status */}
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-white/60">
            <Calendar className="w-3 h-3" />
            {order.placedOn}
          </span>

          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium backdrop-blur-sm ${
              order.status === "In Transit"
                ? "bg-white/20 text-white"
                : "bg-emerald-500/30 text-emerald-200"
            }`}
          >
            {order.status === "In Transit"
              ? "In Transit • On schedule"
              : "Delivered • Completed"}
          </span>
        </div>

        {/* Reassurance copy */}
        <div className="flex items-start gap-2 text-[11px] text-white/60 leading-relaxed">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5" />
          <span>{order.reassurance}</span>
        </div>

        {/* CTA */}
        <Button
          size="sm"
          variant={order.status === "In Transit" ? "default" : "secondary"}
          className="w-full mt-2"
          onClick={() => navigate("/tracking")}
        >
          {order.status === "In Transit" ? "Track order" : "View details"}
        </Button>
      </div>
    ),

    /* 🔹 Highlight active order */
    className:
      order.status === "In Transit"
        ? "ring-1 ring-emerald-400/30 shadow-[0_0_0_1px_rgba(52,211,153,0.25)]"
        : "",
  }));

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Your Orders
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track, review, and manage all your orders in one place.
          </p>

          {/* TRUST STRIP */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            All orders are tracked securely with real-time updates
          </div>
        </div>

        {/* ORDERS GRID */}
        <HoverEffect items={orderItems} />

        {/* EMPTY STATE */}
        {orders.length === 0 && (
          <div className="text-center py-20">
            <Package className="w-12 h-12 mx-auto text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium text-foreground">
              No orders yet
            </h3>
            <p className="mt-2 text-muted-foreground max-w-sm mx-auto">
              Once you place an order, we’ll take care of it from checkout to
              delivery — transparently and securely.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AllOrders;
