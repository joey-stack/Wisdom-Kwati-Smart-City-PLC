import { defineConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Helper to check if webkit is available in the playwright cache directory
const hasWebkit = () => {
  // If we are in CI, we assume webkit is installed or should be run
  if (process.env.CI) return true;

  try {
    const home = os.homedir();
    const possiblePaths = [
      path.join(home, 'Library/Caches/ms-playwright'),
      path.join(home, '.cache/ms-playwright'),
      path.join(home, 'AppData/Local/ms-playwright'),
    ];
    for (const cachePath of possiblePaths) {
      if (fs.existsSync(cachePath)) {
        const files = fs.readdirSync(cachePath);
        if (files.some(file => file.startsWith('webkit-'))) {
          return true;
        }
      }
    }
  } catch (e) {
    // Fallback
  }
  return false;
};

const projects = [
  {
    name: 'chromium',
    use: { browserName: 'chromium' as const },
  },
  {
    name: 'firefox',
    use: { browserName: 'firefox' as const },
  },
];

if (hasWebkit()) {
  projects.push({
    name: 'webkit',
    use: { browserName: 'webkit' as const },
  });
}

const PORT = process.env.PLAYWRIGHT_TEST_PORT || '3005';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,

  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || `http://localhost:${PORT}`,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects,

  // Automatically spin up the Next.js dev server on the specified port
  webServer: {
    command: `npm run dev -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
