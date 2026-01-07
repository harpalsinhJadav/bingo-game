const games = {};

const generateBoard = () =>
  [...Array(25)].map((_, i) => i + 1).sort(() => Math.random() - 0.5);

exports.createGame = (id, name) => {
  const gameId = Math.random().toString(36).slice(2, 7);
  games[gameId] = {
    id: gameId,
    players: [
      {
        id,
        name,
        board: generateBoard(),
        checked: [],
        points: 0,
        ready: false,
      },
    ],
    phase: "READY", // READY | PLAYING | GAME_OVER
    turn: 0,
    history: [],
    winner: null,
  };
  return games[gameId];
};

exports.joinGame = (gameId, id, name) => {
  const g = games[gameId];
  if (!g || g.players.length >= 10) return null;

  g.players.push({
    id,
    name,
    board: generateBoard(),
    checked: [],
    points: 0,
    ready: false,
  });

  g.phase = "READY"; // ensure ready modal shows

  return g;
};

exports.setReady = (gameId, playerId) => {
  const g = games[gameId];
  const p = g.players.find((p) => p.id === playerId);
  if (!p) return g;

  p.ready = true;

  if (g.players.every((p) => p.ready)) {
    g.phase = "PLAYING";
    g.turn = 0;
  } else {
    g.phase = "READY";
  }

  return g;
};

exports.replayGame = (gameId) => {
  const g = games[gameId];
  g.players.forEach((p) => {
    p.checked = [];
    p.points = 0;
    p.ready = false;
    p.board = generateBoard();
  });

  g.phase = "READY";
  g.turn = 0;
  g.history = [];
  g.winner = null;

  return g;
};

exports.exitGame = (gameId, playerId) => {
  const g = games[gameId];
  if (!g) return null;

  g.players = g.players.filter((p) => p.id !== playerId);

  if (g.players.length === 0) {
    delete games[gameId];
    return null;
  }

  g.turn = g.turn % g.players.length;
  return g;
};

exports.setBoard = (gameId, id, board) => {
  const p = games[gameId].players.find((p) => p.id === id);
  if (p) p.board = board;
};

exports.startGame = (gameId) => {
  games[gameId].started = true;
  return games[gameId];
};

exports.selectNumber = (gameId, id, number) => {
  const g = games[gameId];
  if (!g || g.phase !== "PLAYING") return g;

  g.history.push({ player: id, number });

  g.players.forEach((p) => {
    if (p.board.includes(number)) {
      if (!p.checked.includes(number)) {
        p.checked.push(number);
      }
      p.points = calcPoints(p);
      if (p.points >= 5 && !g.winner) {
        g.winner = p.name;
        g.phase = "GAME_OVER";
      }
    }
  });

  g.turn = (g.turn + 1) % g.players.length;
  return g;
};

function calcPoints(p) {
  let pts = 0;
  for (let i = 0; i < 5; i++) {
    if (p.board.slice(i * 5, i * 5 + 5).every((n) => p.checked.includes(n)))
      pts++;
    if (
      [0, 1, 2, 3, 4]
        .map((x) => p.board[i + x * 5])
        .every((n) => p.checked.includes(n))
    )
      pts++;
  }
  if ([0, 6, 12, 18, 24].every((i) => p.checked.includes(p.board[i]))) pts++;
  if ([4, 8, 12, 16, 20].every((i) => p.checked.includes(p.board[i]))) pts++;
  return pts;
}

exports.getAvailableGames = () => {
  return Object.values(games).map((g) => ({
    id: g.id,
    players: g.players.length,
    started: g.started,
  }));
};

exports.getGames = () => games;
