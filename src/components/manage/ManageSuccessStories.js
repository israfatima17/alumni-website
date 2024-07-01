import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

const ManageSuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      const querySnapshot = await getDocs(collection(db, 'successStories'));
      setStories(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchStories();
  }, []);

  const addStory = async () => {
    await addDoc(collection(db, 'successStories'), { story: newStory });
    setStories([...stories, { story: newStory }]);
    setNewStory('');
  };

  const deleteStory = async (id) => {
    await deleteDoc(doc(db, 'successStories', id));
    setStories(stories.filter(story => story.id !== id));
  };

  return (
    <div>
      <h2>Manage Success Stories</h2>
      <input
        type="text"
        value={newStory}
        onChange={(e) => setNewStory(e.target.value)}
        placeholder="New Success Story"
      />
      <button onClick={addStory}>Add Story</button>
      <ul>
        {stories.map(story => (
          <li key={story.id}>
            {story.story}
            <button onClick={() => deleteStory(story.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageSuccessStories;
