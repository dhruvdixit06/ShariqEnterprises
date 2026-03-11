import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, CreditCard, CalendarDays, User, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './BookingFlow.css';

const BookingFlow = () => {
  const { services, addBooking } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceId: '',
    date: '',
    time: '',
    customerName: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const serviceParam = queryParams.get('service');
    if (serviceParam && services.find(s => s.id === serviceParam)) {
      setFormData(prev => ({ ...prev, serviceId: serviceParam }));
    }
  }, [location, services]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Call Context action to hit Express API
    await addBooking({
      serviceId: formData.serviceId,
      customerName: formData.customerName,
      phone: formData.phone,
      address: formData.address,
      date: formData.date,
      time: formData.time,
      paymentStatus: 'Paid'
    });
    
    setIsProcessing(false);
    setStep(4);
  };

  const selectedService = services.find(s => s.id === formData.serviceId);

  return (
    <div className="booking-page animate-fade-in bg-subtle py-6">
      <div className="container booking-container">
        
        <div className="booking-card card-clean">
          {/* Progress Tracker UC Style */}
          <div className="uc-progress">
             <div className={`uc-step ${step >= 1 ? 'active' : ''}`}>
               <span className="step-circle">1</span> Service
             </div>
             <div className="uc-line"></div>
             <div className={`uc-step ${step >= 2 ? 'active' : ''}`}>
               <span className="step-circle">2</span> Details
             </div>
             <div className="uc-line"></div>
             <div className={`uc-step ${step >= 3 ? 'active' : ''}`}>
               <span className="step-circle">3</span> Payment
             </div>
          </div>

          <div className="form-content px-6 pb-6">
            {/* STEP 1: Service Selection */}
            {step === 1 && (
              <div className="step-pane animate-fade-in">
                <h2 className="mb-4">Select Service & Slot</h2>
                <div className="input-group">
                  <label className="input-label">Service Request</label>
                  <select 
                    className="input-field" 
                    name="serviceId" 
                    value={formData.serviceId} 
                    onChange={handleChange}
                  >
                    <option value="">-- Choose a Service --</option>
                    {services.map(s => (
                      <option key={s.id} value={s.id}>{s.title} - ₹{s.price}</option>
                    ))}
                  </select>
                </div>
                
                <div className="slot-grid">
                  <div className="input-group">
                    <label className="input-label">Date</label>
                    <input 
                      type="date" 
                      className="input-field" 
                      name="date" 
                      value={formData.date} 
                      onChange={handleChange} 
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Preferred Time</label>
                    <select className="input-field" name="time" value={formData.time} onChange={handleChange}>
                       <option value="">Select Slot</option>
                       {(!formData.date || formData.date > new Date().toISOString().split('T')[0] || new Date().getHours() < 9) && (
                         <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                       )}
                       {(!formData.date || formData.date > new Date().toISOString().split('T')[0] || new Date().getHours() < 13) && (
                         <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                       )}
                       {(!formData.date || formData.date > new Date().toISOString().split('T')[0] || new Date().getHours() < 17) && (
                         <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                       )}
                    </select>
                  </div>
                </div>
                
                <div className="form-actions right pt-4">
                  <button 
                    className="btn btn-primary" 
                    onClick={nextStep}
                    disabled={!formData.serviceId || !formData.date || !formData.time}
                  >
                    Next <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Customer Details */}
            {step === 2 && (
              <div className="step-pane animate-fade-in">
                <h2 className="mb-4">Address Details</h2>
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <input type="text" className="input-field" name="customerName" value={formData.customerName} onChange={handleChange} placeholder="John Doe" />
                </div>
                <div className="input-group">
                  <label className="input-label">Phone Number</label>
                  <input type="tel" className="input-field" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 9876543210" />
                </div>
                <div className="input-group">
                  <label className="input-label">Service Address (Lucknow Only)</label>
                  <textarea className="input-field" name="address" value={formData.address} onChange={handleChange} placeholder="House no., Landmark, Lucknow, UP..." rows="3"></textarea>
                </div>
                
                <div className="form-actions split pt-4">
                  <button className="btn btn-outline" onClick={prevStep}>Back</button>
                  <button 
                    className="btn btn-primary" 
                    onClick={nextStep}
                    disabled={!formData.customerName || !formData.phone || !formData.address}
                  >
                    Proceed to Pay
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment */}
            {step === 3 && (
              <div className="step-pane animate-fade-in">
                <h2 className="mb-4">Secure Payment</h2>
                
                <div className="invoice-box mb-4">
                  <div className="invoice-header">
                     <ShieldCheck size={20} className="text-secondary" />
                     <strong>Shariq Guarantee</strong>
                  </div>
                  <div className="invoice-row pt-2">
                     <span>{selectedService?.title}</span>
                     <span>₹{selectedService?.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="invoice-row text-muted text-sm pt-1">
                     <span>Taxes & Fee</span>
                     <span>₹49</span>
                  </div>
                  <div className="invoice-row total-row pt-2 mt-2">
                     <strong>Amount to Pay</strong>
                     <strong>₹{(selectedService?.price + 49).toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <form onSubmit={handlePayment} className="payment-form">
                  <div className="input-group">
                    <label className="input-label">Card Number</label>
                    <input type="text" className="input-field" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="0000 1234 5678 9010" required />
                  </div>
                  <div className="slot-grid">
                    <div className="input-group">
                      <label className="input-label">Expiry (MM/YY)</label>
                      <input type="text" className="input-field" name="expiry" value={formData.expiry} onChange={handleChange} placeholder="12/26" required />
                    </div>
                    <div className="input-group">
                      <label className="input-label">CVV</label>
                      <input type="password" className="input-field" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" required />
                    </div>
                  </div>
                  
                  <div className="form-actions split pt-4">
                    <button type="button" className="btn btn-outline" onClick={prevStep} disabled={isProcessing}>Back</button>
                    <button type="submit" className="btn btn-primary" disabled={isProcessing}>
                      {isProcessing ? 'Processing...' : `Pay ₹${(selectedService?.price + 49).toLocaleString('en-IN')}`}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 4: Success */}
            {step === 4 && (
              <div className="step-pane animate-fade-in success-pane text-center py-6">
                <CheckCircle2 size={80} className="success-icon mb-4 mx-auto" />
                <h2 className="mb-2">Booking Confirmed!</h2>
                <p className="text-muted mb-6">
                  Thank you, {formData.customerName}. Your {selectedService?.title} has been scheduled for {formData.date}.
                </p>
                <div className="flex-center gap-4">
                  <button className="btn btn-outline" onClick={() => navigate('/services')}>Book Another</button>
                  <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
