/**
 * The Convenux design system, in one file.
 *
 * Three products share this: the marketing site (convenux.com), the convention
 * database (db.convenux.com) and the phone app. They used to share nothing —
 * four type families, two violets a hair apart, two unrelated grey ramps and, in
 * the app, the unedited Expo starter palette. This is the reconciliation.
 *
 * Nothing here is generated from anything else, and nothing else here is edited by
 * hand: `build.ts` reads this file and writes the per-platform artefacts. Change a
 * value here, `npm run build`, and publish.
 *
 * Two rules the ramps depend on:
 *
 *  - Surfaces get lighter as they come forward — `ink` is the page and nothing is
 *    behind it, `ink-5` is the closest thing to the reader. A card on a card
 *    steps up, never down.
 *  - Foregrounds get dimmer as they get less important, and `fg-6` is the floor.
 *    Anything below it fails 1.4.3 against every surface in the ramp, which is why
 *    there is no `fg-7`. `build.ts` proves this rather than trusting it.
 */

/** A hex colour, lowercase, six digits. The build asserts the shape. */
export type Hex = `#${string}`;

/**
 * Surfaces, darkest first.
 *
 * Taken from the marketing site's ink-950…750, which is the more neutral of the two
 * ramps that existed — the database's was a touch violet and read as a colour cast
 * once the two sat side by side in a browser.
 */
export const surface = {
  /** The page. Nothing sits behind this. */
  "ink": "#08080a",
  /** A section lifted off the page: headers, footers, the odd banded row. */
  "ink-2": "#0d0d10",
  /** A card. The most common container in either web app. */
  "ink-3": "#121217",
  /** A field: inputs, selects, textareas, anything that takes a caret. */
  "ink-4": "#17171c",
  /** A control on a card: chips, meter tracks, the filled half of a toggle. */
  "ink-5": "#1e1e24",
} as const satisfies Record<string, Hex>;

/**
 * Hairlines and control boundaries.
 *
 * `line*` are decorative and exempt from 1.4.11 — they separate, they never carry
 * meaning on their own. `control` is not: it is the boundary of something you can
 * operate, it needs 3:1 against whatever it sits on, and the build checks it.
 */
export const line = {
  /** Barely there. Section rules, footer divides. */
  "line-subtle": "#1c1c22",
  /** The default hairline. Card edges, table rules. */
  "line": "#26262c",
  /** A hairline that has to survive next to a busy surface. */
  "line-strong": "#2e2e36",
  /** The edge of an operable control. Never decorative — see 1.4.11. */
  "control": "#6e6e78",
} as const satisfies Record<string, Hex>;

/**
 * Text, brightest first.
 *
 * Six rungs, merged from the marketing site's four and the database's six. The
 * database needs the extra steps: a page there is label / value / source / date
 * stacked four deep, and four levels of emphasis is the minimum that reads as a
 * hierarchy rather than as noise.
 */
export const foreground = {
  /** Headings and anything a reader is meant to land on. */
  "fg": "#f4f4f7",
  /** Body copy that is still the point of the paragraph. */
  "fg-2": "#d6d6de",
  /** Secondary copy: descriptions, captions, the sentence under a heading. */
  "fg-3": "#b7b7c2",
  /** Supporting detail. The workhorse for anything parenthetical. */
  "fg-4": "#9a9aa4",
  /** Field labels and units. Small, and never the only copy of a fact. */
  "fg-5": "#8a8a94",
  /** The floor: disabled controls, watermarks, decorative counts. */
  "fg-6": "#6f6f80",
} as const satisfies Record<string, Hex>;

/**
 * Violet — the one brand colour, and the only colour either web app spends on
 * decoration.
 *
 * Four rungs, down from the marketing site's three and the database's six, which
 * between them held #6e5bff and #6f61ff: two violets one point apart, in two
 * products, on the same screen.
 */
export const brand = {
  /** Violet on a dark surface where it has to carry small text. */
  "violet-300": "#c9bfff",
  /** Links and the default violet for text. */
  "violet-400": "#a99eff",
  /** The filled control: primary buttons, active pills, the focus ring. */
  "violet-500": "#8577ff",
  /** The deepest fill. Large areas only — see `on-violet`. */
  "violet-600": "#6f61ff",
  /** A violet wash to tint a panel without filling it. */
  "violet-tint": "#241f42",
  /** The border that goes with `violet-tint`. */
  "violet-edge": "#3a3170",
  /**
   * What goes on top of violet-500 and violet-600.
   *
   * The page ink, not the lighter one: #14121c drops to 4.26:1 on violet-600 and
   * failed 1.4.3 for exactly as long as a pointer sat on the marketing site's CTA.
   * The build re-checks this pair on every run so it cannot regress quietly.
   */
  "on-violet": "#08080a",
} as const satisfies Record<string, Hex>;

