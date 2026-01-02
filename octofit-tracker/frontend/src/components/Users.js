import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Users API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Users fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        setUsers(Array.isArray(usersData) ? usersData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const getFitnessLevelColor = (level) => {
    const colors = {
      beginner: 'bg-info',
      intermediate: 'bg-primary',
      advanced: 'bg-success',
      expert: 'bg-danger'
    };
    return colors[level?.toLowerCase()] || 'bg-secondary';
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">👤 Users</h2>
        <span className="badge bg-primary">{users.length} Members</span>
      </div>

      {users.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h5 className="alert-heading">No Users Found</h5>
          <p className="mb-0">Be the first to join OctoFit Tracker!</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Team</th>
                <th scope="col">Level</th>
                <th scope="col">Goals</th>
                <th scope="col">Member Since</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td><strong>{user.id}</strong></td>
                  <td>
                    <strong>{user.username}</strong>
                  </td>
                  <td>
                    <small className="text-muted">{user.email}</small>
                  </td>
                  <td>
                    {user.team_name || user.team ? (
                      <span className="badge bg-info">{user.team_name || user.team}</span>
                    ) : (
                      <span className="text-muted">No Team</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${getFitnessLevelColor(user.fitness_level)}`}>
                      {user.fitness_level || 'N/A'}
                    </span>
                  </td>
                  <td>
                    <small>{user.fitness_goals || 'Not specified'}</small>
                  </td>
                  <td>{new Date(user.date_joined).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
