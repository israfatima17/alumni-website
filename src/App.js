import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import AlumniPage from './components/AlumniPage';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import SuccessStories from './components/SuccessStories';
import Register from './components/Register'; // Make sure the import path is correct
import ApprovalPage from './components/ApprovalPage'; // Import the ApprovalPage component
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Firebase configuration
import firebaseConfig from './config/firebaseConfig.js';

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar">
          <div className="container">
            <Link to="/" className="navbar-brand">
              My Alumni Website
            </Link>
            <div className="navbar-links">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/success-stories">Success Stories</Link></li>
                <li><Link to="/register">Register</Link></li>
                {isAdmin ? (
                  <>
                    <li><Link to="/admin">Admin</Link></li>
                    <li><button onClick={() => auth.signOut()}>Logout</button></li>
                  </>
                ) : (
                  <li><Link to="/admin/login">Login</Link></li>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<AlumniPage isAdmin={isAdmin} />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />}
          />
          <Route
            path="/admin/login"
            element={<AdminLogin setIsAdmin={setIsAdmin} />}
          />
          <Route path="/admin/approve" element={<ApprovalPage />} /> {/* Add this line */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
