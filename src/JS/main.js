// Datos simulados (podrían venir de un fetch a futuro)
const posts = [
	{
		title: 'Historia de Super Mario Bros (1985)',
		cover: 'https://i.imgur.com/po0Rj1C.png',
		excerpt: 'Cómo el primer juego lateral de NES redefinió las plataformas y salvó la industria.',
		tag: 'Historia'
	},
	{
		title: 'Todos los Power-Ups de Mario explicados',
		cover: 'https://i.imgur.com/1t7f6lX.png',
		excerpt: 'Setas, flores, trajes y más: para qué sirve cada uno y su debut.',
		tag: 'Guía'
	},
	{
		title: 'Secretos del Mundo -1',
		cover: 'https://i.imgur.com/YY0v0qP.png',
		excerpt: 'El nivel glitch más famoso: cómo acceder y qué significa técnicamente.',
		tag: 'Secretos'
	}
];

const guides = [
	{ title: 'Velocidad en Mario Kart 8 Deluxe', icon: 'https://raw.githubusercontent.com/itscodenation/mario-run/master/images/star.png', level: 'Intermedio' },
	{ title: 'Rutas rápidas en Super Mario 64', icon: 'https://raw.githubusercontent.com/itscodenation/mario-run/master/images/mushroom.png', level: 'Avanzado' },
	{ title: 'Cómo optimizar saltos en Odyssey', icon: 'https://raw.githubusercontent.com/itscodenation/mario-run/master/images/flower.png', level: 'Avanzado' }
];

const facts = [
	'Mario originalmente se llamaba Jumpman en Donkey Kong (1981).',
	'La voz de Mario (Charles Martinet) también grabó sonidos para Baby Mario.',
	'El primer juego donde Mario pudo volar fue Super Mario Bros. 3 (con la cola de mapache).',
	'Luigi fue creado inicialmente sólo para el modo de 2 jugadores.',
	'El Mundo -1 es un nivel corrupto generado por cómo se almacenan los tubos en memoria.'
];

// ---------- YouTube (Últimos videos) ----------
// NOTA: La API key incluida en el archivo original no debe quedar expuesta en producción.
// Para un proyecto real se debe usar un backend o variables de entorno con build.
// Aquí se mantiene el ejemplo funcional didáctico.

const YT_CHANNEL_ID = 'UCEK0oX3X2yK9y27khCsrNKg';
const YT_ENDPOINT = `https://yt-api.p.rapidapi.com/channel/videos?id=${YT_CHANNEL_ID}`;
const YT_OPTIONS = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '36508f500amshf40c26e67e26d68p18770djsned61dd7ade51', // Demo ONLY
		'x-rapidapi-host': 'yt-api.p.rapidapi.com'
	}
};

function createVideoSkeleton(count = 4) {
	return Array.from({ length: count }).map(() => {
		const div = document.createElement('div');
		div.className = 'animate-pulse rounded-xl overflow-hidden border-2 border-slate-200 bg-white shadow-sm';
		div.innerHTML = `
		  <div class="aspect-video bg-slate-200"></div>
		  <div class="p-4 space-y-3">
		    <div class="h-4 bg-slate-200 rounded w-3/4"></div>
		    <div class="h-3 bg-slate-200 rounded w-1/2"></div>
		  </div>`;
		return div;
	});
}

function sanitizeText(str = '') {
	return str.replace(/[<>]/g, '');
}

function createVideoCard(video) {
	const { videoId, title, publishedTimeText, thumbnails, stats } = video || {};
	const thumb = thumbnails?.[thumbnails.length - 1]?.url || thumbnails?.[0]?.url || '';
	const views = stats?.views ? new Intl.NumberFormat('es-ES').format(stats.views) + ' vistas' : '';
	const card = document.createElement('article');
	card.className = 'group bg-white rounded-xl overflow-hidden border-2 border-marioBlue/40 hover:border-marioRed transition flex flex-col shadow-md hover:shadow-lg';
	card.innerHTML = `
	  <a href="https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}" target="_blank" rel="noopener noreferrer" class="block relative aspect-video overflow-hidden bg-slate-200">
	    <img src="${thumb}" alt="${sanitizeText(title)}" class="w-full h-full object-cover group-hover:scale-105 transition" loading="lazy" />
	    <span class="absolute top-2 left-2 font-pixel text-[10px] bg-marioYellow text-slate-900 px-2 py-1 rounded">NEW</span>
	  </a>
	  <div class="p-4 flex flex-col gap-2 flex-1">
	    <h3 class="font-semibold text-slate-800 text-sm leading-snug">${sanitizeText(title)}</h3>
	    <p class="text-xs text-slate-500 flex-1">${publishedTimeText || ''}</p>
	    <p class="text-[11px] font-medium text-marioBlue">${views}</p>
	    <a href="https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}" target="_blank" rel="noopener" class="mt-auto inline-flex items-center gap-2 font-pixel text-[10px] text-marioBlue hover:text-marioRed">Ver video ➜</a>
	  </div>`;
	return card;
}

