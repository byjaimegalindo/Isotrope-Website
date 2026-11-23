# ISOTROPE — SERVICES · IMPLEMENTACIÓN FINAL APROBADA

**Fecha de cierre:** 23 de noviembre de 2026
**Estado declarado por el cliente:** «Todo funciona perfecto».
**Ámbito autorizado:** sección Services de Home y popup Services. No modificar Hero, Intro, About, Outro, Footer ni otros módulos.
**Sitio:** Wix Studio · \`115fc02c-5174-48e8-ac81-c9494ab75bf8\` · <https://miv-studio.wixstudio.com/isotrope-testing>
**Rama:** \`main\`.

## Fuente canónica única (reemplaza TODAS las anteriores de Services)

- **Velo Home / Services:** [../../velo/pages/home.js](../../velo/pages/home.js). Contiene el controlador final, copiado de la versión que el usuario instaló y aprobó.
- **Velo popup Services:** [../../velo/popups/services.js](../../velo/popups/services.js).
- **HTML popup blanco:** [../../frontend/services/services-popup.html](../../frontend/services/services-popup.html).
- **Marca:** [../brand/README.md](../brand/README.md) y texto completo del manual oficial.

**No reintroducir las versiones** V11 Cinematic, iframe sticky, faux scroll, scroll addon, vídeos/decoración no aprobados ni puentes de página de Services anteriores. El historial anterior de Git existe únicamente para trazabilidad, no como fuente de producción. No montar código HTML de servicios en el Home; el contenido visible del Home es **nativo de Wix**.

## IDs de Wix aprobados

| Elemento | ID / nombre | Función |
|---|---|---|
| Repeater | \`#repeater4\` | Cuatro servicios nativos en scroll normal |
| Contenedor item | \`#box103\` | Presencia del servicio en viewport |
| Límite superior item | \`#line75\` | Inicio de intervalo de cada servicio |
| Límite inferior item | \`#line74\` | Final de intervalo de cada servicio |
| Título item | \`#text59\` | Título nativo CMS; no dispara la versión final |
| Botón + item | \`#vectorImage31\` | Abre popup correspondiente |
| Imagen izquierda | \`#imageX46\` | Fotografía nativa sticky; solo Velo cambia \`src\` |
| Número izquierda | \`#text550\` | Velo coloca \`01\` a \`04\` |
| Popup Wix | \`Services\` | Lightbox nativo; desactivar auto-open |
| HTML del popup | \`#html1\` | Velo del popup envía cuatro registros vía \`postMessage\` |

**Importante:** \`#line75\` y \`#line74\` están dentro de cada ítem repetido; no pueden estar \`Hidden\` ni \`Collapsed\` si se usan como sensores de viewport. No reemplazarlos por IDs de otros contenedores. Conservar la posición que quedó aprobada en Wix.

## CMS

**Colección ID (estable):** \`IsotropeServicesScrollDemo\` (nombre visible: \`ISOTROPE · Services (01–04)\`).
**Permisos:** lectura pública para contenido de presentación.
**Orden de consulta:** \`sortOrder\` ascendente.
**Campos usados:** \`_id\`, \`sortOrder\`, \`number\`, \`title\`, \`strap\`, \`accent\`, \`description\`, \`capabilities\`, \`deliver\`, \`image\` / \`imageUrl\`.

| sortOrder | number | title |
|---|---|---|
| 1 | 01 | Inspection & Diagnostics |
| 2 | 02 | Maintenance & Remediation |
| 3 | 03 | Construction & Commissioning Support |
| 4 | 04 | Height Safety & Rescue |

**Conservar \`number\` como texto** para no perder cero inicial. **No modificar la colección \`Services\` de plantilla**, que es distinta y contiene registros antiguos. No cambiar campos o textos de \`IsotropeServicesScrollDemo\` sin instrucción expresa.

## Contrato del scroll aprobado

- **Scroll nativo general Wix**, no scroll de iframe ni slider.
- Límite superior \`#line75\` e inferior \`#line74\` determinan los intervalos del servicio; eventos \`onViewportEnter\` / \`onViewportLeave\` de las líneas registran los límites de cada elemento repetido.
- La función \`updateActive\` toma una línea de activación al **52 %** de altura del viewport (\`ACTIVATION_LINE=0.52\`); compara la posición de la línea con los límites documentados por servicio.
- Respaldo: si falta el límite superior del siguiente item, utilizar el límite inferior del anterior.
- Mientras \`#box103\` esté visible, una lectura \`getBoundingRect()\` se realiza cada **65 ms** (\`CHECK_MS=65\`). El intervalo se detiene al salir del área de servicios.
- Al cambiar: actualizar \`#imageX46.src\` y \`#text550.text\` juntos.
- **No** hacer \`hide()\`, \`show()\`, transición de fade, \`translate3d\`, animación de posición ni mover contenedores. El sticky es nativo del editor Wix.
- Funciona en ambos sentidos. Mantener el último servicio activo hasta que el siguiente límite determine otro.

**No alterar** los coeficientes ni la detección sin nueva solicitud; este código está bloqueado por aprobación del cliente.

## Popup y navegación

- El icono \`#vectorImage31\` abre el popup **Services** enviando \`serviceId\` y \`sortOrder\`.
- El popup lee cuatro registros del CMS (nunca datos quemados) y comunica al HTML \`ISOTROPE_SERVICES_POPUP_V1_INIT\`; el HTML emite \`_READY\` y \`_CLOSE\`.
- Flechas circulares de 46×46 px en desktop, navegación en bucle continuo: anterior de 01→04; siguiente de 04→01.
- No imágenes en el popup. Contenido: servicio, descripción, capacidades/alcances y entregables.
- Fondo completamente blanco; tipografías y acentos bajo manual de marca; bloque “What you receive” en \`#340566\` sin borde.
- **No modificar popup sin feedback del cliente.**

## Separación respecto de sistemas ya funcionales

- El código aprobado de Services y su \`getBoundingRect()\` están estrictamente acotados a la sección Services, **no son un controlador del Hero**.
- El Hero dispone de Custom Embed propio; **no reescribir, retirar o duplicar** su sincronización de scroll.
- El antiguo Custom Embed “Services V11 — Native Wix Page Scroll” **no forma parte de la arquitectura vigente**. Cualquier limpieza de Custom Embeds activos en Wix requiere lectura, verificación y autorización explícitas; este cierre de Git no modifica el sitio.
- GitHub almacena las fuentes aprobadas pero **no despliega automáticamente** el HTML/Velo a Wix. El cliente confirmó la experiencia funcional en su montaje de Wix Studio.

## QA aprobado y restricciones

**QA declarada por el cliente:** cuatro servicios, cambio foto+contador con scroll general, popup funcionando. No presentar esta declaración como auditoría automatizada nueva.

Regla de cambio: un solo cambio solicitado cada vez; nunca reconstruir Services ni volver a las versiones V11; comprobar únicamente el alcance modificado; las demás franjas y activos quedan bloqueados.
