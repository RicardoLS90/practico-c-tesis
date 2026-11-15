# Imágenes referenciales — boceto Práctico (ronda 3)

> **Imágenes referenciales de boceto. Reemplazar por material propio antes de publicar.**
> **El brief de Práctico prohíbe banco de imágenes en producción.**

Todas las piezas se descargaron desde Unsplash con la **Unsplash License** (uso comercial
gratuito, sin atribución obligatoria). Se guardaron en local y se sirven por `file://`:
el sitio no hace ningún request externo en runtime.

Fecha de descarga: **11 de noviembre de 2026**. Ronda 3.2 (fondos de hero): **12 de noviembre de 2026**.

| Archivo | Dimensiones | Peso | URL de origen | Autor | Licencia |
|---|---|---|---|---|---|
| `a-hero.jpg` | 1920 × 1080 (16:9) | 289,9 KB | https://images.unsplash.com/photo-1517502884422-41eaead166d4 | No disponible en la descarga por ID | Unsplash License |
| `b-hero2.jpg` | 1920 × 1080 (16:9) | 291,1 KB | https://images.unsplash.com/photo-1449157291145-7efd050a4d0e | No disponible en la descarga por ID | Unsplash License |
| `a-caso-1.jpg` | 1400 × 788 (16:9) | 208,6 KB | https://images.unsplash.com/photo-1553413077-190dd305871c | No disponible en la descarga por ID | Unsplash License |
| `a-caso-2.jpg` | 1600 × 900 (16:9) | 194,9 KB | https://images.unsplash.com/photo-1454165804606-c3d57bc86b40 | No disponible en la descarga por ID | Unsplash License |
| `a-equipo.jpg` | 1500 × 1000 (3:2) | 184,6 KB | https://images.unsplash.com/photo-1551836022-d5d88e9218df | No disponible en la descarga por ID | Unsplash License |
| `b-hero.jpg` | 1200 × 1500 (4:5) | 247,5 KB | https://images.unsplash.com/photo-1441986300917-64674bd600d8 | No disponible en la descarga por ID | Unsplash License |
| `b-caso.jpg` | 1600 × 900 (16:9) | 233,2 KB | https://images.unsplash.com/photo-1581091226825-a6a2a5aee158 | No disponible en la descarga por ID | Unsplash License |
| `c-ensayo.jpg` — **(retirada)** | 1600 × 900 (16:9) | 108,4 KB | https://images.unsplash.com/photo-1517842645767-c639042777db | No disponible en la descarga por ID | Unsplash License |
| `c-retrato.jpg` — **(retirada)** | 1500 × 1000 (3:2) | 183,1 KB | https://images.unsplash.com/photo-1566492031773-4f4e44671857 | No disponible en la descarga por ID | Unsplash License |

**Total del directorio:** 1941,3 KB (9 archivos).

