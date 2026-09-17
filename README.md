# @convenux/design-system

One palette, two faces, three products. The tokens and chrome behind
convenux.com, the convention database and the phone app.

## Install

Private package. Consumers need an npm token with read access to the
`@convenux` scope — in Vercel and EAS as well as locally.

```bash
npm install @convenux/design-system
```

## Use it

**A Tailwind v4 app** imports the two stylesheets next to Tailwind itself:

```css
@import "tailwindcss";
@import "@convenux/design-system/tokens.css";
@import "@convenux/design-system/brand.css";
```

`tokens.css` is a `@theme` block, so every token becomes a Tailwind utility:
`bg-ink-3`, `text-fg-4`, `rounded-panel`, `font-mono`. `brand.css` is a small
component layer for the parts tokens could not express — `.brand`, `.appbar`,
`.navlink`, `.cta`.

Each app still loads its own faces through `next/font`, into the two variables
the theme fronts:

```ts
const sans = Manrope({ variable: "--font-manrope", … });
const mono = JetBrains_Mono({ variable: "--font-jetbrains-mono", … });
```

**React Native** imports plain values:

```ts
import { color, radius, space, type } from "@convenux/design-system/native";

const styles = StyleSheet.create({
  title: { ...type("2xl", 800), color: color.fg },
});
```

`type(size, weight, role)` returns `fontFamily`, `fontSize` and `lineHeight`
together. That is the point rather than convenience: setting a size without a
family is how nine screens once ended up in the system sans. Weights are
separate font files rather than a `fontWeight`, because Android resolves
`fontWeight` to the wrong file once a family ships more than two faces, and
Manrope ships five.

## Changing a token

`src/tokens.ts` is the only file anyone edits.

```bash
npm run build    # write dist/
npm run check    # write nothing; fail if dist/ is stale
```

`dist/` is not in git. It is built on `prepublishOnly`, so what ships is always
what `src/tokens.ts` currently says.

## The contrast contract

`tokens.ts` ends with `contrastContract`: every foreground/background pair
actually used in the three apps, and the WCAG 2.2 threshold that applies to it —
4.5:1 for body text, 3:1 for large text and for control boundaries under 1.4.11.

`npm run build` checks all of them and **writes nothing if one fails**, which
means a palette that fails cannot be published.

Both web apps used to carry hand-written comments recording specific ratios;
one of them recorded a CTA label sitting at 4.26:1 until somebody noticed. Those
are true the day they are written and stop being true the first time anyone
nudges a hex. This turns them into an assertion.

Adding a colour means adding its pairs to the contract. A token nothing is
checked against is a token nobody can safely use.

## What is in here

| | |
| --- | --- |
| Surfaces | `ink` `ink-2` `ink-3` `ink-4` `ink-5` — darkest first; a card on a card steps **up** |
| Lines | `line-subtle` `line` `line-strong`, plus `control` for anything operable (3:1) |
| Text | `fg` … `fg-6` — `fg-6` is the floor, which is why there is no `fg-7` |
| Brand | `violet-300` … `violet-600`, `violet-tint` / `violet-edge`, `on-violet` |
| Signals | `mint-400` `amber-400` `rose-400`, each with `-tint` and `-edge` |
| Type | Manrope for anything a person reads, JetBrains Mono for anything a machine produced |
| Radius | `xs` 8 · `sm` 12 · `field` 16 · `panel` 22 · `card` 26 · `pill` |
| Motion | `ease-snap` for arriving, `ease-flow` for moving; keyframes stay in each app |

Signals are named for the hue, not the meaning. The database maps them onto
trust — mint is confirmed, amber is doubted, rose is wrong — in its own
`lib/trust.ts`, which is where that belongs; the marketing site spends the same
mint on a tick in a feature list, and a token called `good` would have been a
lie there.

## Dark only

The tokens describe one theme. The web apps declare `color-scheme: dark` and the
phone app pins `userInterfaceStyle`. A light theme means a second set of values
here and a second column in the contract — not a `@media` query bolted on
downstream.
