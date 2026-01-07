import { useEffect, useState } from "react";
import { socket } from "../socket";
import GameRoom from "./GameRoom";
import JoinModal from "../components/JoinModal";


export default function Lobby() {
  const [name, setName] = useState("");
  const [game, setGame] = useState(null);
  const [showJoin, setShowJoin] = useState(false);
  const [games, setGames] = useState([]);

  useEffect(() => {
    socket.on("GAME_UPDATE", setGame);
    socket.on("GAMES_LIST", setGames);

    return () => {
      socket.off("GAME_UPDATE");
      socket.off("GAMES_LIST");
    };
  }, []);

  if (game) return <GameRoom game={game} />;

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-white gap-4">

      <input
        className="p-2 rounded text-black w-64"
        placeholder="Enter your name"
        onChange={e => setName(e.target.value)}
      />

      <button
        className="bg-green-600 px-6 py-2 rounded"
        onClick={() => socket.emit("CREATE_GAME", { name })}
      >
        Create Game
      </button>

      <button
        className="bg-blue-600 px-6 py-2 rounded"
        onClick={() => {
          socket.emit("GET_GAMES");
          setShowJoin(true);
        }}
      >
        Join Game
      </button>

      {showJoin && (
        <JoinModal
          games={games}
          onClose={() => setShowJoin(false)}
          onJoin={gameId =>
            socket.emit("JOIN_GAME", { gameId, name })
          }
        />
      )}
    </div>
  );
}
