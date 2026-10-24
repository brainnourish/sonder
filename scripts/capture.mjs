#!/usr/bin/env node
// Sonder capture: screenshots a URL at mobile and desktop, at several scroll depths.
// Usage:
//   node capture.mjs <url> <outDir> [--scrolls 4] [--wait 1200]
// Examples:
//   node capture.mjs https://wisprflow.ai references/wisprflow
//   node capture.mjs http://localhost:3000 critique/round-02
// Requires: npm i -D playwright && npx playwright install chromium

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const [, , url, outDir = "captures", ...rest] = process.argv;
if (!url) {
  console.error("Usage: node capture.mjs <url> <outDir> [--scrolls N] [--wait ms]");
  process.exit(1);
}
const flag = (name, fallback) => {
  const i = rest.indexOf(`--${name}`);
  return i >= 0 ? Number(rest[i + 1]) : fallback;
};
const scrolls = flag("scrolls", 4);
const wait = flag("wait", 1200);

const viewports = [
  { name: "mobile-390", width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  { name: "desktop-1440", width: 1440, height: 900, deviceScaleFactor: 2 },
];

fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor,
    isMobile: vp.isMobile ?? false,
    hasTouch: vp.hasTouch ?? false,
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(wait);

  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.max(vp.height, Math.floor(total / (scrolls + 1)));

  for (let i = 0; i <= scrolls; i++) {
    const y = Math.min(i * step, Math.max(0, total - vp.height));
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(wait);
    const file = path.join(outDir, `${vp.name}-${String(i).padStart(2, "0")}.png`);
    await page.screenshot({ path: file });
    console.log("saved", file);
  }
  await context.close();
}

await browser.close();
