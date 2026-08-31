import { useState, useEffect } from 'react'
import { fetchFromApi, extractDataFromResponse } from '../utils/api'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetchFromApi('/api/users')
      const data = extractDataFromResponse(response)
      setUsers(data)
    } catch (err) {
      setError(err.message)
      console.error('Failed to load users:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="alert alert-info">Loading users...</div>
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>
  }

  return (
    <div>
      <h1>Users</h1>
      <p className="text-muted">Total users: {users.length}</p>

      {users.length === 0 ? (
        <div className="alert alert-info">No users found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Points</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge bg-success">{user.points}</span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        className="btn btn-primary mt-3"
        onClick={loadUsers}
        disabled={loading}
      >
        Refresh
      </button>
    </div>
  )
}
