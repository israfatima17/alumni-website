import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure this matches the filename exactly

function Navbar({ isAdmin, auth }) {
  return (
    <div className="navbar-container">
      <div className="registration-find-friends">
        <Link to="/register" className="nav-link">Registration</Link>
        <Link to="/find-friend" className="nav-link">Find Friend</Link>
      </div>
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src="/logo.png" alt="Logo" className="logo" />
          </Link>
          <div className="navbar-links">
            <ul>
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/about" className="nav-link">About</Link></li>
              <li><Link to="/news" className="nav-link">News & Activities</Link></li>
              <li><Link to="/success-stories" className="nav-link">Success Stories</Link></li>
              <li><Link to="/events" className="nav-link">Events</Link></li>
              {isAdmin ? (
                <>
                  <li><Link to="/admin" className="nav-link">Admin</Link></li>
                  <li><button onClick={() => auth.signOut()}>Logout</button></li>
                </>
              ) : (
                <li><Link to="/admin/login" className="nav-link">Login</Link></li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
