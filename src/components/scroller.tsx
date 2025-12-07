import Lenis from "lenis";
import { useEffect } from "react";

export const Scroller = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize Lenis
      const lenis = new Lenis({
        autoRaf: true,
      });

      // Listen for the scroll event and log the event data
      lenis.on("scroll", (e) => {
        console.log(e);
      });
    }
  }, [typeof window]);
  return <></>;
};
