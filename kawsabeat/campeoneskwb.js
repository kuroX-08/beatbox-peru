const campeones = [
    {
        nombre: "Mr Bush",
        torneo: "KAWSA JAM I",
        año: "2022",
        foto: "PICS/campeon1.jpg",
        frase: "El beatbox es mi forma de hablar.",
        perfil: "../artistas/mrbush.html"
    },
    {
        nombre: "Jere",
        torneo: "KAWSA JAM II",
        año: "2023",
        foto: "PICS/campeon2.jpg",
        frase: "Nunca dejes de practicar.",
        perfil: "../artistas/jere.html"
    }
];

// LÓGICA DE INYECCIÓN DINÁMICA EN EL DOM
document.addEventListener("DOMContentLoaded", () => {
    const championsWrapper = document.getElementById("championsWrapper");

    if (championsWrapper) {
        // Mapeamos el array para generar la estructura exacta que requiere tu CSS
        championsWrapper.innerHTML = campeones.map(campeon => `
            <div class="swiper-slide champion-card">
                <img src="${campeon.foto}" alt="${campeon.nombre}">
                <div class="champion-overlay"></div>
                <div class="champion-info">
                    <span>🏆 ${campeon.torneo} (${campeon.año})</span>
                    <h3>${campeon.nombre}</h3>
                    <p style="color: var(--gray); font-style: italic; margin-bottom: 20px; font-size: 1.05rem;">
                        "${campeon.frase}"
                    </p>
                    <a href="${campeon.perfil}">Ver Perfil</a>
                </div>
            </div>
        `).join("");

        // Inicializamos el Swiper de Campeones justo después de inyectar el HTML
        new Swiper(".championsSwiper", {
            loop: true,
            speed: 800,
            spaceBetween: 30,
            autoplay: {
                delay: 4500,
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