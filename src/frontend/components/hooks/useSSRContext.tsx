import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface SSRContextValue {
  /** Whether the app is currently in SSR mode (has SSR data to use) */
  isSSR: boolean;
  /** Clears SSR data and switches to SPA mode permanently */
  clearSSRData: () => void;
}

const SSRContext = createContext<SSRContextValue | null>(null);

interface SSRProviderProps {
  children: ReactNode;
}

export const SSRProvider: React.FC<SSRProviderProps> = ({ children }) => {
  const [isSSR, setIsSSR] = useState<boolean>(
    typeof window !== "undefined" ? window.__SSR__ : true,
  );

  /**
   * Clears all SSR data and switches the app to SPA mode permanently.
   * Call this when navigating away from an SSR-rendered page
   * to ensure the app fetches fresh data from the API.
   */
  const clearSSRData = useCallback(() => {
    if (!isSSR) return; // Already cleared, nothing to do

    // Clear the window SSR flag
    if (typeof window !== "undefined") {
      window.__SSR__ = false;
      window.__INITIAL_DATA__ = undefined;
    }

    setIsSSR(false);
  }, [isSSR]);

  const value: SSRContextValue = {
    isSSR,
    clearSSRData,
  };

  return <SSRContext.Provider value={value}>{children}</SSRContext.Provider>;
};

/**
 * Hook to access SSR context.
 * Must be used within an SSRProvider.
 */
export const useSSRContext = (): SSRContextValue => {
  const context = useContext(SSRContext);
  if (!context) {
    throw new Error("useSSRContext must be used within an SSRProvider");
  }
  return context;
};
