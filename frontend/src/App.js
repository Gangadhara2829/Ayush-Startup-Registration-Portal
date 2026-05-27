import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import Profile from './pages/Profile';

function App(){
  const Private = ({ children }) => {
    return localStorage.getItem('token') ? children : <Navigate to="/login" />;
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Private><Dashboard/></Private>} />
        <Route path="/apply" element={<Private><ApplicationForm/></Private>} />
        <Route path="/profile" element={<Private><Profile/></Private>} />
      </Routes>
    </div>
  );
}
export default App;
