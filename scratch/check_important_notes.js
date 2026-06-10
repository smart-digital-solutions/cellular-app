
const SHEET_ID = '1kL5cL3S_m79mNXg0k9wZxFURQuK4VuHiMtnX7qhM6YA';
const GOOGLE_SHEETS_BASE_URL = 'https://docs.google.com/spreadsheets/d';

async function fetchSheet(sheetName) {
  const url = `${GOOGLE_SHEETS_BASE_URL}/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}&_=${Date.now()}`;
  const response = await fetch(url);
  const text = await response.text();
  const jsonStr = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?\s*$/)?.[1];
  if (!jsonStr) throw new Error('Invalid response format');
  const json = JSON.parse(jsonStr);
  if (json.status !== 'ok') throw new Error(json.errors?.[0]?.message || 'Sheets error');
  
  const { cols, rows } = json.table;
  const headers = cols.map(c => c.label || c.id);
  const data = rows.map(row => {
    const obj = {};
    headers.forEach((h, i) => {
      const cell = row.c[i];
      obj[h] = cell?.v ?? '';
    });
    return obj;
  });
  return data;
}

async function run() {
  try {
    const data = await fetchSheet('important_notes');
    console.log('IMPORTANT NOTES LENGTH:', data.length);
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}
run();
