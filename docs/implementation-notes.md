# ISOTROPE Implementation Notes

## Wix Studio context

Site: **Isotrope**

Site ID: `115fc02c-5174-48e8-ac81-c9494ab75bf8`

Development URL: `https://miv-studio.wixstudio.com/isotrope-testing`

Editor: Wix Studio

Velo: enabled

## Hero source control

Original protected visual baseline:

`frontend/hero/isotrope-hero-v14-LOCKED.html`

Current approved production derivative:

`frontend/hero/isotrope-hero-blackout-1.50-LOCKED.html`

The V14 file remains immutable as the original locked reference. Do not silently overwrite it.

## Current Hero behavior — LOCKED

The Hero uses true page-scroll-driven movement. The full content group, including headline, support copy and CTAs, moves upward at the same pixel speed as the real Wix page scroll.

Critical implementation:

```js
const travelVh = Math.min(s, 1.08);

content.style.top =
  `${(-(window.innerHeight * travelVh)).toFixed(2)}px`;
```

Do not replace this with ancestor `transform`, easing, prediction, polling or interpolation. During development those approaches either introduced visible lag/jumps or interfered with the negative headline treatment.

## Native Wix scroll bridge

Hero synchronization is now handled by a Wix Custom Embed rather than page Velo polling.

Custom Embed:

- Name: `ISOTROPE Native Hero Scroll Sync`
- ID: `f46f2074-f2e8-4c80-a2c9-b0079cdbe4c6`
- Current confirmed revision: `5`
- Position: `BODY_END`
- Enabled: `true`
- Load once: `true`
- Category: `ESSENTIAL`

Responsibilities:

- Detect the real Wix scroll container/document scroll.
- Receive the Hero iframe handshake `ISOTROPE_HERO_READY`.
- Send `ISOTROPE_HERO_SCROLL` directly to the Hero iframe.
- Use requestAnimationFrame bursts only around real scroll activity.
- Avoid Velo polling and overlapping async measurements.
- Control the site header behavior: down = hide, up = show, top = visible.

## Page Velo

Home page controller:

`velo/pages/home.js`

The file is intentionally empty except for documentation comments. Do **not** reintroduce `wixWindowFrontend.getBoundingRect()`, `setInterval()`, scroll prediction or similar Hero synchronization code while the native Custom Embed is active.

## Approved blackout timing

Final approved timing as of 2026-09-08:

- Fade begins: `0.61` viewport-scroll units.
- Full pure black: `1.50` viewport-scroll units.
- At `1.50+`, blackout opacity remains `1`.

Approved code:

```js
const blackP =
  smooth(range(s, 0.61, 1.50));

blackout.style.opacity =
  blackP.toFixed(4);

if (s >= 1.50) {
  blackout.style.opacity = '1';
}
```

The `1.60` test was rejected. `1.50` is the approved locked value.

## Held-video treatment

The restrained video treatment remains:

```js
const holdP =
  smooth(range(s, 1.02, 1.68));
```

Do not change this when the request concerns only blackout timing.

## Negative / x-ray headline — critical

The effect depends on:

```css
.xray-line {
  mix-blend-mode:difference;
}
```

plus the `::before`, `::after` and `xraySweep` layers.

Do not casually introduce stacking-context changes on `.hero__content`. Ancestor transforms/compositing changes previously caused the visual negative effect to disappear even while the CSS remained present.

## Breakpoints — LOCKED

- Desktop: above `1000px`
- Tablet: `1000px` and below
- Mobile: `750px` and below
- Additional CTA stacking: `520px` and below

## Current Hero copy

Eyebrow:

`Technical access · Construction · Maintenance`

Headline:

`ACCESS IS ONLY`  
`THE BEGINNING.`

Body:

`Safe access and technical expertise for construction, maintenance and remediation in hard-to-reach environments.`

CTAs:

- `REQUEST A CALLBACK`
- `BOOK A CONSULTATION`

## Intro Features — Home section 2

Wix section ID: `#section46`

No overarching section title.

Current copy:

### Technical by Nature

`We treat difficult access as a technical challenge, planning every task around safety, control and the right solution.`

### Consistent Standards

`The same level of rigor applies in every direction, regardless of height, angle or complexity of access.`

### Asset-First Approach

`Construction support, maintenance and remediation share one objective: protect the asset and its long-term performance.`

### Precision in Access

`Access is only the beginning. What matters is executing the work safely, efficiently and with technical precision.`

Current icon direction:

- Technical: technical/hex engineering symbol.
- Standards: shield + centered check.
- Asset: building/façade.
- Precision: target/crosshair.
- White circular badge, dark glyph, strong stroke, tightly trimmed SVG canvas.

## Change-control rules

1. Never reconstruct an approved Hero to make a small adjustment.
2. Start every Hero change from the current approved locked file.
3. If a request changes only timing, change only the requested numeric timing values.
4. Verify a diff before delivering or committing a Hero adjustment.
5. Do not touch `content.style.top`, negative effect, video treatment, CTAs, responsive rules or bridge logic unless explicitly requested.
6. Keep the native Wix scroll bridge intact unless there is an explicit decision to replace it.
7. Preserve V14 as the original protected baseline.

## Home-first implementation order

1. Hero
2. Intro Features
3. Positioning / capabilities
4. Isotrope Principle
5. About teaser
6. Featured Projects
7. Precision / Control / Consistency
8. Blog
9. Final CTA
10. Footer

Finish and lock Home first, then derive the reusable design/implementation system for About, Services and Projects.
