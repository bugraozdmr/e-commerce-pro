import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// FOR TAILWIND
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
