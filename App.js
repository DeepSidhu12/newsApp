import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import News from './components/News';
import Upload from './components/Upload';
import './App.css'; // Optional, for general styling

function App() {
  const token = localStorage.getItem('token'); // Check for token to determine if the user is logged in

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={token ? <Navigate to="/news" /> : <Login />} />
        <Route path="/news" element={token ? <News /> : <Navigate to="/login" />} />
        <Route path="/upload" element={token ? <Upload /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
