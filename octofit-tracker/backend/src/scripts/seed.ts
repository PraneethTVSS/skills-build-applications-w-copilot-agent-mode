import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    console.log('Cleared existing data');

    // Create users
    const users = await User.insertMany([
      {
        name: 'Alice Johnson',
        email: 'alice@octofit.com',
        password: 'hashedpassword123',
        points: 500
      },
      {
        name: 'Bob Smith',
        email: 'bob@octofit.com',
        password: 'hashedpassword456',
        points: 450
      },
      {
        name: 'Charlie Brown',
        email: 'charlie@octofit.com',
        password: 'hashedpassword789',
        points: 400
      },
      {
        name: 'Diana Prince',
        email: 'diana@octofit.com',
        password: 'hashedpassword101',
        points: 520
      }
    ]);

    console.log('Created 4 users');

    // Create teams
    const teams = await Team.insertMany([
      {
        name: 'Fitness Warriors',
        description: 'A team dedicated to fitness excellence',
        members: [users[0]._id, users[1]._id],
        totalPoints: 950
      },
      {
        name: 'Health Enthusiasts',
        description: 'Join us on our health journey',
        members: [users[2]._id, users[3]._id],
        totalPoints: 920
      }
    ]);

    console.log('Created 2 teams');

    // Create activities
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'running',
        duration: 30,
        distance: 5.5,
        calories: 450,
        date: new Date(Date.now() - 86400000)
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        duration: 45,
        distance: 18.2,
        calories: 520,
        date: new Date(Date.now() - 172800000)
      },
      {
        userId: users[2]._id,
        type: 'swimming',
        duration: 40,
        distance: 2.0,
        calories: 380,
        date: new Date(Date.now() - 259200000)
      },
      {
        userId: users[3]._id,
        type: 'running',
        duration: 25,
        distance: 4.2,
        calories: 380,
        date: new Date()
      },
      {
        userId: users[0]._id,
        type: 'cycling',
        duration: 60,
        distance: 25.0,
        calories: 600,
        date: new Date()
      }
    ]);

    console.log('Created 5 activities');

    // Create leaderboard entries
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        userId: users[3]._id,
        teamId: teams[1]._id,
        rank: 1,
        points: 520,
        activitiesCount: 8
      },
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        rank: 2,
        points: 500,
        activitiesCount: 10
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        rank: 3,
        points: 450,
        activitiesCount: 7
      },
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        rank: 4,
        points: 400,
        activitiesCount: 6
      }
    ]);

    console.log('Created leaderboard entries');

    // Create workouts
    const workouts = await Workout.insertMany([
      {
        userId: users[0]._id,
        name: 'Beginner Running Program',
        description: 'Perfect for new runners',
        exercises: [
          { name: 'Warm-up jog', sets: 1, reps: 5, weight: 0 },
          { name: 'Steady run', sets: 1, reps: 20, weight: 0 },
          { name: 'Cool-down walk', sets: 1, reps: 5, weight: 0 }
        ],
        difficulty: 'beginner',
        estimatedDuration: 30
      },
      {
        userId: users[1]._id,
        name: 'Intermediate Strength',
        description: 'Build muscle and endurance',
        exercises: [
          { name: 'Push-ups', sets: 3, reps: 12, weight: 0 },
          { name: 'Squats', sets: 3, reps: 15, weight: 20 },
          { name: 'Deadlifts', sets: 3, reps: 10, weight: 40 }
        ],
        difficulty: 'intermediate',
        estimatedDuration: 45
      },
      {
        userId: users[2]._id,
        name: 'Advanced CrossFit',
        description: 'High intensity interval training',
        exercises: [
          { name: 'Burpees', sets: 4, reps: 15, weight: 0 },
          { name: 'Kettlebell swings', sets: 4, reps: 20, weight: 12 },
          { name: 'Wall balls', sets: 4, reps: 15, weight: 8 }
        ],
        difficulty: 'advanced',
        estimatedDuration: 60
      }
    ]);

    console.log('Created 3 workouts');

    console.log('✅ Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
