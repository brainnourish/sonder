#!/usr/bin/env node
// Sonder capture: screenshots a URL at mobile (390) and desktop (1440).
// Three modes:
//   Scroll mode (default): captures several scroll depths after the page settles.
//     node capture.mjs <url> <outDir> [--scrolls 4] [--wait 1200]
//   Frames mode: captures the top of the page at set times after load, to judge
//   a signature moment or intro animation as it plays.
//     node capture.mjs <url> <outDir> --frames 0,1000,2000,3000
//   Video mode: records the top of the page for N ms after load (default 6000),
//   for outreach clips or reviewing a signature moment in motion. Saves .webm;
//   if ffmpeg is installed, also saves an .mp4 that plays on any phone.
//     node capture.mjs <url> <outDir> --video 6000
// Any mode can add --viewports to choose widths (default 390,1440), for example
// --viewports 390,768,1440 for the ship check at tablet width.
// View the resulting PNG files directly with your image viewer tool.
// Do not build HTML contact sheets with local file paths (they render blank).
// Requires Playwright in the project you run this from (npm i -D playwright &&
// npx playwright install chromium), or installed globally.

import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

// Resolve Playwright from the current folder (or a global install), not from
// this script's folder, so the skill works without its own node_modules.
let chromium;
try {
  ({ chromium } = createRequire(path.join(process.cwd(), "/"))("playwright"));
} catch {
  console.error("Playwright not found. Run: npm i -D playwright && npx playwright install chromium");
  process.exit(1);
}

const [, , url, outDir = "captures", ...rest] = process.argv;
if (!url) {
  console.error(
    "Usage: node capture.mjs <url> <outDir> [--scrolls N] [--wait ms] [--frames t1,t2,...] [--video ms] [--viewports w1,w2,...]"
  );
  process.exit(1);
}
const opt = (name) => {
  const i = rest.indexOf(`--${name}`);
  if (i < 0) return undefined;
  const next = rest[i + 1];
  return next && !next.startsWith("--") ? next : "";
};
const scrolls = Number(opt("scrolls") ?? 4);
const wait = Number(opt("wait") ?? 1200);
const frames = opt("frames") ? opt("frames").split(",").map(Number).sort((a, b) => a - b) : null;
const video = opt("video") !== undefined ? Number(opt("video") || 6000) : null;
const widths = (opt("viewports") || "390,1440").split(",").map(Number);

const viewportFor = (width) => {
  if (width < 600) return { name: `mobile-${width}`, width, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
  if (width < 1100) return { name: `tablet-${width}`, width, height: 1024, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
  return { name: `desktop-${width}`, width, height: 900, deviceScaleFactor: 2 };
};
const viewports = widths.map(viewportFor);

const hasFfmpeg = (() => {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
})();

fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor,
    isMobile: vp.isMobile ?? false,
    hasTouch: vp.hasTouch ?? false,
    ...(video ? { recordVideo: { dir: outDir, size: { width: vp.width, height: vp.height } } } : {}),
  });
  const page = await context.newPage();

  if (video) {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(video);
    const raw = await page.video().path();
    await context.close();
    const file = path.join(outDir, `${vp.name}.webm`);
    fs.renameSync(raw, file);
    console.log("saved", file);
    if (hasFfmpeg) {
      const mp4 = file.replace(/\.webm$/, ".mp4");
      execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", file, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", mp4]);
      console.log("saved", mp4);
    }
    continue;
  }

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
