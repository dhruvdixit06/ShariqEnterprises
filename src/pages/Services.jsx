import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Star, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Services.css';

const Services = () => {
  const { services, loading } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'AC Repair', 'Refrigerator', 'Commercial'];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || service.category.includes(activeCategory.split(' ')[0]);
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
       <div className="container py-6 text-center">
          <h2>Loading Services...</h2>
       </div>
    );
  }

  return (
    <div className="services-page animate-fade-in bg-subtle py-4">
      <div className="container services-layout">
        
        {/* Sidebar Filters */}
        <aside className="services-sidebar">
           <div className="sidebar-widget card-clean">
              <h3 className="widget-title">Categories</h3>
              <ul className="cat-list">
                 {categories.map(cat => (
                   <li key={cat}>
                     <button 
                       className={`cat-btn-clean ${activeCategory === cat ? 'active' : ''}`}
                       onClick={() => setActiveCategory(cat)}
                     >
                       {cat} <ChevronRight size={16} className="text-muted" />
                     </button>
                   </li>
                 ))}
              </ul>
           </div>
        </aside>

        {/* Main Content Area */}
        <main className="services-content">
           <div className="search-header card-clean mb-4">
              <Search size={20} className="text-muted" />
              <input 
                type="text" 
                placeholder="Search for services..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input-lg w-full"
              />
           </div>

           <div className="services-list">
             {filteredServices.length === 0 ? (
               <div className="empty-state card-clean text-center py-6">
                 <h3>No services matching your criteria</h3>
                 <p className="text-muted">Try adjusting filters or search term.</p>
               </div>
             ) : (
               filteredServices.map(service => (
                 <div key={service.id} className="service-list-item card-clean pl-0">
                    <div className="service-details p-4">
                       <div className="tag-row">
                          <span className="badge-category">{service.category}</span>
                          <span className="rating-tag"><Star size={12} className="star-icon"/> 4.8 (8k)</span>
                       </div>
                       <h3 className="service-title">{service.title}</h3>
                       <p className="service-price">₹{service.price.toLocaleString('en-IN')}</p>
                       <p className="service-desc text-muted">{service.description}</p>
                       <div className="service-meta">
                          <span className="meta-item"><Clock size={16}/> 45 mins</span>
                       </div>
                    </div>
                    <div className="service-action-area">
                       <img src={service.image} alt={service.title} className="service-thumbnail" />
                       <Link to={`/booking?service=${service.id}`} className="btn btn-primary btn-sm">
                         Book
                       </Link>
                    </div>
                 </div>
               ))
             )}
           </div>
        </main>
      </div>
    </div>
  );
};

export default Services;
