import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import './RegistrationPage.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    number: '',
    batch: '',
    department: '',
    course: '',
    currentJob: '',
    universityReview: '',
    profilePicture: null,
  });

  const db = getFirestore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'registrations'), formData);
      alert('Registration submitted for approval');
      // Reset the form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        number: '',
        batch: '',
        department: '',
        course: '',
        currentJob: '',
        universityReview: '',
        profilePicture: null,
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required maxLength="50" />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required maxLength="50" />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required maxLength="50" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required maxLength="20" />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required maxLength="20" />
        </div>
        {/* Other form fields here */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
