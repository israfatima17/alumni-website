import React from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Updated to include Link
import { getAuth, signOut } from 'firebase/auth';

const AdminDashboard = () => {
  const navigate = useNavigate();  // Updated to useNavigate
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Redirect to home page upon successful logout
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/admin/approve">Approve Registrations</Link></li>
        </ul>
      </nav>
      <button onClick={handleLogout}>Logout</button>
      {/* Add other admin functionalities here */}
    </div>
  );
};

export default AdminDashboard;
