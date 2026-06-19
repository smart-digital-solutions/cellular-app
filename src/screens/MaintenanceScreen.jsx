import { useState } from 'react';
import { Smartphone, CheckCircle2, LayoutList } from 'lucide-react';
import OmegaSelect from '../components/OmegaSelect';

// ──────────────────────────────────────────────
//  Helpers
// ──────────────────────────────────────────────
const normalizeTier = (s) => String(s || '').replace(/מעל ל-?/g, 'מעל').replace(/[\s,₪ש"ח\-]/g, '');
const checkTierMatch = (tier1, tier2) => {
  if (!tier1 || !tier2) return false;
  const n1 = normalizeTier(tier1);
  const n2 = normalizeTier(tier2);
  return n1 === n2 || n1.includes(n2) || n2.includes(n1);
};

const formatCurrency = (val) => {
  if (typeof val !== 'string' && typeof val !== 'number') return val;
  const s = String(val).trim();
  if (!s) return s;
  if (/[^\d.,₪\s\-]/.test(s)) return s;
  const num = parseFloat(s.replace(/,/g, '').replace(/₪/g, ''));
  if (!isNaN(num)) {
    return num.toLocaleString('he-IL', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + ' ₪';
  }
  return s;
};

// ──────────────────────────────────────────────
//  Header grouping
// ──────────────────────────────────────────────
function buildHeaderGroups(rawHeaders) {
  const flat = rawHeaders.map((h, idx) => {
    const [top, ...rest] = h.split('\n');
    return { top: top.trim(), sub: rest.join('\n').trim(), idx, raw: h };
  });
  const groups = [];
  flat.forEach((col) => {
    const last = groups[groups.length - 1];
    if (last && last.top === col.top) {
      last.cols.push(col);
    } else {
      groups.push({ top: col.top, cols: [col] });
    }
  });
  return { flat, groups };
}

// ──────────────────────────────────────────────
//  Rowspan — only in "show all" mode
// ──────────────────────────────────────────────
function computeRowSpans(rows, rawHeaders, showAll) {
  const n = rows.length;
  const result = rows.map(() => rawHeaders.map(() => ({ render: true, span: 1 })));
  if (!showAll) return result; // single-row view → no merging needed

  rawHeaders.forEach((header, colIdx) => {
    if (colIdx === 0) return;
    let i = 0;
    while (i < n) {
      const val = String(rows[i][header] ?? '').trim();
      if (!val) { i++; continue; }
      let j = i + 1;
      while (j < n && String(rows[j][header] ?? '').trim() === val) j++;
      if (j - i > 1) {
        result[i][colIdx].span = j - i;
        for (let k = i + 1; k < j; k++) result[k][colIdx].render = false;
      }
      i = j;
    }
  });
  return result;
}

// ──────────────────────────────────────────────
//  Column colors — text-only, WCAG AA verified
//  red-700   (#b91c1c) on white: 6.1:1 ✓
//  amber-700 (#b45309) on white: 4.9:1 ✓
//  indigo-700(#4338ca) on white: 6.0:1 ✓
// ──────────────────────────────────────────────
function getColColor(headerRaw) {
  if (headerRaw.includes('אובדן') || headerRaw.includes('גניבה'))
    return {
      groupText: 'text-red-700 dark:text-red-400',
      subText:   'text-red-600 dark:text-red-400',
      cell:      'text-red-700 dark:text-red-400',
    };
  if (headerRaw.includes('השבתת') && !headerRaw.includes('שבר'))
    return {
      groupText: 'text-amber-700 dark:text-amber-400',
      subText:   'text-amber-600 dark:text-amber-400',
      cell:      'text-amber-700 dark:text-amber-400',
    };
  if (headerRaw.includes('שבר'))
    return {
      groupText: 'text-indigo-700 dark:text-indigo-400',
      subText:   'text-indigo-600 dark:text-indigo-400',
      cell:      'text-indigo-700 dark:text-indigo-300',
    };
  return { groupText: '', subText: 'opacity-60', cell: '' };
}

// ──────────────────────────────────────────────
//  Mobile Card
// ──────────────────────────────────────────────
function MobileCard({ row, flat, groups }) {
  const tier = row[flat[0].raw];
  return (
    <div className="rounded-2xl border p-4 border-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 shadow-[0_4px_20px_rgba(6,182,212,0.2)]">
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-cyan-200 dark:border-cyan-800">
        <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" aria-hidden="true" />
        <span className="font-black text-base text-cyan-900 dark:text-cyan-100">{tier}</span>
      </div>
      <div className="space-y-3">
        {groups.slice(1).map((group, gi) => {
          const c = getColColor(group.top);
          return (
            <div key={gi} className="rounded-xl border border-slate-100 dark:border-white/10 overflow-hidden">
              <div className={`px-3 py-1.5 text-xs font-black bg-slate-50 dark:bg-white/5 ${c.groupText}`}>
                {group.top}
              </div>
              <div className="divide-y divide-slate-50 dark:divide-white/5">
                {group.cols.map((col) => (
                  <div key={col.idx} className="flex justify-between items-start gap-3 px-3 py-2.5">
                    <span className="text-xs opacity-60 leading-snug max-w-[55%]">{col.sub}</span>
                    <span className={`font-bold text-sm leading-snug max-w-[45%] text-left ${c.cell}`}>
                      {formatCurrency(row[col.raw])}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
//  Main Component
// ──────────────────────────────────────────────
const SHOW_ALL_VALUE = '__all__';
const ALL_OPTION_GROUP = { '📋 הצג הכל': [{ id: SHOW_ALL_VALUE, label: 'הכל — הצג את כל הטבלה' }] };

const MaintenanceScreen = ({ maintenance, catalog, groupedCatalog }) => {
  const [selectedMaintDevice, setSelectedMaintDevice] = useState(SHOW_ALL_VALUE);

  if (!maintenance || maintenance.length === 0) {
    return <p className="text-center opacity-50 py-12">אין נתוני תחזוקה</p>;
  }

  const rawHeaders = Object.keys(maintenance[0]).filter(
    h => h.toLowerCase() !== 'isactive' && !/^[A-Z]{1,3}$/.test(h)
  );
  const { flat, groups } = buildHeaderGroups(rawHeaders);
  const firstRaw = rawHeaders[0];

  // Determine which rows to show
  const showAll = !selectedMaintDevice || selectedMaintDevice === SHOW_ALL_VALUE;
  const selectedDevice = !showAll ? catalog?.find(d => d.id === selectedMaintDevice) : null;
  const visibleRows = showAll
    ? maintenance
    : maintenance.filter(row => checkTierMatch(row[firstRaw], selectedDevice?.maintenanceTier));

  const rowSpans = computeRowSpans(visibleRows, rawHeaders, showAll);

  // Build options: OmegaSelect (groups=true) expects { groupLabel: [items] }
  // Merge 'הכל' as first key, then spread device groups
  const deviceOptions = {
    ...ALL_OPTION_GROUP,
    ...(groupedCatalog && !Array.isArray(groupedCatalog) ? groupedCatalog : {}),
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-6xl mx-auto relative z-10" style={{ color: 'var(--clr-text-1)' }}>

      {/* ── Hero Card ── */}
      <div className="relative z-50 rounded-[2rem] bg-white/90 dark:bg-[#0B1120] text-slate-900 dark:text-white p-6 sm:p-10 shadow-xl dark:shadow-2xl border border-slate-200 dark:border-white/10 backdrop-blur-md transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 pointer-events-none rounded-[2rem]" aria-hidden="true" />
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-4">מחירון תחזוקה והשתתפות בנזקים</h2>
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-8 max-w-4xl text-balance">
            מסלול הליסינג כולל שירות תיקונים. במקרים של אובדן/גניבה/השבתה, קיימת השתתפות עצמית לפי מחירון המכרז,{' '}
            <span className="whitespace-nowrap">כולל מע&quot;מ (18%).</span>
          </p>

          {/* Device finder */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <label htmlFor="maint-device-select" className="block text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-wider mb-3 flex items-center gap-2">
              <Smartphone className="w-4 h-4" aria-hidden="true" /> בחר מכשיר לסינון הטבלה:
            </label>
            <OmegaSelect
              id="maint-device-select"
              value={selectedMaintDevice}
              onChange={(e) => setSelectedMaintDevice(e.target.value)}
              options={deviceOptions}
              placeholder="הכל — הצג את כל הטבלה"
              groups={true}
            />

            {/* Status bar */}
            <div className="mt-4 min-h-[28px]">
              {showAll ? (
                <p className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-2">
                  <LayoutList className="w-3.5 h-3.5" aria-hidden="true" />
                  מוצגות כל {maintenance.length} מדרגות ההשתתפות העצמית
                </p>
              ) : selectedDevice ? (
                <div className="text-emerald-700 dark:text-emerald-400 text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2" role="status">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  מוצגת מדרגה:{' '}
                  <span className="underline decoration-2 underline-offset-4">{selectedDevice.maintenanceTier}</span>
                  <button
                    onClick={() => setSelectedMaintDevice(SHOW_ALL_VALUE)}
                    className="mr-auto text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 underline transition-colors"
                    aria-label="חזור לכל הטבלה"
                  >
                    ← הצג הכל
                  </button>
                </div>
              ) : (
                <p className="text-amber-600 dark:text-amber-400 text-xs">המכשיר לא נמצא בקטלוג</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop Table ── */}
      <div
        className="hidden md:block border rounded-[1.5rem] shadow-xl overflow-hidden transition-all duration-500"
        style={{ backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}
      >
        <div className="overflow-x-auto">
          <table
            className="w-full text-right border-collapse"
            id="maintenance-table"
            dir="rtl"
            aria-label="טבלת השתתפות עצמית לפי מדרגת מחיר מכשיר"
          >
            <thead>
              {/* ── Row 1: merged group headers ── */}
              <tr className="border-b" style={{ backgroundColor: 'var(--clr-surface-2)', borderColor: 'var(--clr-border)' }}>



                {groups.map((group, gi) => {
                  const isTier = gi === 0;
                  const c = getColColor(group.top);

                  if (isTier) {
                    return (
                      <th
                        key={gi}
                        scope="col"
                        rowSpan={2}
                        className="p-4 text-sm font-black text-right align-middle border-l w-56 min-w-[220px] leading-snug"
                        style={{ borderColor: 'var(--clr-border)', color: 'var(--clr-text-1)' }}
                      >
                        {group.top}
                        {group.cols[0]?.sub && (
                          <div className="text-xs font-normal opacity-60 mt-1 leading-snug whitespace-normal">
                            {group.cols[0].sub}
                          </div>
                        )}
                      </th>
                    );
                  }

                  // Colored text on neutral background — no filled color
                  return (
                    <th
                      key={gi}
                      scope="colgroup"
                      colSpan={group.cols.length}
                      className={`px-4 py-3 text-sm font-black text-center border-l border-b ${c.groupText}`}
                      style={{ borderColor: 'var(--clr-border)' }}
                    >
                      {group.top}
                    </th>
                  );
                })}
              </tr>

              {/* ── Row 2: sub-headers ── */}
              <tr style={{ backgroundColor: 'var(--clr-surface-2)', borderColor: 'var(--clr-border)' }}>
                {groups.slice(1).flatMap((group) => {
                  const c = getColColor(group.top);
                  return group.cols.map((col) => (
                    <th
                      key={col.idx}
                      scope="col"
                      className={`px-3 pb-3 pt-1 text-xs font-bold text-center border-l leading-snug ${c.subText}`}
                      style={{ borderColor: 'var(--clr-border)' }}
                    >
                      {col.sub || col.top}
                    </th>
                  ));
                })}
              </tr>
            </thead>

            <tbody className="divide-y" style={{ borderColor: 'var(--clr-border)' }}>
              {visibleRows.map((row, rowIdx) => {
                const origIdx = maintenance.indexOf(row);
                return (
                  <tr
                    key={origIdx}
                    className={`transition-all duration-300 ${
                      !showAll
                        ? 'bg-cyan-50 dark:bg-cyan-900/20 shadow-[0_2px_16px_rgba(6,182,212,0.18)]'
                        : 'hover:bg-slate-50/60 dark:hover:bg-white/5'
                    }`}
                  >
                    {rawHeaders.map((header, colIdx) => {
                      const spanInfo = rowSpans[rowIdx][colIdx];
                      if (!spanInfo.render) return null;

                      const val = row[header];
                      const isTier = colIdx === 0;
                      const c = getColColor(header);
                      const isLongText = String(val).length > 30;

                      if (isTier) {
                        return (
                          <td
                            key={colIdx}
                            rowSpan={spanInfo.span}
                            className={`p-4 font-black text-sm border-l leading-snug ${
                              !showAll ? 'text-cyan-800 dark:text-cyan-200' : ''
                            }`}
                            style={{
                              borderColor: 'var(--clr-border)',
                              color: showAll ? 'var(--clr-text-1)' : undefined,
                              backgroundColor: showAll ? 'var(--clr-surface-2)' : undefined,
                              verticalAlign: 'middle',
                            }}
                          >
                            {val}
                          </td>
                        );
                      }

                      return (
                        <td
                          key={colIdx}
                          rowSpan={spanInfo.span}
                          className={[
                            'border-l text-center',
                            isLongText ? 'p-3 text-xs leading-relaxed font-medium' : 'p-4 text-sm font-bold',
                            !showAll ? 'text-cyan-900 dark:text-cyan-100' : c.cell,
                          ].join(' ')}
                          style={{
                            borderColor: 'var(--clr-border)',
                            verticalAlign: spanInfo.span > 1 ? 'middle' : 'top',
                          }}
                        >
                          {formatCurrency(val)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Mobile Cards ── */}
      <div className="md:hidden space-y-2" aria-label="טבלת השתתפות עצמית — תצוגת נייד">
        {showAll ? (
          <p className="text-xs font-bold opacity-50 mb-4 text-center">{maintenance.length} מדרגות השתתפות עצמית</p>
        ) : null}
        {visibleRows.map((row, rowIdx) => (
          <MobileCard
            key={rowIdx}
            row={row}
            flat={flat}
            groups={groups}
          />
        ))}
      </div>

    </div>
  );
};

export default MaintenanceScreen;
