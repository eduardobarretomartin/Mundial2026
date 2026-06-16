/* 
   app.js - Porra Mundial 2026
   Core Engine: Data, Scoring, Text Parsing, State and UI rendering
*/

// --- Teams Database ---
const TEAMS = [
  // Bloque 1
  { id: 1, name: "España", block: 1, price: 182, code: "es" },
  { id: 2, name: "Francia", block: 1, price: 167, code: "fr" },
  { id: 3, name: "Inglaterra", block: 1, price: 143, code: "gb-eng" },
  { id: 4, name: "Brasil", block: 1, price: 111, code: "br" },
  { id: 5, name: "Argentina", block: 1, price: 111, code: "ar" },

  // Bloque 2
  { id: 6, name: "Portugal", block: 2, price: 83, code: "pt" },
  { id: 7, name: "Alemania", block: 2, price: 77, code: "de" },
  { id: 8, name: "Países Bajos", block: 2, price: 48, code: "nl" },
  { id: 9, name: "Noruega", block: 2, price: 38, code: "no" },
  { id: 10, name: "Bélgica", block: 2, price: 29, code: "be" },
  { id: 11, name: "Colombia", block: 2, price: 29, code: "co" },
  { id: 12, name: "Japón", block: 2, price: 20, code: "jp" },
  { id: 13, name: "Marruecos", block: 2, price: 20, code: "ma" },

  // Bloque 3
  { id: 14, name: "EEUU", block: 3, price: 15, code: "us" },
  { id: 15, name: "Uruguay", block: 3, price: 15, code: "uy" }, // Corrected Entry 15
  { id: 16, name: "Suiza", block: 3, price: 12, code: "ch" },
  { id: 17, name: "México", block: 3, price: 12, code: "mx" },
  { id: 18, name: "Croacia", block: 3, price: 12, code: "hr" },
  { id: 19, name: "Turquía", block: 3, price: 12, code: "tr" },
  { id: 20, name: "Ecuador", block: 3, price: 10, code: "ec" },
  { id: 21, name: "Senegal", block: 3, price: 10, code: "sn" },
  { id: 22, name: "Suecia", block: 3, price: 8, code: "se" },
  { id: 23, name: "Canadá", block: 3, price: 7, code: "ca" },
  { id: 24, name: "Austria", block: 3, price: 7, code: "at" },
  { id: 25, name: "Paraguay", block: 3, price: 7, code: "py" },

  // Bloque 4
  { id: 26, name: "Escocia", block: 4, price: 4, code: "gb-sct" },
  { id: 27, name: "Bosnia y Hzgb.", block: 4, price: 4, code: "ba" },
  { id: 28, name: "Costa de Marfil", block: 4, price: 3, code: "ci" },
  { id: 29, name: "Egipto", block: 4, price: 3, code: "eg" },
  { id: 30, name: "Chequia", block: 4, price: 3, code: "cz" },
  { id: 31, name: "Ghana", block: 4, price: 2, code: "gh" },
  { id: 32, name: "Argelia", block: 4, price: 2, code: "dz" },
  { id: 33, name: "Corea del Sur", block: 4, price: 2, code: "kr" },
  { id: 34, name: "Túnez", block: 4, price: 2, code: "tn" },
  { id: 35, name: "Australia", block: 4, price: 2, code: "au" },
  { id: 36, name: "Irán", block: 4, price: 2, code: "ir" },
  { id: 37, name: "RD Congo", block: 4, price: 1, code: "cd" }, // Costa Rica -> RD Congo
  { id: 38, name: "Sudáfrica", block: 4, price: 1, code: "za" },
  { id: 39, name: "Catar", block: 4, price: 1, code: "qa" },
  { id: 40, name: "Arabia Saudí", block: 4, price: 1, code: "sa" },
  { id: 41, name: "Panamá", block: 4, price: 1, code: "pa" },
  { id: 42, name: "Nueva Zelanda", block: 4, price: 1, code: "nz" },
  { id: 43, name: "Irak", block: 4, price: 1, code: "iq" },
  { id: 44, name: "Uzbekistán", block: 4, price: 1, code: "uz" },
  { id: 45, name: "Cabo Verde", block: 4, price: 1, code: "cv" },
  { id: 46, name: "Curazao", block: 4, price: 1, code: "cw" },
  { id: 47, name: "Jordania", block: 4, price: 1, code: "jo" },
  { id: 48, name: "Haití", block: 4, price: 1, code: "ht" }
];

// --- App State ---
let state = {
  participants: [
    {
      "name": "Eduardo BM",
      "teams": [
        2,
        5,
        10,
        13,
        20,
        25,
        33
      ],
      "spent": 346,
      "topScorer": "Oyarzábal",
      "dateSubmitted": "2026-06-11T18:51:16.423Z"
    },
    {
      "name": "Juan Sánchez (AKA Riojano)",
      "teams": [
        1,
        6,
        8,
        19,
        21,
        26
      ],
      "spent": 339,
      "topScorer": "Harry kane",
      "dateSubmitted": "2026-06-11T18:52:06.905Z"
    },
    {
      "name": "Pablo",
      "teams": [
        2,
        6,
        11,
        13,
        14,
        19,
        33
      ],
      "spent": 328, // Turquía is now 12 (was 10)
      "topScorer": "Mbappe",
      "dateSubmitted": "2026-06-11T18:52:39.278Z"
    },
    {
      "name": "Jesús Palacios",
      "teams": [
        5,
        6,
        13,
        14,
        20,
        33,
        39
      ],
      "spent": 242,
      "topScorer": "Oyarzabal",
      "dateSubmitted": "2026-06-11T18:53:04.203Z"
    },
    {
      "name": "Juan Alonso",
      "teams": [
        1,
        7,
        8,
        13,
        18,
        26,
        28
      ],
      "spent": 346, // Países Bajos is now 48 (was 50)
      "topScorer": "Mbappe (superando por poco a Ferran)",
      "dateSubmitted": "2026-06-11T18:53:44.512Z"
    },
    {
      "name": "Miguel",
      "teams": [
        5,
        6,
        7,
        8,
        13,
        20,
        37
      ],
      "spent": 350, // RD Congo is team 37, Países Bajos is 48
      "topScorer": "Harry Kane",
      "dateSubmitted": "2026-06-11T18:55:25.832Z"
    }
  ],
  
  results: {
    teamAchievements: {}, // teamId -> { wins, draws, firstInGroup, secondInGroup, w32, w16, w8, w4, w3rd, wFinal }
    topScorers: "" // text input of comma separated top scorers
  },
  deadline: "2026-06-11T20:30:00", // Cierre hoy a las 20:30 hora de Berlín
  ticketPrice: 10 // €10 entry
};

// Initialize empty achievements for all teams
function initTeamAchievements() {
  TEAMS.forEach(team => {
    if (!state.results.teamAchievements[team.id]) {
      state.results.teamAchievements[team.id] = {
        wins: 0,
        draws: 0,
        firstInGroup: false,
        secondInGroup: false,
        w32: false,
        w16: false,
        w8: false,
        w4: false,
        w3rd: false,
        wFinal: false
      };
    }
  });
}

// --- LocalStorage persistence ---
function loadState() {
  const saved = localStorage.getItem('porra_mundial_2026_state');
  if (saved) {
    try {
      state = JSON.parse(saved);
    } catch (e) {
      console.error("Error loading state", e);
    }
  }
  initTeamAchievements();
}

function saveState() {
  localStorage.setItem('porra_mundial_2026_state', JSON.stringify(state));
}

// --- Points Engine ---
function getTeamPoints(teamId) {
  const ach = state.results.teamAchievements[teamId];
  if (!ach) return 0;
  
  let pts = 0;
  // Fase Clasificación
  pts += (ach.wins || 0) * 3;
  pts += (ach.draws || 0) * 1;
  if (ach.firstInGroup) pts += 2;
  if (ach.secondInGroup) pts += 1;
  
  // Fase Eliminación
  if (ach.w32) pts += 3;
  if (ach.w16) pts += 4;
  if (ach.w8) pts += 5;
  if (ach.w3rd) pts += 1;
  if (ach.w4) pts += 6;
  if (ach.wFinal) pts += 7;
  
  return pts;
}

function getParticipantPointsBreakdown(participant) {
  const teamDetails = participant.teams.map(id => {
    const team = TEAMS.find(t => t.id === id);
    return {
      id,
      name: team ? team.name : "Desconocido",
      code: team ? team.code : "",
      price: team ? team.price : 0,
      points: getTeamPoints(id)
    };
  });
  
  const totalTeamPoints = teamDetails.reduce((sum, td) => sum + td.points, 0);
  
  // Check Top Scorer
  const activeScorers = state.results.topScorers
    ? state.results.topScorers.split(',').map(s => s.trim().toLowerCase()).filter(s => s !== "")
    : [];
  
  const isTopScorerCorrect = activeScorers.length > 0 && 
    activeScorers.includes(participant.topScorer.trim().toLowerCase());
    
  const topScorerPoints = isTopScorerCorrect ? 4 : 0;
  
  return {
    teamDetails,
    totalTeamPoints,
    topScorerPoints,
    totalPoints: totalTeamPoints + topScorerPoints,
    isTopScorerCorrect
  };
}

