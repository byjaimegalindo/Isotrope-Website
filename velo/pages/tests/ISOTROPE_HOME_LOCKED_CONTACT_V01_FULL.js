/*
 * ISOTROPE — HOME / SERVICES
 *
 * #repeater4      Repeater
 * #line75         Límite superior de cada servicio
 * #line74         Límite inferior de cada servicio
 * #box103         Contenedor de cada servicio
 * #vectorImage31  Botón + del popup
 * #imageX46       Fotografía izquierda
 * #text550        Número 01-04
 *
 * CMS: IsotropeServicesScrollDemo
 * Popup: Services
 */

import wixData from 'wix-data';
import { window as siteWindow } from '@wix/site-window';

const COLLECTION = 'IsotropeServicesScrollDemo';
const POPUP_NAME = 'Services';

// Punto visual donde se activa cada servicio.
const ACTIVATION_LINE = 0.52;

// Frecuencia de lectura mientras Services está visible.
const CHECK_MS = 65;

$w.onReady(function () {

    const repeater = $w('#repeater4');
    const plus = $w('#vectorImage31');
    const image = $w('#imageX46');
    const number = $w('#text550');

    let upper = null;
    let lower = null;

    try {
        upper = $w('#line75');
        lower = $w('#line74');
    } catch (error) {
        console.warn(
            'ISOTROPE: líneas no accesibles por Velo',
            error
        );
    }

    let services = [];
    let activeIndex = -1;
    let scrollY = null;
    let scrollDirection = 0;
    let reading = false;
    let popupOpening = false;
    let trackingTimer = null;

    const visibleItems = new Set();
    const limits = new Map();

    function itemId(event) {
        return event &&
            event.context &&
            event.context.itemId;
    }

    function serviceIndex(id) {

        if (!id || !services.length) {
            return -1;
        }

        const exact = services.findIndex(
            item => item._id === id
        );

        if (exact >= 0) {
            return exact;
        }

        const repeated = repeater.data || [];

        const index = repeated.findIndex(
            item => item._id === id
        );

        return (
            index >= 0 &&
            index < services.length
        ) ? index : -1;
    }

    function activate(index) {

        if (
            index < 0 ||
            index >= services.length ||
            activeIndex === index
        ) {
            return;
        }

        const item = services[index];

        const src = item.image || item.imageUrl;

        if (!src) {
            console.warn(
                'ISOTROPE: imagen faltante',
                item.number
            );
            return;
        }

        // Actualización conjunta, sin animaciones
        // ni cambios de posición del elemento.

        image.src = src;

        number.text = String(
            item.number ||
            String(index + 1).padStart(2, '0')
        );

        activeIndex = index;

        console.log(
            'ISOTROPE: servicio activo',
            number.text
        );
    }

    function updateActive(y, height) {

        if (!services.length) {
            return;
        }

        const point =
            y + height * ACTIVATION_LINE;

        const boundaries = services.map(() => ({
            upper: null,
            lower: null
        }));

        for (const [id, interval] of limits) {

            const index = serviceIndex(id);

            if (index >= 0) {
                boundaries[index] = interval;
            }
        }

        let candidate = 0;

        // Cada transición utiliza el límite superior
        // del siguiente servicio.
        //
        // Si aún no se registró, utiliza como
        // respaldo el límite inferior del anterior.

        for (let i = 1; i < services.length; i++) {

            const upperY = boundaries[i].upper;

            const previousLower =
                boundaries[i - 1].lower;

            const transition =
                Number.isFinite(upperY)
                    ? upperY
                    : previousLower;

            if (
                Number.isFinite(transition) &&
                point >= transition
            ) {
                candidate = i;
            }
        }

        activate(candidate);
    }

    async function readScroll() {

        if (reading) {
            return;
        }

        reading = true;

        try {

            const rect =
                await siteWindow.getBoundingRect();

            const y = Number(
                rect?.scroll?.y
            );

            const h = Number(
                rect?.window?.height
            );

            if (
                !Number.isFinite(y) ||
                !(h > 0)
            ) {
                return;
            }

            if (
                scrollY !== null &&
                Math.abs(y - scrollY) > 0.5
            ) {
                scrollDirection =
                    Math.sign(y - scrollY);
            }

            scrollY = y;

            updateActive(y, h);

        } catch (error) {

            console.error(
                'ISOTROPE: lectura de scroll',
                error
            );

        } finally {

            reading = false;
        }
    }

    /*
     * CAPTURA DE LOS DOS LÍMITES
     *
     * Wix notifica cuándo una línea cruza
     * los bordes visibles de la ventana.
     *
     * Con ese borde y la dirección del scroll
     * calculamos la posición del marcador.
     */

    async function registerLimit(
        event,
        key,
        entering
    ) {

        const id = itemId(event);

        if (!id) {
            return;
        }

        try {

            const rect =
                await siteWindow.getBoundingRect();

            const y = Number(
                rect?.scroll?.y
            );

            const h = Number(
                rect?.window?.height
            );

            if (
                !Number.isFinite(y) ||
                !(h > 0)
            ) {
                return;
            }

            const directionFromChange =
                scrollY !== null &&
                Math.abs(y - scrollY) > 0.5
                    ? Math.sign(y - scrollY)
                    : scrollDirection;

            if (!directionFromChange) {
                return;
            }

            const crossedBottom =
                entering === (directionFromChange > 0);

            const documentY =
                y + (crossedBottom ? h : 0);

            const interval = limits.get(id) || {
                upper: null,
                lower: null
            };

            interval[key] = documentY;

            limits.set(id, interval);

            updateActive(y, h);

        } catch (error) {

            console.error(
                'ISOTROPE: error de marcador',
                key,
                error
            );
        }
    }

    /*
     * EVENTOS DE LÍMITES REPETIDOS
     */

    const markersSupported =
        [upper, lower].every(element =>
            element &&
            typeof element.onViewportEnter === 'function' &&
            typeof element.onViewportLeave === 'function'
        );

    if (markersSupported) {

        upper.onViewportEnter(event => {
            void registerLimit(
                event,
                'upper',
                true
            );
        });

        upper.onViewportLeave(event => {
            void registerLimit(
                event,
                'upper',
                false
            );
        });

        lower.onViewportEnter(event => {
            void registerLimit(
                event,
                'lower',
                true
            );
        });

        lower.onViewportLeave(event => {
            void registerLimit(
                event,
                'lower',
                false
            );
        });

    } else {

        // No bloquear los botones si las líneas
        // no admiten eventos de viewport.

        console.error(
            'ISOTROPE: #line75 y #line74 no admiten eventos ' +
            'de viewport. En ese caso deben sustituirse ' +
            'por Boxes de 1 px conservando los mismos IDs.'
        );
    }

    /*
     * SEGUIMIENTO SOLO EN SERVICES
     */

    function startTracking() {

        if (trackingTimer !== null) {
            return;
        }

        trackingTimer = setInterval(() => {
            void readScroll();
        }, CHECK_MS);

        void readScroll();
    }

    function stopTracking() {

        if (trackingTimer === null) {
            return;
        }

        clearInterval(trackingTimer);

        trackingTimer = null;
    }

    $w('#box103').onViewportEnter(event => {

        const id = itemId(event);

        if (id) {
            visibleItems.add(id);
        }

        startTracking();
    });

    $w('#box103').onViewportLeave(event => {

        const id = itemId(event);

        if (id) {
            visibleItems.delete(id);
        }

        if (!visibleItems.size) {
            stopTracking();
        }
    });

    /*
     * BOTONES +
     * No participan en el seguimiento del scroll.
     */

    plus.onClick(async event => {

        if (popupOpening) {
            return;
        }

        const index = serviceIndex(
            itemId(event)
        );

        if (index < 0) {
            console.warn(
                'ISOTROPE: servicio del botón no encontrado'
            );
            return;
        }

        popupOpening = true;

        try {

            await siteWindow.openLightbox(
                POPUP_NAME,
                {
                    serviceId: services[index]._id,
                    sortOrder: services[index].sortOrder
                }
            );

        } catch (error) {

            console.error(
                'ISOTROPE: error abriendo popup',
                error
            );

        } finally {

            popupOpening = false;
        }
    });

    /*
     * CMS
     */

    void wixData
        .query(COLLECTION)
        .ascending('sortOrder')
        .limit(4)
        .find()
        .then(result => {

            if (result.items.length !== 4) {
                throw new Error(
                    'Se esperaban cuatro servicios en el CMS.'
                );
            }

            services = result.items
                .slice()
                .sort(
                    (a, b) =>
                        Number(a.sortOrder) -
                        Number(b.sortOrder)
                );

            activate(0);

            void readScroll();

            console.log(
                'ISOTROPE: límites 01–04 inicializados.'
            );
        })
        .catch(error => {

            console.error(
                'ISOTROPE: error consultando CMS',
                error
            );
        });
});


