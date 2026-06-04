// =============================================================
//  useAppData.js — Custom Hook לטעינת כל נתוני האפליקציה
// =============================================================

import { useState, useEffect, useCallback } from 'react';
import { loadAllData, clearCache, getCachedAll } from './sheetsService';

export function useAppData() {
  const [data, setData] = useState(getCachedAll);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    if (forceRefresh) clearCache();
    try {
      const result = await loadAllData();
      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('useAppData: unexpected error', err);
      // במקרה של שגיאה נשארים עם נתוני המטמון (או ה-fallback) - לא דורסים אותם!
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Use a microtask to avoid synchronous state updates during the effect's execution phase
    // which can trigger the 'set-state-in-effect' lint warning/error.
    Promise.resolve().then(() => {
      fetchData();
    });
  }, [fetchData]);

  return { ...(data || getCachedAll() || {}), loading, lastUpdated, refresh: () => fetchData(true) };
}
