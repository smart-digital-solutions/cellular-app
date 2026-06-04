// =============================================================
//  useAppData.js — Custom hook לטעינת כל נתוני האפליקציה
//  ארכיטקטורת SWR: רנדור מיידי מ-cache → עדכון ברקע מ-Sheets
// =============================================================

import { useState, useEffect, useCallback } from 'react';
import { getCachedAll, loadAllData, clearCache } from './sheetsService';

export function useAppData() {
  const [data, setData] = useState(() => getCachedAll());
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchFresh = useCallback(async () => {
    setLoading(true);
    try {
      const fresh = await loadAllData();
      setData(prev => ({ ...prev, ...fresh }));
      setLastUpdated(new Date());
    } catch (err) {
      console.warn('useAppData: fetch failed, keeping cached/fallback data', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFresh();
  }, [fetchFresh]);

  const refresh = useCallback(() => {
    clearCache();
    fetchFresh();
  }, [fetchFresh]);

  return {
    // ── נתוני מחשבון ──
    tiers:    data.tiers,
    devices:  data.devices,
    // ── מחירון נזקים ──
    maintenance: data.maintenance,
    // ── שאלות ותשובות ──
    faq: data.faq,
    // ── הגדרות גלובליות ──
    settings: data.settings,
    // ── 🆕 מדריך והנחיות (דינמי מ-Sheets) ──
    guide: data.guide,
    // ── 🆕 דגשים חשובים (דינמי מ-Sheets) ──
    importantNotes: data.importantNotes,
    // ── 🆕 כללי סיום ליסינג (דינמי מ-Sheets) ──
    terminationRules: data.terminationRules,
    // ── קטלוג ממשלתי ──
    catalog: data.catalog,
    catalogIsFallback: data.catalogIsFallback,
    // ── מצב ──
    source: data.source,
    errors: data.errors,
    loading,
    lastUpdated,
    refresh,
  };
}