// ============================================================
// ISOTROPE — REVIEWS / PROJECTS · ONLINE TEST
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
        try {
            preview = (await siteWindow.viewMode()) === 'Preview';
        } catch (error) {
            preview = false;
        }
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
                isDemo: item.isDemo === true,
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
                reviews,
                showSampleNotice: !preview && reviews.some(item => item.isDemo)
            });
        } catch (error) {
            console.error('ISOTROPE Reviews:', error);
            htmlReviews.postMessage({
                type: protocol + '_ERROR',
                message: 'Unable to load reviews. Check CMS access.'
            });
        }
    }

    htmlReviews.onMessage(async event => {
        const data = event.data || {};
        if (data.type === protocol + '_READY') {
            await sendReviews();
        } else if (data.type === protocol + '_OPEN_PROJECT' && !opening) {
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

// ============================================================
// ISOTROPE — CONTACT / ENQUIRIES · independent native form
// Existing Services and Reviews code above remains untouched.
// ============================================================
import { getEnquiryServices, submitEnquiry } from 'backend/isotropeEnquiries.web';

$w.onReady(function () {
    const name = $w('#contactName');
    const company = $w('#contactCompany');
    const email = $w('#contactEmail');
    const phone = $w('#contactPhone');
    const service = $w('#contactService');
    const message = $w('#contactMessage');
    const consent = $w('#contactConsent');
    const captcha = $w('#contactCaptcha');
    const submit = $w('#contactSubmit');
    const feedback = $w('#contactFeedback');
    let busy = false;

    function show(text) {
        feedback.text = text;
        feedback.show();
    }
    function sync() {
        if (!busy && captcha.token) submit.enable();
        else submit.disable();
    }
    function resetCaptcha() {
        captcha.reset();
        submit.disable();
    }
    feedback.hide();
    submit.disable();
    service.options = [{ label: 'Other / Not sure', value: 'other' }];
    service.value = undefined;
    void getEnquiryServices().then(options => {
        const selected = service.value;
        service.options = [...options, { label: 'Other / Not sure', value: 'other' }];
        if (selected && service.options.some(option => option.value === selected)) service.value = selected;
    }).catch(() => {
        // The visitor can still submit an enquiry without a service.
    });

    captcha.onVerified(() => { if (!busy) feedback.hide(); sync(); });
    captcha.onTimeout(() => submit.disable());
    captcha.onError(() => {
        submit.disable();
        show('Verification could not load. Please try again.');
    });

    submit.onClick(async () => {
        if (busy || !captcha.token) return;
        const data = {
            fullName: String(name.value || '').trim(),
            company: String(company.value || '').trim(),
            email: String(email.value || '').trim(),
            phone: String(phone.value || '').trim(),
            serviceId: String(service.value || ''),
            message: String(message.value || '').trim(),
            consent: consent.checked === true,
            token: captcha.token
        };
        if (!data.fullName || data.fullName.length > 120 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
            data.email.length > 254 || !data.message || data.message.length > 3000 ||
            data.company.length > 160 || data.phone.length > 40 ||
            (data.phone && !/^[+\d\s().-]{5,40}$/.test(data.phone)) ||
            !data.consent) {
            show('Please check the required fields and privacy consent.');
            return;
        }
        busy = true;
        submit.disable();
        submit.label = 'SENDING…';
        feedback.hide();
        try {
            const result = await submitEnquiry(data);
            if (!result || result.ok !== true) throw new Error('Not confirmed');
            name.value = ''; company.value = ''; email.value = '';
            phone.value = ''; message.value = ''; service.value = undefined;
            consent.checked = false;
            show('Thank you. Your enquiry has been received.');
        } catch (error) {
            show('Your enquiry could not be sent. Please verify and try again.');
        } finally {
            busy = false;
            submit.label = 'SEND ENQUIRY';
            resetCaptcha();
        }
    });
});
