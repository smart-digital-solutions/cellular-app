// =============================================================
//  useAppData.js — Custom Hook לטעינת כל נתוני האפליקציה
//  דפוס: Stale-While-Revalidate (SWR)
//  1. מציג קאש מיידי אם קיים
//  2. תמיד מריץ fetch מגוגל שיטס ברקע עם mount
//  3. מעדכן את ה-UI בנתונים החיים כשמגיעים
// =============================================================

import { useState, useEffect, useCallback, startTransition } from 'react';
import { loadAllData, clearCache, getCachedAll } from './sheetsService';

export function useAppData() {
  // מציג קאש מיידי כדי שה-UI ייטען מהר
  const [data, setData] = useState(() => getCachedAll());
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = useCallback(async (forceRefresh = false) => {
    if (forceRefresh) {
      clearCache();
    }
    setLoading(true);
    try {
      const result = await loadAllData();
      // startTransition: לא חוסם את ה-UI בזמן העדכון
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
    // תמיד מריץ fetch מגוגל שיטס כשהדפדפן פנוי
    // requestIdleCallback מבטיח שזה לא יחסום את ה-LCP / render הראשוני
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => fetchData(false), { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => fetchData(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [fetchData]);

  return { ...(data || {}), loading, lastUpdated, refresh: () => fetchData(true) };
}


