// import React from "react";
// import { Navigate, useNavigate} from 'react-router-dom';
// import { useAuth } from './AuthContext';

//  const PrivateRoute= ( { children })=>{
//     const {currentUser} = useAuth();
//     const navigate=useNavigate();
//     // if no user is sign in then redirect to sign in
//     // return currentUser ? Children : <Navigate to="/signin"/>;
//       // If there's no current user, redirect to the sign-in page
//   if (!currentUser) {
//   navigate('/signin')
//   return null;
//   }

//   // Otherwise, render the protected component
//   return children;
// }
// export default PrivateRoute;

import { Navigate,Outlet } from "react-router-dom";
import {useAuth} from "./AuthContext";

const PrivateRoute=()=>{
  const isAuthenticated=useAuth();
  return(
    isAuthenticated ? <Outlet/> : <Navigate to="/"/>
  )
}

export default PrivateRoute;