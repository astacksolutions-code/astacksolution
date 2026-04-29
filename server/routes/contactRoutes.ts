import express from 'express';
import Contact from '../models/Contact.ts';
import { sendContactNotification } from '../utils/emailService.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    const newContact = new Contact({ name, email, phone, service, message });
    await newContact.save();
    
    // Send email notification
    await sendContactNotification({ name, email, phone, service, message });
    
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
});

// GET /api/contact - Get all contacts (Admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error });
  }
});

export default router;
