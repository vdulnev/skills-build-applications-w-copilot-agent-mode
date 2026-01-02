import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const getWorkoutIcon = (type) => {
    const icons = {
      cardio: '🏃',
      strength: '💪',
      yoga: '🧘',
      flexibility: '🤸',
      hiit: '⚡'
    };
    return icons[type?.toLowerCase()] || '🏋️';
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading workout suggestions...</p>
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
        <h2 className="mb-0">💪 Workout Suggestions</h2>
        <span className="badge bg-primary">{workouts.length} Workouts</span>
      </div>

      {workouts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h5 className="alert-heading">No Workout Suggestions</h5>
          <p className="mb-0">Check back soon for personalized workout recommendations!</p>
        </div>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title mb-0">
                      {getWorkoutIcon(workout.workout_type)} {workout.workout_type}
                    </h5>
                    <span className="badge bg-primary">#{workout.id}</span>
                  </div>
                  
                  <h6 className="card-subtitle mb-3 text-muted">
                    <i className="bi bi-person"></i> {workout.user_name || workout.user}
                  </h6>
                  
                  <p className="card-text flex-grow-1">{workout.description}</p>
                  
                  <div className="mt-auto">
                    <hr />
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">
                        <i className="bi bi-clock"></i> Duration:
                      </span>
                      <strong>{workout.suggested_duration} min</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">
                        <i className="bi bi-fire"></i> Target:
                      </span>
                      <span className="badge bg-success">{workout.target_calories} cal</span>
                    </div>
                    <div className="text-center mt-3">
                      <small className="text-muted">
                        Suggested: {new Date(workout.created_at).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-top-0">
                  <button className="btn btn-sm btn-success w-100">
                    Start Workout
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

export default Workouts;
