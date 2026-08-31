import { Router } from 'express';
import Activity from '../models/Activity.js';
const router = Router();
// GET /api/activities/ - Get all activities
router.get('/', async (_req, res) => {
    try {
        const activities = await Activity.find().populate('userId', '-password');
        res.json({ message: 'Get all activities', data: activities });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
// POST /api/activities/ - Create a new activity
router.post('/', async (_req, res) => {
    try {
        const newActivity = new Activity(_req.body);
        await newActivity.save();
        res.json({ message: 'Log a new activity', status: 'success', data: newActivity });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create activity' });
    }
});
// GET /api/activities/:id - Get activity by ID
router.get('/:id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id).populate('userId', '-password');
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ message: 'Get activity by ID', data: activity });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activity' });
    }
});
// PUT /api/activities/:id - Update activity by ID
router.put('/:id', async (req, res) => {
    try {
        const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userId', '-password');
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ message: 'Update activity by ID', data: activity });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update activity' });
    }
});
// DELETE /api/activities/:id - Delete activity by ID
router.delete('/:id', async (req, res) => {
    try {
        const activity = await Activity.findByIdAndDelete(req.params.id);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ message: 'Delete activity by ID', status: 'success' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete activity' });
    }
});
export default router;
