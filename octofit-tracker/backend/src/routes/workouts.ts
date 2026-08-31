import { Router } from 'express';
import Workout from '../models/Workout.js';

const router = Router();

// GET /api/workouts/ - Get all workouts
router.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find().populate('userId', '-password');
    res.json({ message: 'Get all workouts', data: workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// POST /api/workouts/ - Create a new workout
router.post('/', async (_req, res) => {
  try {
    const newWorkout = new Workout(_req.body);
    await newWorkout.save();
    res.json({ message: 'Create a new workout', status: 'success', data: newWorkout });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

// GET /api/workouts/:id - Get workout by ID
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('userId', '-password');
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ message: 'Get workout by ID', data: workout });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// PUT /api/workouts/:id - Update workout by ID
router.put('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userId', '-password');
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ message: 'Update workout by ID', data: workout });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update workout' });
  }
});

// DELETE /api/workouts/:id - Delete workout by ID
router.delete('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ message: 'Delete workout by ID', status: 'success' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
