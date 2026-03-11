import React from 'react';

const Privacy = () => {
  return (
    <div className="static-page container animate-fade-in py-8">
      <div className="card-clean p-8">
        <h1 className="mb-6">Privacy Policy</h1>
        
        <p className="text-muted mb-6">
          At Coolex AC Solution, we take your privacy seriously. This policy describes how we collect, 
          use, and protect your personal information.
        </p>

        <section className="mb-6">
          <h2 className="h4 mb-3">What We Collect</h2>
          <p className="text-muted">
            We collect your name, phone number, address, and email when you book a service or make an enquiry. 
            This information is used strictly to provide the requested services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="h4 mb-3">Data Usage</h2>
          <p className="text-muted">
            Your data is shared only with the assigned technician for service fulfillment. 
            We do not sell or lease your personal information to third parties.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="h4 mb-3">Security</h2>
          <p className="text-muted">
            We implement industry-standard security measures to protect your information from unauthorized access.
          </p>
        </section>

        <p className="text-sm text-light mt-8">Last updated: March 2026</p>
      </div>
    </div>
  );
};

export default Privacy;
