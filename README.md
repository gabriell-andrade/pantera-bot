# 🐾 Pantera Bot - API da FURIA Esports

Este projeto é uma API Node.js simples que simula um bot da FURIA Esports. Ele responde a comandos como "agenda", "notícias", "jogadores" e outros, retornando mensagens personalizadas para torcedores da FURIA.

---

## 🚀 Funcionalidades

- API REST com respostas pré-definidas sobre:
  - Agenda de jogos
  - Notícias recentes
  - Curiosidades sobre a FURIA
  - Lista de jogadores
- Servidor Express com rotas públicas
- Simulação de um bot interativo para fãs

---

## 📡 Endpoints disponíveis

### `GET /api/resposta/:comando`

Comandos suportados:
- `agenda`
- `noticias`
- `curiosidades`
- `jogadores`
- `quizfurioso`

Retorna uma mensagem temática relacionada ao comando.

---

### `GET /api/jogadores`

Retorna um array JSON com os jogadores da FURIA, incluindo:
- Nome
- Função
- Link de imagem

---

## 🛠 Tecnologias

- Node.js
- Express
- JavaScript (back-end)

---

## 💻 Como executar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/gabriell-andrade/CadastroDeNinjas.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   node server.js
   ```

4. Acesse no navegador:
   ```
   http://localhost:3000/api/resposta/agenda
   ```

---

## 🧠 Aprendizados

- Criação de APIs REST com Express
- Rotas dinâmicas com parâmetros (`req.params`)
- Respostas JSON simuladas para consumo externo
- Estrutura básica de um bot HTTP com respostas automáticas

---

## 👥 Colaboradores

| [<img src="https://avatars.githubusercontent.com/u/128552944?v=4" width="80"><br><sub>Gabriel Andrade</sub>](https://github.com/gabriell-andrade) |
|:--:|

---

## 📜 Licença

Este projeto está licenciado sob a licença MIT.
