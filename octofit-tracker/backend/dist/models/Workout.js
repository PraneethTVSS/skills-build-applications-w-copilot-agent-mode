import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
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
export default mongoose.model('Workout', workoutSchema);
