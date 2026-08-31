import { useState, useEffect } from 'react'
import { fetchFromApi, extractDataFromResponse } from '../utils/api'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadWorkouts()
  }, [])

  async function loadWorkouts() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetchFromApi('/api/workouts')
      const data = extractDataFromResponse(response)
      setWorkouts(data)
    } catch (err) {
      setError(err.message)
      console.error('Failed to load workouts:', err)
    } finally {
      setLoading(false)
    }
  }

  function getDifficultyBadgeColor(difficulty) {
    switch (difficulty) {
      case 'beginner':
        return 'bg-success'
      case 'intermediate':
        return 'bg-warning'
      case 'advanced':
        return 'bg-danger'
      default:
        return 'bg-secondary'
    }
  }

  if (loading) {
    return <div className="alert alert-info">Loading workouts...</div>
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>
  }

  return (
    <div>
      <h1>💪 Workouts</h1>
      <p className="text-muted">Total workouts: {workouts.length}</p>

      {workouts.length === 0 ? (
        <div className="alert alert-info">No workouts found</div>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title">{workout.name}</h5>
                    <span
                      className={`badge ${getDifficultyBadgeColor(
                        workout.difficulty
                      )}`}
                    >
                      {workout.difficulty.charAt(0).toUpperCase() +
                        workout.difficulty.slice(1)}
                    </span>
                  </div>
                  <p className="card-text text-muted">
                    {workout.description}
                  </p>

                  <div className="mb-2">
                    <small className="text-muted">
                      ⏱️ {workout.estimatedDuration} minutes
                    </small>
                  </div>

                  {workout.exercises && workout.exercises.length > 0 && (
                    <div>
                      <strong className="text-sm">Exercises:</strong>
                      <ul className="mb-0 small">
                        {workout.exercises.map((exercise, idx) => (
                          <li key={idx}>
                            {exercise.name} - {exercise.sets}×{exercise.reps}
                            {exercise.weight && ` @ ${exercise.weight}kg`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="btn btn-primary mt-3"
        onClick={loadWorkouts}
        disabled={loading}
      >
        Refresh
      </button>
    </div>
  )
}
