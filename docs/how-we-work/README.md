# ISOTROPE — HOW WE WORK · V07 APROBADA Y BLOQUEADA

**Fecha:** 24 de noviembre de 2026  
**Validación online del usuario:** «Funciona perfecto, Bloquea!»  
**Estado:** APROBADO / BLOQUEADO. No modificar sin autorización expresa.

## Fuentes canónicas exactas

Las dos fuentes V07 existentes quedan declaradas canónicas y bloqueadas; no se reconstruyen, renombran ni reemplazan. Su ubicación histórica en tests no cambia su estado de aprobación.

- [HTML FULL V07](../../frontend/how-we-work/tests/ISOTROPE_HOW_WE_WORK_TIMELINE_V07.html) — blob Git `1b8c4104de4cd9abe5e0942f8f8303b946fcaab9`.
- [Puente independiente V07](../../frontend/how-we-work/tests/ISOTROPE_HOW_WE_WORK_SCROLL_BRIDGE_V07.html) — blob Git `65478418d67d9403c4a47ed194ba583b20a96b1a`.

Commits de entrega: `ce66d21a3a3f91b0dd35493006c2401c1796d842` (HTML) y `4679d985634dc83cdd2522959892ee89b04f51cd` (puente). V01–V06 no son fuentes vigentes.

## Montaje Wix verificado

- Sitio original Isotrope: `115fc02c-5174-48e8-ac81-c9494ab75bf8`.
- URL: https://miv-studio.wixstudio.com/isotrope-testing
- Custom Embed: **ISOTROPE How We Work Scroll Bridge V07**.
- ID: `13d6915e-7fde-4a44-b932-ad3a62d7d916`; revisión 1; habilitado; BODY_END; ESSENTIAL; loadOnce true; sin filtro de páginas.
- Mensajes exclusivos: `ISOTROPE_HOW_WORK_V07_READY` / `ISOTROPE_HOW_WORK_V07_SCROLL`. Guardia de instancia `__ISOTROPE_HOW_WORK_V07_BRIDGE__`.
- La instalación mediante MCP creó exactamente un embed: 9 → 10. Los nueve anteriores se compararon íntegramente antes/después y permanecieron idénticos. No se modificó Velo, CMS, Hero, Services ni el diseño existente. No se ejecutó Publish desde MCP.
- La interacción online fue confirmada explícitamente por el usuario. No equivale a una auditoría independiente de todos los breakpoints.

## Contrato visual y funcional protegido

Franja independiente bajo About. Fondo negro absoluto; tres boxes siempre desplegados, Plan / Access / Deliver, textos del Capability Statement sin cambios. Lienzo base 1500 px, números de 90 px, padding vertical 48 px simétrico, corners 15 px, títulos Poppins 23 px semibold y párrafos Poppins 14 px. Estados en reposo #1C1C1C; números, progreso y borde activo blancos; fondo activo #340566. Círculos con punto geométricamente centrado. Boxes sin movimiento ni cambio de tamaño, solo transición de color. Desktop horizontal; mobile vertical. Hover y clic independientes.

El puente lee la posición real de la franja en el viewport anfitrión. El recorrido de progreso es `min(160px, 20% del alto del viewport)`, centrado en el viewport, bidireccional. No controlar otros componentes ni reutilizar/modificar el puente Hero. Sin el puente, hover y clic siguen disponibles.

## Restricciones

Rige el [Protocolo Maestro de Trabajo](../PROTOCOLO_MAESTRO_DE_TRABAJO.md) y los documentos rectores originales. **TODO lo que funciona NO SE TOCA.** No modificar HTML V07, puente, IDs, geometría, estados, contenido, scroll ni configuración sin autorización expresa. No reintroducir las versiones anteriores. Cualquier nueva tarea debe ser independiente. Este cierre es exclusivamente documental y no altera Wix ni las fuentes aprobadas.
