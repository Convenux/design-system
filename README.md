# @convenux/design-system

One palette, two faces, three products. The tokens and chrome behind
convenux.com, the convention database and the phone app.

## Install

Public on npm; no token needed.

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
`bg-ink-3`, `text-fg-4`, `rounded-panel`, `font-mono`. `brand.css` is the base layer
(page ground, focus ring, selection, reduced motion) and a small component layer for
what tokens could not express:

| class | what |
|---|---|
| `.brand`, `.brand--sm/md/lg` | the lockup |
| `.appbar`, `.appbar--wide`, `.navlink` | the bar and its links |
| `.cta`, `--sm`, `--secondary`, `--danger` | buttons |
| `.field` | a text field, select or textarea |
| `.label`, `.eyebrow` | a field's name; the line above a heading |
| `.tag`, `--violet/mint/amber/rose` | a badge |
| `.alert`, `.alert--ok` | an error or confirmation line |
| `.skip-link` | the first focusable thing on a page |
| `.signin-list`, `.signin`, `.signin--<provider>` | sign-in buttons |

**Sign-in buttons** are `.signin` plus `.signin--<provider>`, inside a
`.signin-list`, with the mark from `providers` (the phone app draws the same data
with react-native-svg):

```tsx
import { providers, slot } from "@convenux/design-system/providers";

const p = providers.google;
<a className="signin signin--google" href={start}>
  <svg className="signin__mark" viewBox={slot.viewBox} aria-hidden>
    <g transform={p.glyph ?? undefined}>
      {p.mark.map((m) => <path key={m.d} d={m.d} fill={m.fill ?? p.foreground} />)}
    </g>
  </svg>
  Continue with {p.name}
</a>
```

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
together, so a size never lands in the system sans. Weights are separate font files
rather than a `fontWeight`: Android picks the wrong file once a family has more than
two faces.

## Changing a token

`src/tokens.ts` is the only file anyone edits.

```bash
npm run build    # write dist/
npm run check    # write nothing; fail if dist/ is stale
```

`dist/` is not in git. It is built on `prepublishOnly`, so what ships is always
what `src/tokens.ts` currently says.

## The contrast contract

`tokens.ts` ends with `contrastContract`: the foreground/background pairs the apps
use and the WCAG 2.2 threshold for each — 4.5:1 for text, 3:1 for large text and for
control boundaries (1.4.11). `npm run build` **writes nothing if one fails**, so a
failing palette cannot be published. A new colour, or a new pairing in an app, means a
new row in the contract.

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

Signals are named for the hue, not the meaning; each app decides what they mean.

## Dark only

The tokens describe one theme; brand.css declares `color-scheme: dark` and the phone
app pins `userInterfaceStyle`. A light theme would be a second set of values here and a
second column in the contract.
