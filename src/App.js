import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import MainPage from './components/mainpage/MainPage';
import AlumniPage from './components/AlumniPage/AlumniPage';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AdminLogin from './components/AdminLogin/AdminLogin';
import SuccessStories from './components/SuccessStories/SuccessStories';
import Register from './components/Register/Register';
import ApprovalPage from './components/ApprovalPage/ApprovalPage';
import FindFriend from './components/FindFriends/FindFriends';
import ManageHome from './components/manage/ManageHome';
import ManageAbout from './components/manage/ManageAbout';
import ManageNews from './components/manage/ManageNews';
import ManageSuccessStories from './components/manage/ManageSuccessStories';
import ManageEvents from './components/manage/ManageEvents';
import { getAuth, getRedirectResult } from 'firebase/auth';
import { auth } from './config/firebaseConfig'; // Ensure auth is correctly imported
import { handleSignOut } from './authService'; // Ensure handleSignOut is correctly imported

import './App.css';
import logo from './logo.png';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result.user) {
          console.log('User signed in:', result.user);
          if (result.user.email === 'admin@gmail.com') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.error('Error handling redirect result:', error);
      }
    };

    handleRedirectResult();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email === 'admin@gmail.com') {
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
        <div className="top-bar">
          <div className="top-bar-links">
            <Link to="/register" className="top-bar-link">Registration</Link>
            <Link to="/find-friend" className="top-bar-link">Find Friend</Link>
          </div>
        </div>
        <nav className="navbar">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
            <div className="navbar-links">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/news">News & Activities</Link></li>
                <li><Link to="/success-stories">Success Stories</Link></li>
                <li><Link to="/events">Events</Link></li>
                {isAdmin ? (
                  <>
                    <li><Link to="/admin">Admin</Link></li>
                    <li><button onClick={handleSignOut}>Logout</button></li>
                  </>
                ) : (
                  <li><Link to="/admin/login">Login</Link></li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<MainPage isAdmin={isAdmin} />} />
          <Route path="/home" element={<AlumniPage />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/news" element={<div>News & Activities Page</div>} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/events" element={<div>Events Page</div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/FindFriends" element={<FindFriend />} />
          <Route path="/approval" element={<ApprovalPage />} />
          <Route path="/admin/*" element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
          {/* Add routes for SignUp, PasswordReset, and PasswordlessSignIn */}
          {/* <Route path="/signup" element={<SignUp />} /> */}
          {/* <Route path="/password-reset" element={<PasswordReset />} /> */}
          {/* <Route path="/passwordless-signin" element={<PasswordlessSignIn />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
