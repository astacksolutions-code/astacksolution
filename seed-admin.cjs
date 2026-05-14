const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs'); 
require('dotenv').config({ path: '.env' }); 
const adminSchema = new mongoose.Schema({ email: String, password: String, role: String }); 
const Admin = mongoose.model('Admin', adminSchema); 
const createAdmin = async () => { 
  try { 
    const existing = await Admin.findOne({ email: 'admin@astack.com' }); 
    if (existing) { console.log('Admin exists'); process.exit(0); } 
    const hash = await bcrypt.hash('admin123', 10); 
    await Admin.create({ email: 'admin@astack.com', password: hash, role: 'admin' }); 
    console.log('? Admin created! Email: admin@astack.com, Password: admin123'); 
    process.exit(0); 
  } catch(err) { console.error(err); process.exit(1); } 
}; 
createAdmin(); 
