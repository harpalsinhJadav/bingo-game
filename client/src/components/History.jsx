export default function History({ history, players }) {
  const getName = id => players.find(p => p.id === id)?.name;

  return (
    <div className="mt-6 w-full max-w-md bg-black/30 p-4 rounded-lg">
      <h3 className="text-lg mb-2">📜 History</h3>

      <div className="max-h-40 overflow-y-auto space-y-1 text-sm">
        {history.slice().reverse().map((h, i) => (
          <div key={i} className="flex justify-between text-gray-300">
            <span>{getName(h.player)}</span>
            <span className="text-blue-400">{h.number}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
