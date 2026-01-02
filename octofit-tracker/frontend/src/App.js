import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img 
                src="/octofitapp-small.png" 
                alt="OctoFit Logo" 
                className="navbar-logo"
              />
              OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to OctoFit Tracker! 🏋️</h1>
        <p className="lead">
          Track your fitness activities, compete with teams, and achieve your fitness goals!
        </p>
        <hr className="my-4" />
        <p>
          Join thousands of fitness enthusiasts tracking their progress, competing in teams, 
          and reaching new heights in their fitness journey.
        </p>
        <div className="row mt-5 text-center">
          <div className="col-md-4 mb-3">
            <div className="feature-box">
              <h2>🏃</h2>
              <h5>Track Activities</h5>
              <p>Log your workouts and monitor your progress</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="feature-box">
              <h2>👥</h2>
              <h5>Join Teams</h5>
              <p>Compete together and motivate each other</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="feature-box">
              <h2>🏆</h2>
              <h5>Climb Rankings</h5>
              <p>Challenge yourself on the leaderboard</p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Link className="btn btn-primary btn-lg mx-2 mb-2" to="/activities" role="button">
            <i className="bi bi-activity"></i> View Activities
          </Link>
          <Link className="btn btn-success btn-lg mx-2 mb-2" to="/leaderboard" role="button">
            <i className="bi bi-trophy"></i> View Leaderboard
          </Link>
          <Link className="btn btn-info btn-lg mx-2 mb-2" to="/teams" role="button">
            <i className="bi bi-people"></i> Browse Teams
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
