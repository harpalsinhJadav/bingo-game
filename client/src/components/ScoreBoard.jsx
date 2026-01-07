export default function ScoreBoard({ players, turn }) {
  return (
    <div className="w-64 bg-black/40 backdrop-blur-md p-4 border-r border-white/10">
      <h2 className="text-xl font-bold mb-4">🏆 Players</h2>

      {players.map((p, i) => (
        <div
          key={p.id}
          className={`flex justify-between items-center p-2 rounded mb-2
            ${turn === i ? "bg-green-600/30" : "bg-white/5"}`}
        >
          <span>{p.name}</span>
          <span className="font-bold">{p.points}</span>
        </div>
      ))}
    </div>
  );
}
