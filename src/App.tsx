import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import CreatePlayerPage from './Pages/CreatePlayerPage';
import UpdateBalancePage from './Pages/UpdateBalancePage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/crear-jugador" element={<CreatePlayerPage/>} />
        <Route path="/modificar-dinero" element={<UpdateBalancePage/>} />
      </Routes>
    </Router>
  );
}

export default App
