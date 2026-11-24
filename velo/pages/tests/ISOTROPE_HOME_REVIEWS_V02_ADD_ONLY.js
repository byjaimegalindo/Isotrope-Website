// ADD THIS ENTIRE BLOCK TO HOME PAGE CODE.
// DO NOT replace existing Services or other approved page code.
// Proposed ID: #htmlReviews. Set the HTML component ID to match.
import isoReviewsWindow from 'wix-window-frontend';
import { getPublishedReviews, getPreviewReviews } from 'backend/isotropeReviews.web';

$w.onReady(function () {
    const iframe = $w('#htmlReviews');
    const protocol = 'ISOTROPE_REVIEWS_V2';
    let loading = null;
    let reviews = null;
    let popupOpening = false;

    async function sendReviews() {
        if (!loading) {
            loading = (isoReviewsWindow.viewMode === 'Preview'
                ? getPreviewReviews()
                : getPublishedReviews())
                .then(rows => {
                    reviews = Array.isArray(rows) ? rows : [];
                    return reviews;
                })
                .catch(error => {
                    console.error('ISOTROPE Reviews:', error);
                    loading = null;
                    throw error;
                });
        }
        try {
            await loading;
            iframe.postMessage({ type: protocol + '_INIT', reviews });
        } catch (error) {
            iframe.postMessage({
                type: protocol + '_ERROR',
                message: 'Unable to load reviews.'
            });
        }
    }

    iframe.onMessage(async event => {
        const data = event.data || {};
        if (data.type === protocol + '_READY') {
            await sendReviews();
        } else if (data.type === protocol + '_OPEN_PROJECT' && !popupOpening) {
            const projectId = String(data.projectId || '');
            if (!projectId || !reviews?.some(row => row.project === projectId)) return;
            popupOpening = true;
            try {
                await isoReviewsWindow.openLightbox('Projects', { projectId });
            } catch (error) {
                console.error('ISOTROPE Projects:', error);
            } finally {
                popupOpening = false;
            }
        }
    });
    void sendReviews();
});
