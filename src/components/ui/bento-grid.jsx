import React from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated",
        className
      )}
    >
      {/* Header Visual */}
      <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl">
        {header}
      </div>

      {/* Content */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          {icon}
          <h3 className="font-semibold text-lg text-foreground">
            {title}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
