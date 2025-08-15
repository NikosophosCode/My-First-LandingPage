# Mario Blog – Mundo 1‑1 🧱🍄

Landing page temática inspirada en el universo de Super Mario que funciona como un mini–blog: muestra artículos simulados, guías, curiosidades y (dinámicamente) los últimos videos de un canal de YouTube usando una API externa (RapidAPI). Es el resultado de un reto del curso de JavaScript Asíncrono y una práctica de maquetación con TailwindCSS + DOM scripting vanilla.

> Proyecto fan / educativo. No afiliado a Nintendo. Todos los assets y marcas pertenecen a sus dueños originales.

---

## ✨ Características Principales

- Hero retro con fuentes pixel y colores personalizados vía configuración de Tailwind (modo CDN).
- Sección de Artículos generada dinámicamente desde un arreglo (fácil de reemplazar por un fetch futuro).
- Últimos Videos: consumo de endpoint (RapidAPI / youtube138) con esqueletons (skeleton loaders), manejo de errores y formateo de vistas.
- Guías y Curiosidades renderizadas dinámicamente desde data local.
- Formulario de suscripción con validación básica de email en cliente y mensaje de éxito amigable.
- Diseño responsive (grid adaptativa + utilidades Tailwind).
- Pequeñas animaciones (spin de moneda, hover states, escalado de imágenes).
- Separación clara de responsabilidades en `main.js` (render, fetch videos, utilidades DOM, sanitización mínima de texto).

## 🛠 Stack / Tecnologías

| Área | Herramienta |
|------|-------------|
| Estilos | TailwindCSS vía CDN (config inline) |
| JS | Vanilla (ES6+) |
| Fuentes | Google Fonts (Press Start 2P, Poppins) |
| API externa | youtube138 @ RapidAPI (para videos del canal) |
| Deploy (sugerido) | GitHub Pages (paquete `gh-pages`) |

## 📁 Estructura del Proyecto

```
.
├─ index.html            # Página principal (root)
├─ assets/               # Imágenes y recursos estáticos
│  └─ img/               # Iconos / sprites / fondos
├─ src/
│  ├─ main.js            # Lógica principal (render + fetch videos + handlers)
│  └─ JS/ API.js         # Script de prueba de fetch (demo / puede eliminarse o unificarse)
├─ package.json          # Dependencias (gh-pages) y metadatos
└─ README.md             # Documentación
```

📌 Nota: El script de deploy actual apunta a `src` pero el `index.html` está en la raíz. Ver apartado “Deploy” para ajustar.

## 🚀 Inicio Rápido (Local)

1. Clonar el repositorio:
	```bash
	git clone https://github.com/NikosophosCode/My-First-LandingPage.git
	cd My-First-LandingPage
	```
2. (Opcional) Instalar dependencia de desarrollo si piensas usar el script de despliegue:
	```bash
	npm install
	```
3. Abrir `index.html` directamente en el navegador (doble clic) o servir con un servidor estático para evitar problemas de CORS futuros:
	```bash
	npx serve .
	# o
	npx http-server .
	```
4. La sección “Últimos Videos” intentará hacer fetch al endpoint de RapidAPI. Puede fallar si:
	- La key expiró / fue revocada.
	- Se excedió el rate limit gratuito.

## 🔐 Seguridad de la API / Claves

En `main.js` y `src/JS/API.js` se incluye una clave demo (`x-rapidapi-key`). En producción NO se debe exponer. Alternativas:

- Crear un pequeño backend (serverless function / Cloudflare Worker) que haga proxy y oculte la key.
- Usar variables de entorno + bundler (Vite, Webpack, etc.) que sustituyan la clave en build y no se commitee el archivo sin procesar.
- Cachear la respuesta y servir JSON estático actualizado periódicamente.

Sugerencia mínima inmediata: mover la key a un archivo `config.example.js`, ignorar la versión real en `.gitignore`, e importarla.

## 📄 Explicación de la Lógica Principal (`src/main.js`)

Funciones clave:

- `createVideoSkeleton(count)` – Genera placeholders animados mientras llega la respuesta.
- `fetchLatestVideos(limit)` – Llama al endpoint, procesa estructura (`data.contents[*].video`), maneja errores y fallback.
- `createVideoCard(video)` – Construye tarjeta con título, vistas formateadas y enlace.
- `render()` – Inyecta posts, guías y curiosidades estáticas.
- `handleSubscription()` – Valida email y muestra mensaje sin recargar.

