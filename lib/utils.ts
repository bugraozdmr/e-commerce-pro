import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// FOR TAILWIND
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatter = new Intl.NumberFormat("tr-TR",{
  style: "currency",
  currency: "TRY",
});