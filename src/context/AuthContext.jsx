import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, firestore } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRoutes, setUserRoutes] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await loadUserRoutes(user.uid);
      } else {
        setCurrentUser(null);
        setUserRoutes([]);
      }
    });

    return unsubscribe;
  }, []);

  const loadUserRoutes = async (uid) => {
    try {
      const usersCollectionRef = collection(firestore, "users");
      const q = query(usersCollectionRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setUserRoutes(userData.routes || []);
        });
      } else {
        setUserRoutes([]);
        console.log("User document does not exist.");
      }
    } catch (error) {
      console.error("Error fetching user routes:", error.message);
      setUserRoutes([]);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserRoutes([]);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };
  const value = {
    currentUser,
    userRoutes,
    handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
