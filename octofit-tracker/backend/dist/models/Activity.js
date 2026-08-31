import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, // e.g., 'running', 'cycling', 'swimming'
    duration: { type: Number, required: true }, // in minutes
    distance: { type: Number }, // in kilometers
    calories: { type: Number }, // in kcal
    date: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Activity', activitySchema);
