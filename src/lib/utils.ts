import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// This function is used to merge multiple CSS class names, handling Tailwind CSS classes with `twMerge` and other classes with `clsx`.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
