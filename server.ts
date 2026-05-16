
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
  phone: String,
  bio: String,
  role: String,
  createdAt: { type: Date, default: Date.now }
});
const Admin = mongoose.model('Admin', adminSchema);

// Contact Schema - WITH read field
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
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
        admin: { email: admin.email, name: admin.name || 'Admin', phone: admin.phone || '', bio: admin.bio || '', role: admin.role || 'admin' } 
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ============ ADMIN PROFILE ROUTES ============

// Update admin profile
app.put('/api/admin/profile', async (req, res) => {
  try {
    const { name, phone, bio } = req.body;
    const admin = await Admin.findOneAndUpdate(
      { email: req.body.email },
      { name, phone, bio },
      { new: true }
    );
    res.json({ message: 'Profile updated', admin });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Change password
app.put('/api/admin/change-password', async (req, res) => {
  try {
    const { currentPassword, newPassword, email } = req.body;
    const admin = await Admin.findOne({ email });
    
    if (admin && admin.password === currentPassword) {
      await Admin.updateOne({ email }, { password: newPassword });
      res.json({ message: 'Password changed successfully' });
    } else {
      res.status(401).json({ message: 'Current password is incorrect' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error changing password' });
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
    res.status(201).json({ message: 'Message sent successfully', contact });
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

// Mark contact as read - FIXED
app.put('/api/contact/:id/read', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id, 
      { read: true },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    console.log(`✅ Contact marked as read: ${contact.name}`);
    res.json({ message: 'Marked as read', contact });
  } catch (error) {
    console.error('Error marking as read:', error);
    res.status(500).json({ message: 'Error' });
  }
});

// Mark all as read - FIXED
app.post('/api/contact/read-all', async (req, res) => {
  try {
    const result = await Contact.updateMany({ read: false }, { read: true });
    console.log(`✅ Marked ${result.modifiedCount} contacts as read`);
    res.json({ message: 'All messages marked as read', count: result.modifiedCount });
  } catch (error) {
    console.error('Error marking all as read:', error);
    res.status(500).json({ message: 'Error' });
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
        phone: '+1 234 567 8900',
        bio: 'Administrator at Astack Solutions',
        role: 'admin'
      });
      await defaultAdmin.save();
      console.log('✅ Default admin created: admin@astack.com / admin123');
    }
    
    // Also create amishdhera admin if not exists
    const existingAmish = await Admin.findOne({ email: 'amishdhera@gmail.com' });
    if (!existingAmish) {
      const amishAdmin = new Admin({
        email: 'amishdhera@gmail.com',
        password: 'Gameofparis',
        name: 'Amish Dhera',
        phone: '+1 234 567 8901',
        bio: 'Founder & CEO at Astack Solutions',
        role: 'super_admin'
      });
      await amishAdmin.save();
      console.log('✅ Amish Dhera admin created: amishdhera@gmail.com / Gameofparis');
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
  console.log(`👤 Profile: PUT http://localhost:${PORT}/api/admin/profile`);
  
  // Create default admins
  await createDefaultAdmin();
});