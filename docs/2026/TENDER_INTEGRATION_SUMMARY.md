# 2026 Tender Integration Summary

This document summarizes the changes made to the Cellular App to comply with the new 2026 Cellular Tender (01-2024 / 01-2026).

## Key Updates Implemented
1. **Out of Pocket Services:** Added strict warnings for services that do not receive government allowance and are fully funded by the employee's personal credit card:
   - "Nativ" protected internet service (35.30 ILS).
   - Secondary line/smartwatch extension (8.10 ILS).
   - Separate backup line (85.20 ILS/year).
2. **Device Kit Additions:** Noted that all device kits now include a 20W wall charger by default, removing the need for employees to purchase them separately unless an extra one is needed.
3. **Roaming Constraints:** Updated the roaming allowance logic to reflect the 10GB/month (accumulating to 120GB/year) limit, including the Hard Stop mechanism and the yearly reset clause.
4. **Fallback Data Sync:** All critical notes, warnings, and guidelines were synchronized with the offline `fallbackData.js` object, ensuring the app remains fully accurate even if the primary Google Sheets backend is unreachable.

## Accessibility (WCAG 2.2 AA)
The application was audited against the `wcag-accessibility-expert` standard:
- **ARIA Attributes:** All decorative Lucide React icons use `aria-hidden="true"`.
- **Stacking Contexts:** Custom dropdown menus (`OmegaSelect.jsx`) implement strict, descending `z-index` hierarchies (`z-50` > `z-40` > `z-30`) to prevent visual overlapping issues with glassmorphism panels.
- **Focus Management:** Custom `listbox` components fully support `ArrowDown`, `ArrowUp`, `Home`, `End`, and `Escape` keyboard navigation.

## Deferred Items
- **2016 Tender Device Buyout:** The feature to calculate buyout costs for devices purchased under the old tender was intentionally deferred at the user's request. It will be added in a future phase if required.
