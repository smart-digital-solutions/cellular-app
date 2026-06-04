// =============================================================
//  useAppData.js — Custom Hook לטעינת כל נתוני האפליקציה
// =============================================================

import { useState, useEffect, useCallback, startTransition } from 'react';
import { loadAllData, clearCache, getCachedAll } from './sheetsService';

export function useAppData() {
  const cachedData = getCachedAll();
  // If we have cached data, start with loading=false so the UI renders instantly
  // without any extra re-render cycle.
  const [data, setData] = useState(cachedData);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = useCallback(async (forceRefresh = false) => {
    if (forceRefresh) {
      setLoading(true);
      clearCache();
    }
    try {
      const result = await loadAllData();
      // Use startTransition so React deprioritises this state update —
      // it will not block user interactions or LCP rendering.
      startTransition(() => {
        setData(result);
        setLastUpdated(new Date());
        setLoading(false);
      });
    } catch (err) {
      console.error('useAppData: unexpected error', err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Defer data fetching until the browser is idle — completely off
    // the critical render path. Falls back to 2s delay if no rIC support.
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => fetchData(), { timeout: 3000 });
    } else {
      setTimeout(() => fetchData(), 2000);
    }
  }, [fetchData]);

  return { ...(data || {}), loading, lastUpdated, refresh: () => fetchData(true) };
}

