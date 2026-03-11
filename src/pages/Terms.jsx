import React from 'react';

const Terms = () => {
  return (
    <div className="static-page container animate-fade-in py-8">
      <div className="card-clean p-8">
        <h1 className="mb-6">Terms & Conditions</h1>
        
        <section className="mb-6">
          <h2 className="h4 mb-3">1. Service Acceptance</h2>
          <p className="text-muted">
            By booking a service with Coolex AC Solution, you agree to these terms and conditions. 
            All services are subject to availability and technician schedule.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="h4 mb-3">2. Pricing and Payment</h2>
          <p className="text-muted">
            Initial visit/inspection charges may apply. Any spare parts required will be charged extra 
            based on current market prices. Full payment is expected upon completion of the service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="h4 mb-3">3. Warranty</h2>
          <p className="text-muted">
            We provide a limited-time warranty on services performed and parts replaced. 
            Please check with the technician for the specific warranty duration for your repair.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="h4 mb-3">4. Customer Responsibility</h2>
          <p className="text-muted">
            The customer must provide access to the unit and ensure a safe working environment for our technicians. 
            Coolex AC Solution is not liable for issues arising from pre-existing structural faults.
          </p>
        </section>

        <p className="text-sm text-light mt-8">Last updated: March 2026</p>
      </div>
    </div>
  );
};

export default Terms;
