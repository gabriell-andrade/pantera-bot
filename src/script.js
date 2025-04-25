document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("chat-form");
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const userMsg = input.value.trim();
        if (!userMsg) return;

        addMessage(userMsg, "user-msg");

        try {
            const res = await fetch(`/api/resposta/${userMsg.toLowerCase()}`);
            const data = await res.json();
            setTimeout(() => {
                addMessage(data.resposta, "bot-msg");
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 500);
        } catch (err) {
            addMessage("❌ Erro ao buscar resposta do servidor!", "bot-msg");
        }

        input.value = "";
    });

    function addMessage(text, className) {
        const msg = document.createElement("div");
        msg.className = className;
        msg.textContent = text;
        chatBox.appendChild(msg);
    }
});

