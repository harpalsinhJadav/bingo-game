import { socket } from "../socket";

export default function ReadyModal({ game }) {
  const me = game.players.find((p) => p.id === socket.id);
  const readyCount = game.players.filter((p) => p.ready).length;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-xl text-center w-96">
        <h2 className="text-2xl font-bold mb-4">Ready Up</h2>

        <p className="mb-2">
          {readyCount}/{game.players.length} players ready
        </p>

        {!me.ready ? (
          <button
            className="bg-green-600 px-6 py-2 rounded"
            onClick={() => socket.emit("READY", game.id)}
          >
            I’m Ready
          </button>
        ) : (
          <p className="text-green-400">Waiting for others…</p>
        )}
      </div>
    </div>
  );
}
