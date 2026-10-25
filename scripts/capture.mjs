#!/usr/bin/env node
// Sonder capture: screenshots a URL at mobile (390) and desktop (1440).
// Two modes:
//   Scroll mode (default): captures several scroll depths after the page settles.
//     node capture.mjs <url> <outDir> [--scrolls 4] [--wait 1200]
//   Frames mode: captures the top of the page at set times after load, to judge
//   a signature moment or intro animation as it plays.
//     node capture.mjs <url> <outDir> --frames 0,1000,2000,3000
// View the resulting PNG files directly with your image viewer tool.
// Do not build HTML contact sheets with local file paths (they render blank).
// Requires: npm i -D playwright && npx playwright install chromium

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const [, , url, outDir = "captures", ...rest] = process.argv;
if (!url) {
  console.error("Usage: node capture.mjs <url> <outDir> [--scrolls N] [--wait ms] [--frames t1,t2,...]");
  process.exit(1);
}
const opt = (name) => {
  const i = rest.indexOf(`--${name}`);
  return i >= 0 ? rest[i + 1] : undefined;
};
const scrolls = Number(opt("scrolls") ?? 4);
const wait = Number(opt("wait") ?? 1200);
const frames = opt("frames") ? opt("frames").split(",").map(Number).sort((a, b) => a - b) : null;

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

  if (frames) {
    const start = Date.now();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() => {});
    for (const t of frames) {
      const delay = t - (Date.now() - start);
      if (delay > 0) await page.waitForTimeout(delay);
      const file = path.join(outDir, `${vp.name}-t${String(t).padStart(5, "0")}ms.png`);
      await page.screenshot({ path: file });
      console.log("saved", file);
    }
  } else {
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
  }
  await context.close();
}

await browser.close();
