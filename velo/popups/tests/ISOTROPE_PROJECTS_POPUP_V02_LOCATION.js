/*
 * ISOTROPE — native popup "Projects"
 * Independent from Services and Team Experience.
 * HTML component: #html1
 * CMS: IsotropeProjects
 * Home sends { projectId } via openLightbox('Projects', ...).
 */
import wixData from 'wix-data';
import wixWindowFrontend from 'wix-window-frontend';

const COLLECTION = 'IsotropeProjects';
const PROTOCOL = 'ISOTROPE_PROJECTS_POPUP_V1';

$w.onReady(function () {
    const iframe = $w('#html1');
    const context = wixWindowFrontend.lightbox.getContext() || {};
    let htmlReady = false;
    let status = 'loading';
    let projects = [];

    function sendState() {
        if (!htmlReady || status === 'loading') return;
        if (status === 'error') {
            iframe.postMessage({
                type: PROTOCOL + '_ERROR',
                message: 'Unable to load project information.'
            });
            return;
        }
        iframe.postMessage({
            type: PROTOCOL + '_INIT',
            projects,
            projectId: String(context.projectId || '')
        });
    }

    iframe.onMessage(event => {
        const message = event.data || {};
        if (message.type === PROTOCOL + '_READY') {
            htmlReady = true;
            sendState();
        } else if (message.type === PROTOCOL + '_CLOSE') {
            wixWindowFrontend.lightbox.close();
        }
    });

    async function loadProjects() {
        let result = await wixData.query(COLLECTION)
            .ascending('sortOrder')
            .limit(100)
            .find();
        const rows = result.items.slice();
        while (result.hasNext()) {
            result = await result.next();
            rows.push(...result.items);
        }
        return rows
            .filter(item => item.isDemo === true || item.visible === true)
            .map(item => ({
                _id: item._id,
                sortOrder: item.sortOrder ?? 0,
                title: item.title || '',
                clientCompany: item.clientCompany || '',
                serviceType: item.serviceType || '',
                location: item.location || '',
                description: item.description || '',
                coverImage: item.coverImage || '',
                gallery: Array.isArray(item.gallery) ? item.gallery : [],
                isDemo: item.isDemo === true
            }));
    }

    void loadProjects()
        .then(rows => {
            projects = rows;
            status = 'ready';
            sendState();
        })
        .catch(error => {
            console.error('ISOTROPE Projects popup:', error);
            status = 'error';
            sendState();
        });
});
