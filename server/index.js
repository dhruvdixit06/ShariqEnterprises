import express from 'express';
import sqlite3Lib from 'sqlite3';
const sqlite3 = sqlite3Lib.verbose();
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// GET all services
app.get('/api/services', (req, res) => {
  db.all('SELECT * FROM services', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET all technicians
app.get('/api/technicians', (req, res) => {
  db.all('SELECT * FROM technicians', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET all bookings
app.get('/api/bookings', (req, res) => {
  const query = `
    SELECT b.*, s.title as serviceName, t.name as technicianName 
    FROM bookings b
    LEFT JOIN services s ON b.serviceId = s.id
    LEFT JOIN technicians t ON b.servicemanId = t.id
    ORDER BY b.id DESC
  `;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// CREATE a booking
app.post('/api/bookings', (req, res) => {
  const { customerName, phone, address, serviceId, date, time, paymentStatus } = req.body;
  const id = 'b' + Date.now();
  
  const query = `INSERT INTO bookings (id, customerName, phone, address, serviceId, date, time, status, paymentStatus) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', ?)`;
                 
  db.run(query, [id, customerName, phone, address, serviceId, date, time, paymentStatus], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, message: 'Booking created successfully' });
  });
});

// ASSIGN a technician
app.put('/api/bookings/:id/assign', (req, res) => {
  const { id } = req.params;
  const { servicemanId } = req.body;
  
  db.run(`UPDATE bookings SET servicemanId = ?, status = 'Assigned' WHERE id = ?`, [servicemanId, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Technician assigned successfully' });
  });
});

// SERVICE CRUD
app.post('/api/services', (req, res) => {
  const { title, category, price, image, description } = req.body;
  const id = 's' + Date.now();
  db.run('INSERT INTO services (id, title, category, price, image, description) VALUES (?, ?, ?, ?, ?, ?)', 
    [id, title, category, price, image, description], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, message: 'Service added' });
  });
});

app.put('/api/services/:id', (req, res) => {
  const { id } = req.params;
  const { title, category, price, image, description } = req.body;
  db.run('UPDATE services SET title = ?, category = ?, price = ?, image = ?, description = ? WHERE id = ?', 
    [title, category, price, image, description, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Service updated' });
  });
});

app.delete('/api/services/:id', (req, res) => {
  db.run('DELETE FROM services WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Service deleted' });
  });
});

// TECHNICIAN CRUD
app.post('/api/technicians', (req, res) => {
  const { name, phone } = req.body;
  const id = 'emp' + Date.now();
  db.run('INSERT INTO technicians (id, name, phone) VALUES (?, ?, ?)', [id, name, phone], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, message: 'Technician added' });
  });
});

app.delete('/api/technicians/:id', (req, res) => {
  db.run('DELETE FROM technicians WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Technician deleted' });
  });
});

// LOGIN Endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    res.json({ success: true, user: { role: 'admin', name: 'Coolex Admin' }});
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// ENQUIRY Endpoint (Nodemailer Logic using Ethereal)
app.post('/api/enquire', async (req, res) => {
  const { name, phone, email, serviceType, message } = req.body;

  if (!name || !phone || !serviceType) {
    return res.status(400).json({ error: 'Name, Phone, and Service Type are required.' });
  }

  try {
    // Generate a test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, 
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: '"Coolex AC Solution Portal" <noreply@coolexacsolution.com>',
      to: "info.Coolexacsolution@gmail.com", // Admin gets the email
      subject: `New Custom Enquiry: ${serviceType} from ${name}`,
      html: `
        <h2>New Enquiry Received!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Service Requested:</strong> ${serviceType}</p>
        <br/>
        <h3>Message Details:</h3>
        <p>${message || 'No additional message provided.'}</p>
      `,
    });

    console.log("-----------------------------------------");
    console.log("Email Sent via Nodemailer (Ethereal test mode)");
    console.log("Message sent: %s", info.messageId);
    console.log("🚀 Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log("-----------------------------------------");

    res.json({ success: true, message: 'Enquiry sent successfully' });

  } catch (err) {
    console.error("Nodemailer Error:", err);
    res.status(500).json({ error: 'Failed to send email on the server.' });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
