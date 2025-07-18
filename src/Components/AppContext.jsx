import React, { createContext, useState, useContext } from 'react';

// Create a context
const AppContext = createContext();

// Custom hook to use context
 export const useAppContext = () => {
  return useContext(AppContext);
};

// Provider component to wrap the app
 export const AppProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState("Accurate");
    const [mainButtonLabel, setMainButtonLabel] = useState("Test-Org");
    const [userData,setUserData]=useState("abc@gmail.com");
    const [currentUser,setCurrentUser]=useState();
   // const [newOrganization, setNewOrganization] = useState("Test-Org");

  

  return (
    <AppContext.Provider value={{ selectedOption, setSelectedOption ,mainButtonLabel,setMainButtonLabel,userData,setUserData,currentUser,setCurrentUser}}>
      {children}
    </AppContext.Provider>
  );
};
  export default AppProvider