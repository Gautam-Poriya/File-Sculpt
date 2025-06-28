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
      <nav className="  border-b-slate-50 border-b-2 h-20">
        <div className=" flex items-center  bg-white border-b-gray-900 h-full">
          <div className="ml-8 justify-center items-centerflex  ">
            <button
              onClick={handleRedirect}
              className="flex justify-center items-center gap-2 "
            >
              <img src="FileSculpt.svg" className="h-8 w-8 sm:h-6 sm:w-6" />
              <span className="text-3xl  font-bold font-sans mb-2 ">
                FileSculpt
              </span>
            </button>
          </div>

          {/* <div className="ml-16 ">
            <CreateOrg />
          </div>
          <div className="ml-16 ">
            <CreateAndManageProject />
          </div> */}
          <div className="ml-[700px]  ">
        
            <Userprofile />
          </div>
        </div>
      </nav>
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
    <div className="flex items-center space-x-4 ml-[90px]">
      {/* User Name and Email */}
      <div className="h-auto">
        <div>
          <span className="text-black font-bold">
            {currentUser.displayName}
          </span>
        </div>
        <div>
          <span className="text-gray-700">{currentUser.email}</span>
        </div>
      </div>
      {/* Profile Picture */}
      <div className="justify-center items-center mt-1">
        <div className="">
          <img
            src={
              currentUser.photoURL ||
              "https://www.example.com/default-avatar.png"
            } // Fallback image
            alt="User Avatar"
            className="w-6 h-6 ml-2 rounded-full"
          />
        </div>

        <div className="w-20">
          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className=" text-red-600 text-xs -mt-2 rounded"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
