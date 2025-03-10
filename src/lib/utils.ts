import { clsx, type ClassValue } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createQueryString(
  name: string,
  value: string,
  searchParams: ReadonlyURLSearchParams,
) {
  const params = new URLSearchParams(searchParams.toString());
  params.append(name, value);
  return params.toString();
}
