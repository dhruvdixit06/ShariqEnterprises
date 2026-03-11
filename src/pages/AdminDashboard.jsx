import React, { useState } from 'react';
import { Settings, CalendarCheck, Users, Search, PlusCircle, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { 
    bookings, services, servicemen, assignServiceman, 
    addService, updateService, deleteService, 
    addTechnician, deleteTechnician 
  } = useAppContext();
  
  const [activeTab, setActiveTab] = useState('bookings');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showTechModal, setShowTechModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  
  // Form states
  const [serviceForm, setServiceForm] = useState({
    title: '', category: 'AC Repair', price: '', image: '', description: ''
  });
  const [techForm, setTechForm] = useState({ name: '', phone: '' });

  const filteredBookings = bookings.filter(b => 
    b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    if (editingService) {
      updateService(editingService.id, serviceForm);
    } else {
      addService(serviceForm);
    }
    setShowServiceModal(false);
    setEditingService(null);
    setServiceForm({ title: '', category: 'AC Repair', price: '', image: '', description: '' });
  };

  const handleTechSubmit = (e) => {
    e.preventDefault();
    addTechnician(techForm);
    setShowTechModal(false);
    setTechForm({ name: '', phone: '' });
  };

  const openEditService = (service) => {
    setEditingService(service);
    setServiceForm({ ...service });
    setShowServiceModal(true);
  };

  return (
    <div className="admin-page animate-fade-in">
      <div className="admin-container">
        {/* Sidebar / Tabs */}
        <aside className="admin-sidebar glass">
          <div className="sidebar-header">
            <h2>Admin Panel</h2>
          </div>
          <nav className="sidebar-nav">
            <button 
              className={`nav-btn ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              <CalendarCheck size={20} /> Manage Bookings
            </button>
            <button 
              className={`nav-btn ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              <Settings size={20} /> Catalog Services
            </button>
            <button 
              className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <Users size={20} /> Technicians
            </button>
          </nav>
        </aside>

        {/* Main Content Pane */}
        <main className="admin-content glass-card">
          {activeTab === 'bookings' && (
            <div className="tab-pane animate-fade-in">
              <div className="pane-header">
                <h2>Booking Assignments</h2>
                <div className="search-bar mini">
                  <Search size={18} className="text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search bookings..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-transparent"
                  />
                </div>
              </div>

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Customer</th>
                      <th>Service</th>
                      <th>Date / Time</th>
                      <th>Status</th>
                      <th>Assign Tech</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map(b => (
                      <tr key={b.id}>
                        <td>#{b.id}</td>
                        <td>{b.customerName}<br/><small className="text-muted">{b.phone}</small></td>
                        <td>{services.find(s => s.id === b.serviceId)?.title || 'Unknown'}</td>
                        <td>{b.date}<br/><small className="text-muted">{b.time}</small></td>
                        <td>
                          <span className={`status-badge ${b.status.toLowerCase()}`}>{b.status}</span>
                        </td>
                        <td>
                          {b.status === 'Pending' ? (
                            <div className="assign-group">
                              <select 
                                className="input-field select-sm"
                                onChange={(e) => {
                                  if(e.target.value) {
                                    assignServiceman(b.id, e.target.value);
                                  }
                                }}
                              >
                                <option value="">Select Tech...</option>
                                {servicemen.map(sm => (
                                  <option key={sm.id} value={sm.id}>{sm.name}</option>
                                ))}
                              </select>
                            </div>
                          ) : (
                            <div className="assigned-info">
                              <CheckCircle size={16} className="text-success" />
                              <span>{b.technicianName || servicemen.find(s => s.id === b.servicemanId)?.name || 'Assigned'}</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                    {filteredBookings.length === 0 && (
                      <tr>
                         <td colSpan="6" className="text-center" style={{ padding: '2rem' }}>No bookings found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="tab-pane animate-fade-in">
              <div className="pane-header">
                <h2>Service Catalog</h2>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => { setEditingService(null); setServiceForm({ title: '', category: 'AC Repair', price: '', image: '', description: '' }); setShowServiceModal(true); }}
                >
                  <PlusCircle size={16} /> Add New Service
                </button>
              </div>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Service Name</th>
                      <th>Category</th>
                      <th>Pricing</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map(s => (
                      <tr key={s.id}>
                        <td>
                           <img src={s.image} alt={s.title} className="table-thumb" />
                        </td>
                        <td><strong>{s.title}</strong></td>
                        <td><span className="category-badge table-badge">{s.category}</span></td>
                        <td>₹{s.price}</td>
                        <td>
                           <button className="btn btn-outline btn-sm" style={{ marginRight: '8px' }} onClick={() => openEditService(s)}>Edit</button>
                           <button className="btn btn-outline btn-sm text-danger" style={{ borderColor: 'var(--text-muted)'}} onClick={() => deleteService(s.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="tab-pane animate-fade-in">
              <div className="pane-header">
                <h2>Technicians Directory</h2>
                <button className="btn btn-primary btn-sm" onClick={() => setShowTechModal(true)}>
                  <PlusCircle size={16} /> Add Technician
                </button>
              </div>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Contact Number</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicemen.map(sm => (
                      <tr key={sm.id}>
                        <td>{sm.id}</td>
                        <td><strong>{sm.name}</strong></td>
                        <td>{sm.phone}</td>
                        <td>
                          <button className="btn btn-outline btn-sm text-danger" onClick={() => deleteTechnician(sm.id)}>Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODALS */}
      {showServiceModal && (
        <div className="modal-overlay" onClick={() => setShowServiceModal(false)}>
          <div className="modal-content glass-card p-6" onClick={(e) => e.stopPropagation()}>
            <h3>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
            <form onSubmit={handleServiceSubmit}>
              <div className="input-group">
                <label className="input-label">Title</label>
                <input type="text" className="input-field" value={serviceForm.title} onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})} required />
              </div>
              <div className="input-group">
                <label className="input-label">Category</label>
                <select className="input-field" value={serviceForm.category} onChange={(e) => setServiceForm({...serviceForm, category: e.target.value})}>
                  <option value="AC Repair">AC Repair</option>
                  <option value="Appliance Repair">Appliance Repair</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Plumbing & Water">Plumbing & Water</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Price (₹)</label>
                <input type="number" className="input-field" value={serviceForm.price} onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})} required />
              </div>
              <div className="input-group">
                <label className="input-label">Image URL</label>
                <input type="text" className="input-field" value={serviceForm.image} onChange={(e) => setServiceForm({...serviceForm, image: e.target.value})} placeholder="/images/..." required />
              </div>
              <div className="input-group">
                <label className="input-label">Description</label>
                <textarea className="input-field" value={serviceForm.description} onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})} rows="3" required />
              </div>
              <div className="form-actions split pt-4">
                <button type="button" className="btn btn-outline" onClick={() => setShowServiceModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingService ? 'Update' : 'Add'} Service</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showTechModal && (
        <div className="modal-overlay" onClick={() => setShowTechModal(false)}>
          <div className="modal-content glass-card p-6" onClick={(e) => e.stopPropagation()}>
            <h3>Add New Technician</h3>
            <form onSubmit={handleTechSubmit}>
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input type="text" className="input-field" value={techForm.name} onChange={(e) => setTechForm({...techForm, name: e.target.value})} required />
              </div>
              <div className="input-group">
                <label className="input-label">Phone Number</label>
                <input type="tel" className="input-field" value={techForm.phone} onChange={(e) => setTechForm({...techForm, phone: e.target.value})} required />
              </div>
              <div className="form-actions split pt-4">
                <button type="button" className="btn btn-outline" onClick={() => setShowTechModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Technician</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
