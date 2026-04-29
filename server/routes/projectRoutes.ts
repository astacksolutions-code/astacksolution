import express from 'express';
import Project from '../models/Project.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const router = express.Router();

// GET /api/projects - Public listing
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
});

// POST /api/projects - Create (Admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
});

// PUT /api/projects/:id - Update (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
});

// DELETE /api/projects/:id - Delete (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
});

export default router;
