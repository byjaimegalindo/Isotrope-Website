import wixData from 'wix-data';
import { webMethod, Permissions } from 'wix-web-module';

const REVIEWS = 'IsotropeReviews';
const PROJECTS = 'IsotropeProjects';

async function readRows(collection, preview) {
    let query = wixData.query(collection).ascending('sortOrder');
    if (!preview) query = query.eq('visible', true).ne('isDemo', true);
    let result = await query.limit(100).find({ suppressAuth: true });
    const rows = result.items.slice();
    while (result.hasNext()) {
        result = await result.next();
        rows.push(...result.items);
    }
    return rows.filter(row => preview
        ? (row.isDemo === true || row.visible === true)
        : (row.visible === true && row.isDemo !== true));
}

function refId(value) {
    return typeof value === 'string' ? value : String(value?._id || value?.id || '');
}

async function loadReviews(preview) {
    const [reviews, projects] = await Promise.all([
        readRows(REVIEWS, preview),
        readRows(PROJECTS, preview)
    ]);
    const projectIds = new Set(projects.map(item => item._id));
    return reviews.map(item => {
        const id = refId(item.project);
        return {
            id: item._id,
            clientCompany: item.clientCompany || '',
            clientName: item.clientName || '',
            comment: item.comment || '',
            rating: item.rating ?? null,
            photo: item.photo || '',
            project: projectIds.has(id) ? id : '',
            sortOrder: item.sortOrder ?? 0
        };
    });
}

// Public visitors can never request hidden or demonstration records.
export const getPublishedReviews = webMethod(Permissions.Anyone,
    async () => loadReviews(false));

// Demo content is reserved for authenticated site administrators.
export const getPreviewReviews = webMethod(Permissions.Admin,
    async () => loadReviews(true));
