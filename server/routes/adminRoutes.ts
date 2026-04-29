import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.ts';

const router = express.Router();

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id }, 
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    res.json({ token, email: admin.email });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// One-time setup: POST /api/admin/register (Disable in production)
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: 'Admin exists' });

    const admin = new Admin({ email, password });
    await admin.save();
    res.status(201).json({ message: 'Admin created' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin', error });
  }
});

export default router;
