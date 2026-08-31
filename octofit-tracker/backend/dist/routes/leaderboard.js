import { Router } from 'express';
import Leaderboard from '../models/Leaderboard.js';
const router = Router();
// GET /api/leaderboard/ - Get global leaderboard
router.get('/', async (_req, res) => {
    try {
        const leaderboard = await Leaderboard.find()
            .sort({ rank: 1 })
            .populate('userId', '-password')
            .populate('teamId');
        res.json({ message: 'Get global leaderboard', data: leaderboard });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// GET /api/leaderboard/teams - Get team leaderboard
router.get('/teams', async (_req, res) => {
    try {
        const leaderboard = await Leaderboard.find({ teamId: { $exists: true, $ne: null } })
            .sort({ rank: 1 })
            .populate('userId', '-password')
            .populate('teamId');
        res.json({ message: 'Get team leaderboard', data: leaderboard });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team leaderboard' });
    }
});
// GET /api/leaderboard/:userId - Get user leaderboard rank
router.get('/:userId', async (req, res) => {
    try {
        const leaderboardEntry = await Leaderboard.findOne({ userId: req.params.userId })
            .populate('userId', '-password')
            .populate('teamId');
        if (!leaderboardEntry) {
            return res.status(404).json({ error: 'User not found in leaderboard' });
        }
        res.json({ message: 'Get user leaderboard rank', data: leaderboardEntry });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
    }
});
export default router;
