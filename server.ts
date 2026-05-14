
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';

// const app = express();

// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:3000'],
//   credentials: true
// }));
// app.use(express.json());

// const MONGO_URI = 'mongodb+srv://astackadmin:Astack%40123@astacksolution.ojvtjuq.mongodb.net/astacksolutions?retryWrites=true&w=majority&appName=Astacksolution';

// // Admin Schema
// const adminSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   role: String,
//   name: String,
//   createdAt: Date
// });

// const Admin = mongoose.model('Admin', adminSchema);

// mongoose.connect(MONGO_URI)
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.log('❌ MongoDB Error:', err.message));

// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK' });
// });

// // Admin Login Route - Database se check
// app.post('/api/admin/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log('Login attempt:', email);
  
//   try {
//     // Find admin in database
//     const admin = await Admin.findOne({ email: email });
//     console.log('Found admin:', admin ? 'Yes' : 'No');
    
//     if (admin) {
//       // Check password (plain text comparison for now)
//       if (admin.password === password) {
//         console.log('✅ Login successful for:', email);
//         res.json({ 
//           token: 'admin_token_' + Date.now(),
//           admin: { 
//             email: admin.email, 
//             name: admin.name || 'Admin' 
//           }
//         });
//       } else {
//         console.log('❌ Wrong password for:', email);
//         res.status(401).json({ message: 'Invalid email or password' });
//       }
//     } else {
//       console.log('❌ Admin not found:', email);
//       res.status(401).json({ message: 'Admin not found' });
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Contact routes
// app.get('/api/contact', async (req, res) => {
//   try {
//     const contactSchema = new mongoose.Schema({
//       name: String, email: String, phone: String, 
//       service: String, message: String, createdAt: Date
//     });
//     const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     res.json(contacts);
//   } catch (err) {
//     res.json([]);
//   }
// });

// app.post('/api/contact', async (req, res) => {
//   res.status(201).json({ message: 'Contact saved' });
// });

// // Projects routes
// app.get('/api/projects', async (req, res) => {
//   try {
//     const projectSchema = new mongoose.Schema({
//       title: String, category: String, imageUrl: String, description: String
//     });
//     const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
//     const projects = await Project.find();
//     res.json(projects);
//   } catch (err) {
//     res.json([]);
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📡 Admin login: POST http://localhost:${PORT}/api/admin/login`);
// });
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

const MONGO_URI = 'mongodb+srv://astackadmin:Astack%40123@astacksolution.ojvtjuq.mongodb.net/astacksolutions?retryWrites=true&w=majority&appName=Astacksolution';

// ============ MODELS ============

// Admin Schema
const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
  name: String,
  createdAt: { type: Date, default: Date.now }
});
const Admin = mongoose.model('Admin', adminSchema);

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// Project Schema
const projectSchema = new mongoose.Schema({
  title: String,
  category: String,
  imageUrl: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});
const Project = mongoose.model('Project', projectSchema);

// ============ CONNECT TO MONGODB ============

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err.message));

// ============ ROUTES ============

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Admin Login Route
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email);
  
  try {
    const admin = await Admin.findOne({ email: email });
    
    if (admin && admin.password === password) {
      console.log('✅ Login successful for:', email);
      res.json({ 
        token: 'admin_token_' + Date.now(),
        admin: { email: admin.email, name: admin.name || 'Admin' }
      });
    } else {
      console.log('❌ Login failed for:', email);
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/contact - Get all contacts (No auth for testing)
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    console.log(`📋 Found ${contacts.length} contacts`);
    res.json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ message: 'Error fetching contacts', error: err.message });
  }
});

// POST /api/contact - Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    console.log('📝 New contact submission:', { name, email, service });
    
    const newContact = new Contact({
      name,
      email,
      phone,
      service,
      message,
      createdAt: new Date()
    });
    
    await newContact.save();
    console.log('✅ Contact saved to database');
    res.status(201).json({ message: 'Message sent successfully', contact: newContact });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
});

// GET /api/projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    console.log(`📁 Found ${projects.length} projects`);
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.json([]);
  }
});

// POST /api/projects - Add new project
app.post('/api/projects', async (req, res) => {
  try {
    const { title, category, imageUrl, description } = req.body;
    const newProject = new Project({ title, category, imageUrl, description });
    await newProject.save();
    res.status(201).json({ message: 'Project added successfully', project: newProject });
  } catch (error) {
    res.status(500).json({ message: 'Error adding project', error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Admin login: POST http://localhost:${PORT}/api/admin/login`);
  console.log(`📋 Contacts API: GET http://localhost:${PORT}/api/contact`);
});