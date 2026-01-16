function calcularResultado() {
    const scores = { sanguineo: 0, colerico: 0, fleumatico: 0, melancholico: 0 };
    let todasRespondidas = true;
    let respostasUsuario = {};

    // Coleta todas as respostas
    for (let i = 1; i <= 12; i++) {
        const selecionado = document.querySelector(`input[name="q${i}"]:checked`);
        if (!selecionado) {
            todasRespondidas = false;
            alert(`❌ Responda a pergunta ${i} primeiro!`);
            return;
        }
        respostasUsuario[`q${i}`] = selecionado.value;
        if (selecionado.value === 'sim') {
            if (i <= 3) scores.sanguineo++;
            else if (i <= 6) scores.colerico++;
            else if (i <= 9) scores.fleumatico++;
            else scores.melancholico++;
        }
    }

    // Encontra o temperamento dominante
    const maxScore = Math.max(...Object.values(scores));
    const temperamentosDominantes = [];
    for (let temp in scores) {
        if (scores[temp] === maxScore) {
            temperamentosDominantes.push(temp);
        }
    }

    // Gera página de resultado
    let resultadoHTML = `
        <h2>🎯 SEU RESULTADO FINAL</h2>
        <div class="temperamento-scores">
    `;

    // Mostra todos os scores
    for (let temp in scores) {
        const nome = capitalizarTemperamento(temp);
        const cor = getCorTemperamento(temp);
        resultadoHTML += `
            <div class="score-item" style="border-left-color: ${cor}">
                <strong>${nome}:</strong> ${scores[temp]}/3
            </div>
        `;
    }

    // Resultado principal
    if (temperamentosDominantes.length > 1) {
        resultadoHTML += '<p class="temperamento">🥳 <strong>TEMPERAMENTO MISTO</strong></p>';
        temperamentosDominantes.forEach(temp => {
            resultadoHTML += getDescricaoCompleta(temp, scores[temp]);
        });
    } else {
        const principal = temperamentosDominantes[0];
        resultadoHTML += `<p class="temperamento">${getEmoji(principal)} <strong>${capitalizarTemperamento(principal).toUpperCase()}</strong></p>`;
        resultadoHTML += getDescricaoCompleta(principal, scores[principal]);
    }

    resultadoHTML += `
        <p style="margin-top: 25px; font-size: 16px; color: #555;">
            💡 Este resultado ajuda no autoconhecimento. Compartilhe com seu coach!
        </p>
        <button onclick="location.reload()" style="margin-top: 20px; width: 250px;">🔄 Fazer Novo Teste</button>
    `;

    document.getElementById('resultado').innerHTML = resultadoHTML;
    document.getElementById('resultado').classList.add('mostrar');
    document.getElementById('resultado').scrollIntoView({ behavior: 'smooth' });
}

function capitalizarTemperamento(str) {
    const nomes = {
        'sanguineo': 'Sanguíneo',
        'colerico': 'Colérico', 
        'fleumatico': 'Fleumático',
        'melancholico': 'Melancólico'
    };
    return nomes[str] || str;
}

function getEmoji(temp) {
    const emojis = {
        'sanguineo': '🎉',
        'colerico': '🔥',
        'fleumatico': '🕊️',
        'melancholico': '📚'
    };
    return emojis[temp] || '🧠';
}

function getCorTemperamento(temp) {
    const cores = {
        'sanguineo': '#ff6b6b',
        'colerico': '#f7931e', 
        'fleumatico': '#4ecdc4',
        'melancholico': '#9b59b6'
    };
    return cores[temp] || '#666';
}

function getDescricaoCompleta(temp, score) {
    const descricoes = {
        sanguineo: `
            <div class="descricao-completa" style="border-top: 4px solid #ff6b6b; margin: 20px 0; padding-top: 15px;">
                <h3>🎉 SANGUÍNEO (${score}/3)</h3>
                <p><strong>Características:</strong> Sociável, animado, criativo, comunicativo</p>
                <p><strong>Talento natural:</strong> Inspirar pessoas e criar ambientes animados</p>
                <p><strong>Dica prática:</strong> Foque em metas curtas para manter a motivação</p>
            </div>
        `,
        colerico: `
            <div class="descricao-completa" style="border-top: 4px solid #f7931e; margin: 20px 0; padding-top: 15px;">
                <h3>🔥 COLÉRICO (${score}/3)</h3>
                <p><strong>Características:</strong> Líder, decidido, orientado a resultados</p>
                <p><strong>Talento natural:</strong> Motivar equipes e executar projetos</p>
                <p><strong>Dica prática:</strong> Pratique paciência para potencializar seu impacto</p>
            </div>
        `,
        fleumatico: `
            <div class="descricao-completa" style="border-top: 4px solid #4ecdc4; margin: 20px 0; padding-top: 15px;">
                <h3>🕊️ FLEUMÁTICO (${score}/3)</h3>
                <p><strong>Características:</strong> Calmo, leal, paciente, diplomático</p>
                <p><strong>Talento natural:</strong> Manter harmonia e resolver conflitos</p>
                <p><strong>Dica prática:</strong> Assuma mais iniciativa para crescer profissionalmente</p>
            </div>
        `,
        melancholico: `
            <div class="descricao-completa" style="border-top: 4px solid #9b59b6; margin: 20px 0; padding-top: 15px;">
                <h3>📚 MELANCÓLICO (${score}/3)</h3>
                <p><strong>Características:</strong> Analítico, profundo, perfeccionista</p>
                <p><strong>Talento natural:</strong> Planejamento detalhado e criatividade profunda</p>
                <p><strong>Dica prática:</strong> Equilibre detalhes com ação para melhores resultados</p>
            </div>
        `
    };
    return descricoes[temp] || '';
}
