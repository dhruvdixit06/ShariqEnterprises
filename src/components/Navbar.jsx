import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wind, Search, Calendar, ShieldCheck, Moon, Sun, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAppContext();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      return !prev;
    });
  };

  return (
    <header className="navbar-container">
      <nav className="navbar container">
        <Link to="/" className="nav-logo">
          <Wind size={24} className="logo-icon" />
          <span className="logo-text">Coolex<span className="font-light">ACSolution</span></span>
        </Link>
        
        <div className="nav-search">
           <Search size={18} className="search-icon text-muted" />
           <input type="text" placeholder="Search for 'AC Repair' or 'Cleaning'..." className="search-input" />
        </div>

        <div className="nav-actions">
           <Link to="/services" className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}>Services</Link>
           <Link to="/booking" className={`nav-link ${location.pathname === '/booking' ? 'active' : ''}`}>
             <Calendar size={18} /> Book
           </Link>
           {user && (
             <Link to="/admin" className="nav-link text-muted">
                <ShieldCheck size={18} /> Admin
             </Link>
           )}
           <button onClick={toggleTheme} className="theme-toggle-btn">
             {isDark ? <Sun size={18} /> : <Moon size={18} />}
           </button>
           {user ? (
             <button onClick={logout} className="btn btn-outline btn-sm ml-2">
               <LogOut size={16} /> Logout
             </button>
           ) : (
             <Link to="/auth" className="btn btn-primary btn-sm ml-2">
               Login
             </Link>
           )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
