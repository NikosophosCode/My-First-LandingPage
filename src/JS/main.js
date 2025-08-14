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
});

