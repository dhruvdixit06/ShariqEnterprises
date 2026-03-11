import React from 'react';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="static-page container animate-fade-in py-8">
      <div className="card-clean p-8">
        <h1 className="mb-4">About Coolex AC Solution</h1>
        <p className="text-lg mb-6">
          Coolex AC Solution is your one-stop destination for all air conditioning services in Lucknow, 
          including installation, repair, maintenance, and gas refilling.
        </p>

        <section className="mb-8">
          <h2 className="h3 mb-4">Our Commitment</h2>
          <p className="text-muted">
            At Coolex AC Solution, we understand the importance of a well-functioning air conditioner, 
            especially in India’s extreme weather conditions. We are committed to offering professional, 
            timely, and affordable solutions tailored to your needs.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">Why Choose Us?</h2>
          <ul className="feature-list">
            <li><CheckCircle size={18} className="text-primary" /> <strong>Professional Experts</strong>: Our technicians are highly trained and certified.</li>
            <li><CheckCircle size={18} className="text-primary" /> <strong>Timely Service</strong>: We value your time and aim for same-day resolution.</li>
            <li><CheckCircle size={18} className="text-primary" /> <strong>Affordable Pricing</strong>: High-quality service at competitive market rates.</li>
            <li><CheckCircle size={18} className="text-primary" /> <strong>Genuine Parts</strong>: We only use authorized spare parts for all repairs.</li>
          </ul>
        </section>

        <section className="contact-summary card-clean bg-subtle p-6">
          <h2 className="h4 mb-4">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="flex items-center gap-3">
                <MapPin size={20} className="text-primary" />
                <span className="text-sm">Gomti Nagar, Lucknow</span>
             </div>
             <div className="flex items-center gap-3">
                <Phone size={20} className="text-primary" />
                <span className="text-sm">+91 75184 81335</span>
             </div>
             <div className="flex items-center gap-3">
                <Mail size={20} className="text-primary" />
                <span className="text-sm">info.Coolexacsolution@gmail.com</span>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
