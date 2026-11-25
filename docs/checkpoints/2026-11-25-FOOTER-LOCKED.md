# ISOTROPE — CIERRE FOOTER · 25 NOV 2026 · BLOQUEADO

## Autoridad y alcance
El usuario ordena «cierra eso, y documenta el bloqueo de lo realizado». El footer desktop queda cerrado con V15. Este checkpoint complementa y prevalece sobre las referencias al footer y al estado de Home del [cierre del 24-11](2026-11-24-FINAL-HANDOFF.md). Todos los demás bloqueos siguen vigentes. Leer los tres documentos rectores originales en Biblioteca /ISOTROPE/Documentos rectores/ y [marca](../brand/README.md) antes de cualquier futura intervención. El usuario dirige el alcance. No cambiar diseño, contenido, IDs, enlaces, Velo, CMS, backend ni assets aprobados sin autorización expresa. Bloqueo documental y operativo, no protección de rama ni cambio de permisos.

## Única versión vigente del footer
- HTML FULL: [ISOTROPE_FOOTER_V15_FULL.html — RAW fijado](https://raw.githubusercontent.com/byjaimegalindo/Isotrope-Website/4fdea09d4b38a1d1ed5be38674f3c6c06c044784/frontend/footer/ISOTROPE_FOOTER_V15_FULL.html).
- Commit HTML: `4fdea09d4b38a1d1ed5be38674f3c6c06c044784`; blob `1649469f2df663ffe9297f97e88dee521b441f28`. V15 elimina exclusivamente el ABN del copyright de V14; resto idéntico, verificado por lectura posterior. V01–V14 y sketches son historia, no fuentes vigentes. No reinstalar.
- Sitio original Isotrope ID `115fc02c-5174-48e8-ac81-c9494ab75bf8`. Componente Home `#htmlFooter`: 100% ancho, altura desktop recomendada 300 px a lienzo 1500 px, sin márgenes internos laterales. Logo ISOTROPE y CONTACT US de la franja superior son nativos, no están dentro del HTML y no deben alterarse.
- Captura final de diseño (V14 antes de retirar el ABN): usuario mostró footer a 1500 px, zoom editor 70%; composición validada visualmente en conversación y luego pidió únicamente retirar ABN. La orden de cierre bloquea V15.
- Fondo #000000; cuatro columnas de ancho uniforme, gap 24 px (16 px hasta 1050 px); títulos Poppins Bold 15 px, uppercase, #8D45FF (14 px en mobile); enlaces Poppins Regular 14–16 px blancos, hover #A5A5A5. Privacy Policy gris #A5A5A5, hover blanco. Mantener jerarquía, espaciado, alineaciones y proporciones.
- Company: About, How We Work, Why Us, Team Experience. Our Work: Services, Projects, Reviews. Get in Touch: admin@isotrope.com.au, +61 2 5550 1234 (provisional, no tel), Melbourne, Australia al final.
- Cuarta columna solo badge IRATA, sin título ni texto, asset exacto `https://static.wixstatic.com/media/047d6b_5777d3503de84b1c88d9ae6d0c673824~mv2.png`, max ancho 225 px, max alto 142 px, dimensiones naturales auto, sin deformación. Desktop transform translateX(calc(10% - 15px)), alineación visual con centro de CONTACT US. No cambiar imagen ni reintroducir leyendas.
- Desktop padding superior/inferior 8 px; separación antes de línea 44 px, después 24 px; divisor #292929. Copyright exacto «© 2026 ISOTROPE. All rights reserved.» sin ABN por orden expresa. Privacy Policy al inicio de columna 3; Back to top al extremo derecho, círculo 46 px, etiqueta solo hover/focus. Overflow hidden desktop; responsive CSS existente preservado, pendiente QA de tamaños y recorte.

## Integración nativa definitiva
Repositorio privado `byjaimegalindo/isotrope-wix-studio`, main, Wix Git Integration. Archivo `src/pages/Home.c1dmp.js`, commit `a70a9a6c8c5bf21f0ffc6272cb70e7ad1271d72e`, blob `336c293d97326759c2a29ec0bbcc4f5779dd4626`, verificado en main al cierre. El archivo anterior al footer, blob `30ac4b563935ad02a272e579c0e494cee4412616`, se conserva íntegro como prefijo exacto. No restaurar esa versión anterior porque eliminaría el footer. El bloque independiente al final recibe únicamente `ISOTROPE_FOOTER_V1_NAVIGATE` desde #htmlFooter.
| Acción | Destino |
| --- | --- |
| about | #section96 |
| how-we-work | #section87 |
| why-us | #section101 |
| services | #line77 |
| reviews | #section104 |
| team-experience | siteWindow.openLightbox('Team Experience') |
| projects | siteWindow.openLightbox('Projects') |
| privacy-policy | wixLocationFrontend.to('/privacy-policy'), misma pestaña fuera del iframe |
| back-to-top | siteWindow.scrollTo(0,0,{scrollAnimation:true}) |
El email usa mailto. Teléfono provisional solo texto. Projects NO desplaza a #section104; debe abrir popup nativo sin projectId, cuyo HTML resuelve por defecto índice 0. No alterar código del popup, CMS ni lógica Reviews→Projects con projectId. El HTML V15 intercepta Privacy Policy en iframe y envía la acción nativa; fallback directo target=_top con URL de desarrollo. El Velo usa ruta relativa para conservar el dominio activo. No volver a target=_blank. Footer no necesita backend, CMS ni Custom Embed adicional.

## QA y cierre
- HTML y Velo finales leídos y comparados; código previo a footer intacto. Editor observado conectado a origin/main durante sesión. No confundir Git con sincronización efectiva de último commit, ejecución o publicación.
- Pendiente validar en Wix Preview/sitio publicado enlaces, apertura Projects, navegación Privacy Policy en misma pestaña, Back to top, dimensiones responsive y ausencia de recorte. No se certificó ejecución de cada enlace ni Publish. No reabrir diseño por iniciativa propia durante QA.
- Antes de entrega pública, teléfono real pendiente (también en Contact V07); revisar contenido definitivo de Privacy Policy cuando usuario lo solicite. No inventar datos ni cambiar política por iniciativa propia.
- Mantener Hero, About, Services, Team Experience, How We Work, Why Isotrope, Reviews, Projects, Contact y Outro fijo en estados bloqueados del cierre anterior. No intervenir otras franjas.
- Próxima sesión: leer primero este archivo y cierre 24-11; esperar orden del usuario. HTML FULL vía RAW fijado por commit, nunca fragmentos como entrega final.

Cierre exclusivamente documental. No cambios de producción, CMS, permisos ni publicación durante este cierre.
