const API_URL = "http://localhost:3000";
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
        } else if (comando === "ajuda" || comando === "/ajuda" || comando === "help") {
            mostrarAjuda();
        } else {
            try {
                const res = await fetch(`${API_URL}/api/resposta/${comando}`);
                const data = await res.json();

                if (res.ok) {
                    if (data.resposta.includes("🤔 Eita!")) {
                        addMessage("🤔 Não entendi, torcedor! Tenta digitar /ajuda pra ver os comandos disponíveis!", "bot-msg");
                    } else {
                        addMessage(data.resposta, "bot-msg");
                    }
                    chatBox.scrollTop = chatBox.scrollHeight;
                } else {
                    addMessage("❌ Erro no servidor! Tente novamente mais tarde.", "bot-msg");
                }
            } catch (error) {
                console.error(error);
                addMessage("❌ Erro de conexão. Verifique sua internet.", "bot-msg");
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

    function mostrarAjuda() {
        const msg = document.createElement("div");
        msg.className = "bot-msg";
        msg.textContent = "📋 Comandos disponíveis:";
        chatBox.appendChild(msg);

        const botoes = [
            { texto: "Agenda", comando: "agenda" },
            { texto: "Notícias", comando: "noticias" },
            { texto: "Curiosidades", comando: "curiosidades" },
            { texto: "Jogadores", comando: "jogadores" },
            { texto: "Quiz", comando: "quizfurioso" }
        ];

        const container = document.createElement("div");
        container.className = "ajuda-botoes";

        botoes.forEach(btn => {
            const botao = document.createElement("button");
            botao.textContent = btn.texto;
            botao.onclick = () => {
                input.value = btn.comando;
                form.dispatchEvent(new Event("submit"));
            };
            container.appendChild(botao);
        });

        chatBox.appendChild(container);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

});