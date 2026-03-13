import { useState, useEffect } from "react";

/**
 * A React hook for managing page data with SSR hydration support.
 *
 * This hook handles the data lifecycle for pages that may receive initial data
 * from server-side rendering. When `initialData` is provided (SSR case), it uses
 * that data immediately without making a network request. When `initialData` is
 * null (client-side navigation), it fetches the data from the specified API route.
 *
 * @template T - The shape of the page data being fetched
 *
 * @param initialData - Pre-fetched data from SSR, or null if fetching client-side
 * @param apiRoute - The API endpoint to fetch data from when no initial data exists
 *
 * @returns An object containing:
 *   - `data` - The fetched data, or null if not yet loaded
 *   - `loading` - Whether a fetch is currently in progress
 *   - `error` - Any error that occurred during fetching, or null
 *
 * @example
 * ```tsx
 * const { data, loading, error } = usePageData<HomePageData>(
 *   ssrContext?.pageData ?? null,
 *   '/api/home'
 * );
 * ```
 */
export function usePageData<T>(
  initialData: T | null,
  apiRoute: string,
): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log("usePageData", initialData, apiRoute);
    if (!initialData) {
      setLoading(true);
      fetch(apiRoute)
        .then((res) => res.json())
        .then((data) => {
          setData(data.data);
          if (typeof window !== "undefined") {
            window.document.title = data.title;
          }
        })
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }, [initialData, apiRoute]);

  return { data, loading, error };
}
