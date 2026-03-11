import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronRight, Wind, Zap, Settings, Star } from 'lucide-react';
import EnquiryModal from '../components/EnquiryModal';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchClick = () => {
    navigate('/services');
  };

  const categories = [
    { name: "AC Repair", icon: <Wind size={32}/>, img: "/images/photo_4_2026-03-09_18-08-32.jpg" },
    { name: "Fridge Repair", icon: <Zap size={32}/>, img: "/images/photo_5_2026-03-09_18-08-32.jpg" },
    { name: "Installation", icon: <Settings size={32}/>, img: "/images/photo_6_2026-03-09_18-08-32.jpg" },
    { name: "Deep Cleaning", icon: <Star size={32}/>, img: "/images/photo_7_2026-03-09_18-08-32.jpg" }
  ];

  return (
    <div className="home-page animate-fade-in">
      
      {/* Search Hero Section - Urban Company Style */}
      <section className="hero-search-section">
        <div className="container hero-search-grid">
           
           <div className="hero-search-content">
             <h1 className="hero-title">Home services, on demand.</h1>
             
             <div className="search-widget card-clean">
               <div className="location-selector">
                  <MapPin size={20} className="text-muted" />
                  <select className="location-select">
                    <option>Hazratganj, Lucknow</option>
                    <option>Gomti Nagar, Lucknow</option>
                    <option>Alambagh, Lucknow</option>
                    <option>Indira Nagar, Lucknow</option>
                  </select>
               </div>
               <div className="divider-vertical"></div>
               <div className="service-search" onClick={handleSearchClick}>
                  <Search size={20} className="text-muted" />
                  <input type="text" placeholder="Search for AC Repair, Fixing etc." className="search-input-lg" readOnly />
               </div>
             </div>

             <div className="quick-categories">
               {categories.map((cat, idx) => (
                 <Link to="/services" key={idx} className="qc-item">
                   <div className="qc-icon">
                     {cat.icon}
                   </div>
                   <span>{cat.name}</span>
                 </Link>
               ))}
             </div>
           </div>

           <div className="hero-search-image">
             <img src="/images/photo_8_2026-03-09_18-08-32.jpg" alt="Professionals at work" className="hero-splash-img" />
             <div className="rating-badge card-clean">
                <Star size={20} className="text-warning rating-star" />
                <div>
                   <strong>4.8/5</strong>
                   <span className="text-muted text-sm block">Based on 10k+ reviews</span>
                </div>
             </div>
           </div>

        </div>
      </section>

      {/* Recommended Services Section */}
      <section className="section-gray pt-6 pb-6">
        <div className="container">
          <div className="section-header">
            <h2>Most Booked Services</h2>
            <Link to="/services" className="btn btn-ghost">See All <ChevronRight size={18}/></Link>
          </div>
          
          <div className="services-row">
            {categories.map((cat, idx) => (
              <Link to="/services" key={idx} className="service-card-clean card-clean">
                 <div className="service-img-wrapper">
                    <img src={cat.img} alt={cat.name} />
                 </div>
                 <div className="service-card-body">
                   <h3>{cat.name}</h3>
                   <div className="service-meta">
                      <span className="rating"><Star size={14}/> 4.7</span>
                      <span className="text-muted">(12K)</span>
                   </div>
                   <p className="price-tag">Starts at ₹499</p>
                 </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Coolex AC Solution */}
      <section className="container pt-6 pb-6">
         <h2 className="mb-4 text-center">Why Coolex AC Solution?</h2>
         <div className="features-grid">
            <div className="feature-item">
               <img src="/images/photo_3_2026-03-09_18-08-32.jpg" alt="Transparent Pricing" className="feature-img card-clean" />
               <h3>Transparent Pricing</h3>
               <p className="text-muted">No hidden charges, ever.</p>
            </div>
            <div className="feature-item">
               <img src="/images/photo_2_2026-03-09_18-08-32.jpg" alt="Verified Experts" className="feature-img card-clean" />
               <h3>Verified Experts</h3>
               <p className="text-muted">Background checked and trained professionals.</p>
            </div>
            <div className="feature-item">
               <img src="/images/photo_9_2026-03-09_18-08-32.jpg" alt="Quality Assured" className="feature-img card-clean" />
               <h3>Quality Assured</h3>
               <p className="text-muted">We use genuine parts for all repairs.</p>
            </div>
         </div>
      </section>

      {/* Enquire / Contact Banner */}
      <section className="container mb-6 pb-4">
         <div className="contact-banner card-clean">
            <div className="contact-banner-content">
               <h2>Need a custom service?</h2>
               <p className="text-muted">Our experts in Lucknow are ready to help with specialized commercial setups or bulk orders.</p>
            </div>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
               Drop an Enquiry
            </button>
         </div>
      </section>

      {/* Enquiry Modal Component */}
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
};

export default Home;