> **(retirada)** = el archivo ya no está en el directorio: se borró el 15 de noviembre de 2026
> por ser huérfano (0 referencias en `.html`, `.css` y `.js` del sitio). La línea se conserva
> para mantener la trazabilidad de la licencia de origen. Respaldo en
> `%TEMP%\opencode\v23\borrados\`.

## Fondos de hero (ronda 3.2) — referenciales, reemplazar antes de publicar

> **Nota: las dos imágenes de hero son referenciales y deben reemplazarse por material
> propio antes de publicar.** No son fotos de la firma ni de sus instalaciones.

- `a-hero.jpg` → fondo del hero de `a-diagnostico.html`: sala de reuniones corporativa,
  mesa larga y ventanales, plano general, sin personas. Se sirve en escala de grises,
  oscurecida (`brightness .92`) y bajo un scrim navy del 94 al 62 %.
- `b-hero2.jpg` → fondo del hero de `b-recorrido.html`: torres de vidrio de un distrito
  corporativo vistas desde la base, en niebla (el cielo plano es la zona de lectura).
  Mismo tratamiento: gris + oscurecido + scrim.
- **`b-hero.jpg` (4:5) no es un fondo de hero**: es la foto de la sección de contenido de B.
  Por eso el fondo nuevo se llama `b-hero2.jpg` y no la pisa.
- Ambas se piden a 1920 × 1080 (16:9) con `fm=jpg`, tope 300 KB (`q=43` y `q=58`).
- Ninguna de las dos lleva `<img>` ni `alt`: son `background-image` decorativos, con
  `<link rel="preload" as="image" fetchpriority="high">` en el `<head>` de su página.

## Carrusel del hero de A (ronda 5) — referenciales, reemplazar antes de publicar

> **Nota: las cuatro imágenes nuevas son referenciales y deben reemplazarse por material
> propio antes de publicar.** No son fotos de la firma ni de sus instalaciones.
> Se sirven en escala de grises, oscurecidas (`brightness .92`) y bajo el mismo scrim navy
> del hero, así que el color original no se usa en ningún punto de la interfaz.

Fecha de descarga: **13 de noviembre de 2026**. Ronda 5 (diapositivas 2 a 5 del carrusel de A).

| Archivo | Diapositiva | Dimensiones | Peso | URL de origen | Licencia |
|---|---|---|---|---|---|
| `a-hero-negocio.jpg` | 02 · Negocio | 1920 × 1080 (16:9) | 178,2 KB | https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=1080&fit=crop&q=58&fm=jpg | Unsplash License |
| `a-hero-proceso.jpg` | 03 · Proceso | 1600 × 900 (16:9) | 184,0 KB | https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1600&h=900&fit=crop&q=42&fm=jpg | Unsplash License |
| `a-hero-datos.jpg` | 04 · Datos | 1600 × 900 (16:9) | 183,5 KB | https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=900&fit=crop&q=68&fm=jpg | Unsplash License |
| `a-hero-tecnologia.jpg` | 05 · Tecnología | 1920 × 1080 (16:9) | 158,1 KB | https://images.unsplash.com/photo-1606206873764-fd15e242df52?w=1920&h=1080&fit=crop&q=58&fm=jpg | Unsplash License |

- **Referenciales: reemplazar antes de publicar.** Ninguna lleva `<img>` ni `alt`: son
  `background-image` decorativos de cada diapositiva.
- Qué muestra cada una: `a-hero-negocio` = manos firmando/anotando sobre documentos en una
  mesa oscura; `a-hero-proceso` = estanterías altas de pallets filmados en un depósito, con
  pasillo y luces; `a-hero-datos` = dos personas comparando un reporte impreso con anotaciones,
  biromes y notebooks desenfocadas; `a-hero-tecnologia` = brazo robótico de manipulación
  (pinza neumática) trabajando sobre una pieza metálica en una celda automatizada con luz azul
  — reemplazada en la ronda 5.1, ver abajo (antes: racks de servidores con cableado).
- Ninguna tiene texto ni logos legibles. Las cuatro tienen una zona lisa amplia del lado del
  texto para que el H1 mantenga contraste bajo el scrim.
- Tope de peso: 190 KB por archivo. `a-hero-proceso` no entraba a 1920 px dentro del tope, así
  que se bajó a 1600 px (16:9 exacto), que el brief lo permite. El hero las sirve con
  `background-size: cover`, así que no se ve pixelada. `a-hero-tecnologia` sí entra a 1920 px
  desde la ronda 5.1.
- Criterio de descarte: se probaron 46 candidatos por ID directo; se rechazaron los que
  tenían apretón de manos, gente sonriendo a cámara, texto o logos legibles (carteles,
  billetes, post-its, "My Resume", "STANLEY"), pantallas con código o gráficos brillantes,
  pasillos vacíos sin flujo de trabajo y composiciones sin zona lisa para el titular.

## Ronda 5.1 — reemplazo de la diapositiva 05 · Tecnología

Fecha de descarga: **13 de noviembre de 2026**. Se reemplazó **solo** `a-hero-tecnologia.jpg`
(mismo nombre de archivo, no se tocó ninguna ruta ni el HTML). El motivo: la anterior eran
racks de servidores y, con el scrim encima, se leía como una textura sucia y como "data
center", no como automatización de procesos.

| Archivo | Diapositiva | Dimensiones | Peso | URL de origen | Autor | Licencia |
|---|---|---|---|---|---|---|
| `a-hero-tecnologia.jpg` | 05 · Tecnología | 1920 × 1080 (16:9) | 158,1 KB | https://images.unsplash.com/photo-1606206873764-fd15e242df52?w=1920&h=1080&fit=crop&q=58&fm=jpg | Testalize.me (@testalizeme) | Unsplash License |

- **Qué muestra:** una pinza neumática de brazo robótico en operación, suspendida sobre una
  pieza metálica dentro de una celda automatizada (luz azul de planta). Lee como
  automatización de procesos, no como servidores ni como estética "hacker".
- **Zona de lectura:** el tercio izquierdo es oscuro y liso (desenfoque de la propia celda),
  así que el H1 y el pie quedan sobre fondo parejo bajo el scrim. En escala de grises el
  brazo y la pinza caen del lado derecho, donde el scrim abre a 62 %.
- **Sin texto ni logos legibles:** solo quedan impresiones de manguera y tornillería, sin
  palabras reconocibles a tamaño de uso.
- **Reemplaza a:** `photo-1558494949-ef010cbdcc31` (1440 × 810, 180,6 KB, racks de servidores
  con cableado) — **dada de baja el 13 de noviembre de 2026**, ya no se usa en el sitio.
- **Criterio de descarte de esta ronda:** se descargaron y midieron **23 candidatos** en
  1920 × 1080 (17 revisados a ojo; 6 cayeron antes por peso y por ser escenas de fábrica sin
  zona lisa). Se descartaron 22: renders 3D y robots humanoides de exterior (no son planta);
  `photo-1777383975764` (línea de chasis de auto con carteles en japonés, "Creative Workshop",
  "KITO") y `photo-1777642328916` (misma línea, marca "SOEIXZ"); `photo-1716191299980`
  (cartel "T 07"); `photo-1717386255773` (estaciones numeradas 8 a 12); `photo-1717386255767`
  (señalética de prohibido paso en chino); `photo-1655204903983` (panel de timón naval con
  "RUDDER ANGLE" y "STARBOARD"); `photo-1581093803931` (logo "FESTO" legible);
  `photo-1655393001768` (estantería con etiquetas A-2 a M-9); `photo-1784821856280` (brazo
  blanco impecable, pero con wordmark en el propio brazo); `photo-1715322350396` (impresora 3D
  con neón violeta/turquesa, estética ciberpunk); y las escenas de fábrica muy detalladas que
  no bajaban de 190 KB sin arruinar la calidad (`photo-1701328778019`, `photo-1647427060118`,
  `photo-1610891015188`, `photo-1780034766295`, `photo-1735494035634`, `photo-1727373203588`,
  `photo-1774229637247`).
- **Compresión:** `w=1920&h=1080&fit=crop&q=58&fm=jpg` → 158,1 KB, dentro del tope de 190 KB.
- **Verificación de contraste:** página servida por HTTP local (`python -m http.server`), Chrome
  headless a 1600 × 900, diapositiva 05 forzada como activa. Se tomaron dos capturas —una con
  el texto visible y otra con el texto oculto (`visibility:hidden`, mismo layout)—, se sacó la
  máscara de glifos por diferencia de píxeles y se midió el **píxel más claro del fondo debajo
  de cada glifo**, que es el peor caso: **H1 `#FFFFFF` → 9,06:1** (mínimo pedido 7:1) y
  **pie `.hero__cap` `#E5E7EB` → 8,65:1** (mínimo pedido 4,5:1). Contexto medido: eyebrow
  9,21:1 y bajada `.hero__sub` 7,91:1.

## Notas de producción

- El autor no vino en la respuesta del CDN de Unsplash: se descargó por ID directo
  (`images.unsplash.com/photo-…`), sin pasar por la API. Antes de publicar hay que
  reemplazar estas piezas por material propio, así que la atribución deja de aplicar.
- Todas las imágenes se tratan en **duotono navy** por CSS (grayscale + multiply navy +
  screen gris). El color original no se usa en ningún punto de la interfaz.
- Ninguna imagen lleva texto encima. Los créditos viven acá y en el `figcaption`
  de cada slot, nunca sobre la foto.
- Especificación de compresión: JPEG calidad 76–82, ancho máximo 1600 px, tope 250 KB
  por archivo.
