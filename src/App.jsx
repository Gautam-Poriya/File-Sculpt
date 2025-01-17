import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import React from "react";
import Home from "./Components/Home.jsx";
import Parse from "./Components/Parse.jsx";
import Settings from "./Components/Settings.jsx";
import OragnizationMembers from "./Components/OragnizationMembers.jsx";
import ApiKey from "./Components/ApiKey";
import SignIn from "./SignIn";
import AuthProvider from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import SignUpForWaitList from "./Components/SignUpForWaitList.jsx"
import ParsedResult from "./Components/ParsedResult.jsx"
function App() {
  return (
   
   
      <Router>
        <Routes>
          
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/parse" element={<Parse />} />
          <Route path="/parse-result" element={<ParsedResult />}/>
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/settings/Organization/members"
            element={<OragnizationMembers />}
          />
          <Route path="/Project/uuid/ApiKey" element={<ApiKey />} />
          <Route path="/parse/history" element={<History />}/>
          <Route path="/uuid/waitlist-form" element={<SignUpForWaitList/>} />
        </Routes>
      </Router>
      
  )
}



export default App;
