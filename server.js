const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve os arquivos das pastas public e src
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// API
app.get('/api/resposta/:comando', (req, res) => {
    const comando = req.params.comando.toLowerCase();

    const respostas = {
        agenda: "🗓️ Próximo jogo da FURIA é contra a NAVI, dia 30/04 às 18h no ESL Pro League!",
        noticias: "📰 Última: KSCERATO dropou 40 kills e levou o MVP da rodada!",
        curiosidades: "🐾 Sabia que a FURIA é o time brasileiro com mais vitórias internacionais em 2023?",
        jogadores: "👥 Jogadores: KSCERATO, yuurih, arT, chelo, FalleN.",
        quizfurioso: "🎯 Ainda estou ficando afiado com quiz! Em breve, torcedor!"
    };

    const resposta = respostas[comando] || "🤔 Eita! Não entendi. Tenta: agenda, noticias, curiosidades, jogadores ou quizfurioso.";
    res.json({ resposta });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🔥 Panterinha rodando em http://localhost:${PORT}`);
});