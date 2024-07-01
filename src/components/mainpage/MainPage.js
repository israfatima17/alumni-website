import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from '../../config/firebaseConfig'; // Ensure the import is correct
import './MainPage.css';

const MainPage = ({ isAdmin }) => {
  const [alumniData, setAlumniData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const storage = getStorage();
  const defaultImageUrl = 'path-to-default-image.png'; // Replace with the URL to your default image

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alumniCollection = collection(db, 'registrations');
        const alumniSnapshot = await getDocs(alumniCollection);

        const alumniDataArray = await Promise.all(
          alumniSnapshot.docs.map(async (doc) => {
            const data = doc.data();
            if (data.status === 'approved') {
              let photoUrl = data.photoUrl;
              if (!photoUrl || typeof photoUrl !== 'string') {
                console.error(`Invalid photoUrl: ${photoUrl} for document ID: ${doc.id}`);
                photoUrl = defaultImageUrl; // Use default image URL if photoUrl is invalid
              } else {
                try {
                  // Create a reference to the specific file in Firebase Storage
                  const photoRef = ref(storage, photoUrl);
                  photoUrl = await getDownloadURL(photoRef);
                } catch (err) {
                  console.error(`Error fetching download URL for ${photoUrl}:`, err);
                  photoUrl = defaultImageUrl; // Use default image URL if fetching photoUrl fails
                }
              }
              return { id: doc.id, ...data, photoUrl };
            }
            return null;
          })
        );

        setAlumniData(alumniDataArray.filter((alumni) => alumni !== null));
      } catch (error) {
        console.error("Error fetching alumni data: ", error);
      }
    };

    fetchData();
  }, [storage]);

  const handleDelete = async (docId) => {
    try {
      const docRef = doc(db, 'registrations', docId);
      await deleteDoc(docRef);
      setAlumniData((prevData) => prevData.filter((alumni) => alumni.id !== docId));
      setCurrentIndex(0); // Reset currentIndex after deletion
      setShowDetails(false); // Hide details after deletion
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % alumniData.length);
    setShowDetails(false); // Hide details when navigating
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + alumniData.length) % alumniData.length);
    setShowDetails(false); // Hide details when navigating
  };

  const handlePhotoClick = () => {
    setShowDetails(true);
  };

  return (
    <div className="main-page">
      <header className="header">
        <h1>Welcome to the Alumni Network</h1>
        <p>Connecting Alumni and Celebrating Success</p>
      </header>
      <div className="content">
        <aside className="alumni-sidebar">
          {alumniData.length > 0 && (
            <div className="alumni-photo-container" onClick={handlePhotoClick}>
              <img
                src={alumniData[currentIndex]?.photoUrl || defaultImageUrl}
                alt={`${alumniData[currentIndex]?.firstName || ''} ${alumniData[currentIndex]?.lastName || ''}`}
                className="alumni-photo"
              />
            </div>
          )}
          {alumniData.length === 0 && <p>No alumni data available.</p>}
          <div className="navigation">
            <button className="prev-btn" onClick={handlePrev}>&#10094;</button>
            <button className="next-btn" onClick={handleNext}>&#10095;</button>
          </div>
        </aside>
        <main className="alumni-details">
          {showDetails && alumniData.length > 0 && (
            <div className="alumni-data-container">
              <div className="alumni-data">
                <h3>{alumniData[currentIndex]?.firstName} {alumniData[currentIndex]?.lastName}</h3>
                <p><strong>Department:</strong> {alumniData[currentIndex]?.department}</p>
                <p><strong>Roll Number:</strong> {alumniData[currentIndex]?.rollNumber}</p>
                {/* Add other fields here */}
              </div>
              {isAdmin && (
                <button className="delete-btn" onClick={() => handleDelete(alumniData[currentIndex]?.id)}>Delete</button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MainPage;
