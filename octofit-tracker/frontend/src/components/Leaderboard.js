import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Leaderboard API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const getRankBadge = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading leaderboard...</p>
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
        <h2 className="mb-0">🏆 Leaderboard</h2>
        <span className="badge bg-primary">{leaderboard.length} Competitors</span>
      </div>

      {leaderboard.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h5 className="alert-heading">No Rankings Yet</h5>
          <p className="mb-0">Complete activities to appear on the leaderboard!</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col" style={{width: '80px'}}>Rank</th>
                <th scope="col">User</th>
                <th scope="col">Team</th>
                <th scope="col">Points</th>
                <th scope="col">Period</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => {
                const rank = index + 1;
                return (
                  <tr key={entry.id} className={rank <= 3 ? 'table-warning' : ''}>
                    <td>
                      <h4 className="mb-0">{getRankBadge(rank)}</h4>
                    </td>
                    <td>
                      <strong>{entry.user_name || entry.user}</strong>
                      <br />
                      <small className="text-muted">ID: {entry.id}</small>
                    </td>
                    <td>
                      <span className="badge bg-info">{entry.team_name || entry.team}</span>
                    </td>
                    <td>
                      <h5>
                        <span className="badge bg-success">{entry.total_points} pts</span>
                      </h5>
                    </td>
                    <td>{entry.period}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
