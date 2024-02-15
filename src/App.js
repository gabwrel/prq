import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import RegistrationPage from './components/RegisterPage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
