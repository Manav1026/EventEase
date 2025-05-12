import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export const Middleware = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unauthorised = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unauthorised();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};
