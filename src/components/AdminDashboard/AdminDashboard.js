// AdminDashboard.js
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ApprovalPage from '../ApprovalPage/ApprovalPage';
import ManageHome from '../manage/ManageHome';
import ManageAbout from '../manage/ManageAbout';
import ManageNews from '../manage/ManageNews';
import ManageSuccessStories from '../manage/ManageSuccessStories';
import ManageEvents from '../manage/ManageEvents';

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/admin/approve">Approve Registrations</Link></li>
          <li><Link to="/admin/manage-home">Manage Home</Link></li>
          <li><Link to="/admin/manage-about">Manage About</Link></li>
          <li><Link to="/admin/manage-news">Manage News & Activities</Link></li>
          <li><Link to="/admin/manage-success-stories">Manage Success Stories</Link></li>
          <li><Link to="/admin/manage-events">Manage Events</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="approve" element={<ApprovalPage />} />
        <Route path="manage-home" element={<ManageHome />} />
        <Route path="manage-about" element={<ManageAbout />} />
        <Route path="manage-news" element={<ManageNews />} />
        <Route path="manage-success-stories" element={<ManageSuccessStories />} />
        <Route path="manage-events" element={<ManageEvents />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
