// ApprovalPage.js
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

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
      setRegistrations(registrationsList);
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
    <div>
      <h2>Approve or Decline Registrations</h2>
      <ul>
        {registrations.map((registration) => (
          <li key={registration.id}>
            {registration.firstName} {registration.lastName} - {registration.email}
            <button onClick={() => handleApprove(registration.id)}>Approve</button>
            <button onClick={() => handleDecline(registration.id)}>Decline</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApprovalPage;
