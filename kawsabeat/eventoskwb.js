const eventos = [
    {
        nombre: "KAWSA JAM I",
        año: "2022",
        campeon: "Mr Bush",
        ciudad: "Lima",
        participantes: 32,
        imagen: "PICS/jam1.jpg",
        descripcion: "La primera edición donde comenzó la historia de KAWSABEAT.",
        evento: "torneos/kawsa-jam-1.html",
        bracket: "brackets/bracket-jam1.html"
    },
    {
        nombre: "KAWSA JAM II",
        año: "2023",
        campeon: ".....",
        ciudad: "Lima",
        participantes: 48,
        imagen: "PICS/jam2.jpg",
        descripcion: "Segunda edición con mayor participación.",
        evento: "torneos/kawsa-jam-2.html",
        bracket: "brackets/bracket-jam2.html"
    }
];

// LÓGICA DE INYECCIÓN DINÁMICA EN EL DOM
document.addEventListener("DOMContentLoaded", () => {
    const tournamentWrapper = document.getElementById("tournamentWrapper");

    if (tournamentWrapper) {
        // Mapeamos el array respetando fielmente tus propiedades y el diseño de dos botones
        tournamentWrapper.innerHTML = eventos.map(ev => `
            <div class="swiper-slide tournament-card">
                <img src="${ev.imagen}" alt="${ev.nombre}">
                <div class="card-overlay"></div>
                <div class="card-content">
                    <span>⚡ ${ev.ciudad.toUpperCase()} • ${ev.año}</span>
                    <h3>${ev.nombre}</h3>
                    <div class="champion">🏆 Campeón: <strong>${ev.campeon}</strong></div>
                    <div class="buttons">
                        <a href="${ev.evento}">Ver Info</a>
                        <a href="${ev.bracket}" target="_blank">Ver Bracket</a>
                    </div>
                </div>
            </div>
        `).join("");

        // Inicializamos el Swiper de Torneos justo después de inyectar el contenido
        new Swiper(".tournamentsSwiper", {
            loop: true,
            speed: 800,
            spaceBetween: 30,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            breakpoints: {
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 }
            }
        });
    }
});