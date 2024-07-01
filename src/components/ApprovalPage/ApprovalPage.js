import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import './ApprovalPage.css'; // Import the CSS file

const ApprovalPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchRegistrations = async () => {
      const querySnapshot = await getDocs(collection(db, 'registrations'));
      const registrationsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRegistrations(registrationsList.filter(reg => reg.status === 'pending'));
    };

    fetchRegistrations();
  }, [db]);

  const handleApprove = async (id) => {
    const registrationRef = doc(db, 'registrations', id);
    await updateDoc(registrationRef, { status: 'approved' });
    setRegistrations(registrations.filter((registration) => registration.id !== id));
  };

  const handleDecline = async (id) => {
    const registrationRef = doc(db, 'registrations', id);
    await deleteDoc(registrationRef);
    setRegistrations(registrations.filter((registration) => registration.id !== id));
  };

  return (
    <div className="approval-container">
      <h2>Approve or Decline Registrations</h2>
      <div className="cards-container">
        {registrations.map((registration) => (
          <div className="card" key={registration.id}>
            {registration.profilePictureURL && (
              <img src={registration.profilePictureURL} alt="Profile" className="profile-picture" />
            )}
            <div className="card-content">
              <p><strong>Name:</strong> {registration.firstName} {registration.lastName}</p>
              <p><strong>Email:</strong> {registration.email}</p>
              <p><strong>Department:</strong> {registration.department}</p>
              <p><strong>Roll Number:</strong> {registration.rollNumber}</p>
              <p><strong>Passout Year:</strong> {registration.passoutYear}</p>
              <p><strong>Experience:</strong> {registration.experience}</p>
              <p><strong>Current Job:</strong> {registration.currentJob}</p>
              <p><strong>University Review:</strong> {registration.universityReview}</p>
              <p><strong>Future Goals:</strong> {registration.futureGoals}</p>
              <div className="card-buttons">
                <button className="approve-button" onClick={() => handleApprove(registration.id)}>Approve</button>
                <button className="decline-button" onClick={() => handleDecline(registration.id)}>Decline</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalPage;
