import React from 'react';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container footer-content">
        <div className="footer-section brand">
          <h3>Coolex <span className="font-light">AC Solution</span></h3>
          <p className="description text-muted">
            Your one-stop destination for professional AC installation, repair, and maintenance services in Lucknow.
          </p>
        </div>
        
        <div className="footer-section links">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/anti-discrimination">Anti-discrimination Policy</Link></li>
          </ul>
        </div>
        
        <div className="footer-section contact">
          <h4>Contact & Info</h4>
          <div className="contact-info text-muted">
            <p><MapPin size={16}/> 624 V/70 Vijaipur Near New High Court, Vibhuti Khand Gomti Nagar, Lucknow - 226010</p>
            <p><Phone size={16}/> +91 75184 81335</p>
            <p><Mail size={16}/> info.Coolexacsolution@gmail.com</p>
          </div>
        </div>

        <div className="footer-section app-links">
           <h4>Download App</h4>
           <div className="app-badges">
              <button className="btn btn-outline btn-sm">App Store</button>
              <button className="btn btn-outline btn-sm">Google Play</button>
           </div>
        </div>
      </div>
      <div className="footer-bottom container">
        <div className="social-links">
          <a href="https://www.facebook.com/Coolexacsolution" target="_blank" rel="noreferrer" className="social-icon"><Facebook size={18} /></a>
          <a href="https://x.com/Coolexac2023?t=Z-4ilRPyx-aTKqFaaKjTMw&s=09" target="_blank" rel="noreferrer" className="social-icon"><Twitter size={18} /></a>
          <a href="https://www.instagram.com/Coolex_ac_solution/" target="_blank" rel="noreferrer" className="social-icon"><Instagram size={18} /></a>
        </div>
        <p className="text-muted">&copy; {new Date().getFullYear()} Coolex AC Solution. MSME Reg | GSTIN: 09HWQPS8065AIZU | Operational in Lucknow, UP</p>
      </div>

      {/* Floating Action Button - WhatsApp */}
      <a href="https://wa.me/917518481335" target="_blank" rel="noreferrer" className="fab-whatsapp" aria-label="Chat on WhatsApp">
         <span className="fab-icon">💬</span>
      </a>
    </footer>
  );
};

export default Footer;
