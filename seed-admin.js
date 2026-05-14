const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env' });

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  name: { type: String, default: 'Admin User' }
});

const Admin = mongoose.model('Admin', adminSchema);

const createAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://astackadmin:Astack%40123@astacksolution.ojvtjuq.mongodb.net/astacksolutions?retryWrites=true&w=majority&appName=Astacksolution';
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    const existingAdmin = await Admin.findOne({ email: 'admin@astack.com' });
    
    if (existingAdmin) {
      console.log('⚠️ Admin already exists!');
      console.log('📧 Email: admin@astack.com');
      console.log('🔑 Password: admin123');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = new Admin({
      email: 'admin@astack.com',
      password: hashedPassword,
      role: 'admin',
      name: 'Super Admin'
    });

    await admin.save();
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Admin created successfully!');
    console.log('📧 Email: admin@astack.com');
    console.log('🔑 Password: admin123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();