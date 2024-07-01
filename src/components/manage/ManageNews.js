import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

const ManageNews = () => {
  const [newsContent, setNewsContent] = useState([]);
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    const fetchNewsContent = async () => {
      const querySnapshot = await getDocs(collection(db, 'newsContent'));
      setNewsContent(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchNewsContent();
  }, []);

  const addContent = async () => {
    await addDoc(collection(db, 'newsContent'), { content: newContent });
    setNewsContent([...newsContent, { content: newContent }]);
    setNewContent('');
  };

  const deleteContent = async (id) => {
    await deleteDoc(doc(db, 'newsContent', id));
    setNewsContent(newsContent.filter(content => content.id !== id));
  };

  return (
    <div>
      <h2>Manage News</h2>
      <input
        type="text"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="New News Content"
      />
      <button onClick={addContent}>Add Content</button>
      <ul>
        {newsContent.map(content => (
          <li key={content.id}>
            {content.content}
            <button onClick={() => deleteContent(content.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageNews;
