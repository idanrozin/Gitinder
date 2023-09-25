import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export function waitForElement(selector: string): Promise<Element | null> {
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        const element = document.querySelector(selector);
        if (element) {
          observer.disconnect();
          resolve(element);
        }
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, 5000);
  });
}
