import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registro from "./components/Registro";
import Home from "./components/Home"; // Asegúrate de importar el componente Home

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} /> {/* Ruta para la página Home */}
      </Routes>
    </Router>
  );
};

export default App;



