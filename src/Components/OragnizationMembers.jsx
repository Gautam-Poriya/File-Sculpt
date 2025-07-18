import React from "react";
import Navbar from "./Navbar.jsx";
import Services from "./Aside/Services.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const OragnizationMembers = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Navbar />
      <section className="flex flex-1 min-h-0 min-w-0 h-[calc(100vh-80px)]">
        <Services collapsed={collapsed} setCollapsed={setCollapsed} />
        <Members collapsed={collapsed} />
      </section>
    </>
  );
};
export default OragnizationMembers;

const Members = ({ collapsed }) => {
  const navigate = useNavigate();
  function handleOrganizationButton() {
    navigate("/settings");
  }
  return (
    <article className={`flex-1 min-h-0 min-w-0 flex flex-col overflow-hidden p-6 transition-all duration-300 ${collapsed ? 'ml-14' : 'ml-52 md:ml-64'}`}>
      <div className="w-full h-full min-h-0 min-w-0 bg-white/80 rounded-2xl shadow-2xl p-4 sm:p-8 flex flex-col items-center border border-slate-200 backdrop-blur-md transition-all duration-300 animate-members-fade-in">
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 animate-members-fade-in">
          <div className="flex flex-col flex-1">
            <h5 className="font-bold text-2xl text-blue-900">Settings</h5>
            <p className="text-gray-600 mt-1">Manage organization settings and members.</p>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0 justify-end">
            <button className="w-40 h-11 text-center flex items-center justify-center bg-white/80 text-blue-700 font-semibold rounded-lg shadow border border-blue-200 transition-all duration-200 hover:bg-blue-100 hover:text-blue-900 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={() => window.location.href='/settings'}>Organization</button>
            <button className="w-40 h-11 text-center flex items-center justify-center bg-gradient-to-r from-pink-400 to-blue-400 text-white font-semibold rounded-lg shadow transition-all duration-200 hover:from-blue-500 hover:to-pink-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300" disabled>Members</button>
          </div>
        </div>
        <div className="w-full h-full min-h-40 min-h-0 min-w-0 bg-gradient-to-br from-blue-50 to-pink-50 border border-slate-200 rounded-xl shadow-inner p-4 sm:p-6 flex flex-col items-center justify-center animate-members-card-fade-in">
          <div className="w-full h-full flex flex-col flex-grow min-h-0">
            <MemberFunctionalities />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes membersFadeIn {
          0% { opacity: 0; transform: translateY(32px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-members-fade-in {
          animation: membersFadeIn 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes membersCardFadeIn {
          0% { opacity: 0; transform: translateY(16px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-members-card-fade-in {
          animation: membersCardFadeIn 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </article>
  );
};

const MemberFunctionalities = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col flex-grow min-h-0">
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 animate-settings-fade-in">
          <div className="flex flex-col">
            <h5 className="font-bold text-xl text-blue-900">Members</h5>
            <p className="mt-3 text-gray-700">
              <span>
                Members within an organization have access to all projects under
                the organization.
              </span>
              <br />
              <span className="mt-3">
                Billing and API keys are still handled at the individual account
                level.
              </span>
            </p>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button className="bg-gradient-to-r from-pink-400 to-blue-400 text-white font-semibold h-11 w-40 rounded-lg shadow transition-all duration-200 hover:from-blue-500 hover:to-pink-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300">Add members</button>
          </div>
        </div>
        <div className="border rounded-xl bg-white/80 shadow-inner flex-1 min-h-0 overflow-x-auto flex flex-col">
          <div className="h-14 w-full flex flex-nowrap min-w-[600px] items-center border-b-2 border-b-slate-200 rounded-t-xl px-6">
            <div className="flex-1 min-w-[120px] text-blue-900 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">Email</div>
            <div className="flex-1 min-w-[100px] text-blue-900 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">Added By</div>
            <div className="flex-1 min-w-[80px] text-blue-900 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">Role</div>
            <div className="flex-1 min-w-[100px] text-blue-900 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">Projects</div>
            <div className="flex-1 min-w-[80px] text-blue-900 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">Actions</div>
          </div>
          <div className="flex-1 min-h-0 h-full flex items-center justify-center text-slate-500 font-semibold text-lg min-w-[600px]">No Member Added</div>
        </div>
      </div>
    </>
  );
};
