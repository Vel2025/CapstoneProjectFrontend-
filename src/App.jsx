import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import TrialDetails from './pages/TrialDetails';
import Profile from './pages/Profile';
import Login from './components/Login';
import Register from './components/Register'; // Ensure Register is imported
import { useState } from 'react';
import HealthNews from './components/HealthNews';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={
            <>
              <div>
                <h1>Welcome to the Clinical Trial Management System</h1>
                <h2>See how Trail App accelerates clinical trials</h2>
                <p>Manage clinical trials efficiently with our secure platform.</p>
                <ul>
                  <li>Gain a Full View of Your Trial</li>
                  <li>Enhance Medical Care and Attention</li>
                  <li>Contribute to Medical Advancement</li>
                </ul>
              </div>
              <HealthNews />
            </>
          }
          />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} /> {/* Register route */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/trial/:id" element={isAuthenticated ? <TrialDetails /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login setIsAuthenticated={setIsAuthenticated} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;