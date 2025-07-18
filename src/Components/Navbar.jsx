import react from "react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../AuthContext"; // Import the custom hook
import { getAuth, signOut } from "firebase/auth";
import CreateOrg from "./CreateOrg";
import { useAppContext } from "./AppContext";
const Navbar = () => {
  const navigate = useNavigate();

  function handleRedirect() {
    navigate("/home");
  }

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-lg animate-navbar-fade-in border-b border-slate-200 h-20 transition-all duration-300">
        <div className="flex items-center h-full px-6">
          <div className="ml-2 flex items-center">
            <button
              onClick={handleRedirect}
              className="flex justify-center items-center gap-2 hover:scale-105 transition-transform duration-200"
            >
              <img src="FileSculpt.svg" className="h-10 w-10 rounded-lg shadow-md" />
              <span className="text-3xl font-bold font-sans mb-2 text-gray-800 tracking-tight drop-shadow-sm">
                FileSculpt
              </span>
            </button>
          </div>
          <div className="ml-20 flex items-center">
            <CreateOrg />
          </div>
          <div className="ml-auto">
            <Userprofile />
          </div>
        </div>
        <style>{`
          @keyframes navbarFadeIn {
            0% { opacity: 0; transform: translateY(-30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-navbar-fade-in {
            animation: navbarFadeIn 0.7s cubic-bezier(0.23, 1, 0.32, 1);
          }
        `}</style>
      </nav>
      <div className="h-20" /> {/* Spacer to prevent content from being hidden behind fixed navbar */}
    </>
  );
};
export default Navbar;

const CreateAndManageProject = () => {
  const [isCreateAndManageProjectIsOpen, setIsCreateAndManageProjectIsOpen] =
    useState(false);
  function handleCreateAndManageProjectButton() {
    setIsCreateAndManageProjectIsOpen(!isCreateAndManageProjectIsOpen);
  }
  return (
    <>
      <div className="w-52 h-10  border  border-slate-300 flex items-center rounded-md  relative hover:bg-slate-100 duration-100">
        <button
          className="flex w-48 items-center ml-4"
          onClick={handleCreateAndManageProjectButton}
        >
          Default
        </button>
      </div>
      {isCreateAndManageProjectIsOpen && (
        <div className="w-52 border mt-1 h-auto  bg-white rounded-lg absolute expanded-section ">
          <div className="rounded-md w-48 mt-1 ml-2 flex items-center justify-center border-b border-b-slate-50 hover:bg-slate-200">
            <input
              type="text"
              placeholder="Search Oranization..."
              className="h-8 w-48  items-center  rounded-md focus:outline-none"
            />
          </div>
          <div className="rounded-md w-48 ml-2 flex items-center justify-center hover:bg-slate-200">
            <button className="h-8 w-48 items-center  rounded-md">
              Default
            </button>
          </div>
          {/* <div className="rounded-md w-48 ml-2 flex items-center justify-center hover:bg-slate-200">
            {" "}
            <button className="h-8 w-48 items-center  rounded-md">
              Default-Org
            </button>
          </div> */}
          {/* <div className=" w-52  h-14 flex items-center justify-center  rounded-md hover:bg-slate-200">
            {" "}
            <button className="h-10 w-48 border border-slate-300  items-center rounded-md  hover:bg-slate-200 ">
              Create Organization
            </button>
          </div> */}
          <div className=" w-52  h-14 flex items-center justify-center  rounded-md hover:bg-slate-200">
            {" "}
            <button className="h-10 w-48 border border-slate-300  items-center rounded-md  hover:bg-slate-200 ">
              Create Project
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const UserProfile = () => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return null;
  }
  return (
    <>
      <div className="flex items-center space-x-1 ml-[72px] w-auto">
        {/* Display user's name */}
        <div className="h-auto">
          <div>
            {" "}
            <span className="text-black">{currentUser.name}</span>
          </div>
          {/* Display user's email */}
          <div>
            {" "}
            <span className="text-black">{currentUser.email}</span>
          </div>
        </div>
        {/* Display user's profile picture */}
        <div>
          <img
            src={
              currentUser.photoURL ||
              "https://www.example.com/default-avatar.png"
            } // Fallback image if no profile picture
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </>
  );
};

//user profile testing

const Userprofile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  // const [currentUser, setCurrentUser] = useState(null);
  const { currentUser, setCurrentUser } = useAppContext();

  useEffect(() => {
    // Listen for authentication state change
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to sign-in page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!currentUser) {
    return null; // Show nothing if the user is not logged in
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center gap-3 px-4 py-2 bg-white/90 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-200 group">
      {/* Profile Picture */}
          <img
            src={
              currentUser.photoURL ||
              "https://www.example.com/default-avatar.png"
          }
            alt="User Avatar"
          className="w-9 h-9 rounded-full border-2 border-blue-200 shadow-sm group-hover:scale-105 group-hover:border-blue-400 transition-transform duration-200"
        />
        {/* User Info */}
        <div className="flex flex-col items-start justify-center">
          <span className="text-gray-900 font-semibold text-base leading-tight group-hover:text-blue-700 transition-colors">
            {currentUser.displayName}
          </span>
          <span className="text-gray-500 text-xs leading-tight group-hover:text-blue-500 transition-colors">
            {currentUser.email}
          </span>
        </div>
          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
          className="ml-4 px-3 py-1 bg-gradient-to-r from-pink-400 to-blue-400 text-white text-xs rounded-lg shadow hover:from-blue-500 hover:to-pink-500 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Sign Out
          </button>
      </div>
    </div>
  );
};
