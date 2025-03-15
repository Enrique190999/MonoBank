import { useState } from "react";
import { addPlayer } from "../../api/Functions/createPlayer";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import "./CreatePlayerPage.css";

export const CreatePlayerPage: React.FC = () => {
  const [name, setName] = useState("");
  const [playerData, setPlayerData] = useState<{ id: string; balance: number } | null>(null);
  const navigate = useNavigate();

  const handleAddPlayer = async () => {
    if (!name.trim()) {
      alert("Por favor, ingresa un nombre válido");
      return;
    }

    const newPlayer = await addPlayer(name);
    if (newPlayer) {
      setPlayerData({ id: newPlayer.id, balance: 1500 }); // Saldo inicial de $1500
    }
  };

  return (
    <div className="create-player-container">
      <h2>➕ Crear Nuevo Jugador</h2>
      <input
        type="text"
        placeholder="Nombre del jugador"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
      <button onClick={handleAddPlayer} className="btn">
        Crear Jugador
      </button>

      {playerData && (
        <div className="qr-container">
          <h3 style={{color:'#000'}}>📌 Datos del Jugador</h3>
          <QRCode value={playerData.id} size={150} />
          <p  style={{color:'#000'}}><strong>ID:</strong> {playerData.id}</p>
          <p style={{color:'#000'}}><strong>Balance:</strong> ${playerData.balance}</p>
        </div>
      )}

      <button onClick={() => navigate("/")} className="btn btn-secondary">
        🏠 Volver al Inicio
      </button>
    </div>
  );
};
