import { useSyncExternalStore } from "react";

const mobileAppBreakPointInPx = 415;

const subscribe = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getSnapshot = () => window.innerWidth < mobileAppBreakPointInPx;

const getServerSnapshot = () => true; // SSR default: assume mobile

export const useDetectIsMobile = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
