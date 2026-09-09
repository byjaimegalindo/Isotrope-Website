# ISOTROPE Website

Technical source repository for the ISOTROPE Wix Studio website.

## Project direction

ISOTROPE is positioned as a technical company that solves problems in hard-to-reach places. The visual hierarchy is:

**Engineering → Systems → Precision → Access → Rope**

Rope access is treated as an access method, not as the identity of the brand.

## Hero baselines

Original protected visual baseline:

`frontend/hero/isotrope-hero-v14-LOCKED.html`

Current approved production derivative:

`frontend/hero/isotrope-hero-blackout-1.50-LOCKED.html`

### LOCKED — do not alter without explicit approval

The following are considered approved and protected:

- Negative / x-ray headline treatment using `mix-blend-mode:difference`
- Instrument Sans display typography
- Manrope body/UI typography
- Headline composition and tracking
- Purple pill CTA styling
- Desktop, tablet and mobile breakpoints
- True 1:1 scroll-controlled content exit
- Restrained held-video treatment
- Progressive fade to pure `#000000`
- Blackout timing: fade begins at `0.61`, full black at `1.50`

Do not reconstruct the Hero for small changes. Always work from the current approved locked file and verify a diff before committing.

## Wix integration

Wix Studio project: **Isotrope**

Site ID: `115fc02c-5174-48e8-ac81-c9494ab75bf8`

Development URL: `https://miv-studio.wixstudio.com/isotrope-testing`

Hero scroll synchronization is handled by the Wix Custom Embed:

`ISOTROPE Native Hero Scroll Sync`

Custom Embed ID:

`f46f2074-f2e8-4c80-a2c9-b0079cdbe4c6`

Current confirmed revision: `5`

Tracked source snapshot:

`wix/custom-embeds/isotrope-native-hero-scroll-sync-rev5.html`

The Home page Velo file is intentionally inactive for Hero scroll synchronization. Do not reintroduce `getBoundingRect()` polling while the native bridge is active.

## Home state

Current build order:

1. Hero — locked
2. Intro Features — current section under refinement
3. Positioning / capabilities
4. Isotrope Principle
5. About teaser
6. Featured Projects
7. Precision / Control / Consistency
8. Blog
9. Final CTA
10. Footer

Home is being completed first and then used as the master visual/functional system for the remaining pages.

## Repository structure

```text
frontend/
  hero/
    isotrope-hero-v14-LOCKED.html
    isotrope-hero-blackout-1.50-LOCKED.html
  icons/
    intro-features/
velo/
  pages/
    home.js
wix/
  custom-embeds/
    isotrope-native-hero-scroll-sync-rev5.html
docs/
  design-system.md
  implementation-notes.md
  checkpoints/
    2026-09-08.md
```

## Working rule

Approved states are checkpoints, not suggestions. Never overwrite or rebuild a locked component casually. Make only the requested change, validate the diff, then continue from that exact state.
