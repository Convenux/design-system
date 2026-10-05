/** WCAG 2.2 contrast, so the ramps are checked rather than believed. */

import type { Hex } from "./tokens.ts";

/** #rgb and #rrggbb, to 0–255 triples. */
export function parse(hex: Hex): [number, number, number] {
  const raw = hex.replace("#", "");
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) {
    throw new Error(`Not a colour this system understands: ${hex}`);
  }
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

/** Relative luminance, per WCAG 2.x §relative-luminance. */
export function luminance(hex: Hex): number {
  const [r, g, b] = parse(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** The ratio, 1–21, brighter over darker. */
export function ratio(a: Hex, b: Hex): number {
  const [x, y] = [luminance(a), luminance(b)];
  const [hi, lo] = x > y ? [x, y] : [y, x];
  return (hi + 0.05) / (lo + 0.05);
}

/** Rounded the way a report should round it: down, so it never flatters. */
export function report(a: Hex, b: Hex): string {
  return (Math.floor(ratio(a, b) * 100) / 100).toFixed(2);
}
