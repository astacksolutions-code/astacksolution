
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

// // ============ MODELS ============

// // Admin Schema
// const adminSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   role: String,
//   name: String,
//   createdAt: { type: Date, default: Date.now }
// });
// const Admin = mongoose.model('Admin', adminSchema);

// // Contact Schema
// const contactSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   service: { type: String, required: true },
//   message: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });
// const Contact = mongoose.model('Contact', contactSchema);

// // Project Schema
// const projectSchema = new mongoose.Schema({
//   title: String,
//   category: String,
//   imageUrl: String,
//   description: String,
//   createdAt: { type: Date, default: Date.now }
// });
// const Project = mongoose.model('Project', projectSchema);

// // ============ CONNECT TO MONGODB ============

// mongoose.connect(MONGO_URI)
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.log('❌ MongoDB Error:', err.message));

// // ============ ROUTES ============

// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK' });
// });

// // Admin Login Route
// app.post('/api/admin/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log('Login attempt:', email);
  
//   try {
//     const admin = await Admin.findOne({ email: email });
    
//     if (admin && admin.password === password) {
//       console.log('✅ Login successful for:', email);
//       res.json({ 
//         token: 'admin_token_' + Date.now(),
//         admin: { email: admin.email, name: admin.name || 'Admin' }
//       });
//     } else {
//       console.log('❌ Login failed for:', email);
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // GET /api/contact - Get all contacts (No auth for testing)
// app.get('/api/contact', async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     console.log(`📋 Found ${contacts.length} contacts`);
//     res.json(contacts);
//   } catch (err) {
//     console.error('Error fetching contacts:', err);
//     res.status(500).json({ message: 'Error fetching contacts', error: err.message });
//   }
// });

// // POST /api/contact - Submit contact form
// app.post('/api/contact', async (req, res) => {
//   try {
//     const { name, email, phone, service, message } = req.body;
//     console.log('📝 New contact submission:', { name, email, service });
    
//     const newContact = new Contact({
//       name,
//       email,
//       phone,
//       service,
//       message,
//       createdAt: new Date()
//     });
    
//     await newContact.save();
//     console.log('✅ Contact saved to database');
//     res.status(201).json({ message: 'Message sent successfully', contact: newContact });
//   } catch (error) {
//     console.error('Error saving contact:', error);
//     res.status(500).json({ message: 'Error sending message', error: error.message });
//   }
// });

// // GET /api/projects
// app.get('/api/projects', async (req, res) => {
//   try {
//     const projects = await Project.find().sort({ createdAt: -1 });
//     console.log(`📁 Found ${projects.length} projects`);
//     res.json(projects);
//   } catch (err) {
//     console.error('Error fetching projects:', err);
//     res.json([]);
//   }
// });

// // POST /api/projects - Add new project
// app.post('/api/projects', async (req, res) => {
//   try {
//     const { title, category, imageUrl, description } = req.body;
//     const newProject = new Project({ title, category, imageUrl, description });
//     await newProject.save();
//     res.status(201).json({ message: 'Project added successfully', project: newProject });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding project', error: error.message });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📡 Admin login: POST http://localhost:${PORT}/api/admin/login`);
//   console.log(`📋 Contacts API: GET http://localhost:${PORT}/api/contact`);
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

// ============ SCHEMAS ============

// Admin Schema
const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String,
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
  title: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: String,
  description: { type: String, required: true },
  technologies: [String],
  liveUrl: String,
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
const Project = mongoose.model('Project', projectSchema);

// Service Schema
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'Code' },
  features: [String],
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
const Service = mongoose.model('Service', serviceSchema);

// ============ CONNECT TO MONGODB ============

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err.message));

// ============ HEALTH CHECK ============

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// ============ ADMIN LOGIN ============

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email);
  
  try {
    const admin = await Admin.findOne({ email });
    
    if (admin && admin.password === password) {
      res.json({ 
        token: 'token_' + Date.now(), 
        admin: { email: admin.email, name: admin.name || 'Admin' } 
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ============ CONTACT ROUTES ============

app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    console.log(`📋 Found ${contacts.length} contacts`);
    res.json(contacts);
  } catch (err) {
    res.json([]);
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    console.log('📝 New contact:', { name, email, service });
    
    const contact = new Contact({ name, email, phone, service, message });
    await contact.save();
    
    console.log('✅ Contact saved');
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error saving message' });
  }
});

app.delete('/api/contact/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact' });
  }
});

// ============ PROJECT ROUTES ============

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    console.log(`📁 Found ${projects.length} projects`);
    res.json(projects);
  } catch (err) {
    res.json([]);
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    console.log('✅ Project saved:', project.title);
    res.status(201).json(project);
  } catch (error) {
    console.error('Error saving project:', error);
    res.status(500).json({ message: 'Error saving project' });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
});

// ============ SERVICE ROUTES ============

app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    console.log(`📁 Found ${services.length} services`);
    res.json(services);
  } catch (err) {
    res.json([]);
  }
});

app.post('/api/services', async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    console.log('✅ Service saved:', service.title);
    res.status(201).json(service);
  } catch (error) {
    console.error('Error saving service:', error);
    res.status(500).json({ message: 'Error saving service' });
  }
});

app.put('/api/services/:id', async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service' });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service' });
  }
});

// ============ CREATE DEFAULT ADMIN ============

const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: 'admin@astack.com' });
    if (!existingAdmin) {
      const defaultAdmin = new Admin({
        email: 'admin@astack.com',
        password: 'admin123',
        name: 'Super Admin',
        role: 'admin'
      });
      await defaultAdmin.save();
      console.log('✅ Default admin created: admin@astack.com / admin123');
    }
  } catch (error) {
    console.log('Admin creation error:', error.message);
  }
};


// ============ START SERVER ============

const PORT = 5000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Admin login: POST http://localhost:${PORT}/api/admin/login`);
  console.log(`📋 Contacts: GET http://localhost:${PORT}/api/contact`);
  console.log(`📁 Projects: GET http://localhost:${PORT}/api/projects`);
  console.log(`🔧 Services: GET http://localhost:${PORT}/api/services`);
  
  // Create default admin if not exists
  await createDefaultAdmin();
});