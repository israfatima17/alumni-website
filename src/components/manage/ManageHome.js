// ManageHome.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

const ManageHome = () => {
  const [homeInfo, setHomeInfo] = useState([]);
  const [newInfo, setNewInfo] = useState('');

  useEffect(() => {
    const fetchHomeInfo = async () => {
      const querySnapshot = await getDocs(collection(db, 'home'));
      const homeList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHomeInfo(homeList);
    };

    fetchHomeInfo();
  }, []);

  const handleAdd = async () => {
    await addDoc(collection(db, 'home'), { info: newInfo });
    setNewInfo('');
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'home', id));
    setHomeInfo(homeInfo.filter(info => info.id !== id));
  };

  return (
    <div>
      <h2>Manage Home</h2>
      <input
        type="text"
        value={newInfo}
        onChange={(e) => setNewInfo(e.target.value)}
        placeholder="New info"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {homeInfo.map(info => (
          <li key={info.id}>
            {info.info}
            <button onClick={() => handleDelete(info.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageHome;
