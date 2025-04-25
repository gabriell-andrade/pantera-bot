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

app.get('/api/jogadores', (req, res) => {
    const jogadores = [
        {
            nome: "FalleN",
            funcao: "AWPer / IGL",
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvXNgzxULclQb8wD9d2Hm9a2IiLaUSGc3ig&s"
        },
        {
            nome: "KSCERATO",
            funcao: "Rifler",
            imagem: "https://www.pichauarena.com.br/wp-content/uploads/2023/10/53121723398-03c4ee3bf8-k.webp"
        },
        {
            nome: "yuurih",
            funcao: "Entry Fragger",
            imagem: "https://img-cdn.hltv.org/gallerypicture/bYMuSN5JqlLZ2hiATnzmwA.jpg?ixlib=java-2.1.0&w=1200&s=f3902ec594d8794a4a9771c73af934db"
        },
        {
            nome: "chelo",
            funcao: "Support",
            imagem: "https://s2-ge.glbimg.com/y3O_LUXmJ17KOcA9VMFjescduKQ=/0x0:1200x675/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/R/e/xdtZZUQOSGhxUJsQKMMg/chelo-imperial.jpg"
        },
        {
            nome: "arT",
            funcao: "Iniciador / Entry",
            imagem: "https://static.draft5.gg/news/2021/10/30124405/FURIA-arT-PGL-Major-Stockholm-2021.jpg"
        }
    ];


    res.json(jogadores);
});

app.listen(PORT, () => {
    console.log(`🔥 Panterinha rodando em http://localhost:${PORT}`);
});

