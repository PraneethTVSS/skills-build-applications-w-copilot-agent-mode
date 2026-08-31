import mongoose, { Schema } from 'mongoose';

interface ILeaderboard {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  rank: number;
  points: number;
  activitiesCount: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  rank: { type: Number, required: true },
  points: { type: Number, required: true },
  activitiesCount: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
