import { Router } from 'express';
import Team from '../models/Team.js';

const router = Router();

// GET /api/teams/ - Get all teams
router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members', '-password');
    res.json({ message: 'Get all teams', data: teams });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// POST /api/teams/ - Create a new team
router.post('/', async (_req, res) => {
  try {
    const newTeam = new Team(_req.body);
    await newTeam.save();
    res.json({ message: 'Create a new team', status: 'success', data: newTeam });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team' });
  }
});

// GET /api/teams/:id - Get team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members', '-password');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ message: 'Get team by ID', data: team });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

// PUT /api/teams/:id - Update team by ID
router.put('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('members', '-password');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ message: 'Update team by ID', data: team });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update team' });
  }
});

// DELETE /api/teams/:id - Delete team by ID
router.delete('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ message: 'Delete team by ID', status: 'success' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

export default router;
