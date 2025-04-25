document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("chat-form");
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const respostas = {
        agenda: "🗓️ Próximo jogo da FURIA é contra a NAVI, dia 30/04 às 18h no ESL Pro League!",
        noticias: "📰 Última: KSCERATO dropou 40 kills e levou o MVP da rodada!",
        curiosidades: "🐾 Sabia que a FURIA é o time brasileiro com mais vitórias internacionais em 2023?",
        jogadores: "👥 Jogadores: KSCERATO, yuurih, arT, chelo, FalleN.",
        quizfurioso: "🎯 Ainda estou ficando afiado com quiz! Em breve, torcedor!",
        default: "🤔 Eita! Não entendi. Tenta: agenda, noticias, curiosidades, jogadores ou quizfurioso."
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const userMsg = input.value.trim();
        if (!userMsg) return;

        // Mostra a mensagem do usuário
        addMessage(userMsg, "user-msg");

        // Processa o comando (sem case sensitive)
        const comando = userMsg.toLowerCase();
        const resposta = respostas[comando] || respostas.default;

        // Resposta do Panterinha
        setTimeout(() => {
            addMessage(resposta, "bot-msg");
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 500);

        input.value = "";
    });

    function addMessage(text, className) {
        const msg = document.createElement("div");
        msg.className = className;
        msg.textContent = text;
        chatBox.appendChild(msg);
    }
});
