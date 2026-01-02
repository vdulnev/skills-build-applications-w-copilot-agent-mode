import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Teams API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading teams...</p>
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
        <h2 className="mb-0">👥 Teams</h2>
        <span className="badge bg-primary">{teams.length} Teams</span>
      </div>

      {teams.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h5 className="alert-heading">No Teams Yet</h5>
          <p className="mb-0">Create a team to start competing together!</p>
        </div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    <i className="bi bi-shield-check"></i> {team.name}
                  </h5>
                  <h6 className="card-subtitle mb-3 text-muted">Team ID: {team.id}</h6>
                  <p className="card-text flex-grow-1">{team.description}</p>
                  <div className="mt-auto">
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="badge bg-success">
                          {team.member_count || 0} Members
                        </span>
                      </div>
                      <small className="text-muted">
                        {new Date(team.created_at).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-top-0">
                  <button className="btn btn-sm btn-outline-primary w-100">
                    View Team Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
