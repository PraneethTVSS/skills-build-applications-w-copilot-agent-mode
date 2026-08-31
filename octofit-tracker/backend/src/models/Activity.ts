import mongoose, { Schema } from 'mongoose';

interface IActivity {
  userId: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  distance?: number;
  calories?: number;
  date: Date;
  createdAt: Date;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true }, // e.g., 'running', 'cycling', 'swimming'
  duration: { type: Number, required: true }, // in minutes
  distance: { type: Number }, // in kilometers
  calories: { type: Number }, // in kcal
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IActivity>('Activity', activitySchema);