async function fetchLatestVideos(limit = 4) {
	const grid = document.getElementById('videos-grid');
	const errorBox = document.getElementById('videos-error');
	if (!grid) return;

	// Mostrar skeletons
	grid.innerHTML = '';
	createVideoSkeleton(limit).forEach(s => grid.appendChild(s));

	try {
		const res = await fetch(YT_ENDPOINT, YT_OPTIONS);
		if (!res.ok) throw new Error('Respuesta no OK');
		const data = await res.json();
		// Estructura esperada: data.contents -> array de objetos con .video
		const videos = (data.contents || [])
		  .map(item => item.video)
		  .filter(Boolean)
		  .slice(0, limit);

		grid.innerHTML = '';
		if (!videos.length) {
			grid.innerHTML = '<p class="col-span-full text-center text-sm text-slate-600">No se encontraron videos.</p>';
			return;
		}
		videos.forEach(v => grid.appendChild(createVideoCard(v)));
	} catch (err) {
		console.error('[Videos] Error:', err);
		grid.innerHTML = '';
		errorBox.textContent = 'Ups, no pudimos cargar los videos ahora. Intenta más tarde.';
		errorBox.classList.remove('hidden');
	}
}

function createPostCard({ title, cover, excerpt, tag }) {
	const wrapper = document.createElement('article');
	wrapper.className = 'group bg-white/80 backdrop-blur border-2 border-marioBlue/40 hover:border-marioRed transition rounded-lg overflow-hidden shadow-md hover:shadow-xl flex flex-col';
	wrapper.innerHTML = `
		<div class="aspect-video overflow-hidden bg-slate-200">
			<img src="${cover}" alt="${title}" class="w-full h-full object-cover group-hover:scale-105 transition" loading="lazy" />
		</div>
		<div class="p-4 flex flex-col gap-3 flex-1">
			<span class="inline-block font-pixel text-[10px] px-2 py-1 rounded bg-marioYellow text-slate-900">${tag}</span>
			<h3 class="font-semibold text-slate-800 leading-snug">${title}</h3>
			<p class="text-sm text-slate-600 line-clamp-3">${excerpt}</p>
			<button class="mt-auto inline-flex items-center gap-2 font-pixel text-[10px] text-marioBlue hover:text-marioRed">Leer más <span>➡️</span></button>
		</div>`;
	return wrapper;
}

function createGuideCard({ title, icon, level }) {
	const div = document.createElement('div');
	div.className = 'bg-white/10 border-2 border-white/20 hover:border-marioYellow rounded-xl p-5 flex flex-col gap-4 backdrop-blur shadow-lg hover:shadow-yellow-500/30 transition';
	div.innerHTML = `
		<div class="flex items-center gap-3">
			<img src="${icon}" alt="${title}" class="h-10" />
			<h3 class="font-pixel text-[12px] text-marioYellow">${title}</h3>
		</div>
		<p class="text-sm text-sky-100">Nivel: <strong>${level}</strong></p>
		<button class="self-start font-pixel text-[10px] bg-marioYellow text-slate-900 px-3 py-2 rounded hover:scale-105 transition">Ver guía</button>`;
	return div;
}

function render() {
	const postsGrid = document.getElementById('posts-grid');
	const guidesGrid = document.getElementById('guides-grid');
	const factsList = document.getElementById('facts-list');

	posts.forEach(p => postsGrid.appendChild(createPostCard(p)));
	guides.forEach(g => guidesGrid.appendChild(createGuideCard(g)));
	facts.forEach(f => {
		const li = document.createElement('li');
		li.textContent = f;
		factsList.appendChild(li);
	});
}

function handleSubscription() {
	const form = document.getElementById('subscribe-form');
	const msg = document.getElementById('subscribe-msg');
	if (!form) return;
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const email = form.querySelector('input[type=email]').value.trim();
		if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
			msg.classList.remove('hidden');
			form.reset();
		}
	});
}

document.addEventListener('DOMContentLoaded', () => {
	render();
	handleSubscription();
	fetchLatestVideos(4);
});

