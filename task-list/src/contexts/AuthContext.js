import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const USE_DEV_USER = process.env.REACT_APP_USE_DEV_USER === 'true';
const DEV_EMAIL = process.env.REACT_APP_DEV_EMAIL || 'dev@local.test';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isDev = USE_DEV_USER;

  const login = async (email, password) => {
    if (isDev) {
      setUser({ email });
      return;
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    if (isDev) {
      setUser(null);
      return;
    }
    return signOut(auth);
  };

  const register = async (email, password) => {
    if (isDev) {
      setUser({ email });
      return;
    }
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
  if (USE_DEV_USER) {
    setUser({ email: DEV_EMAIL });
    setLoading(false);
  } else {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }
}, []);


  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
