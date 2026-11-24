import wixWindowFrontend from 'wix-window-frontend';

$w.onReady(function () {
    $w('HtmlComponent').forEach((iframe) => {
        iframe.onMessage((event) => {
            if (
                event.data?.type ===
                'ISOTROPE_TEAM_EXPERIENCE_POPUP_V1_CLOSE'
            ) {
                wixWindowFrontend.lightbox.close();
            }
        });
    });
});
