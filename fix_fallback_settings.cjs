const fs = require('fs');
const { execSync } = require('child_process');

// Restore from git to get a pristine version
execSync('git checkout HEAD -- src/fallbackData.js');

let content = fs.readFileSync('src/fallbackData.js', 'utf8');

// The pristine fallbackData has the footer_credit line removed from the previous commit,
// and the FALLBACK_SETTINGS block looks like this:
/*
export const FALLBACK_SETTINGS = {
  app_title: 'סלולטור',
  vat_rate: '18',
  lease_months: '24',
  contact_name: 'מנהל סלולר',
  contact_email: '',
  show_announcement: 'FALSE',
  announcement_text: '',
  announcement_type: 'info',
  partner_percent: '40',
  partner_name: 'פרטנר',
  palphone_percent: '60',
  palphone_name: 'פלאפון',
};
*/

const newSettings = `
  site_active: 'TRUE',
  maintenance_title: 'האתר בשידרוגים',
  maintenance_message: 'אנו עורכים כעת עדכוני מערכת. נשוב לפעילות בהקדם. עמכם הסליחה.',
  nav_calculator_active: 'TRUE',
  nav_calculator_order: '1',
  nav_calculator_label: 'מחשבון עלויות',
  nav_termination_active: 'TRUE',
  nav_termination_order: '2',
  nav_termination_label: 'מחשבון סיום ליסינג',
  nav_maintenance_active: 'TRUE',
  nav_maintenance_order: '3',
  nav_maintenance_label: 'מחירון נזקים',
  nav_guide_active: 'TRUE',
  nav_guide_order: '4',
  nav_guide_label: 'מדריך והנחיות',
  nav_faq_active: 'TRUE',
  nav_faq_order: '5',
  nav_faq_label: 'שאלות ותשובות',
  nav_important_notes_active: 'TRUE',
  nav_important_notes_order: '6',
  nav_important_notes_label: 'דגשים חשובים',
};`;

content = content.replace(/  palphone_name: 'פלאפון',\n};/, "  palphone_name: 'פלאפון'," + newSettings);

fs.writeFileSync('src/fallbackData.js', content);
console.log('Successfully updated FALLBACK_SETTINGS programmatically.');
