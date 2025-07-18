// import React from "react";
// import Navbar from "./Navbar.jsx";
// import Services from "./Aside/Services.jsx";
// import { useState } from "react";
// const ApiKey = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   return (
//     <>
//       <Navbar />
//       <section className="flex flex-1 min-h-0 min-w-0 h-[calc(100vh-80px)]">
//         <Services collapsed={collapsed} setCollapsed={setCollapsed} />
//         <ApiKeyFunctionality collapsed={collapsed} />
//       </section>
//     </>
//   );
// };
// export default ApiKey;

// const ApiKeyFunctionality = ({ collapsed }) => {
//   return (
//     <article className={`flex-1 min-h-0 min-w-0 flex flex-col overflow-hidden p-2 sm:p-6 transition-all duration-300 ${collapsed ? 'ml-14' : 'ml-52 md:ml-64'}`}>
//       <div className="w-full h-full min-h-0 min-w-0 bg-white/80 rounded-2xl shadow-2xl p-4 sm:p-8 flex flex-col items-center border border-slate-200 backdrop-blur-md transition-all duration-300 animate-apikey-fade-in">
//         <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
//           <div className="flex flex-col flex-1">
//             <h5 className="font-bold text-2xl text-blue-900">API KEY</h5>
//             <p className="text-gray-600 mt-1">Generate and manage your API keys.</p>
//           </div>
//           <div className="flex gap-2 mt-2 sm:mt-0 justify-end">
//             <button className="w-48 h-11 text-center flex items-center justify-center bg-gradient-to-r from-pink-400 to-blue-400 text-white font-semibold rounded-lg shadow transition-all duration-200 hover:from-blue-500 hover:to-pink-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300">Generate New Key</button>
//           </div>
//         </div>
//         <div className="w-full flex-1 mt-8 bg-gradient-to-br from-blue-50 to-pink-50 border border-slate-200 rounded-xl shadow-lg p-4 sm:p-8 flex flex-col items-stretch justify-center animate-apikey-card-fade-in">
//           <div className="w-full flex flex-col rounded-lg overflow-hidden border border-slate-200 bg-white/70">
//             <div className="flex items-center h-14 border-b-2 border-b-slate-200">
//               <div className="flex-1 min-w-[100px] text-blue-900 font-semibold text-center border-r border-slate-200">Key Name</div>
//               <div className="flex-1 min-w-[120px] text-blue-900 font-semibold text-center border-r border-slate-200">API Key</div>
//               <div className="flex-1 min-w-[120px] text-blue-900 font-semibold text-center border-r border-slate-200">Date Created</div>
//               <div className="flex-1 min-w-[120px] text-blue-900 font-semibold text-center">Last Used</div>
//             </div>
//             <div className="flex items-center h-28 w-full text-lg text-gray-700 font-bold justify-center">No Results</div>
//           </div>
//         </div>
//       </div>
//       <style>{`
//         @keyframes apikeyFadeIn {
//           0% { opacity: 0; transform: translateY(32px) scale(0.98); }
//           100% { opacity: 1; transform: translateY(0) scale(1); }
//         }
//         .animate-apikey-fade-in {
//           animation: apikeyFadeIn 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
//         }
//         @keyframes apikeyCardFadeIn {
//           0% { opacity: 0; transform: translateY(16px) scale(0.98); }
//           100% { opacity: 1; transform: translateY(0) scale(1); }
//         }
//         .animate-apikey-card-fade-in {
//           animation: apikeyCardFadeIn 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
//         }
//       `}</style>
//     </article>
//   );
// };
