import React, { useEffect, useState } from "react"
import Navbar from "./Navbar.jsx";
import Services from "./Aside/Services.jsx";
import { useNavigate } from "react-router-dom"
import axios from "axios";
const Settings = () =>{
    const [collapsed, setCollapsed] = useState(false);
    return(
      <>
        <Navbar />
        <section className="flex flex-1 min-h-0 min-w-0 h-[calc(100vh-80px)]">
          <Services collapsed={collapsed} setCollapsed={setCollapsed} />
          <SettingPageFunctionalities collapsed={collapsed} />
        </section>
      </>
    )
}

export default Settings;

function SettingPageFunctionalities({ collapsed }) {
  const [allOrganizations, setAllOrganizations] = useState([]);
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get("https://file-sculpt-backend.onrender.com/api/organizations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllOrganizations(response.data);
      } catch (error) {
        console.log("Error in fetching all orgs", error);
      }
    };
    fetchOrganizations();
  }, [token]);

  function handleMemberButton(){
      navigate("/settings/Organization/members")
  }
  return(
    <article className={`flex-1 min-h-0 min-w-0 flex flex-col overflow-hidden p-2 sm:p-6 transition-all duration-300 ${collapsed ? 'ml-14' : 'ml-52 md:ml-64'}`}>
      <div className="w-full h-full min-h-0 min-w-0 bg-white/80 rounded-2xl shadow-2xl p-4 sm:p-8 flex flex-col items-center border border-slate-200 backdrop-blur-md transition-all duration-300 animate-settings-fade-in">
        <div className="w-full border-b-slate-100 border-b-2 pb-4 mb-4">
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col flex-1">
              <h5 className="font-bold text-2xl text-blue-900">Settings</h5>
              <p className="text-gray-600 mt-1">Manage organization settings and members.</p>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0 justify-end">
              <button className="w-40 h-11 text-center flex items-center justify-center bg-gradient-to-r from-pink-400 to-blue-400 text-white font-semibold rounded-lg shadow transition-all duration-200 hover:from-blue-500 hover:to-pink-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300" disabled>Organization</button>
              <button className="w-40 h-11 text-center flex items-center justify-center bg-white/80 text-blue-700 font-semibold rounded-lg shadow border border-blue-200 transition-all duration-200 hover:bg-blue-100 hover:text-blue-900 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={handleMemberButton}>Members</button>
            </div>
          </div>
        </div>
        <div className="w-full h-full min-h-40 min-h-0 min-w-0 bg-gradient-to-br from-blue-50 to-pink-50 border border-slate-200 rounded-xl shadow-inner p-4 sm:p-6 flex flex-col items-center justify-center animate-settings-card-fade-in">
          {/* Organization List Header */}
          <div className="w-full grid grid-cols-2 items-center border-b-2 h-14 border-b-slate-100 rounded-md mb-4">
            <div className="text-center text-blue-900 font-semibold">Organization ID</div>
            <div className="text-center text-blue-900 font-semibold">Organization Name</div>
          </div>
          {/* Organization List Section */}
          {allOrganizations.length === 0 ? (
            <div className="flex justify-center items-center font-bold h-28 text-lg text-gray-700">
              No organizations found.
            </div>
          ) : (
            <div
              className={`flex flex-col w-full gap-2 ${allOrganizations.length > 3 ? 'overflow-y-auto custom-scrollbar' : ''}`}
              style={allOrganizations.length > 3 ? { maxHeight: '260px' } : {}}
            >
              {allOrganizations.map(org => (
                <div
                  key={org.Organization_Id}
                  className="grid grid-cols-2 items-center border border-blue-100 bg-white/70 rounded-lg shadow-sm py-3 px-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg animate-org-fade-in"
                  style={{ animationDelay: `${0.05 * (allOrganizations.indexOf(org) + 1)}s` }}
                >
                  <div className="text-center text-blue-700 font-bold text-lg tracking-wide truncate overflow-ellipsis whitespace-nowrap">
                    {org.Organization_Id}
                  </div>
                  <div className="text-center text-pink-600 font-semibold text-lg">
                    {org.Organization_Name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes settingsFadeIn {
          0% { opacity: 0; transform: translateY(32px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-settings-fade-in {
          animation: settingsFadeIn 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes settingsCardFadeIn {
          0% { opacity: 0; transform: translateY(16px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-settings-card-fade-in {
          animation: settingsCardFadeIn 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          @keyframes orgFadeIn {
            0% { opacity: 0; transform: translateY(16px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-org-fade-in {
            animation: orgFadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #a5b4fc #f3f4f6;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
            background: #f3f4f6;
            border-radius: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #a5b4fc;
            border-radius: 8px;
          }
      `}</style>
    </article>
  )
}