// --- Leaderboard Sorting ---
function getLeaderboard() {
  const list = state.participants.map(p => {
    const breakdown = getParticipantPointsBreakdown(p);
    return {
      ...p,
      teamDetails: breakdown.teamDetails,
      totalTeamPoints: breakdown.totalTeamPoints,
      topScorerPoints: breakdown.topScorerPoints,
      totalPoints: breakdown.totalPoints,
      isTopScorerCorrect: breakdown.isTopScorerCorrect
    };
  });
  
  // Sorting rules:
  // 1. Total points descending
  // 2. Tie breaker: lower budget spent (spent price ascending)
  // 3. Alphabetical order of name if still tied
  list.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (a.spent !== b.spent) {
      return a.spent - b.spent; // Lower spent comes first
    }
    return a.name.localeCompare(b.name);
  });
  
  return list;
}

// --- Prize Pool Distribution ---
function calculatePrizes() {
  const leaderboard = getLeaderboard();
  const numParticipants = leaderboard.length;
  const totalPool = numParticipants * state.ticketPrice;
  
  let firstPrizeAmount = totalPool * 0.8;
  let secondPrizeAmount = totalPool * 0.2;
  
  let prizeDistribution = {
    totalPool,
    firstPlaceWinners: [],
    secondPlaceWinners: [],
    firstPrizePerPerson: 0,
    secondPrizePerPerson: 0,
    hasSecondPrize: true
  };
  
  if (numParticipants === 0) return prizeDistribution;
  
  // Determine exact ranks based on points and tie-breakers (sorting is already done)
  // Wait, if there is an exact tie in points AND spent budget, they are tied in ranking.
  // Let's group players by their points & spent combinations to find ties.
  const uniqueRankings = [];
  leaderboard.forEach(p => {
    const last = uniqueRankings[uniqueRankings.length - 1];
    if (last && last.totalPoints === p.totalPoints && last.spent === p.spent) {
      last.players.push(p);
    } else {
      uniqueRankings.push({
        totalPoints: p.totalPoints,
        spent: p.spent,
        players: [p]
      });
    }
  });
  
  if (uniqueRankings.length > 0) {
    const firstRankGroup = uniqueRankings[0];
    prizeDistribution.firstPlaceWinners = firstRankGroup.players;
    
    if (firstRankGroup.players.length > 1) {
      // Tie in first place: no second prize, split total pool among all first-place winners
      prizeDistribution.hasSecondPrize = false;
      prizeDistribution.firstPrizePerPerson = totalPool / firstRankGroup.players.length;
      prizeDistribution.secondPrizePerPerson = 0;
    } else {
      // Single winner in first place
      prizeDistribution.firstPrizePerPerson = firstPrizeAmount;
      
      // Look for second place
      if (uniqueRankings.length > 1) {
        const secondRankGroup = uniqueRankings[1];
        prizeDistribution.secondPlaceWinners = secondRankGroup.players;
        prizeDistribution.secondPrizePerPerson = secondPrizeAmount / secondRankGroup.players.length;
      } else {
        // Only one participant or group overall
        prizeDistribution.secondPrizePerPerson = secondPrizeAmount;
      }
    }
  }
  
  return prizeDistribution;
}

// --- Validations for Draft ---
function validateDraft(selectedTeamIds) {
  const selectedTeams = TEAMS.filter(t => selectedTeamIds.includes(t.id));
  const spent = selectedTeams.reduce((sum, t) => sum + t.price, 0);
  
  const blocksPresent = new Set(selectedTeams.map(t => t.block));
  const blocksValid = blocksPresent.has(1) && blocksPresent.has(2) && blocksPresent.has(3) && blocksPresent.has(4);
  
  const countValid = selectedTeamIds.length >= 4 && selectedTeamIds.length <= 7;
  const budgetValid = spent <= 350;
  
  return {
    spent,
    remaining: 350 - spent,
    hasBlock1: blocksPresent.has(1),
    hasBlock2: blocksPresent.has(2),
    hasBlock3: blocksPresent.has(3),
    hasBlock4: blocksPresent.has(4),
    blocksValid,
    countValid,
    count: selectedTeamIds.length,
    budgetValid,
    isValid: blocksValid && countValid && budgetValid
  };
}

// --- Text Model Parser & Exporter ---
// Parses a text string and returns { name, teams: [], spent, topScorer, error }
function parsePorraText(text) {
  if (!text || text.trim() === "") {
    return { error: "El texto está vacío." };
  }
  
  const lines = text.split('\n');
  let name = "";
  let topScorer = "";
  const foundTeams = [];
  
  lines.forEach(line => {
    const cleanLine = line.trim();
    if (!cleanLine) return;
    
    // Check for Name
    const nameMatch = cleanLine.match(/^(?:NOMBRE\s*:\s*|NAME\s*:\s*)(.+)$/i);
    if (nameMatch) {
      name = nameMatch[1].trim();
      return;
    }
    
    // Check for Top Scorer
    const scorerMatch = cleanLine.match(/^(?:M(?:Á|A)XIMO\s+GOLEADOR\s*:\s*|GOLEADOR\s*:\s*|TOP\s+SCORER\s*:\s*)(.+)$/i);
    if (scorerMatch) {
      topScorer = scorerMatch[1].trim();
      return;
    }
    
    // Check if line contains a team name.
    // We clean the line and search if any of the 48 team names are present.
    // To avoid sub-string matches (like "Costa" in "Costa de Marfil"), we order by name length descending.
    const sortedTeamsByName = [...TEAMS].sort((a, b) => b.name.length - a.name.length);
    for (const team of sortedTeamsByName) {
      // Avoid matching placeholder template strings like "[Equipo 1]"
      if (cleanLine.includes("[Equipo")) continue;
      
      // We look for the team name as a distinct word or substring
      // but ensure we don't double count.
      const escapedTeamName = team.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp('(?:^|\\b|\\s)' + escapedTeamName + '(?:$|\\b|\\s|\\d)', 'i');
      
      if (regex.test(cleanLine)) {
        if (!foundTeams.includes(team.id)) {
          foundTeams.push(team.id);
        }
        break; // Stop checking other teams for this line once a team is matched
      }
    }
  });
  
  if (!name) {
    // Fallback: search for any line that doesn't fit other fields as name, but better to require/look for it.
  }
  
  const val = validateDraft(foundTeams);
  
  return {
    name: name || "Participante Anónimo",
    teams: foundTeams,
    spent: val.spent,
    topScorer: topScorer || "Ninguno",
    validation: val,
    isValid: val.isValid && name !== ""
  };
}

// Formats a selection to the standard template text
function exportPorraToText(name, selectedTeamIds, topScorer) {
  const selectedTeams = TEAMS.filter(t => selectedTeamIds.includes(t.id));
  const spent = selectedTeams.reduce((sum, t) => sum + t.price, 0);
  const remaining = 350 - spent;
  
  let text = `NOMBRE: ${name || ""}\n`;
  text += `PRECIO: 350\n`;
  
  // Print selected teams up to 7
  for (let i = 0; i < 7; i++) {
    if (i < selectedTeams.length) {
      text += `${selectedTeams[i].name}\n`;
    } else {
      text += `[Equipo ${i + 1}]\n`;
    }
  }
  
  text += `PRECIO: ${remaining}\n`;
  text += `MÁXIMO GOLEADOR: ${topScorer || ""}\n`;
  text += `PRESUPUESTO 350`;
  
  return text;
}

// --- Deadline Helpers ---
function isDeadlinePassed() {
  const now = new Date();
  const dDate = new Date(state.deadline);
  return now > dDate;
}

function formatDeadlineString(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  return d.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) + ' h';
}

// Export state as JSON
function exportStateJSON() {
  return JSON.stringify(state, null, 2);
}

// Import state from JSON
function importStateJSON(jsonText) {
  try {
    const parsed = JSON.parse(jsonText);
    if (parsed.participants && parsed.results && parsed.deadline) {
      state = parsed;
      initTeamAchievements();
      saveState();
      return { success: true };
    }
    return { success: false, error: "El JSON no tiene la estructura correcta de la Porra." };
  } catch (e) {
    return { success: false, error: "Error al parsear el archivo JSON: " + e.message };
  }
}

