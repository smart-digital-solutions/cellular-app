
if (!global.fetch) global.fetch = fetch;

function getCatalogCategory(manufacturer, model) {
  const mfr = String(manufacturer).toUpperCase();
  const mod = String(model).toUpperCase();
  if (mfr.includes('APPLE')) return 'Apple iPhone';
  if (mod.includes('Z FOLD') || mod.includes('Z FLIP')) return 'Samsung Galaxy - מתקפלים (Z)';
  if (mod.includes('S25')) return 'Samsung Galaxy - סדרת S25';
  if (/\bA\d{2}/.test(mod)) return 'Samsung Galaxy - סדרת A';
  return 'Samsung Galaxy';
}
function parseCatalog(rows) {
  return rows
    .filter(r => {
      const mfr = String(r['יצרן'] || r[Object.keys(r).find(k => k.includes('יצרן')) || ''] || '').trim();
      return mfr.length > 0; // מסנן את שורת מספרי החודשים
    })
    .map((r, idx) => {
      const findVal = (...keys) => {
        const key = Object.keys(r).find(k => keys.some(kw => k.includes(kw)));
        return key ? String(r[key] || '').trim() : '';
      };
      const manufacturer = findVal('יצרן');
      const model = findVal('דגם');
      const storage = findVal('זיכרון');
      const monthly = parseFloat(String(findVal('ליסינג חודשית')).replace(/,/g, '')) || 0;
      const buyout = parseFloat(String(findVal('רכישת מכשיר')).replace(/,/g, '')) || 0;
      const listPrice = parseFloat(String(findVal('מחירון משוקלל')).replace(/,/g, '')) || 0;
      const mTier = findVal('השתתפות');
      const label = storage ? `${model} (${storage}GB)` : model;
      const id = `cat_${idx}_${manufacturer.replace(/[^a-zA-Z]/g, '').toLowerCase()}`;
      
      const monthIds = ['AG','AF','AE','AD','AC','AB','AA','Z','Y','X','W','V','U','T','S','R','Q','P','O','N','M','L','K','J'];
      const monthlyMatrix = {};
      monthIds.forEach((colId, i) => {
        monthlyMatrix[i + 1] = parseFloat(String(r[colId] || 0).replace(/,/g, '')) || 0;
      });

      return {
        id, label, manufacturer, storage,
        category: getCatalogCategory(manufacturer, model),
        totalCost: monthly,
        buyoutPrice: buyout,
        listPrice,
        maintenanceTier: mTier,
        isFromCatalog: true,
        matrix: monthlyMatrix,
      };
    })
    .filter(r => r.totalCost > 0);
}
async function fetchCatalogFromSheet(sheetId, sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}&_=${Date.now()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const text = await response.text();
  const jsonStr = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?\s*$/)?.[1];
  if (!jsonStr) throw new Error('Invalid catalog response');
  const json = JSON.parse(jsonStr);
  if (json.status !== 'ok') throw new Error('Catalog error');
  const { cols, rows } = json.table;
  const colTypes = cols.map(c => c.type);
  const rawRows = rows.map(row => {
    const obj = {};
    cols.forEach((c, i) => {
      const h = c.label || c.id;
      const cell = row.c[i];
      const rawV = cell?.v;
      const rawF = cell?.f;
      let val = '';
      if (rawV !== null && rawV !== undefined) val = rawV;
      else if (colTypes[i] === 'string' && rawF != null) val = rawF;
      else if (rawF !== null && rawF !== undefined && rawF !== '') val = String(rawF);
      
      obj[h] = val;
      if (c.id) {
        obj[c.id] = val;
      }
    });
    return obj;
  });
  return parseCatalog(rawRows);
}

fetchCatalogFromSheet('13HhcspJ_P0jnCmdz7icVeKQJCGWdur5vJ0wWfM5Wu_I', 'טבלאות מחירים בחתך דגם מכשיר וייתרת החודשים לסיום הליסינג')
  .then(data => {
    const d = data.find(x => x.label.includes('17 Pro (512GB)'));
    console.log('Matrix for 17 Pro (512GB):');
    console.log(d);
    const d2 = data.find(x => x.label.includes('17 Pro Max (512GB)'));
    console.log('Matrix for 17 Pro Max (512GB):');
    console.log(d2);
  }).catch(console.error);
