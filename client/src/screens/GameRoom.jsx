import Board from "../components/Board";
import ScoreBoard from "../components/ScoreBoard";
import History from "../components/History";
import WinnerModal from "../components/WinnerModal";
import ReadyModal from "../components/ReadyModal";

import { socket } from "../socket";

export default function GameRoom({ game }) {
  const me = game.players.find(p => p.id === socket.id);
  // const isMyTurn = game.players[game.turn]?.id === socket.id;
  const isMyTurn =
    game.phase === "PLAYING" &&
    game.players[game.turn]?.id === socket.id;

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 to-gray-900 text-white">

      <ScoreBoard players={game.players} turn={game.turn} />

      <div className="flex-1 p-6 flex flex-col items-center">

        {/* Turn Indicator */}
        <div className={`mb-4 px-6 py-2 rounded-full text-lg
          ${isMyTurn ? "bg-green-600" : "bg-gray-700"}`}>
          {isMyTurn ? "🎯 Your Turn" : "⏳ Waiting..."}
        </div>

        {/* Board */}
        <Board game={game} isMyTurn={isMyTurn} />

        {/* Player Info */}
        <div className="mt-4 text-center">
          <p className="text-xl font-semibold">
            Your Points: <span className="text-green-400">{me.points}</span>
          </p>
        </div>

        <button onClick={() => socket.emit("EXIT_GAME", game.id)}>
          Leave Game
        </button>

        {/* History */}
        <History history={game.history} players={game.players} />

      </div>

      {game.phase === "READY" && <ReadyModal game={game} />}
      {game.phase === "GAME_OVER" && <WinnerModal game={game} />}
    </div>
  );
}
