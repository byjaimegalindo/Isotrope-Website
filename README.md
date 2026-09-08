# ISOTROPE Website

Technical source repository for the ISOTROPE Wix Studio website.

## Project direction

ISOTROPE is positioned as a technical company that solves problems in hard-to-reach places. The visual hierarchy is:

**Engineering → Systems → Precision → Access → Rope**

Rope access is treated as an access method, not as the identity of the brand.

## Locked Hero baseline

The approved Hero baseline is stored at:

`frontend/hero/isotrope-hero-v14-LOCKED.html`

### LOCKED — do not alter without explicit approval

The following are considered approved and protected:

- Negative / x-ray headline treatment using `mix-blend-mode:difference`
- Instrument Sans display typography
- Manrope body/UI typography
- Headline composition and tracking
- Purple pill CTA styling
- Desktop, tablet and mobile breakpoints
- Scroll-controlled content exit
- Sticky-video cinematic behavior
- Progressive fade to pure `#000000`
- Current scroll timing approved in V14

Do not reconstruct the Hero from an older version. Always work from the current locked baseline.

## Wix integration

Wix Studio HTML component ID:

`htmlHero`

Page Velo controller:

`velo/pages/home.js`

The Velo page code reads the real Wix page scroll and sends both `scrollVh` and legacy-compatible `progress` messages to the HTML component.

## Repository structure

```text
frontend/
  hero/
    isotrope-hero-v14-LOCKED.html
velo/
  pages/
    home.js
docs/
  design-system.md
  implementation-notes.md
```

## Current site

Wix Studio project: **Isotrope**

Development URL: `https://miv-studio.wixstudio.com/isotrope-testing`

## Working rule

Before changing an approved component, create a new version/checkpoint. Never overwrite the locked visual baseline casually.
