
import React from "react";
import { useState , useEffect,useRef} from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext";
import axios from "axios";
//organization

const CreateOrg = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [organizations, setOrganizations] = useState([]);
//   const [mainButtonLabel, setMainButtonLabel] = useState("Test-Org");
const {mainButtonLabel,setMainButtonLabel} = useAppContext();
  const [newOrganization, setNewOrganization] = useState("");

  const dropdownRef = useRef(null);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  // Load organizations from localStorage and ensure "Test-Org" is included
  useEffect(() => {
    const savedOrganizations = JSON.parse(localStorage.getItem("organizations")) || [];
    
    // Ensure "Test-Org" is included in the list
    if (!savedOrganizations.some(org => org.name === "Test-Org")) {
      savedOrganizations.unshift({ id: 1, name: "Test-Org" });
    }

    setOrganizations(savedOrganizations);
  }, [navigate]);

  // Save organizations to localStorage whenever they change
  useEffect(() => {
    if (organizations.length > 0) {
      localStorage.setItem("organizations", JSON.stringify(organizations));
    }
  }, [organizations]);

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      modalRef.current &&
      !modalRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
      setIsCreateModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectOrganization = (orgName) => {
    setMainButtonLabel(orgName);
    setIsDropdownOpen(false);
  };

  const handleManageOrganization = () => {
    navigate("/settings");
  };

  const handleCreateOrganization = (e) => {
    e.preventDefault();
    if (newOrganization.trim()) {
      // Check for duplicates
      if (organizations.some(org => org.name === newOrganization)) {
        alert("Organization already exists!");
        return;
      }

      const newOrg = { id: organizations.length + 1, name: newOrganization };
      const updatedOrganizations = [...organizations, newOrg];

      setOrganizations(updatedOrganizations);
      localStorage.setItem("organizations", JSON.stringify(updatedOrganizations));
      setMainButtonLabel(newOrganization);
      setNewOrganization("");
      setIsDropdownOpen(false);
      setIsCreateModalOpen(false);
    }
  };

  const handleCreateOrganizations = async (e) => {
    e.preventDefault();
  
    // if (!newOrganization.trim()) {
    //   alert("Organization name cannot be empty!");
    //   return;
    // }
    e.preventDefault();
    if (newOrganization.trim()) {
      // Check for duplicates
      if (organizations.some(org => org.name === newOrganization)) {
        alert("Organization already exists!");
        return;
      }

      const newOrg = { id: organizations.length + 1, name: newOrganization };
      const updatedOrganizations = [...organizations, newOrg];

      setOrganizations(updatedOrganizations);
      localStorage.setItem("organizations", JSON.stringify(updatedOrganizations));
      setMainButtonLabel(newOrganization);
      setNewOrganization("");
      setIsDropdownOpen(false);
      setIsCreateModalOpen(false);
    }
    const token = localStorage.getItem("jwt"); // Get JWT from localStorage

   
    try {
      const response = await axios.post("http://localhost:5000/api/organizations", {
        // userId: user.id, // Replace with the actual user ID
        token:token,
        organizationName: newOrganization,
      });
      console.log("Organization created:", response.data);
      setIsCreateModalOpen(false);
    }catch (error) {
      console.error("Error creating organization:", error);
      alert("Failed to create organization. Please try again.");
    }
  };

  return (
    <>
    {/* ref={buttonRef} */}
      <div  className="w-52 h-10 border border-slate-300 flex items-center rounded-md relative hover:bg-slate-100 duration-100">
        <button className="flex w-48 items-center ml-4" onClick={toggleDropdown}>
          {mainButtonLabel}
        </button>
      </div>
    {/* ref={dropdownRef} */}
      {isDropdownOpen && (
        <div  className="w-52 border mt-1 h-auto bg-white rounded-lg absolute z-10">
          <div className="rounded-md w-48 mt-1 ml-2 flex items-center justify-center border-b border-b-slate-50 hover:bg-slate-200">
            <input type="text" placeholder="Search Organization..." className="h-8 w-48 rounded-md focus:outline-none" />
          </div>

          {organizations.map((org, index) => (
            <div key={index} className="rounded-md w-48 ml-2 flex items-center justify-center hover:bg-slate-200">
              <button onClick={() => handleSelectOrganization(org.name)} className="h-8 w-48 rounded-md">
                {org.name}
              </button>
            </div>
          ))}

          <div className="w-52 h-14 flex items-center justify-center rounded-md hover:bg-slate-200">
            <button className="h-10 w-48 border border-slate-300 rounded-md hover:bg-slate-200" onClick={() => setIsCreateModalOpen(true)}>
              Create Organization
            </button>
          </div>

          <div className="w-52 h-14 flex items-center justify-center rounded-md hover:bg-slate-200">
            <button className="h-10 w-48 border border-slate-300 rounded-md hover:bg-slate-200" onClick={handleManageOrganization}>
              Manage Organization
            </button>
          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/*  ref={modalRef} */}
            <div className="bg-white p-6 rounded-md shadow-lg w-96 h-52 relative">
              <h2 className="text-xl font-bold mb-4">Create Organization</h2>
              {/* <form onSubmit={handleCreateOrganization}> */}
                <label className="block mb-2 text-sm font-medium text-gray-700">Organization Name</label>
                <input
                  type="text"
                  value={newOrganization}
                  onChange={(e) => setNewOrganization(e.target.value)}
                  className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter organization name"
                />
                <button onClick={handleCreateOrganizations} className="w-16 py-2 text-white bg-black rounded-md">
                  Create
                </button>
              {/* </form> */}
              <button onClick={() => setIsCreateModalOpen(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};


export default CreateOrg;