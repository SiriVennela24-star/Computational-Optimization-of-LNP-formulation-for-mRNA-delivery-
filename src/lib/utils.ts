import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(val: number | undefined | null, decimals: number = 2): string {
  if (val === undefined || val === null || isNaN(val)) return "N/A";
  return val.toFixed(decimals);
}

export function formatPercent(val: number | undefined | null, decimals: number = 1): string {
  if (val === undefined || val === null || isNaN(val)) return "N/A";
  return `${val.toFixed(decimals)}%`;
}

export function formatSci(val: number | undefined | null): string {
  if (val === undefined || val === null || isNaN(val)) return "N/A";
  if (val < 0.001) return val.toExponential(2);
  return val.toFixed(4);
}
