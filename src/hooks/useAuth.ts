import { useState, useEffect } from 'react';
import { auth, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider, database, ref, onValue } from '../firebase/firebase';
import type { User } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Reset admin status when user changes
      if (!currentUser) {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch admin status when user is authenticated
  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    const adminRef = ref(database, `admins/${user.uid}`);
    const unsubscribe = onValue(adminRef, (snapshot) => {
      const adminStatus = snapshot.val();
      setIsAdmin(adminStatus === true);
    });

    return () => unsubscribe();
  }, [user]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return { user, loading, isAdmin, signInWithGoogle, signOutUser };
};
