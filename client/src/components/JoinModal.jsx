export default function JoinModal({ games, onClose, onJoin }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-lg w-96">

        <h2 className="text-xl mb-4 font-bold">Available Games</h2>

        {games.length === 0 && (
          <p className="text-gray-400">No active rooms</p>
        )}

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {games.map(g => (
            <button
              key={g.id}
              disabled={g.players >= 10}
              onClick={() => onJoin(g.id)}
              className={`
                w-full flex justify-between items-center p-3 rounded
                ${g.players >= 10
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-slate-700 hover:bg-blue-600"}
              `}
            >
              <span>Room: {g.id}</span>
              <span>{g.players}/10</span>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-600 py-2 rounded"
        >
          Close
        </button>

      </div>
    </div>
  );
}
