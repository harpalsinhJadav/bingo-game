const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const game = require("./gameManager");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://bingo-game-pyz.vercel.app"],
    credentials: true,
  })
);

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

// const io = new Server(server, { cors: { origin: "*" } });
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://bingo-game-pyz.vercel.app", // 👈 YOUR ACTUAL VERCEL URL
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

io.on("connection", (socket) => {
  socket.on("CREATE_GAME", ({ name }) => {
    const g = game.createGame(socket.id, name);
    socket.join(g.id);
    socket.emit("GAME_UPDATE", g);
  });

  socket.on("JOIN_GAME", ({ gameId, name }) => {
    const g = game.joinGame(gameId, socket.id, name);
    if (g) {
      socket.join(gameId);
      io.to(gameId).emit("GAME_UPDATE", g);
    }
  });

  socket.on("GET_GAMES", () => {
    socket.emit("GAMES_LIST", game.getAvailableGames());
  });

  socket.on("SET_BOARD", ({ gameId, board }) => {
    game.setBoard(gameId, socket.id, board);
  });

  socket.on("START_GAME", (gameId) => {
    const g = game.startGame(gameId);
    io.to(gameId).emit("GAME_UPDATE", g);
  });

  socket.on("SELECT_NUMBER", ({ gameId, number }) => {
    const g = game.selectNumber(gameId, socket.id, number);
    io.to(gameId).emit("GAME_UPDATE", g);
    if (g.winner) io.to(gameId).emit("GAME_OVER", g);
  });

  socket.on("READY", (gameId) => {
    const g = game.setReady(gameId, socket.id);
    io.to(gameId).emit("GAME_UPDATE", g);
  });

  socket.on("REPLAY", (gameId) => {
    const g = game.replayGame(gameId);
    io.to(gameId).emit("GAME_UPDATE", g);
  });

  socket.on("EXIT_GAME", (gameId) => {
    socket.leave(gameId);

    const g = game.exitGame(gameId, socket.id);

    if (g) {
      io.to(gameId).emit("GAME_UPDATE", g);
    }
  });
});

server.listen(PORT, () => console.log("Server running on", PORT));
