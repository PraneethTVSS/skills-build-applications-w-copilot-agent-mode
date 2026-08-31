import { useState, useEffect } from 'react'
import { fetchFromApi, extractDataFromResponse } from '../utils/api'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadActivities()
  }, [])

  async function loadActivities() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetchFromApi('/api/activities')
      const data = extractDataFromResponse(response)
      setActivities(data)
    } catch (err) {
      setError(err.message)
      console.error('Failed to load activities:', err)
    } finally {
      setLoading(false)
    }
  }

  function getActivityEmoji(type) {
    const emojis = {
      running: '🏃',
      cycling: '🚴',
      swimming: '🏊',
      walking: '🚶',
      weightlifting: '🏋️',
    }
    return emojis[type] || '💪'
  }

  if (loading) {
    return <div className="alert alert-info">Loading activities...</div>
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>
  }

  return (
    <div>
      <h1>Activities</h1>
      <p className="text-muted">Total activities: {activities.length}</p>

      {activities.length === 0 ? (
        <div className="alert alert-info">No activities found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Distance (km)</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>
                    <span>{getActivityEmoji(activity.type)}</span>{' '}
                    {activity.type.charAt(0).toUpperCase() +
                      activity.type.slice(1)}
                  </td>
                  <td>{activity.duration}</td>
                  <td>{activity.distance || '-'}</td>
                  <td>{activity.calories || '-'}</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        className="btn btn-primary mt-3"
        onClick={loadActivities}
        disabled={loading}
      >
        Refresh
      </button>
    </div>
  )
}
