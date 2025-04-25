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

        input.value = "";

        function addMessage(text, className) {
            const msg = document.createElement("div");

            if (className === "bot-msg") {
                msg.className = className + " fade-in";
            } else {
                msg.className = className;
            }

            msg.textContent = text;
            chatBox.appendChild(msg);

            if (msg.classList.contains("fade-in")) {
                setTimeout(() => {
                    msg.classList.remove("fade-in");
                }, 500);
            }
        }


        if (quizAtivo) {
            addMessage("🛑 Responda usando os botões acima!", "bot-msg");
            input.value = "";
            return;
        }

        const comando = userMsg.toLowerCase();

        if (comando === "quiz") {
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
                    const respostaBot = data.resposta.includes("🤔 Eita!")
                        ? "🤔 Não entendi, torcedor! Tenta digitar /ajuda pra ver os comandos disponíveis!"
                        : data.resposta;

                    mostrarDigitando(respostaBot);
                } else {
                    mostrarDigitando("❌ Erro no servidor! Tente novamente mais tarde.");
                }
            } catch (error) {
                console.error(error);
                mostrarDigitando("❌ Erro de conexão. Verifique sua internet.");
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
                chatBox.scrollTo({
                    top: chatBox.scrollHeight,
                    behavior: "smooth"
                });

            };
            opcoesContainer.appendChild(botao);
        });

        chatBox.appendChild(opcoesContainer);
        chatBox.scrollTo({
            top: chatBox.scrollHeight,
            behavior: "smooth"
        });

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

            chatBox.scrollTo({
                top: chatBox.scrollHeight,
                behavior: "smooth"
            });

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
            { texto: "Quiz", comando: "quiz" }
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
        chatBox.scrollTo({
            top: chatBox.scrollHeight,
            behavior: "smooth"
        });

    }

    function mostrarDigitando(resposta) {
        const typingMsg = document.createElement("div");
        typingMsg.className = "bot-msg typing";
        typingMsg.textContent = "🐾 Panterinha está digitando";
        chatBox.appendChild(typingMsg);
        chatBox.scrollTo({
            top: chatBox.scrollHeight,
            behavior: "smooth"
        });


        let dots = 0;
        const interval = setInterval(() => {
            dots = (dots + 1) % 4;
            typingMsg.textContent = "🐾 Panterinha está digitando" + ".".repeat(dots);
        }, 500);

        const tempo = Math.min(3000, Math.max(1000, resposta.length * 50));

        setTimeout(() => {
            clearInterval(interval);
            typingMsg.remove();
            addMessage(resposta, "bot-msg");
            chatBox.scrollTo({
                top: chatBox.scrollHeight,
                behavior: "smooth"
            });

        }, tempo);
    }

});