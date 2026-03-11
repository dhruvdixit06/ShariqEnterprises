import React from 'react';
import { ShieldAlert } from 'lucide-react';

const AntiDiscrimination = () => {
  return (
    <div className="static-page container animate-fade-in py-8">
      <div className="card-clean p-8">
        <div className="flex items-center gap-4 mb-6">
           <ShieldAlert size={36} className="text-primary" />
           <h1 className="m-0">Anti-discrimination Policy</h1>
        </div>

        <p className="text-lg fw-600 mb-6">
          Coolex AC Solution is committed to providing a safe and respectful environment for all our customers and technicians.
        </p>

        <section className="mb-6">
          <h2 className="h4 mb-3">Our Principles</h2>
          <p className="text-muted">
            We follow a zero-tolerance policy against any form of discrimination based on religion, caste, 
            race, gender, sexual orientation, or age.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="h4 mb-3">For Customers</h2>
          <p className="text-muted">
            Our technicians should be treated with dignity and respect. We reserve the right to 
            cancel or refuse service if our staff is subjected to discriminatory behavior.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="h4 mb-3">For Technicians</h2>
          <p className="text-muted">
            Every technician is expected to provide top-quality service without bias. 
            Any reported instance of discrimination by our staff is strictly investigated.
          </p>
        </section>

        <div className="card-clean bg-muteted p-4 border-l-4 border-primary mt-8">
           <p className="mb-0 text-sm italic">
             "Equality and respect are the foundations of our service excellence in Lucknow."
           </p>
        </div>
      </div>
    </div>
  );
};

export default AntiDiscrimination;