Pequeñas utilidades:

- `sanitizeText` evita inyectar `<` o `>` en títulos de videos.

## 🧪 Posibles Tests (No incluidos aún)

Ideas de pruebas unitarias (si se integra Jest / Vitest):
- Sanitización de texto.
- Formateo de vistas (Intl.NumberFormat).
- Manejo de error en `fetchLatestVideos` (mock de fetch que arroja error).

## 🌐 Deploy en GitHub Pages

El `package.json` contiene:
```json
"scripts": { "deploy": "gh-pages -d src" }
```
Pero el archivo `index.html` está en la raíz. Opciones:

1. (Más simple) Cambiar script a publicar la raíz:
	```json
	"deploy": "gh-pages -d ."
	```
	Asegúrate de ignorar carpetas que no quieras (puedes usar un directorio `dist` en el futuro).

2. (Mantener script actual) Mover `index.html` y assets dentro de `src/` y ajustar rutas (tendrías `src/index.html`).

3. (Profesional) Introducir un bundler (Vite) y generar `dist/` optimizado, luego:
	```json
	"deploy": "gh-pages -d dist"
	```

Pasos de deploy (caso 1):
```bash
npm install
npm run deploy
```
GitHub Pages quedará en la rama `gh-pages` y la URL se definirá en la configuración del repositorio.

## ♿ Accesibilidad (Checklist parcial)

- Texto alternativo en la mayoría de imágenes decorativas / semánticas.
- Contraste: colores brillantes + texto oscuro/blanco; revisar combinaciones rojo/azul para WCAG AA (posible mejora).
- Navegación: enlaces ancla en navbar, pero falta un “Skip to content”.
- Roles / landmark: secciones semánticas (`header`, `section`, `footer`).
- Mejora sugerida: agregar `aria-live` para mensaje de suscripción y foco al mensaje tras enviar.

## ⚙️ Mejoras Futuras (Roadmap sugerido)

- [ ] Reemplazar data mock de posts/guías por fetch real (Markdown, CMS headless o JSON).
- [ ] Backend/proxy seguro para la API de YouTube.
- [ ] Internacionalización (ES/EN) con detección de locale.
- [ ] Dark Mode toggle (Tailwind `dark:`).
- [ ] Animaciones optimizadas con `prefers-reduced-motion`.
- [ ] Test unitarios + GitHub Actions CI.
- [ ] Linter + Prettier + Husky hooks.
- [ ] Paginación / lazy loading de videos.
- [ ] Accesibilidad: foco visible + skip link + labels más descriptivos.
- [ ] SEO: meta OG/Twitter cards, sitemap, manifest.json.

## 🧩 Decisiones de Diseño

- Tailwind via CDN para rapidez (no build). Se sacrifica tree-shaking: en un build real convendría configuración PostCSS para reducir peso.
- Datos mock en arrays para permitir prototipo sin servicio backend.
- Estructura JS simple y funciones puras que crean nodos -> fácil migrar a framework si se necesitara (React/Vue/Svelte).

## 🏗 Posible Refactor (si crece)

- Modularizar en varios archivos: `videos.js`, `posts.js`, `subscription.js`.
- Patrón simple pub/sub para eventos (suscripción completada, videos cargados, etc.).

## 📦 Dependencias

Sólo `gh-pages` (dev) para publicar. No hay dependencias runtime.

## 🔍 Licencia

Código bajo licencia MIT (ver `LICENSE`). Imágenes y personajes pertenecen a Nintendo; se usan con fines educativos / fan art. No redistribuir comercialmente assets protegidos.

## 🙌 Créditos

- Autor: Nicolás Acuña (@NikosophosCode)
- Inspiración: Saga Super Mario Bros.
- Fuentes: Google Fonts.
- API: RapidAPI (youtube138 endpoint).

## 🧾 MIT (Resumen)

Permiso para usar, copiar, modificar y distribuir con el aviso de copyright incluido. Sin garantías.

---

### 🔄 Resumen Rápido para Contribuir
1. Haz fork y crea rama feature: `feat/nueva-seccion`.
2. Implementa cambios (ideal: añade test si agregas lógica).
3. Actualiza README si modificas funcionalidad visible.
4. Pull Request: describe claramente el cambio y adjunta captura.

¡Que la estrella te acompañe! ⭐
