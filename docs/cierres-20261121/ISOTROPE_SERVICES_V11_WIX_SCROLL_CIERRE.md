# ISOTROPE — Cierre de sesión · SERVICES V11 / Wix Studio
**Fecha:** 2026-11-21  
**Repositorio:** `byjaimegalindo/Isotrope-Website` / `main`  
**Sitio Wix Studio:** Isotrope · `115fc02c-5174-48e8-ac81-c9494ab75bf8`  
**URL de pruebas:** https://miv-studio.wixstudio.com/isotrope-testing

## 1. Alcance autorizado y bloqueo

La referencia **SERVICES Cinematic V11 Symmetric**, aportada por el usuario, queda **APROBADA e INTACTA**. No se reescriben ni rediseñan textos, orden de los cuatro servicios, imágenes originales, estructura, acordeones, estados, transiciones, estilos ni el comportamiento cinematográfico aprobado. El trabajo de esta sesión se limita a **adaptar la integración a las proporciones, márgenes, centrado vertical simétrico y scroll natural de la página Wix**; no se autoriza alterar otras secciones ni la experiencia aprobada.

**SHA-256 del V11 de referencia aportado:** `777893be3d3a93581574ec2b4cd9120785582291121776dd74eaf1e20f18946e`

No se cambió el original del usuario ni el respaldo V11 en GitHub.

## 2. Arquitectura acordada

- **La parte HTML la instala el usuario.** Entregable local: `ISOTROPE_SERVICES_V11_WIX_INTEGRATION_FULL.html`; se trata de una **copia de integración**, no del master V11. Incluye un adaptador CSS/JS aislado fuera de los elementos aprobados.
- **La parte Wix la instala el asistente**, por la API oficial de Custom Embeds; no se modifica el controlador Velo ni la sincronización Hero/Outro.
- La copia HTML recibe `ISOTROPE_SERVICES_WIX_SCROLL` por `postMessage` desde el puente Wix, y transmite `ISOTROPE_SERVICES_WIX_READY` y `ISOTROPE_SERVICES_WIX_WHEEL`. El anfitrión Wix mueve el **scroll real de la página**, no un contador virtual ni un scroll independiente del iframe.
- La fotografía debe quedar centrada verticalmente durante su recorrido, sin pegarse arriba, y salir de la sección al terminar. Se preservan los cuatro cambios de estado de la experiencia V11 en ambas direcciones.
- Referencias de montaje: sección nativa Wix a ancho completo, fondo **`#000000`**, sin gaps/padding exteriores; una única celda con un iframe HTML de ancho/alto completos. Proporción de columnas **38.8 % / 61.2 %**; margen lateral interno **1.5 %**. Sin sticky, overflow interno ni scroll effects nativos adicionales de Wix.
- Referencias iniciales de altura del contenedor nativo: escritorio 1500×850 ~`455svh`; móvil 390×800 ~`525svh`. Son **valores provisionales**, sujetos a ajuste en Preview por contenido, responsive y acordeones.

## 3. Wix — intervención ejecutada y verificada por lectura posterior

El 21-nov-2026, a través del conector Wix, se **creó y activó** el siguiente Custom Embed, sin editar los embeds aprobados:

| Campo | Estado confirmado |
|---|---|
| Nombre | `ISOTROPE Services V11 — Native Wix Page Scroll` |
| ID Wix | `d7e4553c-c54d-4461-8fcd-a67c43783e57` |
| Revisión | `2` |
| Habilitado | `true` |
| Posición | `BODY_END` |
| Categoría | `ESSENTIAL` |
| Load once | `true` |
| Archivo **idéntico al instalado** | `wix/custom-embeds/isotrope-services-v11-native-page-scroll-20261121.html` |
| SHA-256 archivo fuente local | `30d63c9822467748aae8fa6780d3b672a210b0c6f100de4e93666b77fa490a25` |

El API devolvió confirmación de igualdad del texto del embed con el archivo suministrado (`sourceEqualsUpload=true`). La lectura independiente posterior confirmó que el nuevo embed está habilitado en `BODY_END`.

