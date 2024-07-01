import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './RegistrationPage.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    rollNumber: '',
    email: '',
    password: '',
    passoutYear: '',
    experience: '',
    currentJob: '',
    universityReview: '',
    futureGoals: '',
    profilePicture: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission
  const db = getFirestore();
  const auth = getAuth();
  const storage = getStorage();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, password, profilePicture, ...rest } = formData;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let profilePictureURL = '';

      if (profilePicture) {
        const storageRef = ref(storage, `profilePictures/${user.uid}/${profilePicture.name}`);
        await uploadBytes(storageRef, profilePicture);
        profilePictureURL = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, 'registrations'), {
        uid: user.uid,
        email,
        status: 'pending',
        profilePictureURL,
        ...rest,
      });

      setSuccess('Registration successful. Await admin approval.');
      setError('');
      setFormSubmitted(true); // Set form submission flag to true

      // Clear the form fields
      setFormData({
        firstName: '',
        lastName: '',
        department: '',
        rollNumber: '',
        email: '',
        password: '',
        passoutYear: '',
        experience: '',
        currentJob: '',
        universityReview: '',
        futureGoals: '',
        profilePicture: null,
      });
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message);
      setSuccess('');
    }
  };

  return (
    <div className="register-container">
      {formSubmitted ? (
        <p className="success">{success}</p>
      ) : (
        <div>
          <h2>Alumni Register Form</h2>
          <form onSubmit={handleRegister} className="register-form">
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Department:
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Roll Number:
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Passout Year:
              <input
                type="text"
                name="passoutYear"
                value={formData.passoutYear}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Experience:
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Current Job:
              <textarea
                name="currentJob"
                value={formData.currentJob}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              University Review:
              <textarea
                name="universityReview"
                value={formData.universityReview}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Future Goals:
              <textarea
                name="futureGoals"
                value={formData.futureGoals}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Upload Picture:
              <input type="file" name="profilePicture" onChange={handleChange} />
            </label>
            <button type="submit" className="register-button">Register</button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
