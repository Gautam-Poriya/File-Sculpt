// // AuthContext.js
// import React, { createContext, useContext, useEffect, useState } from 'react';
// // import { auth } from './firebaseConfig';
// import { onAuthStateChanged } from 'firebase/auth';

// export const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

//  const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);
//   if (loading) {
//     // Render a loading spinner or placeholder during the loading state
//     return <div>Loading...</div>; // Replace with your preferred loading UI
//   }
//   if (currentUser === null) {
//     console.log("No user found, currentUser is null.");
//   }
//  return (
//     <AuthContext.Provider value={{ currentUser}}>
//     { children}
//     </AuthContext.Provider>
//   );
// };
// // Add this line for the default export
// export default AuthProvider;

import { createContext,useState,useContext } from "react";

const AuthContext=createContext();

const AuthProvider=({children})=>{
    const [isAuthenticated,setIaAuthenticated]=useState(!!localStorage.getItem("token"))

    return (
      <AuthContext.Provider value={{isAuthenticated,setIaAuthenticated}}>
        {children}
      </AuthContext.Provider>
    );
};

export default AuthProvider;
export const useAuth=()=>useContext(AuthContext);