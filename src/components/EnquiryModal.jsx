import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import './EnquiryModal.css';

const EnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/enquire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        // Auto close after 3 seconds
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ name: '', phone: '', email: '', serviceType: '', message: '' });
        }, 3000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send enquiry. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Is the server running?');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in card-clean">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <h2>Request a Custom Service</h2>
          <p className="text-muted">Our experts in Lucknow will get back to you shortly.</p>
        </div>

        {status === 'success' ? (
          <div className="api-status-success">
            <h3>Enquiry Sent Successfully!</h3>
            <p>We'll be in touch with you very soon.</p>
          </div>
        ) : (
          <form className="modal-body" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="name">Full Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="input-field" 
                required 
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex. Rajesh Kumar"
              />
            </div>

            <div className="input-row">
              <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label" htmlFor="phone">Phone Number *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="input-field" 
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10 digit number"
                />
              </div>

              <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label" htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="input-field" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="serviceType">Service Type *</label>
              <select 
                id="serviceType" 
                name="serviceType" 
                className="input-field" 
                required
                value={formData.serviceType}
                onChange={handleChange}
              >
                <option value="" disabled>Select a category</option>
                <option value="Commercial AC Setup">Commercial AC Setup</option>
                <option value="Cold Storage Repair">Cold Storage Repair</option>
                <option value="Bulk Appliance Servicing">Bulk Appliance Servicing</option>
                <option value="Annual Maintenance Contract (AMC)">Annual Maintenance (AMC)</option>
                <option value="Other">Other Custom Request</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="message">Message Details</label>
              <textarea 
                id="message" 
                name="message" 
                className="input-field" 
                rows="3" 
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe what you need help with..."
              ></textarea>
            </div>

            {status === 'error' && (
              <p className="text-warning mb-4">{errorMessage}</p>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : (
                <>
                  <Send size={18} /> Submit Enquiry
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;
