import { useState, useEffect, useRef, useCallback } from 'react';

type FetchFunction<T> = () => Promise<T>;

interface UseLazyDataOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook for lazily loading data when a component enters the viewport
 * @param fetchFn Function that returns a Promise with the data to load
 * @param options Configuration options for the IntersectionObserver
 * @returns Object with data, loading state, error state, and a reference to attach to the trigger element
 */
function useLazyData<T>(
  fetchFn: FetchFunction<T>,
  options: UseLazyDataOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [triggered, setTriggered] = useState(false);
  
  const {
    threshold = 0.1,
    rootMargin = '200px 0px',
    triggerOnce = true
  } = options;
  
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  // Function to fetch the data
  const fetchData = useCallback(async () => {
    if (triggered && triggerOnce) return;
    
    setLoading(true);
    setError(null);
    setTriggered(true);
    
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [fetchFn, triggered, triggerOnce]);

  // Set up the intersection observer
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      // Fallback for browsers that don't support IntersectionObserver
      fetchData();
      return;
    }
    
    const currentTrigger = triggerRef.current;
    if (!currentTrigger) return;
    
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData();
          
          // If triggerOnce is true, disconnect the observer after triggering
          if (triggerOnce && observer.current && currentTrigger) {
            observer.current.unobserve(currentTrigger);
          }
        }
      },
      { threshold, rootMargin }
    );
    
    observer.current.observe(currentTrigger);
    
    return () => {
      if (observer.current && currentTrigger) {
        observer.current.unobserve(currentTrigger);
      }
    };
  }, [fetchData, threshold, rootMargin, triggerOnce]);

  // Function to manually trigger loading
  const trigger = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, triggerRef, trigger };
}

export default useLazyData; 