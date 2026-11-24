// ISOTROPE — REVIEWS V02 / PREVIEW ONLY
// Replace ONLY the previously added Reviews block, never Services.
// No backend import is required for this visual test.
// Wix Preview runs with the Admin role; CMS permissions remain untouched.
import isoReviewsData from 'wix-data';
import isoReviewsWindow from 'wix-window-frontend';

$w.onReady(function () {
    const iframe = $w('#htmlReviews');
    const protocol = 'ISOTROPE_REVIEWS_V2';
    const preview = isoReviewsWindow.viewMode === 'Preview';
    let pending = null;
    let rows = [];
    let popupOpening = false;

    async function readCollection(id) {
        let page = await isoReviewsData.query(id)
            .ascending('sortOrder').limit(100).find();
        const items = page.items.slice();
        while (page.hasNext()) {
            page = await page.next();
            items.push(...page.items);
        }
        return items.filter(item => item.isDemo === true || item.visible === true);
    }

    function refId(value) {
        return typeof value === 'string' ? value : String(value?._id || value?.id || '');
    }

    async function load() {
        if (!preview) return [];
        const [reviews, projects] = await Promise.all([
            readCollection('IsotropeReviews'),
            readCollection('IsotropeProjects')
        ]);
        const allowed = new Set(projects.map(item => item._id));
        return reviews.map(item => ({
            id: item._id,
            clientCompany: item.clientCompany || '',
            clientName: item.clientName || '',
            comment: item.comment || '',
            photo: item.photo || '',
            rating: item.rating ?? null,
            sortOrder: item.sortOrder ?? 0,
            project: allowed.has(refId(item.project)) ? refId(item.project) : ''
        }));
    }

    async function send() {
        try {
            if (!pending) pending = load().catch(error => {
                pending = null;
                throw error;
            });
            rows = await pending;
            iframe.postMessage({ type: protocol + '_INIT', reviews: rows });
        } catch (error) {
            console.error('ISOTROPE Reviews:', error);
            iframe.postMessage({
                type: protocol + '_ERROR',
                message: 'Unable to load reviews. Check the CMS in Preview.'
            });
        }
    }

    iframe.onMessage(async event => {
        const data = event.data || {};
        if (data.type === protocol + '_READY') {
            await send();
        } else if (preview && data.type === protocol + '_OPEN_PROJECT' && !popupOpening) {
            const projectId = String(data.projectId || '');
            if (!projectId || !rows.some(row => row.project === projectId)) return;
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
    void send();
});
