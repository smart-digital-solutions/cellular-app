const fs = require('fs');
const content = fs.readFileSync('src/sheetsService.js', 'utf-8');
const fetchCatalogFromSheetStr = content.match(/async function fetchCatalogFromSheet\([\s\S]*?\n\}/)[0];
const parseCatalogStr = content.match(/function parseCatalog\([\s\S]*?\n\}/)[0];
const getCatalogCategoryStr = content.match(/function getCatalogCategory\([\s\S]*?\n\}/)[0];

const script = `
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
if (!global.fetch) global.fetch = fetch;

${getCatalogCategoryStr}
${parseCatalogStr}
${fetchCatalogFromSheetStr.replace('export ', '')}

fetchCatalogFromSheet('13HhcspJ_P0jnCmdz7icVeKQJCGWdur5vJ0wWfM5Wu_I', 'טבלאות מחירים בחתך דגם מכשיר וייתרת החודשים לסיום הליסינג')
  .then(data => {
    const d = data.find(x => x.label.includes('17 Pro (512GB)'));
    console.log('Matrix for 17 Pro (512GB):');
    console.log(d?.matrix);
    const d2 = data.find(x => x.label.includes('17 Pro Max (512GB)'));
    console.log('Matrix for 17 Pro Max (512GB):');
    console.log(d2?.matrix);
  }).catch(console.error);
`;

fs.writeFileSync('test_run.js', script);
