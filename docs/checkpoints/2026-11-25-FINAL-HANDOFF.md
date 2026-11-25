# ISOTROPE — CIERRE INTEGRAL · 25 NOV 2026 · PRESENTACIÓN PARA FEEDBACK

## 1. Estado y autoridad
El usuario cierra la sesión de hoy y prevé presentar el sitio al cliente en la tarde para recibir feedback. No equivale a aceptación final del cliente ni autorización de publicación. Este checkpoint es el punto de partida vigente y prevalece sobre estados anteriores contradictorios. Leer también [cierre del footer](2026-11-25-FOOTER-LOCKED.md), [cierre integral 24-11](2026-11-24-FINAL-HANDOFF.md), [cierre Services 23-11](2026-11-23-HANDOFF.md) y [contrato de marca](../brand/README.md).

**Regla absoluta: LO QUE FUNCIONA NO SE TOCA.** Todos los módulos aprobados por el usuario quedan bloqueados: Hero, menú desktop, About, How We Work, Services, Why Us, Reviews, Projects, Team Experience, Contact, Outro fijo y Footer. No reabrir ni cambiar apariencia, copy, animaciones, arquitectura, IDs, campos, permisos, CMS, backend, recursos o código fuera de nueva solicitud expresa. Bloqueo documental, no protección de rama. No hacer cambios anticipados ante feedback aún no recibido.

