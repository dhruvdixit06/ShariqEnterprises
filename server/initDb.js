import sqlite3Lib from 'sqlite3';
const sqlite3 = sqlite3Lib.verbose();
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

const init = () => {
  db.serialize(() => {
    // Create Services Table
    db.run(`CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      price INTEGER NOT NULL,
      image TEXT NOT NULL,
      description TEXT NOT NULL
    )`);

    // Create Technicians Table
    db.run(`CREATE TABLE IF NOT EXISTS technicians (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL
    )`);

    // Create Bookings Table
    db.run(`CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      customerName TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      serviceId TEXT,
      date TEXT,
      time TEXT,
      status TEXT DEFAULT 'Pending',
      paymentStatus TEXT DEFAULT 'Pending',
      servicemanId TEXT,
      FOREIGN KEY (serviceId) REFERENCES services(id),
      FOREIGN KEY (servicemanId) REFERENCES technicians(id)
    )`);

    // Clear existing data (for clean init)
    db.run(`DELETE FROM services`);
    db.run(`DELETE FROM technicians`);
    db.run(`DELETE FROM bookings`);

    // Insert Initial Services - Lucknow Focused
    const stmt = db.prepare("INSERT INTO services VALUES (?, ?, ?, ?, ?, ?)");
    
    // AC & Cooling
    stmt.run('s1', 'Split AC Installation', 'AC Repair', 1500, '/images/photo_6_2026-03-09_18-08-32.jpg', 'Professional installation including brackets & primary testing. Available anywhere in Lucknow.');
    stmt.run('s2', 'Window AC Service', 'AC Repair', 599, '/images/photo_8_2026-03-09_18-08-32.jpg', 'Deep pressure wash, filter replacement, performance check for dusty summers in UP.');
    stmt.run('s3', 'Refrigerator Gas Refill', 'Appliance Repair', 1200, '/images/photo_5_2026-03-09_18-08-32.jpg', 'Leak testing, vacuuming, and gas refill. Say goodbye to warm coolers in peak May.');
    stmt.run('s4', 'Deep AC Maintenance', 'AC Repair', 2500, '/images/photo_7_2026-03-09_18-08-32.jpg', 'Comprehensive full-scale internal maintenance. Best booked before April!');
    stmt.run('s5', 'Commercial Cold Storage Repair', 'Commercial', 5000, '/images/photo_9_2026-03-09_18-08-32.jpg', 'Diagnostics and repair for commercial units. Serving Hazratganj & Aminabad areas.');
    stmt.run('s6', 'AC PCB Board Repair', 'AC Repair', 1800, '/images/photo_1_2026-03-09_18-08-32.jpg', 'Repair or replace faulty PCB boards on-site or at our Gomti Nagar workshop.');
    stmt.run('s7', 'AC Gas Charging (Split)', 'AC Repair', 2200, 'https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=600&auto=format&fit=crop', 'Complete R32/R410 gas replacement and leak fixing by certified technicians.');
    stmt.run('s8', 'AC Uninstallation', 'AC Repair', 800, 'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=600&auto=format&fit=crop', 'Safe removal and packing of AC units for shifting houses.');
    
    // Refrigerator Services
    stmt.run('s21', 'Single Door Refrigerator Service', 'Appliance Repair', 499, 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=600&auto=format&fit=crop', 'General inspection, cleaning, and performance check for single-door units.');
    stmt.run('s22', 'Double Door Refrigerator Repair', 'Appliance Repair', 899, 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?q=80&w=600&auto=format&fit=crop', 'Fixing cooling issues, defrosting problems, and thermostat replacement.');
    stmt.run('s23', 'Refrigerator Compressor Replacement', 'Appliance Repair', 4500, 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=600&auto=format&fit=crop', 'Genuine compressor replacement with warranty for major brands.');
    stmt.run('s24', 'Side-by-Side Fridge Maintenance', 'Appliance Repair', 1500, 'https://images.unsplash.com/photo-1536353284924-9220c464e262?q=80&w=600&auto=format&fit=crop', 'Advanced diagnostic and service for premium multi-door refrigerators.');

    // Washing Machine & Appliances
    stmt.run('s9', 'Washing Machine Repair (Top Load)', 'Appliance Repair', 799, 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=600&auto=format&fit=crop', 'Drum issues, motor faults, and panel repairs handled expertly.');
    stmt.run('s10', 'Washing Machine Repair (Front Load)', 'Appliance Repair', 999, 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=600&auto=format&fit=crop', 'Water leakage, door seal issues, and electronic complaints resolved.');
    stmt.run('s11', 'Microwave Magnetron Repair', 'Appliance Repair', 550, 'https://images.unsplash.com/photo-1585659722983-38ca8e9ae9c6?q=80&w=600&auto=format&fit=crop', 'Is your food not heating? It might be the magnetron. We fix it fast.');
    stmt.run('s12', 'Geyser Installation & Repair', 'Appliance Repair', 600, 'https://images.unsplash.com/photo-1605658636186-0498a407cf1a?q=80&w=600&auto=format&fit=crop', 'Heating element repair and safe installation services. Winter essentials.');
    stmt.run('s13', 'RO Water Purifier Servicing', 'Plumbing & Water', 499, 'https://images.unsplash.com/photo-1582294451007-88544edc0b05?q=80&w=600&auto=format&fit=crop', 'Filter changes and deep cleaning ensuring safe drinking water for your family.');
    stmt.run('s14', 'RO Motherboard Replacement', 'Plumbing & Water', 1200, 'https://images.unsplash.com/photo-1558222218-b7b54eede3f3?q=80&w=600&auto=format&fit=crop', 'Complete electrical overhaul for non-starting water purifiers.');

    // Home Cleaning & Deep Services
    stmt.run('s15', 'Classic Bathroom Cleaning', 'Cleaning', 449, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop', 'Hard water stain removal, tile scrubbing, and fixture polishing.');
    stmt.run('s16', 'Sofa Deep Cleaning (3 Seater)', 'Cleaning', 850, 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=600&auto=format&fit=crop', 'Chemical shampooing and vacuum extraction of dust and allergens.');
    stmt.run('s17', 'Unfurnished Flat Cleaning (2BHK)', 'Cleaning', 2999, 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop', 'Move-in/Move-out deep cleaning covering all floors, windows, and fixtures.');
    
    // Handyman
    stmt.run('s18', 'Electrical Switchboard Repair', 'Electrician', 249, 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600&auto=format&fit=crop', 'Fixing burnt sockets, installing new switches, and resolving loose connections.');
    stmt.run('s19', 'Ceiling Fan Repair & Install', 'Electrician', 350, 'https://images.unsplash.com/photo-1616421303866-9ef0f8484dd0?q=80&w=600&auto=format&fit=crop', 'Capacitor changes, regulator fixing, and complete unboxing & installation.');
    stmt.run('s20', 'Tap or Jet Spray Replacement', 'Plumbing & Water', 199, 'https://images.unsplash.com/photo-1585058228148-932cb6833fe2?q=80&w=600&auto=format&fit=crop', 'Quick fixes for leaking taps, health faucets, and blockages.');

    stmt.finalize();

    // Insert Technicians - Localized to Lucknow
    const techStmt = db.prepare("INSERT INTO technicians VALUES (?, ?, ?)");
    techStmt.run('emp1', 'Raju Mechanic (Gomti Nagar)', '9876543211');
    techStmt.run('emp2', 'Suraj Cooling Expert (Alambagh)', '9876543222');
    techStmt.run('emp3', 'Imtiaz Ahmed (Hazratganj)', '9876543333');
    techStmt.run('emp4', 'Vikram Singh (Indira Nagar)', '9876543444');
    techStmt.run('emp5', 'Abdul Rehman (Chowk)', '9876543555');
    techStmt.run('emp6', 'Sandeep Kumar (Telibagh)', '9876543666');
    techStmt.run('emp7', 'Mohd. Farhan (Butler Colony)', '9876543777');
    techStmt.run('emp8', 'Rajesh Gupta (Rajajipuram)', '9876543888');
    techStmt.finalize();
    
    // Seed some dummy bookings to look nice in the admin dashboard
    const bookStmt = db.prepare("INSERT INTO bookings VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    bookStmt.run('b1', 'Amit Patel', '9000000001', 'B-12, Sector 4, Gomti Nagar, Lucknow', 's1', '2026-04-10', 'Morning (9 AM - 12 PM)', 'Assigned', 'Paid', 'emp1');
    bookStmt.run('b2', 'Priya Sharma', '9000000002', 'Flat 40B, Swaroop Nagar, Lucknow', 's3', '2026-04-12', 'Afternoon (1 PM - 4 PM)', 'Pending', 'Pending', null);
    bookStmt.run('b3', 'Rahul Singh', '9000000003', 'Shop 12, Aminabad Market, Lucknow', 's5', '2026-04-15', 'Evening (5 PM - 8 PM)', 'Pending', 'Paid', null);
    bookStmt.finalize();

    console.log('Database initialized successfully with Lucknow targeted seed data.');
    db.close();
  });
};

init();
