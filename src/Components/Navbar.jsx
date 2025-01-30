import react from "react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
// import { useAuth } from "../AuthContext"; // Import the custom hook

const Navbar = () => {
  const navigate = useNavigate();

  function handleRedirect() {
    navigate("/");
  }

  return (
    <>
      <nav className="  border-b-slate-50 border-b-2">
        <div className=" flex items-center  bg-white border-b-gray-900">
          <div className="ml-8 ">
            <button onClick={handleRedirect}>
              <img
                src="https://cloud.llamaindex.ai/assets/logo.svg"
                className="h-16 w-28 "
              />
            </button>
          </div>
          {/* <div className="ml-16">
           <select name="Test-Org" className="w-40 bg-slate-50 hover:bg-slate-100 duration-200 border-none rounded-md">
                    <option className="rounded-tl-md rounded-tr-md mt-3 hover:bg-slate-500 bg-transparent">Test-Org</option>
                    <option>Default-Org</option>
                    <option>Create-Org</option>
                    <option >Manage-Org</option>
           </select>
          </div>
          <div className="ml-16">
           <select name="Test-Org" className="w-40 bg-slate-50 hover:bg-slate-100 duration-200 border-none rounded-md">
                    <option className="rounded-tl-md rounded-tr-md mt-3 hover:bg-slate-500 bg-transparent">Test-Org</option>
                    <option>Default-Org</option>
                    <option>Create-Org</option>
                    <option >Manage-Org</option>
           </select> */}

          {/* </div> */}
          <div className="ml-16">
            <CreateAndManageOrganization />
          </div>
          <div className="ml-16">
            <CreateAndManageProject />
          </div>
          {/* <div className="ml-40 w-20 ">
            <UserProfile />
          </div> */}
        </div>
      </nav>
    </>
  );
};
export default Navbar;

