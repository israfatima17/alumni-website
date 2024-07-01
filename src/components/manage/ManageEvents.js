// ManageEvents.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const eventsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsList);
    };

    fetchEvents();
  }, []);

  const handleAdd = async () => {
    await addDoc(collection(db, 'events'), { event: newEvent });
    setNewEvent('');
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'events', id));
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div>
      <h2>Manage Events</h2>
      <input
        type="text"
        value={newEvent}
        onChange={(e) => setNewEvent(e.target.value)}
        placeholder="New event"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.event}
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageEvents;
