import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

function AlumniPage() {
  const [alumniData, setAlumniData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const alumniCollection = collection(db, 'alumni');
      const alumniSnapshot = await getDocs(alumniCollection);
      const alumniDataArray = alumniSnapshot.docs.map(doc => doc.data());
      setAlumniData(alumniDataArray);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Alumni Page</h1>
      <ul>
        {alumniData.map((alumni, index) => (
          <li key={index}>{alumni.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AlumniPage;
