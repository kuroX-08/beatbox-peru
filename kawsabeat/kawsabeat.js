document.addEventListener("DOMContentLoaded", () => {
    
    // Base de Datos Unificada Internamente (Por si tus archivos externos tardan en enlazar)
    const dbEventos = typeof eventos !== 'undefined' ? eventos : [
        { año: "2021", nombre: "7toBONE", descripcion: "Clasificatoria de Lima al Campeonato Nacional de Huancayo 2021. Formato temático adaptado.", campeon: "Nexus", lugar: "Stormhouse", formato: "7toSmoke (90s)", infoUrl: "#", bracketUrl: "#" },
        { año: "2025", nombre: "Nexuss Redemption", descripcion: "Primera edición presencial. Top 8 por acumulación de victorias y llaves eliminatorias directas.", campeon: "Barth FH", lugar: "Plaza Butters", formato: "Showcase + Batallas", infoUrl: "#", bracketUrl: "#" },
        { año: "2026", nombre: "Nexuss Redemption", descripcion: "Proceso ampliado con filtros de Wildcards internacionales, Top 10 presencial y llave final.", campeon: "Jerebitt", lugar: "C.C. Etnias Roots", formato: "ABAB (Rondas de 1:30)", infoUrl: "#", bracketUrl: "#" }
    ];

    const dbCampeones = typeof campeones !== 'undefined' ? campeones : [
        { año: "2021", evento: "7toBONE", campeon: "Nexus", consecuencia: "Clasificó al Nacional de Huancayo y se coronó Campeón Nacional 2021." },
        { año: "2025", evento: "Nexuss Redemption", campeon: "Barth FH", consecuencia: "Primer campeón absoluto del formato presencial de la saga." },
        { año: "2026", evento: "Nexuss Redemption", campeon: "Jerebitt", consecuencia: "Clasificó como representante peruano a la Internacional de Beat Brothers 2027 en Chile." }
    ];

    const dbStaff = [
        { rol: "Jueces", nombres: "Mazzive, Raiderx, StormCrow, Tacrash, Makko, Trenzaman, Slayer" },
        { rol: "Host", nombres: "Mr Bush" },
        { rol: "DJ", nombres: "Aaron Well" },
        { rol: "Sonido", nombres: "Odalis Cusquisiban" },
        { rol: "Audiovisuales", nombres: "Deblanco Films, Jason Jazx, Gero Acosta, Creart, FelipeBeat" },
        { rol: "Montaje", nombres: "Karlo Roman / Nexuss" }
    ];

    // 1. RENDERIZAR TARJETAS DE TORNEOS (CON FILTRO ACTIVO)
    const tournamentWrapper = document.getElementById("tournamentWrapper");
    let swiperInstance = null;

    function renderTournaments(filterYear) {
        if (!tournamentWrapper) return;
        
        // Destruir instancia previa de Swiper si existe para evitar duplicados visuales
        if (swiperInstance) {
            swiperInstance.destroy(true, true);
        }

        const filtrados = filterYear === "all" ? dbEventos : dbEventos.filter(ev => ev.año === filterYear);

        tournamentWrapper.innerHTML = filtrados.map(ev => `
            <div class="swiper-slide tournament-card">
                <div class="card-top">
                    <span>⚡ EDICIÓN ANUAL ${ev.año}</span>
                    <h3>${ev.nombre}</h3>
                    <div class="card-info-list">
                        <div>Sede: <strong>${ev.lugar}</strong></div>
                        <div>Formato: <strong>${ev.formato}</strong></div>
                    </div>
                    <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 20px;">${ev.descripcion}</p>
                </div>
                <div class="card-bottom">
                    <div class="card-champion-badge">
                        🏆 Ganador: <strong>${ev.campeon}</strong>
                    </div>
                    <div class="card-actions">
                        <a href="${ev.infoUrl}">Multimedia</a>
                        <a href="${ev.bracketUrl}" target="_blank">Brackets</a>
                    </div>
                </div>
            </div>
        `).join("");

        // Inicializar Swiper con las proporciones y márgenes controlados
        swiperInstance = new Swiper(".tournamentsSwiper", {
            slicePerView: 1,
            spaceBetween: 24,
            pagination: { el: ".tournamentsSwiper .swiper-pagination", clickable: true },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // 2. RENDERIZAR TABLA DE HONOR (Hall de campeones ordenado)
    const championsTableBody = document.getElementById("championsTableBody");
    if (championsTableBody) {
        championsTableBody.innerHTML = dbCampeones.map(c => `
            <tr>
                <td>${c.año}</td>
                <td>${c.evento}</td>
                <td><strong>${c.campeon}</strong></td>
                <td>${c.consecuencia}</td>
            </tr>
        `).join("");
    }

    // 3. RENDERIZAR MATRIZ DE ENLACES MULTIMEDIA (Recomendación limpia)
    const multimediaLinksContainer = document.getElementById("multimediaLinksContainer");
    if (multimediaLinksContainer) {
        multimediaLinksContainer.innerHTML = dbEventos.map(ev => `
            <a href="${ev.infoUrl}" class="media-btn">
                <span>Playlist Oficial • ${ev.nombre} ${ev.año}</span>
                <span class="action-t">ABRIR ARCHIVO →</span>
            </a>
        `).join("");
    }

    // 4. RENDERIZAR STAFF / CRÉDITOS
    const staffTagsContainer = document.getElementById("staffTagsContainer");
    if (staffTagsContainer) {
        staffTagsContainer.innerHTML = dbStaff.map(st => `
            <div class="staff-tag">
                ${st.rol}: <strong>${st.nombres}</strong>
            </div>
        `).join("");
    }

    // 5. ASIGNACIÓN DE FILTROS INTERACTIVOS
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterButtons.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            renderTournaments(e.target.getAttribute("data-filter"));
        });
    });

    // Carga inicial absoluta
    renderTournaments("all");
});