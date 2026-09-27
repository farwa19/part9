/// 
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    // Explicit 127.0.0.1 prevents IPv6 localhost resolution failures in CI
    baseURL: 'http://127.0.0.1:3001',
    trace: 'on-first-retry',
  },
  // Automatically boot the backend before running API tests in CI
  webServer: {
    command: 'npm start --prefix ../backend',
    url: 'http://127.0.0.1:3001/api/ping',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});