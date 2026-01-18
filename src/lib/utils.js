import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind class merge helper
 * usage: cn("p-4", condition && "bg-red-500")
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
