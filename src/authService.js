import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from './config/firebaseConfig'; // Ensure correct path to firebaseConfig

// Initialize Firebase app (if needed, though it seems you've already initialized it elsewhere)
// const app = initializeApp(firebaseConfig);

const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    // Use the user object (e.g., email, name) for your app's logic
    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

const handleSignOut = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

export { signInWithGoogle, handleSignOut };
