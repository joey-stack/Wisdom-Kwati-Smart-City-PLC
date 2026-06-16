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

// Use bs-local.com only when running via BrowserStack, otherwise use localhost
const isBrowserStack = !!process.env.BROWSERSTACK_USERNAME;
const HOST = process.env.PLAYWRIGHT_TEST_BASE_URL
  ? new URL(process.env.PLAYWRIGHT_TEST_BASE_URL).hostname
  : isBrowserStack
  ? 'bs-local.com'
  : 'localhost';
const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || `http://${HOST}:${PORT}`;

export default defineConfig({
  testDir: './tests',
  timeout: isBrowserStack ? 180000 : 90000,

  use: {
    baseURL: BASE_URL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 90000,
    actionTimeout: 30000,
  },

  projects,

  // Automatically spin up the Next.js production server on the specified port
  webServer: {
    command: `npm run start -- -p ${PORT} -H 0.0.0.0`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});


