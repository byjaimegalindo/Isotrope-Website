import wixWindowFrontend from 'wix-window-frontend';

const HERO_HTML_ID = '#htmlHero';
const TICK_MS = 32;

$w.onReady(function () {
    const hero = $w(HERO_HTML_ID);

    let busy = false;

    setInterval(async () => {
        // Prevent overlapping async measurements.
        if (busy) return;
        busy = true;

        try {
            const rect = await wixWindowFrontend.getBoundingRect();

            if (!rect) return;

            const viewportHeight = Math.max(
                rect.window.height,
                1
            );

            const scrollY = Math.max(
                rect.scroll.y,
                0
            );

            // RAW real Wix page scroll:
            // 1.0 = one viewport, 2.0 = two viewports, etc.
            const scrollVh =
                scrollY / viewportHeight;

            // Also send normalized progress for compatibility.
            const progress = Math.min(
                Math.max(scrollVh / 2.60, 0),
                1
            );

            hero.postMessage({
                type: 'ISOTROPE_HERO_SCROLL',
                scrollVh,
                progress
            });

        } finally {
            busy = false;
        }

    }, TICK_MS);
});
