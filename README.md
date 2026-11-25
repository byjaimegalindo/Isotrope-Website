# ISOTROPE Website

Technical source repository for the ISOTROPE Wix Studio website.

## Estado vigente — cierre 25-nov-2026

**Leer primero:** [Footer V15 FULL — APROBADO / BLOQUEADO](docs/checkpoints/2026-11-25-FOOTER-LOCKED.md), junto con el [cierre integral 24-11](docs/checkpoints/2026-11-24-FINAL-HANDOFF.md). Estos checkpoints prevalecen sobre referencias históricas contradictorias de este README. No intervenir secciones bloqueadas sin orden expresa del usuario.

## Project direction

ISOTROPE is positioned as a technical company that solves problems in hard-to-reach places. The visual hierarchy is:

**Engineering → Systems → Precision → Access → Rope**

Rope access is treated as an access method, not as the identity of the brand.

## Estado vigente — SERVICES APROBADO (23-nov-2026)

El cliente ha confirmado el funcionamiento completo de **Services** en Wix Studio. Se declara bloqueada la implementación vigente en estos **tres únicos archivos canónicos**:

- [Velo Home — Services](velo/pages/home.js) (repeater nativo, límites `#line75`/`#line74`, foto y contador)
- [Velo popup Services](velo/popups/services.js)
- [HTML del popup Services](frontend/services/services-popup.html) (blanco, acentos del manual oficial)

**Runbook y contrato de integración:** [docs/services/README.md](docs/services/README.md).

**Manual de marca obligatorio para TODAS las siguientes secciones:** [docs/brand/README.md](docs/brand/README.md), respaldado por [transcripción completa del manual oficial 2026](docs/brand/ISOTROPE_BRAND_GUIDELINES_2026_SOURCE_TEXT.md). Para logos, fotografías y gráficos consultar también el PDF original de 37 páginas.

**No restaurar versiones V11 de Services**, archivos de ensayo con scroll simulado ni bridges antiguos. Git conserva su historia de commits, pero ya no son fuentes vigentes. No alterar Hero/Outro, otras franjas, Custom Embeds, ni CMS fuera del cambio solicitado.

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

Home Velo is intentionally inactive **for Hero scroll synchronization**. It now contains the independently approved **Services** controller. Its scoped `getBoundingRect()` polling runs only while the Services repeater is visible; do not apply it to Hero or replace Hero's native bridge.

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
frontend/
  services/
    services-popup.html
velo/
  pages/
    home.js
  popups/
    services.js
wix/
  custom-embeds/
    isotrope-native-hero-scroll-sync-rev5.html
docs/
  brand/
    README.md
    ISOTROPE_BRAND_GUIDELINES_2026_SOURCE_TEXT.md
  services/
    README.md
  design-system.md
  implementation-notes.md
  checkpoints/
    2026-09-08.md
```

## Working rule

Approved states are checkpoints, not suggestions. Never overwrite or rebuild a locked component casually. Make only the requested change, validate the diff, then continue from that exact state.
