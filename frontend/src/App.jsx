import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import Clients from './pages/Clients';
import './index.css';

// Componente simples para proteger rotas
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('agro_token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/appointments" 
          element={
            <PrivateRoute>
              <Appointments />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/clients" 
          element={
            <PrivateRoute>
              <Clients />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;