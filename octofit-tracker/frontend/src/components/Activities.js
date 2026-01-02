import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Activities API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Activities fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
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
          <p className="mt-3">Loading activities...</p>
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
        <h2 className="mb-0">🏃 Activity Log</h2>
        <span className="badge bg-primary">{activities.length} Activities</span>
      </div>
      
      {activities.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h5 className="alert-heading">No Activities Yet</h5>
          <p className="mb-0">Start tracking your fitness activities to see them here!</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Activity</th>
                <th scope="col">Duration</th>
                <th scope="col">Distance</th>
                <th scope="col">Calories</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td><strong>{activity.id}</strong></td>
                  <td>
                    <i className="bi bi-person-circle"></i> {activity.user_name || activity.user}
                  </td>
                  <td>
                    <span className="badge bg-info">{activity.activity_type}</span>
                  </td>
                  <td>{activity.duration} min</td>
                  <td>{activity.distance} km</td>
                  <td>
                    <span className="badge bg-success">{activity.calories_burned} cal</span>
                  </td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Activities;
