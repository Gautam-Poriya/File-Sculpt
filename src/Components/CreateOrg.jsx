import React from "react";
import { useState, useEffect, useRef } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext";
import axios from "axios";
//organization

const CreateOrg = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const { mainButtonLabel, setMainButtonLabel } = useAppContext();
 const [newOrganization, setNewOrganization] = useState("");

  const dropdownRef = useRef(null);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  // Load organizations from localStorage and ensure "Test-Org" is included
  useEffect(() => {
    const savedOrganizations =
      JSON.parse(localStorage.getItem("organizations")) || [];

    // Ensure "Test-Org" is included in the list
    if (!savedOrganizations.some((org) => org.name === "Test-Org")) {
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
      if (organizations.some((org) => org.name === newOrganization)) {
        alert("Organization already exists!");
        return;
      }

      const newOrg = { id: organizations.length + 1, name: newOrganization };
      const updatedOrganizations = [...organizations, newOrg];

      setOrganizations(updatedOrganizations);
      localStorage.setItem(
        "organizations",
        JSON.stringify(updatedOrganizations)
      );
      setMainButtonLabel(newOrganization);
      setNewOrganization("");
      setIsDropdownOpen(false);
      setIsCreateModalOpen(false);
    }
  };

  const handleCreateOrganizations = async (e) => {
    e.preventDefault();

    if (!newOrganization.trim()) {
      alert("Organization name cannot be empty!");
      return;
    }
    e.preventDefault();
    if (newOrganization.trim()) {
      // Check for duplicates
      if (organizations.some((org) => org.name === newOrganization)) {
        alert("Organization already exists!");
        return;
      }

      const newOrg = { id: organizations.length + 1, name: newOrganization };
      const updatedOrganizations = [...organizations, newOrg];

      setOrganizations(updatedOrganizations);
      localStorage.setItem(
        "organizations",
        JSON.stringify(updatedOrganizations)
      );
      setMainButtonLabel(newOrganization);
      setNewOrganization("");
      setIsDropdownOpen(false);
      setIsCreateModalOpen(false);
    }
    const token = localStorage.getItem("jwt"); // Get JWT from localStorage

    try {
      const response = await axios.post(
        "https://file-sculpt-backend.onrender.com/api/organizations",
        {
          // userId: user.id, // Replace with the actual user ID
          token: token,
          organizationName: newOrganization,
        }
      );
      console.log("Organization created:", response.data);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating organization:", error);
      alert("Failed to create organization. Please try again.");
    }
  };

  return (
    <>
      {/* ref={buttonRef} */}
      <div className="w-56 h-12 border border-slate-200 flex items-center rounded-xl relative bg-white/80 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group">
        <button
          ref={buttonRef}
          className="flex w-full items-center justify-between px-4 py-2 font-semibold text-blue-900 focus:outline-none"
          onClick={toggleDropdown}
        >
          <span className="truncate flex items-center gap-2">
            <svg
              className="w-5 h-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
              />
            </svg>
           {mainButtonLabel} 
          </span>
          <svg
            className={`w-5 h-5 ml-2 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      {/* ref={dropdownRef} */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="w-56 border border-slate-200 bg-gradient-to-br from-blue-50 to-pink-50 rounded-xl shadow-xl absolute z-20 animate-org-dropdown-fade-in top-full"
        >
          <div className="rounded-t-xl w-full flex items-center justify-center border-b border-b-slate-100 bg-white/80 px-2 py-2">
            <input
              type="text"
              placeholder="Search Organization..."
              className="h-9 w-full rounded-md px-2 focus:outline-none bg-white/70 text-blue-900"
            />
          </div>
          <div className="max-h-56 overflow-y-auto">
            {organizations.map((org, index) => (
              <div
                key={index}
                className="w-full flex items-center justify-center transition-all duration-150"
              >
                <button
                  onClick={() => handleSelectOrganization(org.name)}
                  className="h-10 w-48 rounded-md flex items-center justify-start px-3 text-blue-900 hover:bg-blue-100 transition-all duration-150"
                >
                  <svg
                    className="w-4 h-4 mr-2 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
                    />
                  </svg>
                  {org.name}
                </button>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col gap-2 p-2 border-t border-t-slate-100 bg-white/80 rounded-b-xl">
            <button
              className="h-10 w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white font-semibold rounded-lg shadow transition-all duration-200 flex items-center justify-center gap-2 hover:from-blue-500 hover:to-pink-500 hover:scale-105"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Organization
            </button>
            <button
              className="h-10 w-full bg-white/90 text-blue-900 font-semibold rounded-lg border border-blue-200 shadow transition-all duration-200 flex items-center justify-center gap-2 hover:bg-blue-100 hover:text-blue-900 hover:scale-105"
              onClick={() => {
                setIsDropdownOpen(false);
                handleManageOrganization();
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Manage Organization
            </button>
            {/* <button
              className="h-10 w-full bg-red-100 text-red-700 font-semibold rounded-lg border border-red-200 shadow transition-all duration-200 flex items-center justify-center gap-2 hover:bg-red-200 hover:text-red-900 hover:scale-105 mt-1"
              onClick={() => {
                setOrganizations([]);
                localStorage.setItem("organizations", JSON.stringify([]));
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Clear All Organizations
            </button> */}
          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <>
          {/* Full-screen overlay for modal */}
          <div
            className="fixed inset-0  bg-opacity-40 z-40 animate-org-modal-fade-in"
            onClick={() => setIsCreateModalOpen(false)}
          ></div>
          {/* Modal box, centered and above overlay */}
          <div
            className="fixed inset-0 z-50 flex justify-center items-center animate-org-modal-fade-in"
            style={{ paddingTop: "5rem", height: "calc(100vh - 5rem)" }}
          >
            <div
              ref={modalRef}
              className="bg-gradient-to-br from-blue-50 to-pink-100/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-blue-200 animate-org-modal-scale-in flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 transition-colors duration-200 z-20"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Organization
              </h2>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Organization Name
              </label>
              <input
                type="text"
                value={newOrganization}
                onChange={(e) => setNewOrganization(e.target.value)}
                className="w-full px-3 py-2 mb-4 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 transition-all duration-200"
                placeholder="Enter organization name"
              />
              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleCreateOrganizations}
                  className="flex-1 py-2 text-white bg-gradient-to-r from-pink-400 to-blue-400 rounded-lg font-semibold shadow transition-all duration-200 hover:from-blue-500 hover:to-pink-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create
                </button>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-2 text-blue-900 bg-white/90 border border-blue-200 rounded-lg font-semibold shadow transition-all duration-200 hover:bg-blue-100 hover:text-blue-900 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <style>{`
        @keyframes orgDropdownFadeIn {
          0% { opacity: 0; transform: translateY(16px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-org-dropdown-fade-in {
          animation: orgDropdownFadeIn 0.4s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes orgModalFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-org-modal-fade-in {
          animation: orgModalFadeIn 0.3s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes orgModalScaleIn {
          0% { opacity: 0; transform: scale(0.96); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-org-modal-scale-in {
          animation: orgModalScaleIn 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
    </>
  );
};

export default CreateOrg;
