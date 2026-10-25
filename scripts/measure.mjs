#!/usr/bin/env node
// Sonder measure: records real computed type and color values from a live page,
// so reference analysis and critiques use measured numbers, not estimates.
// Usage:
//   node measure.mjs <url> [outFile.json]
// Example:
//   node measure.mjs https://garden-eight.com references/garden-eight/measure.json
// Requires: npm i -D playwright && npx playwright install chromium

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const [, , url, outFile] = process.argv;
if (!url) {
  console.error("Usage: node measure.mjs <url> [outFile.json]");
  process.exit(1);
}

const browser = await chromium.launch();
const results = {};

for (const vp of [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "mobile-390", width: 390, height: 844, isMobile: true, hasTouch: true },
]) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.isMobile ?? false,
    hasTouch: vp.hasTouch ?? false,
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(1500);

  results[vp.name] = await page.evaluate(() => {
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && Number(s.opacity) > 0;
    };
    const ownText = (el) =>
      [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").trim();

    // Collect every element that directly contains visible text.
    const textEls = [...document.querySelectorAll("body *")].filter(
      (el) => visible(el) && ownText(el).length > 0
    );

    const describe = (el) => {
      const s = getComputedStyle(el);
      const size = parseFloat(s.fontSize);
      const lh = s.lineHeight === "normal" ? "normal" : (parseFloat(s.lineHeight) / size).toFixed(2);
      const ls = s.letterSpacing === "normal" ? "normal" : (parseFloat(s.letterSpacing) / size).toFixed(3) + "em";
      return {
        tag: el.tagName.toLowerCase(),
        text: ownText(el).slice(0, 60),
        fontFamily: s.fontFamily.split(",")[0].replace(/["']/g, "").trim(),
        fontSize: Math.round(size * 10) / 10,
        fontWeight: s.fontWeight,
        lineHeight: lh,
        letterSpacing: ls,
        textTransform: s.textTransform,
        color: s.color,
        top: Math.round(el.getBoundingClientRect().top + window.scrollY),
      };
    };

    const all = textEls.map(describe);
    const bySize = [...all].sort((a, b) => b.fontSize - a.fontSize);
    const sizes = [...new Set(all.map((d) => d.fontSize))].sort((a, b) => b - a);
    const families = [...new Set(all.map((d) => d.fontFamily))];

    const bgOf = (el) => {
      while (el) {
        const c = getComputedStyle(el).backgroundColor;
        if (c && c !== "rgba(0, 0, 0, 0)" && c !== "transparent") return c;
        el = el.parentElement;
      }
      return "none";
    };

    return {
      title: document.title,
      background: bgOf(document.body),
      families,
      typeScale: sizes,
      largestToSmallestRatio: sizes.length ? Math.round((sizes[0] / sizes[sizes.length - 1]) * 10) / 10 : null,
      largestElements: bySize.slice(0, 6),
      smallestElements: bySize.slice(-6),
      headings: all.filter((d) => /^h[1-6]$/.test(d.tag)).slice(0, 12),
    };
  });
  await context.close();
}

await browser.close();
const json = JSON.stringify({ url, measuredAt: new Date().toISOString(), ...results }, null, 2);
if (outFile) {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, json);
  console.log("saved", outFile);
} else {
  console.log(json);
}
