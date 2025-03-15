import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./UpdateBalancePage.css";
import { getPlayerBalance } from "../../api/Functions/getPlayerBalance";
import { updatePlayerBalance } from "../../api/Functions/updateBalance";

export const UpdateBalancePage: React.FC = () => {
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(true);

  useEffect(() => {
    if (isScanning) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10, // Velocidad de escaneo en frames por segundo
          qrbox: { width: 250, height: 250 }, // Tamaño del cuadro de escaneo
        },
        false
      );

      scanner.render(
        (decodedText: string) => {
          handleScan(decodedText);
          scanner.clear(); // Detiene el escaneo después de detectar un QR
        },
        (errorMessage: string) => {
          console.error("Error en QR Scanner:", errorMessage);
        }
      );

      return () => {
        scanner.clear();
      };
    }
  }, [isScanning]);

  const handleScan = async (data: string) => {
    if (data) {
      console.log("QR Detectado:", data);
      setIsScanning(false);

      setPlayerId(data);
      const playerBalance = await getPlayerBalance(data);

      if (playerBalance !== null) {
        setBalance(playerBalance);
        setError(null);
      } else {
        setError("Jugador no encontrado.");
        setIsScanning(true);
      }
    }
  };

  const handleUpdateBalance = async (operation: "add" | "subtract") => {
    if (!playerId || balance === null) return;

    const newBalance =
      operation === "add" ? balance + amount : Math.max(0, balance - amount);

    await updatePlayerBalance(playerId, newBalance);
    setBalance(newBalance);
    setAmount(0);
  };

  return (
    <div className="update-balance-container">
      <h2>📷 Escanea el QR del Jugador</h2>

      {isScanning && !playerId && <div id="reader"></div>}

      {error && <p className="error">{error}</p>}

      {playerId && balance !== null && (
        <div className="balance-info">
          <h3 style={{color:"#000"}}>🏦 Información del Jugador</h3>
          <p style={{color:"#000"}}><strong>ID:</strong> {playerId}</p>
          <p style={{color:"#000"}}><strong>Balance Actual:</strong> ${balance}</p>

          <input
            type="number"
            placeholder="Cantidad a modificar"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
            className="input-field"
          />

          <div className="btn-group">
            <button
              onClick={() => handleUpdateBalance("add")}
              className="btn btn-add"
            >
              ➕ Aumentar
            </button>
            <button
              onClick={() => handleUpdateBalance("subtract")}
              className="btn btn-subtract"
            >
              ➖ Disminuir
            </button>
          </div>

          <button
            className="btn btn-reset"
            onClick={() => {
              setPlayerId(null);
              setBalance(null);
              setIsScanning(true);
              setError(null);
            }}
          >
            🔄 Escanear Otro QR
          </button>
        </div>
      )}
    </div>
  );
};
