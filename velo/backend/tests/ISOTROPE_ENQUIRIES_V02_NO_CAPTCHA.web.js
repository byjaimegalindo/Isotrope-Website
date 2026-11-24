import { Permissions, webMethod } from 'wix-web-module';
import wixData from 'wix-data';

const ENQUIRIES = 'IsotropeEnquiries';
const SERVICES = 'IsotropeServicesScrollDemo';

async function serviceOptions() {
    const result = await wixData.query(SERVICES)
        .ascending('sortOrder').limit(100).find({ suppressAuth: true });
    return result.items.map(item => ({
        label: String(item.title || '').trim(),
        value: String(item._id)
    })).filter(item => item.label && item.value);
}

export const getEnquiryServices = webMethod(Permissions.Anyone, async () => {
    return serviceOptions();
});

function clean(value, max, required = false) {
    if (typeof value !== 'string' && value !== undefined && value !== null) {
        throw new Error('Invalid field.');
    }
    const text = String(value || '').trim();
    if ((required && !text) || text.length > max) throw new Error('Invalid field.');
    return text;
}

export const submitEnquiry = webMethod(Permissions.Anyone, async (request) => {
    if (!request || typeof request !== 'object') throw new Error('Invalid submission.');
    const fullName = clean(request.fullName, 120, true);
    const company = clean(request.company, 160);
    const email = clean(request.email, 254, true).toLowerCase();
    const phone = clean(request.phone, 40);
    const serviceId = clean(request.serviceId, 100);
    const message = clean(request.message, 3000, true);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email.');
    if (phone && !/^[+\d\s().-]{5,40}$/.test(phone)) throw new Error('Invalid phone.');
    if (request.consent !== true) throw new Error('Consent is required.');
    let serviceInterest = '';
    if (serviceId === 'other') {
        serviceInterest = 'Other / Not sure';
    } else if (serviceId) {
        const options = await serviceOptions();
        const selected = options.find(item => item.value === serviceId);
        if (!selected) throw new Error('Invalid service.');
        serviceInterest = selected.label;
    }
    const item = {
        title: fullName,
        fullName, company, email, phone, serviceInterest, message,
        consent: true,
        status: 'New'
    };
    await wixData.insert(ENQUIRIES, item, { suppressAuth: true });
    return { ok: true };
});
