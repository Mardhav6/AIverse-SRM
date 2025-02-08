import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Campus from './pages/Campus';
import Events from './pages/Events';
import Hostel from './pages/Hostel';
import AIChatbot from './components/AIChatbot';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/campus" element={<Campus />} />
              <Route path="/events" element={<Events />} />
              <Route path="/hostel" element={<Hostel />} />
            </Routes>
          </main>
          <AIChatbot />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App