import mongoose, { Schema } from 'mongoose';
const leaderboardSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    activitiesCount: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now }
});
export default mongoose.model('Leaderboard', leaderboardSchema);
