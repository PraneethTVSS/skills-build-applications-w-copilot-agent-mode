import mongoose, { Schema } from 'mongoose';

interface ITeam {
  name: string;
  description: string;
  members: mongoose.Types.ObjectId[];
  totalPoints: number;
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  totalPoints: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ITeam>('Team', teamSchema);
