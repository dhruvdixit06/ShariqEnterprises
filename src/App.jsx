import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import BookingFlow from './pages/BookingFlow';
import AdminDashboard from './pages/AdminDashboard';
import Auth from './pages/Auth';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import AntiDiscrimination from './pages/AntiDiscrimination';
import { useAppContext } from './context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  if (!user || user.role !== 'admin') {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<BookingFlow />} />
            <Route 
              path="/admin" 
              element={
                 <ProtectedRoute>
                   <AdminDashboard />
                 </ProtectedRoute>
              } 
            />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/anti-discrimination" element={<AntiDiscrimination />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
