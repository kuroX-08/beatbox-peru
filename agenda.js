// ====================================================
// 1. LOS DATOS JSON
// ====================================================
const proximosEventos = [
    {
        "dia": "25",
        "mes": "JUL",
        "organizador": "RAKURACOMPE",
        "titulo": "Campeonato organizado por Rakura",
        "lugar": "Lugar: Por confirmar",
        "tipoBoton": "inscribirse",
        "urlDestino": "https://forms.google.com/tu-link-de-inscripcion" 
    },
    {
        "dia": "15",
        "mes": "AGO",
        "organizador": "KAWSABEAT",
        "titulo": "Kawsabeat",
        "lugar": "Lugar: GRUPO DE WSP KAWSABEAT",
        "tipoBoton": "info",
        "urlDestino": "https://www.instagram.com/kawsabeat/"
    },
    {
        "dia": "02",
        "mes": "SET",
        "organizador": "BEATBOX LIMA",
        "titulo": "Torneo de Plazas - Clasificatoria Norte",
        "lugar": "Lugar: Por confirmar",
        "tipoBoton": "inscribirse",
        "urlDestino": "https://forms.google.com/link-beatbox-lima"
    }
];

// ====================================================
// 2. EL MOTOR DE RENDERIZADO
// ====================================================
function cargarEventosDinamicos() {
    const contenedor = document.getElementById('events-dynamic-list');
    
    // Si no encuentra el contenedor en el HTML actual, salta una alerta en la consola para saberlo
    if (!contenedor) {
        console.error("ERROR: No se encontró el contenedor con ID 'events-dynamic-list' en tu HTML.");
        return;
    }

    let htmlAcumulado = "";

    proximosEventos.forEach(evento => {
        let textoBoton = "VER INFO";
        if (evento.tipoBoton === "inscribirse") textoBoton = "INSCRIBIRSE";
        if (evento.tipoBoton === "reservar") textoBoton = "RESERVAR";

        htmlAcumulado += `
            <div class="event-row-premium">
                <div class="event-date-box">
                    <span class="event-day">${evento.dia}</span>
                    <span class="event-month">${evento.mes}</span>
                </div>

                <div class="event-details-box">
                    <div class="event-tag-wrapper">
                        <span class="event-row-tag-badge">${evento.organizador}</span>
                    </div>
                    <h3 class="event-title-brutal">${evento.titulo}</h3>
                    <p class="event-location-text">${evento.lugar}</p>
                </div>

                <div class="event-action-box">
                    <a href="${evento.urlDestino}" target="_blank" rel="noopener noreferrer" class="btn-event-action-premium">
                        ${textoBoton}
                    </a>
                </div>
            </div>
        `;
    });

    contenedor.innerHTML = htmlAcumulado;
}

// Forzar la ejecución pase lo que pase al terminar de cargar la estructura de la página
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cargarEventosDinamicos);
} else {
    cargarEventosDinamicos();
}