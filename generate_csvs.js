import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  FALLBACK_TIERS, FALLBACK_ACCESSORIES, FALLBACK_MAINTENANCE,
  FALLBACK_FAQ, FALLBACK_SETTINGS, FALLBACK_GUIDE,
  FALLBACK_IMPORTANT_NOTES, FALLBACK_TERMINATION_RULES,
  MAINT_COL_TIER, MAINT_COL_SCREEN_1, MAINT_COL_SCREEN_2,
  MAINT_COL_THEFT_1, MAINT_COL_THEFT_2, MAINT_COL_DISABLE_1,
  MAINT_COL_DISABLE_2
} from './src/fallbackData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, 'sheets_export');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function escapeCsv(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function writeCsv(filename, data, columns) {
  const filePath = path.join(outDir, filename);
  const header = columns.map(escapeCsv).join(',') + '\n';
  const rows = data.map(row => columns.map(col => escapeCsv(row[col])).join(',')).join('\n');
  fs.writeFileSync(filePath, '\uFEFF' + header + rows, 'utf8'); // \uFEFF for Excel UTF-8 BOM
}

// 1. Guide
const guideCols = ['id', 'section', 'title', 'subtitle', 'items', 'footer', 'style', 'icon', 'badge', 'order', 'isActive'];
const guideData = FALLBACK_GUIDE.map(item => ({
  ...item,
  items: Array.isArray(item.items) ? item.items.join(' | ') : item.items,
  isActive: 'TRUE'
}));
writeCsv('guide.csv', guideData, guideCols);

// 2. Important Notes
const importantNotesCols = ['id', 'title', 'content', 'severity', 'icon', 'order', 'isActive'];
const importantNotesData = FALLBACK_IMPORTANT_NOTES.map(item => ({ ...item, isActive: 'TRUE' }));
writeCsv('important_notes.csv', importantNotesData, importantNotesCols);

// 3. Termination Rules
const terminationRulesCols = ['id', 'title', 'content', 'category', 'icon', 'order', 'isActive'];
const terminationRulesData = FALLBACK_TERMINATION_RULES.map(item => ({ ...item, isActive: 'TRUE' }));
writeCsv('termination_rules.csv', terminationRulesData, terminationRulesCols);

// 4. FAQ
const faqCols = ['question', 'answer', 'type', 'order', 'isActive'];
const faqData = FALLBACK_FAQ.map(item => ({ ...item, isActive: 'TRUE' }));
writeCsv('faq.csv', faqData, faqCols);

// 5. Tiers
const tiersCols = ['id', 'label', 'desc', 'allowance', 'restrictToSimOnly', 'isActive'];
const tiersData = FALLBACK_TIERS.map(item => ({ ...item, isActive: 'TRUE' }));
writeCsv('tiers.csv', tiersData, tiersCols);

// 6. Devices
const devicesCols = ['id', 'label', 'category', 'totalCost', 'isActive'];
const devicesData = FALLBACK_ACCESSORIES.map(item => ({ ...item, isActive: 'TRUE' }));
writeCsv('devices.csv', devicesData, devicesCols);

// 7. Maintenance
const maintenanceCols = [MAINT_COL_TIER, MAINT_COL_SCREEN_1, MAINT_COL_SCREEN_2, MAINT_COL_THEFT_1, MAINT_COL_THEFT_2, MAINT_COL_DISABLE_1, MAINT_COL_DISABLE_2, 'isActive'];
const maintenanceData = FALLBACK_MAINTENANCE.map(item => ({ ...item, isActive: 'TRUE' }));
writeCsv('maintenance.csv', maintenanceData, maintenanceCols);

// 8. Settings
const settingsCols = ['key', 'value'];
const settingsData = Object.entries(FALLBACK_SETTINGS).map(([key, value]) => ({ key, value }));
writeCsv('settings.csv', settingsData, settingsCols);

console.log('CSV files generated successfully in ./sheets_export');
