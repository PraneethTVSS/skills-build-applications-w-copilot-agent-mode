import { useState, useEffect } from 'react'
import { fetchFromApi, extractDataFromResponse } from '../utils/api'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadTeams()
  }, [])

  async function loadTeams() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetchFromApi('/api/teams')
      const data = extractDataFromResponse(response)
      setTeams(data)
    } catch (err) {
      setError(err.message)
      console.error('Failed to load teams:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="alert alert-info">Loading teams...</div>
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>
  }

  return (
    <div>
      <h1>Teams</h1>
      <p className="text-muted">Total teams: {teams.length}</p>

      {teams.length === 0 ? (
        <div className="alert alert-info">No teams found</div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <small className="text-muted">
                        Members: {team.members?.length || 0}
                      </small>
                    </div>
                    <span className="badge bg-info">
                      {team.totalPoints} points
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="btn btn-primary mt-3"
        onClick={loadTeams}
        disabled={loading}
      >
        Refresh
      </button>
    </div>
  )
}
