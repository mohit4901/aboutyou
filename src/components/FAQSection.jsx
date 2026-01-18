import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Package,
  Truck,
  Clock,
  MapPin,
  XCircle,
  Calendar,
  AlertCircle,
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    icon: Truck,
    question: "What do the different order statuses mean?",
    answer:
      "Order Verified: Payment confirmed. Seller Preparing: Item is being packed. Shipped / In Transit: Order is on the way. Out for Delivery: Delivery today. Delivered: Order successfully delivered.",
  },
  {
    icon: Clock,
    question: "Why haven't I received an update yet?",
    answer:
      "Tracking updates can take up to 24–48 hours due to transit delays or carrier sync issues.",
  },
  {
    icon: MapPin,
    question: "My delivery address is incorrect — what do I do?",
    answer:
      "Contact support immediately with your order ID and corrected address.",
  },
  {
    icon: XCircle,
    question: "Can I cancel my order?",
    answer:
      'Cancellations are allowed before shipping while the order is in "Seller Preparing" stage.',
  },
  {
    icon: Calendar,
    question: "Can I change the delivery date or time?",
    answer: "Delivery schedules are controlled by courier partners.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(faqRef.current?.children || [], {
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
      });

      gsap.from(contactRef.current, {
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background py-20 px-4 md:px-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-8">
          <div className="flex-col items-center justify-center">
            {/* ✅ GREEN HEADING */}
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-3">
              Frequently asked questions
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-md">
              Common questions about order tracking and delivery.
            </p>
          </div>

          <div
            ref={contactRef}
            className="p-6 bg-card border border-border rounded-2xl"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Still need help?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="mailto:support@yourstore.com"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition"
              >
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">Email</span>
              </a>

              <a
                href="tel:+919876543210"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition"
              >
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">Call</span>
              </a>

              <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition">
                <MessageCircle className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">Live Chat</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — FAQ */}
        <div
          ref={faqRef}
          className="border border-border rounded-2xl overflow-hidden divide-y divide-border"
        >
          {faqData.map((item, index) => {
            const Icon = item.icon;
            const isOpen = openIndex === index;

            return (
              <div key={index}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group w-full flex items-center gap-4 px-5 py-5 text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-secondary/50 border border-border flex items-center justify-center">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>

                  {/* ✅ GREEN ON HOVER */}
                  <span className="flex-1 text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors">
                    {item.question}
                  </span>

                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "max-h-48 px-5 pb-5" : "max-h-0",
                  )}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed pl-13">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
