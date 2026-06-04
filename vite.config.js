import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function injectDefaultTheme() {
  return {
    name: 'inject-default-theme',
    transformIndexHtml(html) {
      let defaultTheme = 'DARK'; // fallback
      try {
        const csvPath = path.resolve(__dirname, 'sheets_export/settings.csv');
        if (fs.existsSync(csvPath)) {
          const csvContent = fs.readFileSync(csvPath, 'utf-8');
          const lines = csvContent.split('\n');
          for (const line of lines) {
            const parts = line.split(',');
            if (parts[0] && parts[0].trim() === 'default_theme') {
              if (parts[1] && parts[1].trim().toUpperCase() === 'LIGHT') {
                defaultTheme = 'LIGHT';
              }
              break;
            }
          }
        }
      } catch (e) {
        console.warn('Could not read settings.csv for default theme injection', e);
      }
      return html.replace('__DEFAULT_THEME__', defaultTheme);
    }
  }
}

export default defineConfig({
  plugins: [react(), injectDefaultTheme()],
  base: '/cellular-app/',
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toLocaleDateString('he-IL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }))
  }
})
