import Lenis from "lenis";
import { useEffect } from "react";

export const Scroller = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize Lenis
      new Lenis({
        autoRaf: true,
      });
    }
  }, [typeof window]);
  return <></>;
};
