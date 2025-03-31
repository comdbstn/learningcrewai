import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Service from './pages/Service';
import LearningPath from './pages/LearningPath';
import Community from './pages/Community';
import Support from './pages/Support';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/service" element={<Service />} />
            <Route path="/learning-path" element={<LearningPath />} />
            <Route path="/community" element={<Community />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;