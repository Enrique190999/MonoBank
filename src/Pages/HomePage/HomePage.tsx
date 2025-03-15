import { useNavigate } from "react-router-dom";
import './HomePage.css'

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <h1>🏦 Banco de Monopoly Online</h1>
      <p>Administra el dinero de los jugadores de Monopoly de forma digital.</p>
      
      <button style={{marginBottom:'10px'}}onClick={() => navigate("/crear-jugador")} className="btn">
        ➕ Crear Jugador
      </button>
      <button onClick={() => navigate("/modificar-dinero")} className="btn">
        💰 Modificar Dinero
      </button>
    </div>
  );
};

export default HomePage;