Para impedir conflictos se **deshabilitó —sin borrar ni sobreescribir—** el puente anterior:
- Nombre `ISOTROPE Services Scroll Sync — Isolated`
- ID `bfa68c4a-7b01-402d-91b4-b4149c41baee`
- Revisión tras el cambio `5`; `enabled=false`.

**No tocados (IDs, revisiones y estados conservados):**
- `ISOTROPE Design System`: `f00148c4-cc51-4a9d-8c07-933b075c224e`; rev `1`, `enabled=true`.
- `ISOTROPE Native Hero Scroll Sync`: `f46f2074-f2e8-4c80-a2c9-b0079cdbe4c6`; rev **actual en Wix** `13`, `enabled=true`; incluye integración existente del Outro, intacta.
- `ISOTROPE Home 2 Story Scroll Bridge`: `b335b9fe-8be6-4d45-b9c7-22ab7d0bcec0`; rev `2`, `enabled=false`.

## 4. Archivos y pruebas locales

- **Copia HTML FULL de instalación, bajo control del usuario:** `ISOTROPE_SERVICES_V11_WIX_INTEGRATION_FULL.html`
  - SHA-256: `38202fdddcb06937d0a48c8336018e6d953c3e3e9cbebc480bb9265e3893b129`.
- **Puente instalado en Wix y archivado en Git:** `ISOTROPE_SERVICES_WIX_NATIVE_BRIDGE.html`.
- **Paquete de entrega local:** `ISOTROPE_SERVICES_V11_WIX_PACKAGE.zip`, incluye HTML, puente e instrucciones.
- Pruebas en simulación local iframe/página padre: escritorio 1500×850, móvil 390×800; scroll padre arriba/abajo, selección de fotografías, cuatro servicios y ausencia de overflow horizontal. En escritorio, el panel fotográfico quedó centrado, con márgenes verticales simétricos de ~102 px para ese viewport.
- **Estas pruebas no equivalen a QA real en Wix Preview/Publish.** No se ha afirmado que la sección esté montada, probada o publicada de punta a punta.

## 5. Pendientes y aceptación — no marcar como completados

1. **Usuario:** pegar el HTML FULL en un único iframe dentro de una sección nativa Wix de fondo `#000000`, full width, padding y gaps en 0; configurar altura del componente/section según el contenido.
2. **QA conjunto en Wix Preview/Publish:** entrar desde la sección anterior; recorrer cuatro servicios con scroll natural; salir a la sección inferior y regresar hacia arriba sin scroll interno, saltos, bloqueos, rebotes ni huecos negros sobrantes.
3. Probar rueda/trackpad sobre fotografía y texto; teclado; touch/mobile; acordeones abiertos/cerrados; breakpoints desktop/tablet/móvil; comprobar calidad de imagen, centrado y consistencia de V11.
4. **No aprobar el cierre funcional definitivo hasta completar esta QA.** Cualquier ajuste posterior debe afectar únicamente a la copia de integración/puente aislado, sin alterar la referencia V11 ni los componentes aprobados.

## 6. Rollback de la integración Wix

Si se detecta un problema tras montar el HTML: deshabilitar el nuevo Custom Embed (`d7e4553c-c54d-4461-8fcd-a67c43783e57`) y, si se decide restaurar explícitamente el comportamiento anterior, volver a habilitar el Services Scroll Sync anterior (`bfa68c4a-7b01-402d-91b4-b4149c41baee`). **No** cambiar ni restaurar por accidente el código de Hero/Outro o Design System.

## 7. Estado al cierre de la sesión

**Instalación del puente Wix: HECHA y comprobada por API.**  
**Original V11: PROTEGIDO.**  
**HTML en sección Wix: A CARGO DEL USUARIO / NO CONFIRMADO.**  
**QA visual y funcional de producción: PENDIENTE.**  
**Publicación de la sección: NO REALIZADA por esta intervención.**

La sesión cierra con infraestructura de scroll instalada y estado auditable, no con una certificación de funcionamiento final en Wix.
