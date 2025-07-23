import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import PlantDetails from "./pages/PlantDetails";
import Login from "./pages/Login"; // importe o componente Login

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/plant/:id" element={<PlantDetails />} />
        <Route path="/login" element={<Login />} /> {/* rota login */}
      </Routes>
    </Router>
  );
}
