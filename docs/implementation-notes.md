# ISOTROPE Implementation Notes

## Wix Studio context

Site: **Isotrope**

Site ID: `115fc02c-5174-48e8-ac81-c9494ab75bf8`

Development URL: `https://miv-studio.wixstudio.com/isotrope-testing`

Editor: Wix Studio

Velo: enabled

## Hero integration

HTML source:

`frontend/hero/isotrope-hero-v14-LOCKED.html`

Wix HTML component ID:

`htmlHero`

The `#` is used only in Velo selectors. In Wix Studio the element ID itself must be `htmlHero`.

## Page Velo

Home page controller:

`velo/pages/home.js`

The page code uses `wixWindowFrontend.getBoundingRect()` to measure the real Wix page scroll and sends messages to the HTML iframe:

```js
hero.postMessage({
    type: 'ISOTROPE_HERO_SCROLL',
    scrollVh,
    progress
});
```

The HTML accepts the current `scrollVh` contract and also keeps compatibility with the earlier normalized `progress` contract.

## Sticky layout requirement

The HTML component itself should not create an internal scroll area.

For the cinematic sequence, pin the HTML component in the parent Wix layout:

- `htmlHero`: approximately `100vh`
- Position: Sticky
- Top: `0`
- Parent Hero runway: sufficiently tall to allow the scroll sequence to complete before sticky release

The sticky behavior belongs to the Wix parent page layout, not to an oversized document inside the iframe.

## Approved V14 scroll behavior

The current approved timing is intentionally tied to the real page scroll.

### Content exit

`0.00 → 1.18` viewport-scroll units

The full Hero content group moves upward using the CSS `top` property. Do not replace this with an ancestor `transform` without testing the negative headline treatment: transforms on the content ancestor previously interfered with `mix-blend-mode:difference`.

### Held video

`1.18 → 1.78`

The content has cleared and the video remains visually held with a restrained scale/brightness treatment.

### Fade to black

`1.10 → 1.82`

The black overlay begins before the held-video phase ends, producing a longer and smoother transition. At `1.82` the Hero is pure `#000000`.

### Full black hold

`1.82+`

The overlay remains fully opaque until Wix releases the sticky Hero.

## Negative / x-ray headline — critical implementation note

The effect depends on:

```css
.xray-line {
    mix-blend-mode:difference;
}
```

plus its `::before`, `::after` and `xraySweep` layers.

Do not casually introduce stacking-context changes on `.hero__content`. During development, applying `transform`/certain compositing properties to that ancestor caused the negative effect to disappear visually even though the x-ray CSS still existed.

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

## Change-control rule

V14 is the current approved baseline. Any future Hero experiment should be saved as a new version rather than silently replacing the locked file.
