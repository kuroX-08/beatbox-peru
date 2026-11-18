async function cargarTorneo() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const torneoId = urlParams.get('torneo') || 'NR26'; 
        const origen = urlParams.get('origen'); 

        let rutaFinal = '';

    // Filtro inteligente basado en tu estructura real
    if (origen === 'peru') {
    // 1. Sale de brackets/ 
    // 2. Sale de beatboxlima/ 
    // 3. Entra a la carpeta nacional que está en la raíz
    rutaFinal = `data-bbxperu/${torneoId}.json`;
    } else {
    // RUTA PARA LIMA DIRECTA:
    // Como "data-bbxlima" está justo al lado de brackets.html, entramos directo
    rutaFinal = `data-bbxlima/${torneoId}.json`;
    }

        const response = await fetch(rutaFinal);
        if (!response.ok) throw new Error("Torneo no encontrado");
        const data = await response.json();

        // Inyectar textos principales
        document.getElementById('bracket-status').innerText = data.status;
        document.getElementById('bracket-title').innerText = data.title;
        document.getElementById('bracket-desc').innerText = data.description;

        // Renderizar Jueces
        const judgesContainer = document.getElementById('judges-render-list');
        judgesContainer.innerHTML = data.judges.map(j => 
            `<span style="color: #ffffff !important;">${j}</span>`
        ).join('<span class="separator" style="color: #ff4500 !important; margin: 0 10px;">|</span>');

        // Renderizar Canvas del Bracket
        const canvas = document.getElementById('tournament-render-canvas');
        canvas.innerHTML = `
            <div class="wing-side wing-left">
                <div class="wing-column quarters">${renderWingMatches(data.leftWing.quarters, 'left')}</div>
                <div class="wing-column semis">${renderWingMatches(data.leftWing.semis, 'left')}</div>
            </div>
            <div class="center-podium">
                <div class="podium-box champion">
                    <span class="podium-title">CHAMPION</span>
                    <div class="podium-name"><a href="${data.podium.champion.link}" target="_blank" class="bracket-profile-link">${data.podium.champion.name}</a></div>
                </div>
                <div class="podium-box second-place">
                    <span class="podium-title">2nd Place</span>
                    <div class="podium-name"><a href="${data.podium.second.link}" target="_blank" class="bracket-profile-link">${data.podium.second.name}</a></div>
                </div>
                <div class="podium-box third-place">
                    <span class="podium-title">3rd Place</span>
                    <div class="podium-name"><a href="${data.podium.third.link}" target="_blank" class="bracket-profile-link">${data.podium.third.name}</a></div>
                </div>
            </div>
            <div class="wing-side wing-right">
                <div class="wing-column semis">${renderWingMatches(data.rightWing.semis, 'right')}</div>
                <div class="wing-column quarters">${renderWingMatches(data.rightWing.quarters, 'right')}</div>
            </div>
        `;

    } catch (err) {
        document.getElementById('bracket-title').innerText = "Error al cargar el torneo";
        console.error(err);
    }
}

function renderWingMatches(matchups, side) {
    return matchups.map(match => {
        const isP1Winner = match.winner === 'player1' ? 'winner' : '';
        const isP2Winner = match.winner === 'player2' ? 'winner' : '';

        const p1Identity = side === 'left' 
            ? `<img src="https://flagcdn.com/w20/pe.png" alt="PE"> <a href="${match.player1.link}" target="_blank" class="bracket-profile-link">${match.player1.name}</a>`
            : `<a href="${match.player1.link}" target="_blank" class="bracket-profile-link">${match.player1.name}</a> <img src="https://flagcdn.com/w20/pe.png" alt="PE">`;

        const p2Identity = side === 'left' 
            ? `<img src="https://flagcdn.com/w20/pe.png" alt="PE"> <a href="${match.player2.link}" target="_blank" class="bracket-profile-link">${match.player2.name}</a>`
            : `<a href="${match.player2.link}" target="_blank" class="bracket-profile-link">${match.player2.name}</a> <img src="https://flagcdn.com/w20/pe.png" alt="PE">`;

        const p1Badge = match.player1.seed ? `<span class="seed-badge">${match.player1.seed}</span>` : `<span class="vote-count">${match.player1.votes}</span>`;
        const p2Badge = match.player2.seed ? `<span class="seed-badge">${match.player2.seed}</span>` : `<span class="vote-count">${match.player2.votes}</span>`;

        return `
            <div class="beatbox-matchup">
                <div class="player-slot ${isP1Winner}">
                    ${side === 'left' ? p1Identity + p1Badge : p1Badge + p1Identity}
                </div>
                <div class="player-slot ${isP2Winner}">
                    ${side === 'left' ? p2Identity + p2Badge : p2Badge + p2Identity}
                </div>
            </div>
        `;
    }).join('');
}

document.addEventListener("DOMContentLoaded", cargarTorneo);