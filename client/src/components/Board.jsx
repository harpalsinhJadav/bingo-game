import { socket } from "../socket";

export default function Board({ game, isMyTurn }) {
  const me = game.players.find(p => p.id === socket.id);

  return (
    <div className="grid grid-cols-5 gap-3 mt-4">
      {me.board.map(n => {
        const checked = me.checked.includes(n);

        return (
          <button
            key={n}
            disabled={!isMyTurn || checked}
            onClick={() =>
              socket.emit("SELECT_NUMBER", { gameId: game.id, number: n })
            }
            className={`
              w-16 h-16 rounded-lg text-lg font-bold
              transition-all duration-200
              ${checked ? "bg-green-500 text-black scale-95" : ""}
              ${!checked && isMyTurn ? "bg-slate-700 hover:bg-blue-600" : ""}
              ${!isMyTurn ? "bg-slate-800 opacity-50" : ""}
            `}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}