const CreateAndManageOrganization = () => {
  const navigate = useNavigate();
  const [
    isCreateAndManageOrganizationIsOpen,
    setIsCreateAndManageOrganizationIsOpen,
  ] = useState(false);
  const [isCreateOrganizationIsOpen, setIsCreateOrganizationIsOpen] =
    useState(false);

  const [newOrganization, setNewOrganization] = useState("");

  // const [organizations, setOrganizations] = useState([
  //   { id: 1, name: "Org 1" },
  //   { id: 2, name: "Org 2" },
  //   { id: 3, name: "Org 3" },
  // ]);

  const [mainButtonLabel, setMainButtonLabel] = useState("Test-Org");
  const modalRef = useRef(null); // Reference for the modal content
  

  const handleClickOutside = (event) => {
    // Close the element if clicking outside of it
    if (isCreateOrganizationIsOpen) {
      setIsCreateOrganizationIsOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener when the component is mounted
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isCreateOrganizationIsOpen]);

  const handleOrganizationButton = () => {
    setIsCreateAndManageOrganizationIsOpen(
      !isCreateAndManageOrganizationIsOpen
    );
  };

  const handleCreateAndManageOrganizationButton = (e) => {
    e.preventDefault();
    if (newOrganization.trim()) {
      const newOrg = {
        id: organizations.length + 1, // Generate a simple ID based on length
        name: newOrganization,
      };

      setOrganizations([...organizations, newOrg]);
      setMainButtonLabel(newOrganization); // Update main button label to new organization
      setNewOrganization(""); // Clear input field
      setIsCreateAndManageOrganizationIsOpen(false); // Close dropdown

      setIsCreateOrganizationIsOpen(false);
    }
  };
  // Load organizations from local storage when the component mounts
  useEffect(() => {
    const savedOrganizations = JSON.parse(
      localStorage.getItem("organizations")
    );
    if (savedOrganizations) {
      setOrganizations(savedOrganizations);
    }
  }, []);

  // // Save organizations to local storage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("organizations", JSON.stringify(organizations));
  // }, [organizations]);
  // Update localStorage whenever organizations change
  useEffect(() => {
    try {
      localStorage.setItem("organizations", JSON.stringify(organizations));
      console.log("Organizations saved to localStorage:", organizations);
    } catch (error) {
      console.error("Failed to save organizations to localStorage:", error);
    }
  }, [organizations]);

  const handleButtonClick = (buttonText) => {
    setMainButtonLabel(buttonText);
    setIsCreateAndManageOrganizationIsOpen(false); // Close dropdown after selection
  };

  function handleManageOrganization() {
    navigate("/settings");
  }
  return (
    <>
      <div className="w-52 h-10  border  border-slate-300 flex items-center rounded-md  relative hover:bg-slate-100 duration-100">
        <button
          className="flex w-48 items-center ml-4"
          onClick={(e) => {
            e.stopPropagation();
            handleOrganizationButton();
          }}
        >
          {mainButtonLabel} {/* Display main button label */}
        </button>
      </div>
      {isCreateAndManageOrganizationIsOpen && (
        <div className="w-52 border mt-1 h-auto  bg-white rounded-lg absolute expanded-section ">
          <div className="rounded-md w-48 mt-1 ml-2 flex items-center justify-center border-b border-b-slate-50 hover:bg-slate-200">
            <input
              type="text"
              placeholder="Search Oranization..."
              className="h-8 w-48  items-center  rounded-md focus:outline-none"
            />
          </div>
          {/* <div className="rounded-md w-48 ml-2 flex items-center justify-center hover:bg-slate-200">
            <button className="h-8 w-48 items-center  rounded-md">
              Test-Org
            </button>
          </div>
          <div className="rounded-md w-48 ml-2 flex items-center justify-center hover:bg-slate-200">
            {" "}
            <button className="h-8 w-48 items-center  rounded-md">
              Default-Org
            </button>
          </div> */}

          {organizations.map((org, index) => (
            <div className="rounded-md w-48 ml-2 flex items-center justify-center hover:bg-slate-200">
              <button
                key={index}
                onClick={() => handleButtonClick(org.name)} // Update button text on click
                className="h-8 w-48 items-center  rounded-md"
              >
                {org.name}
              </button>
            </div>
          ))}
          <div className=" w-52  h-14 flex items-center justify-center  rounded-md hover:bg-slate-200">
            {" "}
            <button
              className="h-10 w-48 border border-slate-300  items-center rounded-md relative hover:bg-slate-200 "
              onClick={openDialog}
            >
              Create Organization
            </button>
            {/* Dialog box */}
            {isCreateOrganizationIsOpen && (
              <>
                {/* Overlay to disable background */}
                <div className="fixed inset-0 bg-black opacity-50"></div>

                {/* Modal Content */}
                <div className="fixed inset-0 flex items-center justify-center">
                  <div
                    ref={modalRef} // Set reference on the modal content
                    className="bg-white p-6 rounded-md shadow-lg w-96 h-52 relative z-10"
                  >
                    <h2 className="text-xl font-bold mb-4">
                      Create Organization
                    </h2>
                    <form onSubmit={handleCreateAndManageOrganizationButton}>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        value={newOrganization}
                        onChange={(e) => setNewOrganization(e.target.value)}
                        className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter organization name"
                      />
                      <button
                        type="submit"
                        className="w-16 py-2 ml-72 text-white bg-black  rounded-md"
                      >
                        Create
                      </button>
                    </form>

                    {/* Cancel button */}
                    <button
                      onClick={closeDialog}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className=" w-52  h-14 flex items-center justify-center  rounded-md hover:bg-slate-200">
            {" "}
            <button
              className="h-10 w-48 border border-slate-300  items-center rounded-md  hover:bg-slate-200"
              onClick={handleManageOrganization}
            >
              Manage organization
            </button>
          </div>
        </div>
      )}
    </>
  );
};

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
  // const { currentUser } = useAuth(); // Access currentUser from AuthContext
  return (
    <>
      <div className="flex items-center space-x-1 ml-[72px] w-auto">
        {/* Display user's name */}
        <div className="h-auto">
          {/* <div>   <span className="text-black">{currentUser.displayName}</span></div> */}
          {/* Display user's email */}
          {/* <div>  <span className="text-black">{currentUser.email}</span></div> */}
        </div>
        {/* Display user's profile picture */}
        <div>
          {/* <img
            src={currentUser.photoURL ||  "https://www.example.com/default-avatar.png"} // Fallback image if no profile picture
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          /> */}
        </div>
      </div>
    </>
  );
};
