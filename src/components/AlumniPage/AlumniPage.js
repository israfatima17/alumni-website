import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

function AlumniPage() {
  const [alumniData, setAlumniData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching alumni data...");
        const db = getFirestore();
        const alumniCollection = collection(db, 'registrations');
        const alumniSnapshot = await getDocs(alumniCollection);
        const alumniDataArray = alumniSnapshot.docs
          .map(doc => doc.data())
          .filter(alumni => alumni.status === 'approved');
        console.log("Fetched alumni data: ", alumniDataArray);
        setAlumniData(alumniDataArray);
      } catch (error) {
        console.error("Error fetching alumni data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="alumni-container">
      {alumniData.map((alumni, index) => (
        <div className="alumni-card" key={index}>
          <img src={alumni.pictureUrl} alt={`${alumni.firstName} ${alumni.lastName}`} className="profile-picture" />
          <div className="alumni-info">
            <h3>{alumni.firstName} {alumni.lastName}</h3>
            <p>Email: {alumni.email}</p>
            <p>Batch: {alumni.batch}</p>
            <p>Department: {alumni.department}</p>
            {/* Add more fields as needed */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AlumniPage;
