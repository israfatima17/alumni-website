import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig'; // Ensure the import is correct

const ManageAbout = () => {
  const [aboutInfo, setAboutInfo] = useState([]);
  const [newInfo, setNewInfo] = useState('');

  useEffect(() => {
    const fetchAboutInfo = async () => {
      const querySnapshot = await getDocs(collection(db, 'about'));
      const aboutList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAboutInfo(aboutList);
    };

    fetchAboutInfo();
  }, []);

  const handleAdd = async () => {
    await addDoc(collection(db, 'about'), { info: newInfo });
    setNewInfo('');
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'about', id));
    setAboutInfo(aboutInfo.filter(info => info.id !== id));
  };

  return (
    <div>
      <h2>Manage About</h2>
      <input
        type="text"
        value={newInfo}
        onChange={(e) => setNewInfo(e.target.value)}
        placeholder="New info"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {aboutInfo.map(info => (
          <li key={info.id}>
            {info.info}
            <button onClick={() => handleDelete(info.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageAbout;
