document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("chat-form");
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    let quizAtivo = false;
    let respostaCorreta = "";

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const userMsg = input.value.trim();
        if (!userMsg) return;

        addMessage(userMsg, "user-msg");

        if (quizAtivo) {
            addMessage("🛑 Responda usando os botões acima!", "bot-msg");
            input.value = "";
            return;
        }

        const comando = userMsg.toLowerCase();

        if (comando === "quizfurioso") {
            iniciarQuiz();
        } else if (comando === "jogadores") {
            buscarJogadores();
        } else {
            try {
                const res = await fetch(`/api/resposta/${comando}`);
                const data = await res.json();
                setTimeout(() => {
                    addMessage(data.resposta, "bot-msg");
                    chatBox.scrollTop = chatBox.scrollHeight;
                }, 500);
            } catch (err) {
                addMessage("❌ Erro ao buscar resposta do servidor!", "bot-msg");
            }
        }

        input.value = "";
    });

    function iniciarQuiz() {
        quizAtivo = true;
        respostaCorreta = "b";

        const pergunta = "🐾 Qual foi o jogador da FURIA que assumiu o papel de IGL em 2023?";
        const opcoes = [
            { letra: "a", texto: "yuurih" },
            { letra: "b", texto: "FalleN" },
            { letra: "c", texto: "arT" }
        ];

        addMessage(pergunta, "bot-msg");

        const opcoesContainer = document.createElement("div");
        opcoesContainer.className = "quiz-opcoes";

        opcoes.forEach(opcao => {
            const botao = document.createElement("button");
            botao.textContent = `${opcao.letra.toUpperCase()}) ${opcao.texto}`;
            botao.onclick = () => {
                if (opcao.letra === respostaCorreta) {
                    addMessage("✅ Acertou, torcedor! FalleN assumiu o IGL em 2023.", "bot-msg");
                } else {
                    addMessage("❌ Errou! A resposta certa era o FalleN.", "bot-msg");
                }
                quizAtivo = false;
                opcoesContainer.remove();
                chatBox.scrollTop = chatBox.scrollHeight;
            };
            opcoesContainer.appendChild(botao);
        });

        chatBox.appendChild(opcoesContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function buscarJogadores() {
        try {
            const res = await fetch("/api/jogadores");
            const jogadores = await res.json();

            jogadores.forEach(jogador => {
                const card = document.createElement("div");
                card.className = "jogador-card";

                card.innerHTML = `
            <img src="${jogador.imagem}" alt="${jogador.nome}">
            <div class="info">
              <span>${jogador.nome}</span>
              <small>${jogador.funcao}</small>
            </div>
          `;

                chatBox.appendChild(card);
            });

            chatBox.scrollTop = chatBox.scrollHeight;
        } catch (error) {
            addMessage("❌ Erro ao carregar jogadores!", "bot-msg");
        }
    }

    function addMessage(text, className) {
        const msg = document.createElement("div");
        msg.className = className;
        msg.textContent = text;
        chatBox.appendChild(msg);
    }
});