// --- UI CONTROLLER & RENDER ENGINE ---
const appController = {
  selectedDraftTeams: [],
  officialDataLoaded: false,
  apiTeamsMap: null,
  cachedGames: null,
  cachedGroups: null,

  init() {
    loadState();
    
    // Set initial form states
    document.getElementById('settings-deadline').value = state.deadline;
    document.getElementById('settings-price').value = state.ticketPrice;
    
    this.bindEvents();
    this.renderAll();
    
    // Intentar sincronizar con database.json oficial en el servidor
    fetch('database.json')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('No se encontró database.json en el servidor');
      })
      .then(serverState => {
        if (serverState && serverState.participants && serverState.results) {
          state = serverState;
          initTeamAchievements();
          saveState(); // Guardar en cache local
          this.renderAll();
          // Actualizar inputs del formulario con los valores del servidor
          document.getElementById('settings-deadline').value = state.deadline;
          document.getElementById('settings-price').value = state.ticketPrice;
          document.getElementById('admin-top-scorers-input').value = state.results.topScorers || "";
          this.showToast("Datos sincronizados con la base de datos oficial.");
        }
      })
      .catch(err => {
        console.log("Usando base de datos local / sin conexión:", err.message);
      });
      
    // Start countdown timer loop
    setInterval(() => this.updateCountdown(), 1000);
    this.updateCountdown();
  },

  bindEvents() {
    // Tab switching
    document.querySelectorAll('.nav-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        const targetTab = btn.getAttribute('data-tab');
        document.getElementById(targetTab).classList.add('active');
        
        if (targetTab === 'tab-official-wc') {
          this.fetchOfficialData();
        }
      });
    });

    // Save Bet button
    document.getElementById('btn-save-bet').addEventListener('click', () => {
      if (isDeadlinePassed()) {
        this.showToast("No se pueden registrar porras. ¡El plazo ha terminado!", true);
        return;
      }
      
      const name = document.getElementById('player-name-input').value.trim();
      const topScorer = document.getElementById('top-scorer-input').value.trim();
      
      if (!name || !topScorer) {
        this.showToast("Por favor, rellena el nombre y el máximo goleador.", true);
        return;
      }
      
      const val = validateDraft(this.selectedDraftTeams);
      if (!val.isValid) {
        this.showToast("La porra no cumple los requisitos de presupuesto o bloques.", true);
        return;
      }
      
      // Register bet
      state.participants.push({
        name,
        teams: [...this.selectedDraftTeams],
        spent: val.spent,
        topScorer,
        dateSubmitted: new Date().toISOString()
      });
      
      saveState();
      this.selectedDraftTeams = [];
      document.getElementById('player-name-input').value = "";
      document.getElementById('top-scorer-input').value = "";
      
      this.renderAll();
      this.showToast("¡Porra registrada con éxito!");
      
      // Redirect to Leaderboard
      document.querySelector('[data-tab="tab-leaderboard"]').click();
    });

    // Copy Text button
    document.getElementById('btn-export-text').addEventListener('click', () => {
      const name = document.getElementById('player-name-input').value.trim() || "Nombre";
      const topScorer = document.getElementById('top-scorer-input').value.trim() || "Goleador";
      const text = exportPorraToText(name, this.selectedDraftTeams, topScorer);
      
      navigator.clipboard.writeText(text).then(() => {
        this.showToast("Texto de la porra copiado al portapapeles.");
      }).catch(err => {
        this.showToast("Error al copiar texto: " + err, true);
      });
    });

    // Import Text button
    document.getElementById('btn-import-text').addEventListener('click', () => {
      if (isDeadlinePassed()) {
        this.showToast("Las porras están cerradas. No se puede importar.", true);
        return;
      }
      
      const text = document.getElementById('import-text-area').value;
      const parsed = parsePorraText(text);
      
      if (parsed.error) {
        this.showToast(parsed.error, true);
        return;
      }
      
      // Load into draft
      this.selectedDraftTeams = parsed.teams;
      document.getElementById('player-name-input').value = parsed.name;
      document.getElementById('top-scorer-input').value = parsed.topScorer;
      
      this.renderAll();
      
      if (parsed.isValid) {
        this.showToast("Porra importada correctamente en el editor.");
      } else {
        this.showToast("Importado, pero la selección no es válida (revisa presupuesto o bloques).", true);
      }
    });

    // Admin save scorers
    document.getElementById('btn-save-scorers').addEventListener('click', () => {
      const val = document.getElementById('admin-top-scorers-input').value;
      state.results.topScorers = val;
      saveState();
      this.renderAll();
      this.showToast("Máximos goleadores actualizados.");
    });

    // Admin search team
    document.getElementById('admin-team-search').addEventListener('input', (e) => {
      this.renderResultsTable(e.target.value);
    });

    // Settings save
    document.getElementById('btn-save-settings').addEventListener('click', () => {
      const dl = document.getElementById('settings-deadline').value;
      const price = parseFloat(document.getElementById('settings-price').value);
      
      if (!dl || isNaN(price)) {
        this.showToast("Ajustes inválidos.", true);
        return;
      }
      
      state.deadline = dl;
      state.ticketPrice = price;
      saveState();
      this.renderAll();
      this.showToast("Ajustes guardados correctamente.");
    });

    // Mock data & Clear data
    document.getElementById('btn-load-mock').addEventListener('click', () => {
      if (confirm("¿Seguro que quieres cargar datos de prueba? Esto sobrescribirá los datos actuales.")) {
        this.loadMockData();
        this.renderAll();
      }
    });

    document.getElementById('btn-restore-code').addEventListener('click', () => {
      if (confirm("🔄 ¿Seguro que quieres restaurar los datos del código? Se eliminarán los cambios locales y se recargará la página con el listado inicial de app.js.")) {
        localStorage.removeItem('porra_mundial_2026_state');
        location.reload();
      }
    });

    document.getElementById('btn-clear-data').addEventListener('click', () => {
      if (confirm("🚨 ¿SEGURO QUE DESEAS BORRAR TODO? Se eliminarán participantes y resultados.")) {
        state.participants = [];
        state.results = { teamAchievements: {}, topScorers: "" };
        initTeamAchievements();
        saveState();
        this.selectedDraftTeams = [];
        document.getElementById('player-name-input').value = "";
        document.getElementById('top-scorer-input').value = "";
        document.getElementById('admin-top-scorers-input').value = "";
        this.renderAll();
        this.showToast("Todos los datos han sido borrados.");
      }
    });

    // Export/Import JSON file handlers
    document.getElementById('btn-export-json').addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportStateJSON());
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "database.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      this.showToast("Base de datos database.json exportada para descarga.");
    });

    document.getElementById('btn-export-csv').addEventListener('click', () => {
      const board = getLeaderboard();
      if (board.length === 0) {
        this.showToast("No hay datos que exportar.", true);
        return;
      }
      
      let csv = "\ufeff"; // UTF-8 BOM for Excel
      const headers = ["Posicion", "Nombre", "Puntos Totales", "Gasto Presupuesto", "Puntos Equipos", "Puntos Goleador", "Goleador Pronosticado", "Equipos Seleccionados"];
      csv += headers.join(";") + "\n";
      
      board.forEach((p, idx) => {
        const rank = idx + 1;
        const teamNames = p.teamDetails.map(td => td.name).join(", ");
        const row = [
          rank,
          p.name,
          p.totalPoints,
          p.spent,
          p.totalTeamPoints,
          p.topScorerPoints,
          p.topScorer,
          `"${teamNames}"`
        ];
        csv += row.join(";") + "\n";
      });
      
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", url);
      downloadAnchor.setAttribute("download", "clasificacion_porra_mundial_2026.csv");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      this.showToast("Clasificación exportada a CSV.");
    });

    document.getElementById('btn-trigger-file').addEventListener('click', () => {
      document.getElementById('file-import-json').click();
    });

    document.getElementById('file-import-json').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        document.getElementById('imported-file-name').textContent = `Seleccionado: ${file.name}`;
        document.getElementById('btn-import-json-apply').disabled = false;
      }
    });

    document.getElementById('btn-import-json-apply').addEventListener('click', () => {
      const fileInput = document.getElementById('file-import-json');
      const file = fileInput.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = importStateJSON(event.target.result);
        if (res.success) {
          this.renderAll();
          document.getElementById('settings-deadline').value = state.deadline;
          document.getElementById('settings-price').value = state.ticketPrice;
          document.getElementById('admin-top-scorers-input').value = state.results.topScorers;
          this.showToast("¡Base de datos importada con éxito!");
          
          // Reset file import UI
          fileInput.value = "";
          document.getElementById('imported-file-name').textContent = "Ningún archivo seleccionado.";
          document.getElementById('btn-import-json-apply').disabled = true;
        } else {
          this.showToast(res.error, true);
        }
      };
      reader.readAsText(file);
    });

    // Sub-tab switching inside Official WC
    document.querySelectorAll('.official-tab-subnav .sub-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.official-tab-subnav .sub-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('#tab-official-wc .subtab-content').forEach(c => c.style.display = 'none');
        
        btn.classList.add('active');
        const targetSubtab = btn.getAttribute('data-subtab');
        document.getElementById(targetSubtab).style.display = 'block';
        
        if (targetSubtab === 'subtab-official-groups' && this.cachedGroups) {
          this.renderOfficialGroups();
        } else if (targetSubtab === 'subtab-official-matches' && this.cachedGames) {
          this.renderOfficialMatches();
        }
      });
    });

    // Refresh and retry buttons
    document.getElementById('btn-refresh-official').addEventListener('click', () => {
      this.fetchOfficialData(true);
    });

    document.getElementById('btn-retry-official').addEventListener('click', () => {
      this.fetchOfficialData(true);
    });

    // Match filters
    document.getElementById('filter-official-stage').addEventListener('change', () => {
      this.renderOfficialMatches();
    });

    document.getElementById('filter-official-search').addEventListener('input', () => {
      this.renderOfficialMatches();
    });

    document.getElementById('filter-official-played').addEventListener('change', () => {
      this.renderOfficialMatches();
    });
  },

  renderAll() {
    this.updateCountdown();
    this.renderHeaderAndPrizes();
    this.renderBuilderTeams();
    this.renderLeaderboard();
    this.renderParticipants();
    this.renderResultsTable();
    this.renderBracket();
    
    // Update top scorer input in admin panel if present
    document.getElementById('admin-top-scorers-input').value = state.results.topScorers || "";
    document.getElementById('nav-participants-count').textContent = state.participants.length;
  },

  updateCountdown() {
    const dtime = document.getElementById('header-deadline-time');
    const cdown = document.getElementById('header-countdown');
    
    dtime.textContent = formatDeadlineString(state.deadline);
    
    const now = new Date();
    const target = new Date(state.deadline);
    const diff = target - now;
    
    const builderNotice = document.getElementById('builder-locked-notice');
    const saveBtn = document.getElementById('btn-save-bet');
    const importBtn = document.getElementById('btn-import-text');
    
    if (diff <= 0) {
      cdown.textContent = "¡CERRADO! Plazo finalizado";
      cdown.style.color = "var(--color-accent)";
      
      // Lock drafting UI
      if (builderNotice) builderNotice.style.display = 'flex';
      if (saveBtn) saveBtn.disabled = true;
      if (importBtn) importBtn.disabled = true;
      
      // Disable clicks on builder team cards
      document.querySelectorAll('.team-card').forEach(card => card.style.pointerEvents = 'none');
    } else {
      if (builderNotice) builderNotice.style.display = 'none';
      if (saveBtn) saveBtn.disabled = false;
      if (importBtn) importBtn.disabled = false;
      
      // Format countdown
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      let cdStr = "";
      if (days > 0) cdStr += `${days}d `;
      cdStr += `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
      
      cdown.textContent = cdStr;
      cdown.style.color = "var(--color-secondary)";
    }
  },

  renderHeaderAndPrizes() {
    const prizes = calculatePrizes();
    
    // Format money in European Latin format: 120,00 €
    const formatMoney = (val) => val.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
    
    document.getElementById('header-total-pool').textContent = formatMoney(prizes.totalPool);
    document.getElementById('prize-pool-calculation').textContent = `${formatMoney(state.ticketPrice)} por porra`;
    
    const prizesContainer = document.getElementById('prizes-container');
    prizesContainer.innerHTML = "";
    
    if (state.participants.length === 0) {
      prizesContainer.innerHTML = `<div style="text-align: center; font-size: 0.85rem; color: var(--text-muted); padding: 1rem;">Registra participantes para ver la bolsa de premios.</div>`;
      return;
    }
    
    // 1st Prize Card
    let firstNames = prizes.firstPlaceWinners.map(p => p.name).join(', ') || "Nadie";
    let firstPrizeHTML = `
      <div class="prize-card gold-border">
        <div class="prize-info">
          <span class="prize-medal">🥇</span>
          <div>
            <div class="prize-title">1º Puesto (${prizes.hasSecondPrize ? '80%' : '100%'})</div>
            <div class="prize-percentage" style="max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${firstNames}</div>
          </div>
        </div>
        <div class="prize-amount gold-txt">${formatMoney(prizes.firstPrizePerPerson)} c/u</div>
      </div>
    `;
    prizesContainer.innerHTML += firstPrizeHTML;
    
    // 2nd Prize Card (only if not tied in 1st)
    if (prizes.hasSecondPrize) {
      let secondNames = prizes.secondPlaceWinners.map(p => p.name).join(', ') || "Nadie";
      let secondPrizeHTML = `
        <div class="prize-card">
          <div class="prize-info">
            <span class="prize-medal">🥈</span>
            <div>
              <div class="prize-title">2º Puesto (20%)</div>
              <div class="prize-percentage" style="max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${secondNames}</div>
            </div>
          </div>
          <div class="prize-amount">${formatMoney(prizes.secondPrizePerPerson)} c/u</div>
        </div>
      `;
      prizesContainer.innerHTML += secondPrizeHTML;
    } else {
      prizesContainer.innerHTML += `
        <div style="font-size: 0.75rem; color: var(--color-accent); font-style: italic; margin-top: 0.25rem;">
          * Hay empate en el 1º puesto. Según las reglas, no hay 2º premio y el total se reparte entre los ganadores.
        </div>
      `;
    }
  },

  renderBuilderTeams() {
    const renderBlock = (blockId, containerId) => {
      const container = document.getElementById(containerId);
      container.innerHTML = "";
      
      const blockTeams = TEAMS.filter(t => t.block === blockId);
      blockTeams.forEach(team => {
        const isSelected = this.selectedDraftTeams.includes(team.id);
        const card = document.createElement('div');
        card.className = `team-card ${isSelected ? 'selected' : ''}`;
        card.setAttribute('data-id', team.id);
        
        card.innerHTML = `
          <div class="team-info-top">
            <img class="flag-img" src="https://flagcdn.com/16x12/${team.code}.png" alt="${team.name} Flag">
            <span class="team-name" title="${team.name}">${team.name}</span>
          </div>
          <span class="team-price">${team.price} pts</span>
        `;
        
        // Clicks
        card.addEventListener('click', () => {
          if (isDeadlinePassed()) return;
          
          if (this.selectedDraftTeams.includes(team.id)) {
            // Remove
            this.selectedDraftTeams = this.selectedDraftTeams.filter(id => id !== team.id);
          } else {
            // Add if not exceeding max (7 teams)
            if (this.selectedDraftTeams.length >= 7) {
              this.showToast("Máximo 7 equipos seleccionados.", true);
              return;
            }
            this.selectedDraftTeams.push(team.id);
          }
          this.renderBuilderTeams();
          this.updateDraftValidations();
        });
        
        container.appendChild(card);
      });
    };
    
    renderBlock(1, 'teams-block-1');
    renderBlock(2, 'teams-block-2');
    renderBlock(3, 'teams-block-3');
    renderBlock(4, 'teams-block-4');
    
    this.updateDraftValidations();
  },

  updateDraftValidations() {
    const val = validateDraft(this.selectedDraftTeams);
    
    // Update numerical values
    document.getElementById('budget-spent-val').textContent = val.spent;
    document.getElementById('summary-price-spent').textContent = val.spent;
    document.getElementById('summary-teams-count').textContent = val.count;
    
    // Circle color classes
    const circle = document.getElementById('budget-circle-elem');
    circle.className = 'budget-circle';
    if (val.spent > 350) {
      circle.classList.add('danger');
    } else if (val.spent >= 320) {
      circle.classList.add('warning');
    } else {
      circle.classList.add('ok');
    }
    
    // Validate Budget
    const vBudget = document.getElementById('valid-budget');
    vBudget.className = `validation-item ${val.budgetValid ? 'pass' : 'fail'}`;
    vBudget.querySelector('.icon').textContent = val.budgetValid ? '✔' : '✖';
    
    // Validate Count
    const vCount = document.getElementById('valid-count');
    vCount.className = `validation-item ${val.countValid ? 'pass' : 'fail'}`;
    vCount.querySelector('.icon').textContent = val.countValid ? '✔' : '✖';
    
    // Validate Blocks
    const vBlocks = document.getElementById('valid-blocks');
    vBlocks.className = `validation-item ${val.blocksValid ? 'pass' : 'fail'}`;
    vBlocks.querySelector('.icon').textContent = val.blocksValid ? '✔' : '✖';
    
    let blocksDesc = "Al menos 1 equipo por bloque: ";
    blocksDesc += `<strong style="color:${val.hasBlock1 ? 'var(--color-primary)' : '#ef4444'}">B1</strong>, `;
    blocksDesc += `<strong style="color:${val.hasBlock2 ? 'var(--color-primary)' : '#ef4444'}">B2</strong>, `;
    blocksDesc += `<strong style="color:${val.hasBlock3 ? 'var(--color-primary)' : '#ef4444'}">B3</strong>, `;
    blocksDesc += `<strong style="color:${val.hasBlock4 ? 'var(--color-primary)' : '#ef4444'}">B4</strong>`;
    vBlocks.querySelector('span:last-child').innerHTML = blocksDesc;
  },

  renderLeaderboard() {
    const tbody = document.getElementById('leaderboard-tbody');
    tbody.innerHTML = "";
    
    const board = getLeaderboard();
    if (board.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2rem;">
            No hay porras registradas todavía. ¡Sé el primero en el menú "Hacer Porra"!
          </td>
        </tr>
      `;
      return;
    }
    
    board.forEach((p, idx) => {
      const rank = idx + 1;
      let rankClass = `rank-${rank}`;
      
      const tr = document.createElement('tr');
      tr.className = rankClass;
      
      // Flags cells
      let flagsHTML = `<div style="display:flex; gap:0.25rem; flex-wrap:wrap;">`;
      p.teamDetails.forEach(td => {
        const isEliminated = state.results.teamAchievements[td.id]?.wins === 0 && 
                             state.results.teamAchievements[td.id]?.draws === 0 && 
                             !state.results.teamAchievements[td.id]?.firstInGroup && 
                             !state.results.teamAchievements[td.id]?.secondInGroup &&
                             !state.results.teamAchievements[td.id]?.w32; // basic out check
        
        flagsHTML += `
          <div style="display:inline-flex; align-items:center; gap:0.2rem; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.05); padding:0.15rem 0.35rem; border-radius:4px; font-size:0.75rem;">
            <img src="https://flagcdn.com/16x12/${td.code}.png" class="flag-img" alt="${td.name}">
            <span>${td.name}</span>
            <span style="color:var(--color-primary); font-weight:bold;">${td.points}</span>
          </div>
        `;
      });
      flagsHTML += `</div>`;
      
      // Name & tie breaker budget display
      const scorerClass = p.isTopScorerCorrect ? 'style="color:var(--color-primary); font-weight:bold;"' : '';
      
      tr.innerHTML = `
        <td style="text-align: center;"><span class="rank-badge">${rank}</span></td>
        <td>
          <div class="player-name-cell">
            <span>${p.name}</span>
          </div>
        </td>
        <td>${flagsHTML}</td>
        <td style="text-align: center;" ${scorerClass}>
          ${p.topScorer} ${p.isTopScorerCorrect ? '⭐ (4)' : ''}
        </td>
        <td style="text-align: center;"><span class="budget-badge">${p.spent} pts</span></td>
        <td style="text-align: center;"><span class="points-badge">${p.totalPoints}</span></td>
      `;
      tbody.appendChild(tr);
    });
  },

  renderParticipants() {
    const grid = document.getElementById('participants-grid');
    grid.innerHTML = "";
    
    if (state.participants.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No hay porras cargadas. Ve a la pestaña "Hacer Porra" para empezar.</div>`;
      return;
    }
    
    state.participants.forEach((p, idx) => {
      const breakdown = getParticipantPointsBreakdown(p);
      const card = document.createElement('div');
      card.className = "participant-card";
      
      let teamsTagsHTML = "";
      breakdown.teamDetails.forEach(td => {
        teamsTagsHTML += `
          <div class="team-tag">
            <img src="https://flagcdn.com/16x12/${td.code}.png" class="flag-img" alt="${td.name}">
            <span>${td.name} (${td.price})</span>
            <span class="team-tag-points">${td.points} pts</span>
          </div>
        `;
      });
      
      const scorerHighlight = breakdown.isTopScorerCorrect 
        ? `<strong style="color:var(--color-primary);">${p.topScorer} (Acertado +4 pts)</strong>` 
        : `<strong>${p.topScorer}</strong>`;
        
      card.innerHTML = `
        <div class="participant-header">
          <div class="participant-name-title">
            <span>👤 ${p.name}</span>
          </div>
          <span class="points-badge">${breakdown.totalPoints} pts</span>
        </div>
        
        <div class="participant-details">
          <div class="detail-line">
            <span>Presupuesto Gastado:</span>
            <span><span class="budget-badge">${p.spent} / 350 pts</span></span>
          </div>
          <div class="detail-line">
            <span>Máximo Goleador:</span>
            <span>${scorerHighlight}</span>
          </div>
          <div class="detail-line" style="flex-direction: column; gap:0.5rem; margin-top:0.25rem;">
            <span>Equipos Seleccionados (${breakdown.teamDetails.length}):</span>
            <div class="teams-tag-container">${teamsTagsHTML}</div>
          </div>
        </div>
        
        <div class="actions-row" style="margin-top: 0.5rem;">
          <button class="btn btn-secondary" style="font-size:0.75rem; padding:0.4rem 0.75rem; flex:1;" onclick="appController.copyIndividualPorra(${idx})">
            📋 Copiar Formato Texto
          </button>
          <button class="btn btn-danger" style="font-size:0.75rem; padding:0.4rem 0.75rem; max-width:80px;" onclick="appController.deleteIndividualPorra(${idx})">
            Eliminar
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  },

  copyIndividualPorra(idx) {
    const p = state.participants[idx];
    if (!p) return;
    const text = exportPorraToText(p.name, p.teams, p.topScorer);
    
    navigator.clipboard.writeText(text).then(() => {
      this.showToast(`Texto de porra de ${p.name} copiado.`);
    }).catch(err => {
      this.showToast("Error al copiar: " + err, true);
    });
  },

  deleteIndividualPorra(idx) {
    const p = state.participants[idx];
    if (!p) return;
    if (confirm(`¿Seguro que deseas eliminar la porra de "${p.name}"?`)) {
      state.participants.splice(idx, 1);
      saveState();
      this.renderAll();
      this.showToast(`Porra de ${p.name} eliminada.`);
    }
  },

  renderResultsTable(filterQuery = "") {
    const tbody = document.getElementById('admin-teams-tbody');
    tbody.innerHTML = "";
    
    const query = filterQuery.toLowerCase().trim();
    const filteredTeams = TEAMS.filter(t => t.name.toLowerCase().includes(query));
    
    filteredTeams.forEach(team => {
      const ach = state.results.teamAchievements[team.id] || {};
      const tr = document.createElement('tr');
      
      tr.innerHTML = `
        <td style="display:flex; align-items:center; gap:0.4rem; font-weight:600;">
          <img src="https://flagcdn.com/16x12/${team.code}.png" class="flag-img" alt="${team.name}">
          <span>${team.name}</span>
        </td>
        <td style="text-align:center;">
          <input type="number" class="num-input" value="${ach.wins || 0}" min="0" max="3" onchange="appController.updateTeamField(${team.id}, 'wins', this.value)">
        </td>
        <td style="text-align:center;">
          <input type="number" class="num-input" value="${ach.draws || 0}" min="0" max="3" onchange="appController.updateTeamField(${team.id}, 'draws', this.value)">
        </td>
        <td class="checkbox-center">
          <input type="checkbox" ${ach.firstInGroup ? 'checked' : ''} onchange="appController.updateTeamField(${team.id}, 'firstInGroup', this.checked)">
        </td>
        <td class="checkbox-center">
          <input type="checkbox" ${ach.secondInGroup ? 'checked' : ''} onchange="appController.updateTeamField(${team.id}, 'secondInGroup', this.checked)">
        </td>
        <td class="checkbox-center">
          <input type="checkbox" ${ach.w32 ? 'checked' : ''} onchange="appController.updateTeamField(${team.id}, 'w32', this.checked)">
        </td>
        <td class="checkbox-center">
          <input type="checkbox" ${ach.w16 ? 'checked' : ''} onchange="appController.updateTeamField(${team.id}, 'w16', this.checked)">
        </td>
        <td class="checkbox-center">
          <input type="checkbox" ${ach.w8 ? 'checked' : ''} onchange="appController.updateTeamField(${team.id}, 'w8', this.checked)">
        </td>
        <td class="checkbox-center">
          <input type="checkbox" ${ach.w4 ? 'checked' : ''} onchange="appController.updateTeamField(${team.id}, 'w4', this.checked)">
        </td>
        <td class="checkbox-center">
          <input type="checkbox" ${ach.w3rd ? 'checked' : ''} onchange="appController.updateTeamField(${team.id}, 'w3rd', this.checked)">
        </td>
        <td class="checkbox-center">
          <input type="checkbox" ${ach.wFinal ? 'checked' : ''} onchange="appController.updateTeamField(${team.id}, 'wFinal', this.checked)">
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  updateTeamField(teamId, field, value) {
    if (!state.results.teamAchievements[teamId]) {
      state.results.teamAchievements[teamId] = {
        wins: 0, draws: 0, firstInGroup: false, secondInGroup: false,
        w32: false, w16: false, w8: false, w4: false, w3rd: false, wFinal: false
      };
    }
    
    // Cast values correctly
    if (field === 'wins' || field === 'draws') {
      state.results.teamAchievements[teamId][field] = parseInt(value) || 0;
    } else {
      state.results.teamAchievements[teamId][field] = !!value;
      
      // If we mark a higher round, implicitly mark lower rounds
      const ach = state.results.teamAchievements[teamId];
      if (field === 'wFinal' && value) { ach.w4 = true; ach.w8 = true; ach.w16 = true; ach.w32 = true; }
      else if (field === 'w4' && value) { ach.w8 = true; ach.w16 = true; ach.w32 = true; }
      else if (field === 'w8' && value) { ach.w16 = true; ach.w32 = true; }
      else if (field === 'w16' && value) { ach.w32 = true; }
    }
    
    saveState();
    this.renderAll();
  },

  renderBracket() {
    // 1. Get all teams that progressed to Quarterfinals (w16 is true)
    const qfTeams = TEAMS.filter(t => state.results.teamAchievements[t.id]?.w16);
    const slots = Array(8).fill(null);
    qfTeams.forEach((t, i) => { if (i < 8) slots[i] = t; });
    
    // Helper to render team in match node
    const renderNode = (elemId, team, opponent, roundKeyNext) => {
      const elem = document.getElementById(elemId);
      if (!elem) return;
      
      if (!team) {
        elem.innerHTML = `<span class="b-team-name" style="color:var(--text-muted); font-style:italic;">Por decidir</span>`;
        elem.className = "bracket-match-team";
        elem.onclick = null;
        return;
      }
      
      const ach = state.results.teamAchievements[team.id] || {};
      const isWinner = ach[roundKeyNext];
      
      elem.innerHTML = `
        <img src="https://flagcdn.com/16x12/${team.code}.png" class="flag-img" alt="${team.name}">
        <span class="b-team-name">${team.name}</span>
      `;
      elem.className = `bracket-match-team ${isWinner ? 'winner' : ''}`;
      
      if (opponent) {
        elem.onclick = () => {
          this.handleBracketClick(team.id, opponent.id, roundKeyNext);
        };
      } else {
        elem.onclick = null;
      }
    };
    
    // Quarterfinal Matches (Q1, Q2, Q3, Q4)
    // Round key next is 'w8' (progress to semifinal)
    renderNode('b-match-q1-t1', slots[0], slots[1], 'w8');
    renderNode('b-match-q1-t2', slots[1], slots[0], 'w8');
    
    renderNode('b-match-q2-t1', slots[2], slots[3], 'w8');
    renderNode('b-match-q2-t2', slots[3], slots[2], 'w8');
    
    renderNode('b-match-q3-t1', slots[4], slots[5], 'w8');
    renderNode('b-match-q3-t2', slots[5], slots[4], 'w8');
    
    renderNode('b-match-q4-t1', slots[6], slots[7], 'w8');
    renderNode('b-match-q4-t2', slots[7], slots[6], 'w8');
    
    // Semifinals (S1, S2)
    // S1: Winner Q1 vs Winner Q2
    const wQ1 = slots[0] && state.results.teamAchievements[slots[0].id]?.w8 ? slots[0] : (slots[1] && state.results.teamAchievements[slots[1].id]?.w8 ? slots[1] : null);
    const wQ2 = slots[2] && state.results.teamAchievements[slots[2].id]?.w8 ? slots[2] : (slots[3] && state.results.teamAchievements[slots[3].id]?.w8 ? slots[3] : null);
    renderNode('b-match-s1-t1', wQ1, wQ2, 'w4');
    renderNode('b-match-s1-t2', wQ2, wQ1, 'w4');
    
    // S2: Winner Q3 vs Winner Q4
    const wQ3 = slots[4] && state.results.teamAchievements[slots[4].id]?.w8 ? slots[4] : (slots[5] && state.results.teamAchievements[slots[5].id]?.w8 ? slots[5] : null);
    const wQ4 = slots[6] && state.results.teamAchievements[slots[6].id]?.w8 ? slots[6] : (slots[7] && state.results.teamAchievements[slots[7].id]?.w8 ? slots[7] : null);
    renderNode('b-match-s2-t1', wQ3, wQ4, 'w4');
    renderNode('b-match-s2-t2', wQ4, wQ3, 'w4');
    
    // Finals (Winner S1 vs Winner S2)
    const wS1 = wQ1 && state.results.teamAchievements[wQ1.id]?.w4 ? wQ1 : (wQ2 && state.results.teamAchievements[wQ2.id]?.w4 ? wQ2 : null);
    const wS2 = wQ3 && state.results.teamAchievements[wQ3.id]?.w4 ? wQ3 : (wQ4 && state.results.teamAchievements[wQ4.id]?.w4 ? wQ4 : null);
    renderNode('b-match-f-t1', wS1, wS2, 'wFinal');
    renderNode('b-match-f-t2', wS2, wS1, 'wFinal');
    
    // Third Place (Loser S1 vs Loser S2)
    // Loser is who had 'w8' (semifinalist) but not 'w4' (finalist)
    const lS1 = wQ1 && wQ1 !== wS1 ? wQ1 : (wQ2 && wQ2 !== wS1 ? wQ2 : null);
    const lS2 = wQ3 && wQ3 !== wS2 ? wQ3 : (wQ4 && wQ4 !== wS2 ? wQ4 : null);
    renderNode('b-match-t-t1', lS1, lS2, 'w3rd');
    renderNode('b-match-t-t2', lS2, lS1, 'w3rd');
  },

  handleBracketClick(winnerId, loserId, roundKey) {
    if (!state.results.teamAchievements[winnerId]) return;
    
    // Set winner
    state.results.teamAchievements[winnerId][roundKey] = true;
    
    // Set loser
    if (state.results.teamAchievements[loserId]) {
      state.results.teamAchievements[loserId][roundKey] = false;
    }
    
    // Reset subsequent stages for both to keep bracket clean
    const resetSubsequent = (teamId) => {
      const ach = state.results.teamAchievements[teamId];
      if (!ach) return;
      
      if (roundKey === 'w8') {
        ach.w4 = false;
        ach.wFinal = false;
        ach.w3rd = false;
      } else if (roundKey === 'w4') {
        ach.wFinal = false;
      }
    };
    
    resetSubsequent(winnerId);
    resetSubsequent(loserId);
    
    saveState();
    this.renderAll();
    this.showToast("Cuadro actualizado.");
  },

  showToast(message, isError = false) {
    const toast = document.getElementById('toast-notification');
    const icon = document.getElementById('toast-icon');
    const msg = document.getElementById('toast-message');
    
    icon.textContent = isError ? "⚠️" : "✓";
    msg.textContent = message;
    
    if (isError) {
      toast.classList.add('error');
    } else {
      toast.classList.remove('error');
    }
    
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  },
  
  loadMockData() {
    loadMockData(); // Delegate to global loadMockData function
    this.renderAll();
  },

  async fetchOfficialData(force = false) {
    if (this.officialDataLoaded && !force) {
      return;
    }
    
    const loadingElem = document.getElementById('official-loading');
    const errorElem = document.getElementById('official-error');
    const groupsSubtab = document.getElementById('subtab-official-groups');
    const matchesSubtab = document.getElementById('subtab-official-matches');
    
    loadingElem.style.display = 'block';
    errorElem.style.display = 'none';
    groupsSubtab.style.display = 'none';
    matchesSubtab.style.display = 'none';
    
    try {
      // Fetch teams if needed, and groups, and games in parallel
      const promises = [];
      const fetchTeams = (!this.apiTeamsMap || force);
      
      if (fetchTeams) {
        promises.push(fetch('https://worldcup26.ir/get/teams').then(r => {
          if (!r.ok) throw new Error('Error al obtener equipos de la API');
          return r.json();
        }));
      } else {
        promises.push(Promise.resolve(null));
      }
      
      promises.push(fetch('https://worldcup26.ir/get/groups').then(r => {
        if (!r.ok) throw new Error('Error al obtener clasificación de grupos');
        return r.json();
      }));
      
      promises.push(fetch('https://worldcup26.ir/get/games').then(r => {
        if (!r.ok) throw new Error('Error al obtener calendario de partidos');
        return r.json();
      }));
      
      const [teamsData, groupsData, gamesData] = await Promise.all(promises);
      
      if (fetchTeams && teamsData && Array.isArray(teamsData.teams)) {
        this.apiTeamsMap = {};
        teamsData.teams.forEach(t => {
          this.apiTeamsMap[t.id] = t;
        });
      }
      
      this.cachedGroups = (groupsData && Array.isArray(groupsData.groups)) ? groupsData.groups : [];
      this.cachedGames = (gamesData && Array.isArray(gamesData.games)) ? gamesData.games : [];
      
      this.officialDataLoaded = true;
      
      // Update update time
      const timeStr = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      document.getElementById('official-update-time').textContent = `Actualizado: ${timeStr} h`;
      
      // Render
      this.renderOfficialGroups();
      this.renderOfficialMatches();
      
      // Hide loading, show active subtab content
      loadingElem.style.display = 'none';
      const activeSubtabBtn = document.querySelector('.official-tab-subnav .sub-tab-btn.active');
      const activeSubtabId = activeSubtabBtn.getAttribute('data-subtab');
      document.getElementById(activeSubtabId).style.display = 'block';
      
    } catch (err) {
      console.error(err);
      loadingElem.style.display = 'none';
      errorElem.style.display = 'block';
      document.getElementById('official-error-msg').textContent = `Detalle: ${err.message || err}`;
    }
  },

  getSpanishTeamName(apiTeam) {
    if (!apiTeam) return "Desconocido";
    let iso2 = (apiTeam.iso2 || "").toLowerCase();
    
    if (iso2 === 'eng') iso2 = 'gb-eng';
    if (iso2 === 'sco') iso2 = 'gb-sct';
    
    const localTeam = TEAMS.find(t => t.code === iso2);
    if (localTeam) {
      return localTeam.name;
    }
    
    const translations = {
      "United States": "EEUU",
      "Bosnia and Herzegovina": "Bosnia y Hzgb.",
      "Ivory Coast": "Costa de Marfil",
      "Democratic Republic of the Congo": "RD Congo",
      "Saudi Arabia": "Arabia Saudí",
      "South Korea": "Corea del Sur",
      "Czech Republic": "Chequia",
      "Curaçao": "Curazao"
    };
    
    return translations[apiTeam.name_en] || apiTeam.name_en || "Desconocido";
  },

  translateLabel(label) {
    if (!label) return "";
    return label
      .replace(/Winner Group (\w)/gi, '1º Grupo $1')
      .replace(/Runner-up Group (\w)/gi, '2º Grupo $1')
      .replace(/Winner Match (\d+)/gi, 'Ganador P$1')
      .replace(/Loser Match (\d+)/gi, 'Perdedor P$1')
      .replace(/3rd Group (\w)\/(\w)\/(\w)\/(\w)\/(\w)/gi, '3º Gp $1/$2/$3/$4/$5')
      .replace(/Group Stage/gi, 'Fase de Grupos')
      .replace(/Round of 32/gi, 'Dieciseisavos')
      .replace(/Round of 16/gi, 'Octavos')
      .replace(/Quarterfinals/gi, 'Cuartos')
      .replace(/Semifinals/gi, 'Semifinal')
      .replace(/Third Place/gi, 'Tercer Puesto')
      .replace(/Final/gi, 'Final');
  },

  renderOfficialGroups() {
    const grid = document.getElementById('official-groups-grid');
    if (!grid) return;
    grid.innerHTML = "";
    
    if (!this.cachedGroups || this.cachedGroups.length === 0) {
      grid.innerHTML = `<div class="card" style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No hay información de grupos disponible.</div>`;
      return;
    }
    
    const sortedGroups = [...this.cachedGroups].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedGroups.forEach(g => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      
      const groupName = g.name.length === 1 ? `Grupo ${g.name}` : g.name;
      
      let html = `
        <h3 class="card-title" style="margin-bottom: 0.75rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; font-size: 1.05rem;">
          <span>${groupName}</span>
        </h3>
        <div style="overflow-x: auto;">
          <table class="group-table">
            <thead>
              <tr>
                <th style="width: 25px;">Pos</th>
                <th class="team-col">Equipo</th>
                <th style="width: 25px;">PJ</th>
                <th style="width: 20px; color: var(--color-primary);">G</th>
                <th style="width: 20px;">E</th>
                <th style="width: 20px; color: var(--color-accent);">P</th>
                <th style="width: 30px;">DG</th>
                <th style="width: 30px; font-weight: bold; color: var(--color-secondary);">Pts</th>
              </tr>
            </thead>
            <tbody>
      `;
      
      const teams = [...g.teams];
      
      teams.forEach((t, index) => {
        const apiTeam = this.apiTeamsMap[t.team_id];
        const teamName = apiTeam ? this.getSpanishTeamName(apiTeam) : `Equipo ${t.team_id}`;
        const flagUrl = apiTeam ? apiTeam.flag : "data/placeholder-flag.png";
        const posClass = (index === 0) ? 'pos-1' : (index === 1) ? 'pos-2' : '';
        
        html += `
          <tr class="${posClass}">
            <td><span class="group-pos-val">${index + 1}</span></td>
            <td class="team-col" style="font-weight: 500; white-space: nowrap;">
              <div style="display: flex; align-items: center; gap: 0.4rem;">
                <img src="${flagUrl}" alt="${teamName}" style="width: 18px; height: 12px; border-radius: 1px; object-fit: cover; box-shadow: 0 1px 2px rgba(0,0,0,0.15);">
                <span>${teamName}</span>
              </div>
            </td>
            <td>${t.mp}</td>
            <td style="font-weight: 500;">${t.w}</td>
            <td>${t.d}</td>
            <td style="font-weight: 500;">${t.l}</td>
            <td style="color: ${parseInt(t.gd) > 0 ? 'var(--color-primary)' : parseInt(t.gd) < 0 ? 'var(--color-accent)' : 'inherit'}; font-weight: 500;">
              ${parseInt(t.gd) > 0 ? '+' : ''}${t.gd}
            </td>
            <td style="font-weight: 700; color: var(--text-cyan);">${t.pts}</td>
          </tr>
        `;
      });
      
      html += `
            </tbody>
          </table>
        </div>
      `;
      
      card.innerHTML = html;
      grid.appendChild(card);
    });
  },

  renderOfficialMatches() {
    const grid = document.getElementById('official-matches-grid');
    if (!grid) return;
    grid.innerHTML = "";
    
    if (!this.cachedGames || this.cachedGames.length === 0) {
      grid.innerHTML = `<div class="card" style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">No hay partidos programados o cargados.</div>`;
      return;
    }
    
    const stageFilter = document.getElementById('filter-official-stage').value;
    const searchFilter = document.getElementById('filter-official-search').value.trim().toLowerCase();
    const playedFilter = document.getElementById('filter-official-played').checked;
    
    let filteredGames = this.cachedGames.filter(g => {
      if (stageFilter !== 'all') {
        if (stageFilter === 'group' && g.type !== 'group') return false;
        if (stageFilter === 'm1' && (g.type !== 'group' || g.matchday !== '1')) return false;
        if (stageFilter === 'm2' && (g.type !== 'group' || g.matchday !== '2')) return false;
        if (stageFilter === 'm3' && (g.type !== 'group' || g.matchday !== '3')) return false;
        if (stageFilter === 'r32' && g.type !== 'r32') return false;
        if (stageFilter === 'r16' && g.type !== 'r16') return false;
        if (stageFilter === 'qf' && g.type !== 'qf') return false;
        if (stageFilter === 'sf' && g.type !== 'sf') return false;
        if (stageFilter === 'third' && g.type !== 'third') return false;
        if (stageFilter === 'final' && g.type !== 'final') return false;
      }
      
      const homeTeam = this.apiTeamsMap[g.home_team_id];
      const awayTeam = this.apiTeamsMap[g.away_team_id];
      const homeNameSp = homeTeam ? this.getSpanishTeamName(homeTeam).toLowerCase() : (g.home_team_label || "").toLowerCase();
      const awayNameSp = awayTeam ? this.getSpanishTeamName(awayTeam).toLowerCase() : (g.away_team_label || "").toLowerCase();
      const homeNameEn = (g.home_team_name_en || "").toLowerCase();
      const awayNameEn = (g.away_team_name_en || "").toLowerCase();
      
      if (searchFilter !== "") {
        const matchSearch = homeNameSp.includes(searchFilter) || 
                            awayNameSp.includes(searchFilter) || 
                            homeNameEn.includes(searchFilter) || 
                            awayNameEn.includes(searchFilter);
        if (!matchSearch) return false;
      }
      
      if (playedFilter) {
        const finishedOrLive = g.finished === 'TRUE' || g.time_elapsed === 'finished' || g.time_elapsed === 'live';
        if (!finishedOrLive) return false;
      }
      
      return true;
    });
    
    filteredGames.sort((a, b) => {
      const dateA = new Date(a.local_date || 0);
      const dateB = new Date(b.local_date || 0);
      return dateA - dateB;
    });
    
    if (filteredGames.length === 0) {
      grid.innerHTML = `<div class="card" style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">No se encontraron partidos que coincidan con los filtros seleccionados.</div>`;
      return;
    }
    
    const parseScorersText = (scorersStr) => {
      if (!scorersStr || scorersStr === "null") return [];
      try {
        let cleaned = scorersStr.trim();
        if (cleaned.startsWith('{') && cleaned.endsWith('}')) {
          cleaned = cleaned.substring(1, cleaned.length - 1);
        }
        cleaned = cleaned.replace(/\\"/g, '"');
        const matches = [...cleaned.matchAll(/"([^"]+)"/g)].map(m => m[1]);
        if (matches.length > 0) return matches;
        return cleaned.split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(s => s !== "");
      } catch (e) {
        return [];
      }
    };
    
    filteredGames.forEach(g => {
      const card = document.createElement('div');
      const isLive = g.time_elapsed === 'live';
      const isFinished = g.finished === 'TRUE' || g.time_elapsed === 'finished';
      
      card.className = `match-card ${isFinished ? 'finished' : ''} ${isLive ? 'live' : ''}`;
      
      let statusBadgeHtml = "";
      if (isLive) {
        statusBadgeHtml = `<span class="match-status-badge status-live">En vivo</span>`;
      } else if (isFinished) {
        statusBadgeHtml = `<span class="match-status-badge status-finished">Final</span>`;
      } else {
        statusBadgeHtml = `<span class="match-status-badge status-scheduled">Programado</span>`;
      }
      
      let stageText = "";
      if (g.type === 'group') {
        stageText = `Grupo ${g.group || ""} - Jornada ${g.matchday || ""}`;
      } else {
        stageText = this.translateLabel(g.group || g.type);
      }
      
      let dateFormatted = g.local_date || "";
      try {
        const dateObj = new Date(g.local_date);
        if (!isNaN(dateObj.getTime())) {
          dateFormatted = dateObj.toLocaleDateString('es-ES', { 
            day: '2-digit', 
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          }) + ' h';
        }
      } catch (e) {}
      
      const homeTeam = this.apiTeamsMap[g.home_team_id];
      const awayTeam = this.apiTeamsMap[g.away_team_id];
      
      const homeName = homeTeam ? this.getSpanishTeamName(homeTeam) : this.translateLabel(g.home_team_label || g.home_team_name_en || "Por definir");
      const awayName = awayTeam ? this.getSpanishTeamName(awayTeam) : this.translateLabel(g.away_team_label || g.away_team_name_en || "Por definir");
      
      const homeFlag = homeTeam ? homeTeam.flag : "data/2026_FIFA_World_Cup_emblem.svg.png";
      const awayFlag = awayTeam ? awayTeam.flag : "data/2026_FIFA_World_Cup_emblem.svg.png";
      
      const showScore = isLive || isFinished;
      const scoreHtml = showScore 
        ? `<span class="match-score-display">${g.home_score} - ${g.away_score}</span>`
        : `<span class="match-score-display" style="font-size: 1.15rem; color: var(--text-muted); font-weight: 500;">vs</span>`;
      
      const homeScorersList = parseScorersText(g.home_scorers);
      const awayScorersList = parseScorersText(g.away_scorers);
      const hasScorers = homeScorersList.length > 0 || awayScorersList.length > 0;
      
      let footerHtml = "";
      if (hasScorers) {
        footerHtml = `<div class="match-card-footer">`;
        if (homeScorersList.length > 0) {
          footerHtml += `
            <div class="scorers-row">
              <span class="icon">⚽</span>
              <span class="scorers-text"><strong>${homeName}:</strong> ${homeScorersList.join(', ')}</span>
            </div>
          `;
        }
        if (awayScorersList.length > 0) {
          footerHtml += `
            <div class="scorers-row">
              <span class="icon">⚽</span>
              <span class="scorers-text"><strong>${awayName}:</strong> ${awayScorersList.join(', ')}</span>
            </div>
          `;
        }
        footerHtml += `</div>`;
      }
      
      card.innerHTML = `
        <div class="match-card-header">
          <span>${stageText}</span>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 0.7rem;">${dateFormatted}</span>
            ${statusBadgeHtml}
          </div>
        </div>
        <div class="match-card-body">
          <div class="match-team">
            <img src="${homeFlag}" alt="${homeName}" style="${!homeTeam ? 'height: 20px; opacity: 0.5; filter: grayscale(1);' : ''}">
            <span class="match-team-name" title="${homeName}">${homeName}</span>
          </div>
          
          <div class="match-score-area">
            ${scoreHtml}
            ${!showScore ? `<div class="match-time-display" style="margin-top: 0.25rem;">${dateFormatted.split(' ')[2] || ""}</div>` : ""}
          </div>
          
          <div class="match-team">
            <img src="${awayFlag}" alt="${awayName}" style="${!awayTeam ? 'height: 20px; opacity: 0.5; filter: grayscale(1);' : ''}">
            <span class="match-team-name" title="${awayName}">${awayName}</span>
          </div>
        </div>
        ${footerHtml}
      `;
      
      grid.appendChild(card);
    });
  }
};

// Global loadMockData helper referenced by appController
function loadMockData() {
  state.participants = [
    {
      name: "Eduardo",
      teams: [1, 7, 14, 26], // España, Alemania, EEUU, Escocia
      spent: 278,
      topScorer: "Valverde",
      dateSubmitted: new Date().toISOString()
    },
    {
      name: "Laura",
      teams: [2, 8, 17, 29], // Francia, Países Bajos, México, Egipto
      spent: 232,
      topScorer: "Mbappé",
      dateSubmitted: new Date().toISOString()
    },
    {
      name: "Carlos",
      teams: [4, 6, 15, 23, 31], // Brasil, Portugal, Uruguay (entry 15), Canadá, Ghana
      spent: 225,
      topScorer: "Vinícius",
      dateSubmitted: new Date().toISOString()
    },
    {
      name: "Sofía",
      teams: [5, 11, 16, 22, 37], // Argentina, Colombia, Suiza, Suecia, Costa
      spent: 161, // Argentina is now 111
      topScorer: "Messi",
      dateSubmitted: new Date().toISOString()
    },
    {
      name: "Miguel",
      teams: [3, 12, 18, 27, 30], // Inglaterra, Japón, Croacia, Bosnia y Hzgb., Chequia
      spent: 182,
      topScorer: "Kane",
      dateSubmitted: new Date().toISOString()
    }
  ];
  
  // Set some team achievements to simulate live progress
  initTeamAchievements();
  
  // España: 2 wins, 1 draw, 1st in group, win 1/32, win 1/8
  state.results.teamAchievements[1] = { wins: 2, draws: 1, firstInGroup: true, secondInGroup: false, w32: true, w16: true, w8: false, w4: false, w3rd: false, wFinal: false };
  // Alemania: 1 win, 2 draws, 2nd in group, win 1/32
  state.results.teamAchievements[7] = { wins: 1, draws: 2, firstInGroup: false, secondInGroup: true, w32: true, w16: false, w8: false, w4: false, w3rd: false, wFinal: false };
  // EEUU: 2 wins, 0 draws, 2nd in group
  state.results.teamAchievements[14] = { wins: 2, draws: 0, firstInGroup: false, secondInGroup: true, w32: false, w16: false, w8: false, w4: false, w3rd: false, wFinal: false };
  // Escocia: 0 wins, 1 draw, group out
  state.results.teamAchievements[26] = { wins: 0, draws: 1, firstInGroup: false, secondInGroup: false, w32: false, w16: false, w8: false, w4: false, w3rd: false, wFinal: false };
  
  // Francia: 3 wins, 1st in group, win 1/32, win 1/8, win 1/4 (progress to Semis)
  state.results.teamAchievements[2] = { wins: 3, draws: 0, firstInGroup: true, secondInGroup: false, w32: true, w16: true, w8: true, w4: false, w3rd: false, wFinal: false };
  // Países Bajos: 2 wins, 1st in group, win 1/32, win 1/8
  state.results.teamAchievements[8] = { wins: 2, draws: 0, firstInGroup: true, secondInGroup: false, w32: true, w16: true, w8: false, w4: false, w3rd: false, wFinal: false };
  
  // Uruguay: 3 wins, 1st in group, win 1/32, win 1/8, win 1/4, win 1/2
  state.results.teamAchievements[15] = { wins: 3, draws: 0, firstInGroup: true, secondInGroup: false, w32: true, w16: true, w8: true, w4: true, w3rd: false, wFinal: false };
  
  // Argentina: 2 wins, 1 draw, 1st in group, win 1/32, win 1/8, win 1/4, win 1/2, win Final (Champion!)
  state.results.teamAchievements[5] = { wins: 2, draws: 1, firstInGroup: true, secondInGroup: false, w32: true, w16: true, w8: true, w4: true, w3rd: false, wFinal: true };
  
  // Inglaterra: 2 wins, 1 draw, 1st in group, win 1/32, win 1/8, win 1/4 (Semifinalist, lost, won 3rd place)
  state.results.teamAchievements[3] = { wins: 2, draws: 1, firstInGroup: true, secondInGroup: false, w32: true, w16: true, w8: true, w4: false, w3rd: true, wFinal: false };

  state.results.topScorers = "Mbappé, Messi";
  state.deadline = "2026-06-11T20:30"; // Cierre hoy a las 20:30 hora de Berlín
  state.ticketPrice = 10;
  
  saveState();
  appController.showToast("Datos de demostración cargados.");
}

// Bind to window to allow global bracket click calls
window.appController = appController;

// Run Controller on page load
document.addEventListener('DOMContentLoaded', () => {
  appController.init();
});

