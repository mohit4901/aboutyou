import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";

type Direction = "top" | "bottom" | "left" | "right";

const getDirection = (
  ev: React.MouseEvent<HTMLDivElement>,
  obj: HTMLElement
): Direction => {
  const { width: w, height: h, left, top } = obj.getBoundingClientRect();
  const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
  const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
  const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
  
  switch (d) {
    case 0: return "top";
    case 1: return "right";
    case 2: return "bottom";
    case 3: return "left";
    default: return "left";
  }
};

const trackButtonVariants = {
  initial: { opacity: 0, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
  top: { opacity: 1, y: 4 },
  bottom: { opacity: 1, y: -4 },
  left: { opacity: 1, x: 4 },
  right: { opacity: 1, x: -4 },
};

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    image?: string;
    meta?: React.ReactNode;
    action?: React.ReactNode;
    onTrack?: () => void;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [directions, setDirections] = useState<Record<number, Direction>>({});
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleMouseEnter = (idx: number, event: React.MouseEvent<HTMLDivElement>) => {
    const element = cardRefs.current[idx];
    if (element) {
      const direction = getDirection(event, element);
      setDirections(prev => ({ ...prev, [idx]: direction }));
    }
    setHoveredIndex(idx);
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          ref={(el) => { cardRefs.current[idx] = el; }}
          className="relative group block p-1.5 h-full w-full"
          onMouseEnter={(e) => handleMouseEnter(idx, e)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Existing hover background animation */}
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-primary/5 block rounded-2xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          
          {/* Image-first card with overlay */}
          <div className="relative h-full w-full rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 z-20">
            {/* Full-bleed background image */}
            {item.image && (
              <div className="relative w-full aspect-[4/3]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Subtle hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === idx ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Text overlay at bottom-left */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-end justify-between gap-3">
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <h4 className="text-white font-semibold text-base tracking-tight leading-tight">
                        {item.description}
                      </h4>
                      <p className="text-white/70 text-xs font-medium">
                        {item.title}
                      </p>
                    </div>
                    
                    {/* Direction-aware Track button */}
                    <AnimatePresence>
                      {hoveredIndex === idx && item.onTrack && (
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            item.onTrack?.();
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors whitespace-nowrap border border-white/20"
                          variants={trackButtonVariants}
                          initial="initial"
                          animate={directions[idx] || "left"}
                          exit="exit"
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          Track
                          <ArrowRight className="w-3.5 h-3.5" />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Meta info (date, status) */}
                  {item.meta && (
                    <div className="mt-2.5 pt-2.5 border-t border-white/15">
                      {item.meta}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Fallback for cards without images */}
            {!item.image && (
              <div className="p-4 bg-card border border-border h-full">
                <div className="space-y-1">
                  <h4 className="text-foreground font-semibold text-sm">
                    {item.description}
                  </h4>
                  <p className="text-muted-foreground text-xs">
                    {item.title}
                  </p>
                </div>
                {item.meta && <div className="mt-3">{item.meta}</div>}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Legacy exports for backward compatibility
export const HoverCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl h-full w-full p-3 overflow-hidden bg-card border border-border relative z-20",
        "shadow-sm hover:shadow-md transition-shadow duration-300",
        className
      )}
    >
      <div className="relative z-50">{children}</div>
    </div>
  );
};

export const HoverCardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-foreground text-sm font-semibold tracking-tight", className)}>
      {children}
    </h4>
  );
};

export const HoverCardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "text-muted-foreground text-xs leading-relaxed line-clamp-1",
        className
      )}
    >
      {children}
    </p>
  );
};
