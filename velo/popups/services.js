/*
 * ISOTROPE | POPUP "Services" (Wix Studio / Velo)
 * -------------------------------------------------
 * HTML component: #html1
 * CMS collection: IsotropeServicesScrollDemo
 * Receives serviceId from Home through openLightbox().
 * Fetches all 4 real records and lets HTML control cyclic navigation.
 * The popup has NO photos.
 */

import wixData from 'wix-data';
import wixWindowFrontend from 'wix-window-frontend';

const COLLECTION = 'IsotropeServicesScrollDemo';
const PROTOCOL = 'ISOTROPE_SERVICES_POPUP_V1';

$w.onReady(function () {
    const iframe = $w('#html1');
    const context = wixWindowFrontend.lightbox.getContext() || {};

    let htmlReady = false;
    let dataReady = false;
    let records = [];

    function sendInitialData() {
        if (!htmlReady || !dataReady) {
            return;
        }

        const match = records.findIndex(service => service._id === context.serviceId);
        const matchingOrder = records.findIndex(
            service => Number(service.sortOrder) === Number(context.sortOrder)
        );
        const initialIndex = match >= 0 ? match : (matchingOrder >= 0 ? matchingOrder : 0);

        iframe.postMessage({
            type: PROTOCOL + '_INIT',
            services: records,
            initialIndex
        });
    }

    iframe.onMessage(event => {
        const message = event.data || {};

        if (message.type === PROTOCOL + '_READY') {
            htmlReady = true;
            sendInitialData();
        }

        if (message.type === PROTOCOL + '_CLOSE') {
            wixWindowFrontend.lightbox.close();
        }
    });

    void wixData.query(COLLECTION)
        .ascending('sortOrder')
        .limit(4)
        .find()
        .then(result => {
            if (result.items.length !== 4) {
                throw new Error('Se esperaban los cuatro servicios del CMS.');
            }

            records = result.items.map(item => ({
                _id: item._id,
                number: item.number,
                sortOrder: item.sortOrder,
                title: item.title,
                accent: item.accent,
                strap: item.strap,
                description: item.description,
                capabilities: item.capabilities,
                deliver: item.deliver
            }));

            dataReady = true;
            sendInitialData();
        })
        .catch(error => {
            console.error('ISOTROPE Popup: fallo al cargar CMS.', error);
            if (htmlReady) {
                iframe.postMessage({
                    type: PROTOCOL + '_ERROR',
                    message: 'Unable to load service information.'
                });
            }
        });
});