- Sitio original: Isotrope, Wix Studio, ID `115fc02c-5174-48e8-ac81-c9494ab75bf8`, [URL de desarrollo](https://miv-studio.wixstudio.com/isotrope-testing). No intervenir copias.
- Repositorio documental: `byjaimegalindo/Isotrope-Website`, main. Repositorio privado nativo: `byjaimegalindo/isotrope-wix-studio`, main. Git Integration no es prueba de sincronización de último commit, ejecución ni publicación.
- Usuario monta HTML completo en Wix; entrega siempre RAW fijado por commit, nunca fragmentos ni reconstrucciones.
- Fuentes originales preservadas en Biblioteca /ISOTROPE/Documentos rectores/: Brand Universe (37 páginas), Services Overview (1 página), Capability Statement (11 diapositivas), referencias exactas en cierre del 24-11. Consultarlas para futuros cambios. Marca: #A477EB, #8B07D1, #8D45FF, #340566 (fondos), blanco, negro, #5B5B5B, #A5A5A5; Archivo Black para títulos, Poppins para UI/cuerpo, Amsi Pro para claims según manual. Imágenes monocromáticas.

## 2. Footer — cierre confirmado
Única versión vigente: [V15 FULL RAW](https://raw.githubusercontent.com/byjaimegalindo/Isotrope-Website/4fdea09d4b38a1d1ed5be38674f3c6c06c044784/frontend/footer/ISOTROPE_FOOTER_V15_FULL.html), blob `1649469f2df663ffe9297f97e88dee521b441f28`. Verificado nuevamente en main al cierre. V15 elimina exclusivamente ABN de V14 por orden expresa. Copyright «© 2026 ISOTROPE. All rights reserved.» No restaurar V01–V14.
- `#htmlFooter`, cuatro columnas, fondo negro, títulos Poppins Bold morado #8D45FF, enlaces blancos → gris #A5A5A5 en hover, Privacy Policy gris → blanco. Badge IRATA alineado con CONTACT US nativo, sin título. Melbourne, Australia último dato de contacto. Logo y CTA nativos fuera del iframe. Preservar alineación, dimensiones y espaciado de la captura aprobada.
- About → #section96; How We Work → #section87; Why Us → #section101; Services → #line77; Reviews → #section104; Projects → popup nativo Projects sin projectId (índice inicial 0); Team Experience → popup nativo Team Experience; Privacy Policy → /privacy-policy en misma pestaña; Back to top → scrollTo(0,0).
- Email admin@isotrope.com.au. Teléfono de maqueta +61 2 5550 1234 solo texto; NO verificado como número real. Antes de entrega pública sustituir o retirar con aprobación del usuario. No introducir ABN nuevamente.
- Protocolo ISOTROPE_FOOTER_V1_NAVIGATE. No cambiar backend/CMS ni popup Projects para esta navegación. Detalles y asset exacto en checkpoint del footer.

## 3. Services — corrección nativa confirmada por usuario
Síntoma: al pulsar +, desplazamiento al top antes de abrir popup o al cerrarlo. El Velo existente no ordena desplazamiento: solo openLightbox('Services', {serviceId, sortOrder}). Captura mostró enlace nativo activo en `#vectorImage31`. Se indicó retirar su enlace nativo (None / Ninguno), dejando exclusivamente onClick de Velo. El usuario confirmó «Perfecto, corregido!!!». No se modificó Velo del controlador ni popup durante esa corrección. No volver a vincular nativamente el icono +. No añadir restauraciones de scroll ni parches.
- Mantener repeater #repeater4, límites #line75/#line74, #box103, #imageX46, #text550, activación 52%, polling 65 ms, sticky nativo y scroll general. CMS `IsotropeServicesScrollDemo` con cuatro servicios; popup `Services` con #html1. Las cuatro imágenes definitivas conservadas (ver §6).

## 4. Hero — botones conectados, sin tocar diseño
El usuario entregó el HTML exacto del Hero V9 (adjunto Pasted text(20261125-170529).txt) y pidió únicamente conectar Explore y Talk. Fuente vigente para el Hero con CTA: [V9 CTA LINKED FULL RAW](https://raw.githubusercontent.com/byjaimegalindo/Isotrope-Website/5afe6e4c7a539714561b8a5ebbf38be42d0fc9e7/frontend/hero/ISOTROPE_HERO_V9_CTA_LINKED_FULL.html), blob `ff2b461d9137798c1a8c8f86d88e6d88557a0925`. Verificado en main. No reinstalar baselines antiguos por encima de la versión vigente.
- `#htmlHero` confirmado en editor. Únicas modificaciones del HTML: atributos data-hero-action de ambos botones, comentario y listener aislado con postMessage ISOTROPE_HERO_V1_NAVIGATE. Conservar video, X-Ray, tipografías, CSS, responsive, secuencia, scroll relay, renderFrame y blackout 0.61–1.50 exactamente.
- Explore our services → #line77.scrollTo(); Talk to our team → siteWindow.openLightbox("Let's talk") según nombre visible registrado en sesión. **Pendiente comprobar nombre y apertura real**: el cierre del 24-11 registraba el nombre Contact us y el archivo nativo sigue siendo src/pages/Contact us.yypnx.js. No renombrar popup ni tocar su código automáticamente; si el test falla, verificar el nombre actual exacto en editor antes de corregir solo la llamada. 
- Custom Embed Hero original rev13 y comportamiento nativo del header no intervenidos. El usuario reportó previamente corrección del comportamiento del menú desktop; no se dispone aquí de un diff específico de ese ajuste, no reconstruirlo.

### Código nativo vigente
`src/pages/Home.c1dmp.js` — commit `ad4dc708b0fc4cbc126bb07aa876a0d967fbe0aa`, blob `94ecb8c3dd84fdf45f337b6f3e2702eb981a0e6a`. Confirmado por lectura de main en cierre. Contiene Services + Reviews/Projects previos intactos, Footer V1 (commit previo a70a9a6c8c5bf21f0ffc6272cb70e7ad1271d72e) y un bloque independiente al final para Hero CTA. El contenido previo al añadido de Hero fue verificado como prefijo idéntico. No restaurar el Home anterior a estos bloques.
`src/pages/Services.d0y3h.js` — blob `0c7f69d721a55832c77e195484105a9795134e97`, confirmado intacto.
Contact V07, Projects V03, Reviews V09, Team Experience, How We Work, Why Us y Outro fijo siguen bajo cierres anteriores. No cambiar código ni instalar otra versión.

## 5. Privacy Policy
Se entregó en conversación el copy completo en inglés australiano, 23 apartados, fecha 25 November 2026. Adaptado a Melbourne, Victoria, Australia, cuatro servicios y formulario Wix. Único dato de contacto: admin@isotrope.com.au; sin teléfono, dirección postal ni ABN.
Referencia Privacy Act 1988 (Cth) y Australian Privacy Principles, cuando aplicables; incluye recolección, uso, confidencialidad industrial, datos sensibles, divulgación, Wix, transferencias internacionales, cookies/analítica, comunicaciones, seguridad, retención, acceso/corrección, anonimato, consentimiento, terceros, menores, reclamaciones OAIC y cambios. Texto para revisión del cliente, no certificación legal. Confirmar prácticas reales de datos, cookies, proveedores, retención y aplicabilidad legal antes de entrega pública. No se verificó instalación del copy en editor; no se escribió a Wix durante su redacción. La política es editable por el usuario, no reescribir sin solicitud. Privacy Policy enlazada en Footer.

## 6. Limpieza efectuada por MCP — verificada en respuestas de Wix
Sitio original, no otro proyecto. No publicación ni eliminación permanente. Resultado confirmado:
- Carpeta `Template Assets` ID `99f3059a2d9c499ca95e3d9b3e99cbee`, 28 imágenes, movida a papelera recuperable; ya no figura en raíz activa.
- Dos retratos 2025 de template en raíz, IDs `0e5ac5_4f3b4721c1f14de19b1b770b01d29e11~mv2.png`, `0e5ac5_da760ce39add487f897f990e1118ab77~mv2.png`, retirados.
- Cuatro provisionales ISOTROPE_SERVICES_TEMP_01–04, IDs `047d6b_cfe76667051d482db76529ee5dc9de6d~mv2.jpeg`, `047d6b_e93d2a0563614f3ea0c3d82b2f469814~mv2.jpeg`, `047d6b_8a3e7362621949c78b58adecde908346~mv2.jpeg`, `047d6b_b7ac0e5a1adc4b3b8724c3c38f59cab5~mv2.jpeg`, retirados después de comprobar cuatro imágenes definitivas en CMS. Verificados ausentes de raíz.
- Total 34 medios retirados (28+2+4), recuperables. Raíz: 35 archivos antes, 29 después (los 28 estaban en carpeta). No vaciar papelera.
- `gotactik` ID `ec0255dfd00540219d4d8e7c746699c0`: agencia propia, preservación obligatoria incluyendo subcarpetas. `Branding` ID `6704c1e789d3445db983bd504afdcd28`: conservada íntegra. Ambas verificadas en raíz posterior. No mover ni renombrar.
- No se pudo verificar cada referencia nativa/HTML del editor por MCP; no se afirmó que el resto esté sin uso. Si aparece recurso faltante, comprobar papelera antes de recrear. 
- Títulos SEO de borrador corregidos exclusivamente: Home (c1dmp) «ISOTROPE | Specialist Rope Access Melbourne» antes Bonx Hanyman; Privacy Policy (zttit) «Privacy Policy | ISOTROPE» antes Privacy Policy | Bonx Handyman. Readback correcto; publish=false. No cambio de indexación ni de otros tags. No afirmar efecto en versión publicada.
- Nombres visibles CMS actualizados vía PATCH, IDs, campos y permisos comprobados iguales:
  - IsotropeServicesScrollDemo → ISOTROPE · Services (01–04), ya correcto.
  - IsotropeProjects → ISOTROPE · Projects (6 registros de presentación).
  - IsotropeReviews → ISOTROPE · Reviews (6 registros de presentación).
  - IsotropeEnquiries → ISOTROPE · Enquiries (privada).
  - Services → Archive · Template Services (3 registros antiguos Improvement Projects, Home Maintenance, Home Fix-It & Repair; rutas dinámicas /services/improvement-projects, /services/home-maintenance, /services/home-repair).
  - Home2Story → Archive · Home 2 Storytelling (10 registros; existe código Home 2.ontk8.js que depende de esta colección).
  - No se eliminaron colecciones ni páginas. Las dos archivadas necesitan resolver dependencias obsoletas desde editor, con autorización de limpieza existente; conservar si existe uso real. No tocar colecciones de sistema.
- Cuatro imágenes Services definitivas, proteger por ID aunque no aparezcan en raíz: `047d6b_192f7d36891c44ed8b2236dd5a92b27c~mv2.png`, `047d6b_2d4b5c2a23f24b44a9fad1adce7fba91~mv2.png`, `047d6b_0c493fd79fe3416a93d2e95e791e79aa~mv2.png`, `047d6b_e2711eaf42e0416c9bdc889e7a59b2dc~mv2.png`. Proteger igualmente imágenes de Projects (incluidas galerías) y Reviews, video Hero `047d6b_609aac39aa5f4f6791e03351f4089d25`, video About `047d6b_797da783527f4afd93f9003d4715e043` y badge IRATA `047d6b_5777d3503de84b1c88d9ae6d0c673824~mv2.png`, además de todas las demás referencias reales del sitio.

## 7. Work — limpieza adicional delegada, no ejecutada en este chat
Se entregó prompt para Work. No consta resultado ni ejecución posterior. El usuario precisa «en los htmls hay imágenes que se están usando por CMS o por enlace». Es obligatorio hacer un único inventario y cruzar IDs reales con: elementos nativos de todos los breakpoints, HTML vigentes instalados, URLs static.wixstatic.com/video.wixstatic.com, wix:image/wix:video, CMS (campos multimedia, galerías, URLs), Velo, backend, Custom Embeds, popups, iconos, fondos y carga dinámica. Indicador nativo «en uso» no es suficiente. Si hay duda, conservar. Organizar sin alterar ID/URL. Gotactik y Branding excluidas de toda intervención. No usar versiones descartadas como fuente de dependencias vigentes. No repetir las 34 bajas ni SEO/nombres CMS ya realizados. No publicar ni vaciar papelera. Agrupar llamadas, evitar capturas y diagnósticos redundantes para ahorrar créditos. Pedir resumen verificable final de acciones y excepciones. Antes de continuar con limpieza, leer su resultado si el usuario lo aporta.

## 8. Presentación de la tarde — estado y QA mínimo
Presentación para FEEDBACK, no lanzamiento definitivo. Mantener estado actual y no generar nuevas propuestas ni aplicar cambios sin feedback. En una sola pasada, verificar en Preview o en versión disponible para presentación:
1. Hero: Explore llega a Services; Talk abre Contact correcto. Footer: enlaces/anclas, Projects y Team Experience, Privacy Policy misma pestaña, Back to top.
2. Services: cuatro + abren registro correcto y cierran conservando scroll (usuario ya confirmó corrección); imágenes y contador siguen coordinados.
3. Revisar que todos los medios visibles, galerías y videos carguen tras limpieza; comprobar navegación y vista desktop, tablet y móvil sin cambiar diseño.
4. Contact: comprobar apertura; envío real extremo a extremo y recepción en CMS privado pendientes de validación. No generar solicitudes ficticias sin autorización ni asumir notificación por email.
5. Confirmar versión de Privacy Policy montada, títulos SEO y ausencia visible de template. Publish solo con orden expresa.
6. Antes de lanzamiento público: teléfono oficial o retirada del provisional, reemplazar seis pares Reviews/Projects de maqueta por contenido auténtico autorizado, validar datos y credenciales (badge IRATA no equivale por sí solo a acreditación corporativa), confirmar prácticas de privacidad y revisión legal. No presentar material de demostración como testimonios/proyectos reales.

Estado de pruebas: usuario confirmó resolución de salto al top de Services; diseño footer cerrado. Hero CTA y footer verificados en código, no QA exhaustivo de ejecución ni sincronización final en Wix. Copy Privacy Policy entregado, instalación no confirmada. Limpieza parcial verificada por MCP, trabajo adicional no confirmado. No se realizaron Publish ni cambios de producción durante este cierre documental.

## 9. Inicio de próxima sesión
Leer este checkpoint primero y fuentes rectoras. Esperar feedback concreto del cliente, separar cambios nuevos de elementos bloqueados y ejecutar exclusivamente lo que indique el usuario. Registrar cada modificación aprobada con HTML FULL fijado y diff mínimo. No asumir que Git es publicación ni que Work completó operaciones no verificadas.
