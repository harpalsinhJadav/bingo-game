import { socket } from "../socket";

export default function WinnerModal({ game }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-xl text-center w-80">
        <h2 className="text-2xl font-bold text-green-400">
          🏆 {game.winner} Wins!
        </h2>

        <div className="mt-6 flex gap-4 justify-center">
          <button
            className="px-4 py-2 bg-red-600 rounded-lg"
            onClick={() => socket.emit("EXIT_GAME", game.id)}
          >
            Exit
          </button>

          <button
            className="px-4 py-2 bg-blue-600 rounded-lg"
            onClick={() => socket.emit("REPLAY", game.id)}
          >
            Replay
          </button>
        </div>
      </div>
    </div>
  );
}