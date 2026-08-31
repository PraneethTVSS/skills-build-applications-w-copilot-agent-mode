import mongoose, { Schema } from 'mongoose';

interface IWorkout {
  userId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
    weight?: number;
  }>;
  difficulty: string;
  estimatedDuration: number;
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  exercises: [
    {
      name: { type: String, required: true },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
      weight: { type: Number }
    }
  ],
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' },
  estimatedDuration: { type: Number, required: true }, // in minutes
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IWorkout>('Workout', workoutSchema);
