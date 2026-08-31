# OctoFit Tracker Frontend

A React 19 presentation tier for the OctoFit Tracker multi-tier application, built with Vite and Bootstrap 5.

## Features

- **React 19** with Vite for fast development and optimized production builds
- **React Router DOM** for client-side routing and navigation
- **Bootstrap 5** for responsive UI components
- **Codespaces-aware** API URL configuration
- **Multiple pages**: Users, Teams, Activities, Leaderboard, Workouts
- **Real-time data fetching** from the backend API
- **Error handling** and loading states for all components

## Environment Configuration

### Setup `.env.local`

Copy the example file and configure with your Codespace name:

```bash
cp .env.local.example .env.local
```

Then update `VITE_CODESPACE_NAME` with your GitHub Codespaces name:

```
VITE_CODESPACE_NAME=your-codespace-name-here
```

**How to find your Codespace name:**
- Check your Codespaces URL: `https://{CODESPACE_NAME}-8000.app.github.dev`
- Or extract from your GitHub Codespaces settings

### API URL Configuration

The application uses `import.meta.env.VITE_CODESPACE_NAME` to build the API URL:

**In Codespaces:**
```
https://{CODESPACE_NAME}-8000.app.github.dev/api/[endpoint]
```

**Local Development (without VITE_CODESPACE_NAME):**
```
http://localhost:8000/api/[endpoint]
```

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

## Build

Create a production build:

```bash
npm run build
```

## Available Routes

- `/` - Home page
- `/users` - View all users
- `/teams` - View all teams
- `/activities` - View all activities
- `/leaderboard` - View global leaderboard rankings
- `/workouts` - View available workouts

## API Endpoints

The frontend communicates with the following backend API endpoints:

- `GET /api/users` - Fetch all users
- `GET /api/teams` - Fetch all teams
- `GET /api/activities` - Fetch all activities
- `GET /api/leaderboard` - Fetch leaderboard rankings
- `GET /api/workouts` - Fetch all workouts

## Components

### Users
Displays a table of all users with their points and join dates.

### Teams
Displays team cards with member count and total points.

### Activities
Shows a table of logged activities with type, duration, distance, and calories.

### Leaderboard
Displays ranked users globally with medal emojis (🥇🥈🥉).

### Workouts
Shows workout cards with exercises, difficulty levels, and estimated duration.

## Technologies

- **React 19** - UI library
- **Vite 8** - Build tool and dev server
- **React Router DOM** - Routing
- **Bootstrap 5** - CSS framework
- **Fetch API** - HTTP requests

## Troubleshooting

### API URLs showing "undefined"

If you see URLs like `https://undefined-8000...`, ensure:

1. `.env.local` file exists with `VITE_CODESPACE_NAME` set
2. Restart the dev server after creating/updating `.env.local`
3. Check that the environment variable is not empty

### CORS Issues

If experiencing CORS errors:

1. Verify the backend is running on port 8000
2. Check that `VITE_CODESPACE_NAME` matches your actual Codespace name
3. Ensure the backend is configured to accept requests from the frontend URL
