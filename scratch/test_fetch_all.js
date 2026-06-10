
const SHEET_ID = '1kL5cL3S_m79mNXg0k9wZxFURQuK4VuHiMtnX7qhM6YA';
const GOOGLE_SHEETS_BASE_URL = 'https://docs.google.com/spreadsheets/d';

const SHEET_NAMES = {
  ACCESSORIES: 'accessories',
  TIERS: 'tiers',
  MAINTENANCE: 'maintenance',
  FAQ: 'faq',
  SETTINGS: 'settings',
  GUIDE: 'guide',
  IMPORTANT_NOTES: 'important_notes',
  TERMINATION_RULES: 'termination_rules',
};

async function fetchSheet(sheetName) {
  const url = `${GOOGLE_SHEETS_BASE_URL}/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}&_=${Date.now()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const text = await response.text();
  const jsonStr = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?\s*$/)?.[1];
  if (!jsonStr) throw new Error('Invalid response format');
  const json = JSON.parse(jsonStr);
  if (json.status !== 'ok') throw new Error(json.errors?.[0]?.message || 'Sheets error');
  return json.table.rows.length;
}

async function run() {
  const promises = Object.values(SHEET_NAMES).map(async name => {
    try {
      const len = await fetchSheet(name);
      console.log(`Sheet "${name}": Loaded ${len} rows successfully`);
      return { name, status: 'success', rows: len };
    } catch (err) {
      console.error(`Sheet "${name}": Failed to load - ${err.message}`);
      return { name, status: 'error', error: err.message };
    }
  });

  // Test catalog sheet
  const catalogPromise = (async () => {
    try {
      const catalogId = '13HhcspJ_P0jnCmdz7icVeKQJCGWdur5vJ0wWfM5Wu_I';
      const name = 'טבלאות מחירים בחתך דגם מכשיר וייתרת החודשים לסיום הליסינג';
      const url = `${GOOGLE_SHEETS_BASE_URL}/${catalogId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(name)}&_=${Date.now()}`;
      const response = await fetch(url);
      await response.text();
      console.log('Catalog sheet loaded successfully');
    } catch (err) {
      console.error('Catalog sheet failed to load:', err.message);
    }
  })();

  await Promise.all([...promises, catalogPromise]);
}
run();