/**
 * The three signals.
 *
 * Named for the hue, not the meaning, and deliberately: the database maps them onto
 * trust (mint is confirmed, amber is doubted, rose is wrong) but the marketing site
 * spends mint on a tick in a feature list, and a token called `good` would have been
 * a lie there. Meaning belongs to the component — see `TONE_CLASS` in db-web.
 *
 * Each hue is a triple: the bright one carries text, `-tint` fills behind it, `-edge`
 * draws the border. Every bright/tint pair is contrast-checked by the build.
 */
export const signal = {
  "mint-400": "#4fd69b",
  "mint-tint": "#12241c",
  "mint-edge": "#2a5140",

  "amber-400": "#f0be6a",
  "amber-tint": "#2a2113",
  "amber-edge": "#5a4526",

  /*
   * Rose is the database's, and the marketing site had no red at all — there is
   * nothing on a landing page that a red is the honest colour for. It is here so
   * that "cancelled" looks the same in the app as it does on the web.
   */
  "rose-400": "#ff8a8a",
  "rose-tint": "#2a1416",
  "rose-edge": "#5c2a2e",
} as const satisfies Record<string, Hex>;

export const color = {
  ...surface,
  ...line,
  ...foreground,
  ...brand,
  ...signal,
} as const;

export type ColorName = keyof typeof color;

/**
 * Type.
 *
 * Two families where there were four. Manrope came from the marketing site and is
 * the brand voice; JetBrains Mono came from the database, where a mono face is
 * load-bearing rather than stylistic — it is what makes a date, an id or a field
 * name look like something a machine produced instead of something someone wrote.
 *
 * `display` and `sans` are the same family today. The token stays separate so that
 * headings can be re-pointed at a display face in one place, later, without a
 * find-and-replace across three repositories. That is the whole reason it exists.
 */
export const font = {
  display: {
    family: "Manrope",
    /** Weights the build asks Google for, and that expo-font bundles. */
    weights: [600, 700, 800],
    stack: ["ui-sans-serif", "system-ui", "sans-serif"],
  },
  sans: {
    family: "Manrope",
    weights: [400, 500, 600, 700, 800],
    stack: ["ui-sans-serif", "system-ui", "sans-serif"],
  },
  mono: {
    family: "JetBrains Mono",
    weights: [400, 500, 600, 700],
    stack: ["ui-monospace", "monospace"],
  },
} as const;

/**
 * Corner radii.
 *
 * Six steps, and a rule for each. The first cut of this had three, which was too few
 * to be usable: the marketing site stayed on Tailwind's defaults for every small
 * control because nothing here fitted, and the database grew forty arbitrary
 * `rounded-[13px]`-style values in the gaps. A scale nobody can land on is not a
 * scale.
 */
export const radius = {
  /** A badge, a chip, the brand mark at chrome size. */
  xs: 8,
  /** A small control: a button, a tag, an icon button. */
  sm: 12,
  /** Inputs, selects, anything that takes a caret. */
  field: 16,
  /** Panels and tiles — anything that groups controls. */
  panel: 22,
  /** The outermost container on a page. */
  card: 26,
  /** Fully round. Pills, avatars, the primary call to action. */
  pill: 9999,
} as const;

/**
 * The chrome: the parts of a page that are the product rather than its content.
 *
 * Tokens alone could not make these match, and did not. Both web apps drew a header
 * and a wordmark from scratch and landed on two different brands — one set
 * "Convenux" in Manrope at -0.03em, the other "CONVENUX" in JetBrains Mono at
 * +0.2em, which is not a variation on a mark, it is a different mark. So the lockup
 * is specified here and emitted as CSS both apps import, rather than described in a
 * document and rebuilt twice.
 */
export const chrome = {
  /**
   * The brand lockup: the mark, a gap, the name.
   *
   * `md` is the one every header uses, in all three products. `lg` is for places the
   * lockup is the subject rather than the furniture — a footer signature, an OG
   * image — and `sm` is for a dense strip.
   *
   * The name is always title case in the sans face. It is a word, not a label: the
   * uppercase mono treatment read as a field name, which on a site where mono means
   * "a machine produced this" was actively saying the wrong thing about the brand.
   */
  mark: {
    sm: { icon: 22, iconRadius: 8, name: 14, gap: 8 },
    md: { icon: 26, iconRadius: 8, name: 16, gap: 10 },
    lg: { icon: 34, iconRadius: 12, name: 19, gap: 10 },
  },
  /** A hairline of light around the mark, so it reads on any surface it sits on. */
  markRing: "rgb(255 255 255 / 0.10)",
  /** Tracking for the name. Tight, which is what makes it a wordmark. */
  nameTracking: "-0.03em",

  /** The sticky bar at the top of every product. One height, everywhere. */
  bar: { height: 60, opacity: 80, blur: 24 },

  /**
   * Page width. Two, because the difference is real and worth naming rather than
   * leaving as a magic number in each repo: prose and marketing read badly past
   * ~1180, and a table of editions needs every pixel of 1440.
   */
  shell: { reading: 1180, wide: 1440 },

  /**
   * Control heights. `md` is the 44px pointer target WCAG 2.2 asks for (2.5.8);
   * `sm` is for controls inside dense chrome, where they sit beside other targets.
   */
  control: { sm: 36, md: 44 },
} as const;

