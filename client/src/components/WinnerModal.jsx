import { socket } from "../socket";

export default function WinnerModal({ game }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-xl text-center w-96">

        <h1 className="text-3xl font-bold mb-2">🎉 {game.winner}</h1>
        <p className="mb-6">Wins the game!</p>

        <div className="flex gap-4">
          <button
            className="flex-1 bg-slate-900 py-2 rounded"
            onClick={() => socket.emit("EXIT_GAME", game.id)}
          >
            Exit
          </button>

          <button
            className="flex-1 bg-blue-700 py-2 rounded"
            onClick={() => socket.emit("REPLAY", game.id)}
          >
            Replay
          </button>
        </div>
      </div>
    </div>
  );
}
