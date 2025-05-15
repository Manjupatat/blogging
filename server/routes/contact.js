import express from 'express';
import Contact from '../models/Contact.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });
    
    await newContact.save();
    
    res.status(201).json({ 
      message: 'Contact form submitted successfully' 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;