import { useSyncExternalStore } from "react";

// Breakpoints based on PostPage constants
const pageBreakLarge = 1280;
const pageBreakMedium = 1024;
const contentMaxWidth = 736;

export type ScreenSize = "mobile" | "tablet" | "medium" | "large";

export interface ScreenSizeInfo {
  width: number;
  screenSize: ScreenSize;
  isMobile: boolean;
  isTablet: boolean;
  isMedium: boolean;
  isLarge: boolean;
}

const getScreenSize = (width: number): ScreenSize => {
  if (width < contentMaxWidth) {
    return "mobile";
  } else if (width < pageBreakMedium) {
    return "tablet";
  } else if (width < pageBreakLarge) {
    return "medium";
  } else {
    return "large";
  }
};

const subscribe = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const createScreenSizeInfo = (width: number): ScreenSizeInfo => {
  const screenSize = getScreenSize(width);
  return {
    width,
    screenSize,
    isMobile: screenSize === "mobile",
    isTablet: screenSize === "tablet",
    isMedium: screenSize === "medium",
    isLarge: screenSize === "large",
  };
};

// Cache the snapshot to return stable reference when screenSize hasn't changed
let cachedSnapshot: ScreenSizeInfo | null = null;

const getSnapshot = (): ScreenSizeInfo => {
  const width = window.innerWidth;
  const screenSize = getScreenSize(width);

  // Only create a new object if screenSize changed
  if (cachedSnapshot === null || cachedSnapshot.screenSize !== screenSize) {
    cachedSnapshot = createScreenSizeInfo(width);
  }

  return cachedSnapshot;
};

// SSR default: assume mobile
const serverSnapshot: ScreenSizeInfo = {
  width: contentMaxWidth - 1,
  screenSize: "mobile",
  isMobile: true,
  isTablet: false,
  isMedium: false,
  isLarge: false,
};

const getServerSnapshot = (): ScreenSizeInfo => serverSnapshot;

export const useDetectIsMobile = (): ScreenSizeInfo => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