/**
 * Motion.
 *
 * Easings only. Keyframes stay in each app because what rises on a landing page and
 * what rises in a table are not the same gesture, and pretending otherwise produced
 * two different `rise` animations sharing one name.
 *
 * Every app honours `prefers-reduced-motion`. Motion here is always additive: if it
 * never runs, nothing is lost.
 */
export const motion = {
  /** Decelerating. For things arriving. */
  "ease-snap": "cubic-bezier(0.23, 1, 0.32, 1)",
  /** Symmetric. For things moving between two places. */
  "ease-flow": "cubic-bezier(0.77, 0, 0.175, 1)",
  duration: {
    fast: 160,
    base: 240,
    slow: 380,
  },
} as const;

/**
 * The type scale.
 *
 * `size` is px and `leading` is unitless. The phone app consumes these directly;
 * the web apps get them as `--text-*` and the utilities Tailwind builds from them.
 */
export const text = {
  "3xs": { size: 10, leading: 1.4 },
  "2xs": { size: 11, leading: 1.45 },
  xs: { size: 12, leading: 1.5 },
  sm: { size: 13, leading: 1.55 },
  base: { size: 14, leading: 1.6 },
  md: { size: 16, leading: 1.6 },
  lg: { size: 19, leading: 1.35 },
  xl: { size: 22, leading: 1.3 },
  "2xl": { size: 26, leading: 1.25 },
  "3xl": { size: 32, leading: 1.15 },
  "4xl": { size: 40, leading: 1.1 },
} as const;

/**
 * Spacing, in px, on a 4pt grid.
 *
 * The web apps already have Tailwind's identical scale and do not need this; it is
 * here for the phone app, where every gap was previously a number somebody typed.
 */
export const space = {
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

/**
 * Pairs the build refuses to let regress.
 *
 * Every one of these is a foreground actually used on that background somewhere in
 * the three apps. `min` is the WCAG 2.2 threshold that applies: 4.5 for body text,
 * 3 for large text (>=18.66px bold or >=24px) and for the boundary of a control
 * under 1.4.11.
 */
export const contrastContract: {
  fg: ColorName;
  bg: ColorName;
  min: number;
  note: string;
}[] = [
  { fg: "fg", bg: "ink", min: 4.5, note: "body copy on the page" },
  { fg: "fg-2", bg: "ink", min: 4.5, note: "body copy on the page" },
  { fg: "fg-3", bg: "ink", min: 4.5, note: "secondary copy on the page" },
  { fg: "fg-4", bg: "ink", min: 4.5, note: "supporting detail on the page" },
  { fg: "fg-5", bg: "ink", min: 4.5, note: "field labels on the page" },
  { fg: "fg-5", bg: "ink-3", min: 4.5, note: "field labels on a card" },
  { fg: "fg-5", bg: "ink-5", min: 4.5, note: "field labels on a control" },
  { fg: "fg-6", bg: "ink", min: 3, note: "disabled and decorative only" },

  { fg: "fg", bg: "ink-3", min: 4.5, note: "body copy on a card" },
  { fg: "fg-3", bg: "ink-3", min: 4.5, note: "secondary copy on a card" },
  { fg: "fg-4", bg: "ink-4", min: 4.5, note: "placeholder in a field" },
  { fg: "fg", bg: "ink-4", min: 4.5, note: "a value in a field" },
  { fg: "fg-3", bg: "ink-4", min: 4.5, note: "a neutral tag" },
  { fg: "violet-400", bg: "ink-2", min: 4.5, note: "an eyebrow on a panel" },

  { fg: "on-violet", bg: "violet-500", min: 4.5, note: "label on a primary button" },
  { fg: "on-violet", bg: "violet-600", min: 4.5, note: "label on a primary button" },
  { fg: "violet-400", bg: "ink", min: 4.5, note: "a link on the page" },
  { fg: "violet-400", bg: "ink-3", min: 4.5, note: "a link on a card" },
  { fg: "violet-300", bg: "violet-tint", min: 4.5, note: "text on a tinted panel" },

  { fg: "mint-400", bg: "ink", min: 4.5, note: "a confirmed value" },
  { fg: "mint-400", bg: "mint-tint", min: 4.5, note: "a confirmed badge" },
  { fg: "amber-400", bg: "ink", min: 4.5, note: "a doubted value" },
  { fg: "amber-400", bg: "amber-tint", min: 4.5, note: "a doubted badge" },
  { fg: "rose-400", bg: "ink", min: 4.5, note: "a wrong value" },
  { fg: "rose-400", bg: "rose-tint", min: 4.5, note: "a wrong badge" },

  { fg: "control", bg: "ink", min: 3, note: "the edge of a control (1.4.11)" },
  { fg: "control", bg: "ink-3", min: 3, note: "the edge of a control on a card" },
  { fg: "control", bg: "ink-4", min: 3, note: "the edge of a field" },
  { fg: "violet-500", bg: "ink", min: 3, note: "the focus ring (1.4.11)" },
  { fg: "violet-500", bg: "ink-3", min: 3, note: "the focus ring on a card" },
];
