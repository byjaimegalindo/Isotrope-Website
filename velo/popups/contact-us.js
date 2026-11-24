/*
 * ISOTROPE — native popup "Contact us"
 * HTML component: #html1
 * CMS: IsotropeEnquiries, private, via backend/isotropeEnquiries.web.js (V02)
 * No CAPTCHA, location, or Home changes.
 */
import wixWindowFrontend from 'wix-window-frontend';
import { getEnquiryServices, submitEnquiry } from 'backend/isotropeEnquiries.web';

const PROTOCOL = 'ISOTROPE_CONTACT_POPUP_V1';
// Set the real business number when confirmed, e.g. in international format.
// The phone link is hidden until a valid number is configured.
const CONTACT_PHONE = '';

$w.onReady(function () {
    const iframe = $w('#html1');
    let busy = false;
    let optionsPromise = null;

    function getOptions() {
        if (!optionsPromise) {
            optionsPromise = getEnquiryServices()
                .catch(() => []);
        }
        return optionsPromise;
    }

    iframe.onMessage(async event => {
        const message = event.data || {};
        if (message.type === PROTOCOL + '_READY') {
            const services = await getOptions();
            iframe.postMessage({
                type: PROTOCOL + '_INIT',
                services,
                phone: CONTACT_PHONE
            });
        } else if (message.type === PROTOCOL + '_CLOSE') {
            wixWindowFrontend.lightbox.close();
        } else if (message.type === PROTOCOL + '_SUBMIT' && !busy) {
            const requestId = String(message.requestId || '');
            if (!requestId || requestId.length > 100) return;
            busy = true;
            let ok = false;
            try {
                const result = await submitEnquiry(message.data);
                ok = result?.ok === true;
            } catch (error) {
                console.error('ISOTROPE Contact us: submission failed.');
            } finally {
                busy = false;
                iframe.postMessage({
                    type: PROTOCOL + '_RESULT',
                    requestId,
                    ok
                });
            }
        }
    });
});
