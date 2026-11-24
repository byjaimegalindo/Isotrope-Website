// ============================================================
// ISOTROPE — REVIEWS / PROJECTS · PREVIEW ONLY
// Independent from Services. Existing imports are reused.
// ============================================================
$w.onReady(function () {
    const htmlReviews = $w('#htmlReviews');
    const protocol = 'ISOTROPE_REVIEWS_V2';
    let pending = null;
    let reviews = [];
    let opening = false;
    let preview = false;

    async function readCollection(collection) {
        let result = await wixData.query(collection)
            .ascending('sortOrder').limit(100).find();
        const items = result.items.slice();
        while (result.hasNext()) {
            result = await result.next();
            items.push(...result.items);
        }
        return items.filter(item => item.isDemo === true || item.visible === true);
    }

    function referenceId(value) {
        return typeof value === 'string'
            ? value
            : String(value?._id || value?.id || '');
    }

    async function load() {
        preview = (await siteWindow.viewMode()) === 'Preview';
        if (!preview) return [];
        const [reviewItems, projectItems] = await Promise.all([
            readCollection('IsotropeReviews'),
            readCollection('IsotropeProjects')
        ]);
        const projectIds = new Set(projectItems.map(item => item._id));
        return reviewItems.map(item => {
            const id = referenceId(item.project);
            return {
                id: item._id,
                clientCompany: item.clientCompany || '',
                clientName: item.clientName || '',
                comment: item.comment || '',
                photo: item.photo || '',
                rating: item.rating ?? null,
                sortOrder: item.sortOrder ?? 0,
                project: projectIds.has(id) ? id : ''
            };
        });
    }

    async function sendReviews() {
        try {
            if (!pending) pending = load().catch(error => {
                pending = null;
                throw error;
            });
            reviews = await pending;
            htmlReviews.postMessage({
                type: protocol + '_INIT',
                reviews
            });
        } catch (error) {
            console.error('ISOTROPE Reviews:', error);
            htmlReviews.postMessage({
                type: protocol + '_ERROR',
                message: 'Unable to load reviews. Check Preview and CMS access.'
            });
        }
    }

    htmlReviews.onMessage(async event => {
        const data = event.data || {};
        if (data.type === protocol + '_READY') {
            await sendReviews();
        } else if (preview && data.type === protocol + '_OPEN_PROJECT' && !opening) {
            const projectId = String(data.projectId || '');
            if (!projectId || !reviews.some(item => item.project === projectId)) return;
            opening = true;
            try {
                await siteWindow.openLightbox('Projects', { projectId });
            } catch (error) {
                console.error('ISOTROPE Projects:', error);
            } finally {
                opening = false;
            }
        }
    });

    void sendReviews();
});
