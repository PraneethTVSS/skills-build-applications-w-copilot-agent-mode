import { useState, useEffect } from 'react'
import { fetchFromApi, extractDataFromResponse } from '../utils/api'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadLeaderboard()
  }, [])

  async function loadLeaderboard() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetchFromApi('/api/leaderboard')
      const data = extractDataFromResponse(response)
      setLeaderboard(data)
    } catch (err) {
      setError(err.message)
      console.error('Failed to load leaderboard:', err)
    } finally {
      setLoading(false)
    }
  }

  function getMedalEmoji(rank) {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return '🏅'
  }

  if (loading) {
    return <div className="alert alert-info">Loading leaderboard...</div>
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>
  }

  return (
    <div>
      <h1>🏆 Leaderboard</h1>
      <p className="text-muted">Global rankings</p>

      {leaderboard.length === 0 ? (
        <div className="alert alert-info">No leaderboard entries found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
                <th>Activities</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry._id}>
                  <td>
                    <strong>
                      {getMedalEmoji(entry.rank)} #{entry.rank}
                    </strong>
                  </td>
                  <td>{entry.userId?.name || 'Unknown'}</td>
                  <td>
                    <span className="badge bg-success">{entry.points}</span>
                  </td>
                  <td>{entry.activitiesCount}</td>
                  <td>{entry.teamId?.name || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        className="btn btn-primary mt-3"
        onClick={loadLeaderboard}
        disabled={loading}
      >
        Refresh
      </button>
    </div>
  )
}
