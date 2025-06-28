import React from "react";
import Navbar from "./Navbar.jsx";
import Services from "./Aside/Services.jsx";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext"; // Import the context
import axios from "axios";
const History = () => {
  return (
    <>
      <Navbar />
      <section className="flex">
        <Services />
        <JobHistory />
      </section>
    </>
  );
};
export default History;
const HistorySection = () => {
  return (
    <>
      <div>Say my name</div>
    </>
  );
};

// const jobData = [
//   {
//     jobId: "62e867ad-74ed-40c7-818e-47c1a43c891b",
//     filename: "test-1.jpg",
//     status: "Success",
//     createdBy: "gautam poriya",
//     createdAt: "February 7, 2025, 4:24 PM",
//     creditsUsed: 0,
//   },
//   // Add the remaining job entries here
// ];

const ITEMS_PER_PAGE = 10;

const JobHistory = async () => {
  const [jobData, setJobData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(jobData.length / ITEMS_PER_PAGE);

  const token=localStorage.getItem("jwt");
 const {mainButtonLabel}=useAppContext();//current organization
    const formData=new FormData();
    formData.append("organization",mainButtonLabel);
    console.log("Organization in History section in frontend:",mainButtonLabel);
    formData.append("token",token);
    console.log("Token in History section in frontend:",token);
 try{
    const historyResponse=await axios.get("http://localhost:5000/history", 
     formData,
     {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      }
   
    );
    console.log("History Response return in frontend from backend:", historyResponse.data); 
 }catch(error){
    console.error("Error fetching job data in History section:", error);
 }
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const displayedJobs = jobData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4 w-full max-w-6xl mx-auto">
      <div className="flex bg-gray-200 font-semibold p-2 rounded-md">
        <div className="w-1/5">Job ID</div>
        <div className="w-1/6">Filename</div>
        <div className="w-1/6">Status</div>
        <div className="w-1/6">Created By</div>
        <div className="w-1/6">Created At</div>
        <div className="w-1/12">Credits Used</div>
        <div className="w-1/12">Details</div>
      </div>
      {displayedJobs.map((job, index) => (
        <div
          key={index}
          className="flex border-b p-2 items-center text-sm hover:bg-gray-100"
        >
          <div className="w-1/5 truncate" title={job.jobId}>
            {job.jobId}
          </div>
          <div className="w-1/6">{job.filename}</div>
          <div className="w-1/6">
            <span className="bg-green-200 text-green-800 px-2 py-1 rounded-md text-xs">
              {job.status}
            </span>
          </div>
          <div className="w-1/6">{job.createdBy}</div>
          <div className="w-1/6">{job.createdAt}</div>
          <div className="w-1/12">{job.creditsUsed}</div>
          <div className="w-1/12">
            <button className="bg-gray-300 px-2 py-1 rounded-md text-xs">
              More than 48h old
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-4">
        <div>Items per Page: {ITEMS_PER_PAGE}</div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 bg-gray-300 rounded-md"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 bg-gray-300 rounded-md"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

// const ITEMS_PER_PAGE = 10

// const JobHistory = ({ token }) => {
//   const [jobData, setJobData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(jobData.length / ITEMS_PER_PAGE);

//   useEffect(() => {
//     const fetchJobData = async () => {
//       try {
//         const userResponse = await axios.get("/api/user", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const userId = userResponse.data.id;

//         const orgResponse = await axios.get(`/api/organizations?userId=${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const organizationId = orgResponse.data[0]?.Organization_Id;

//         if (organizationId) {
//           const filesResponse = await axios.get(`/api/files?organizationId=${organizationId}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setJobData(filesResponse.data);
//         }
//       } catch (error) {
//         console.error("Error fetching job data:", error);
//       }
//     };

//     fetchJobData();
//   }, [token]);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const displayedJobs = jobData.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   return (
//     <div className="p-4 w-full max-w-6xl mx-auto">
//       <div className="flex bg-gray-200 font-semibold p-2 rounded-md">
//         <div className="w-1/5">Job ID</div>
//         <div className="w-1/6">Filename</div>
//         <div className="w-1/6">Status</div>
//         <div className="w-1/6">Created At</div>
//         <div className="w-1/12">Parse Mode</div>
//         <div className="w-1/12">Details</div>
//       </div>
//       {displayedJobs.map((job, index) => (
//         <div
//           key={index}
//           className="flex border-b p-2 items-center text-sm hover:bg-gray-100"
//         >
//           <div className="w-1/5 truncate" title={job.jobId}>{job.jobId}</div>
//           <div className="w-1/6">{job.file_Name}</div>
//           <div className="w-1/6">
//             <span className="bg-green-200 text-green-800 px-2 py-1 rounded-md text-xs">
//               Success
//             </span>
//           </div>
//           <div className="w-1/6">{new Date(job.createdAt).toLocaleString()}</div>
//           <div className="w-1/12">{job.parseMode}</div>
//           <div className="w-1/12">
//             <button className="bg-gray-300 px-2 py-1 rounded-md text-xs">
//               More than 48h old
//             </button>
//           </div>
//         </div>
//       ))}
//       <div className="flex justify-between mt-4">
//         <div>Items per Page: {ITEMS_PER_PAGE}</div>
//         <div className="flex items-center gap-2">
//           <button
//             className="px-3 py-1 bg-gray-300 rounded-md"
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//           >
//             ← Prev
//           </button>
//           <span>
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             className="px-3 py-1 bg-gray-300 rounded-md"
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//           >
//             Next →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
