import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Services from "./Aside/Services.jsx";
import Advanced from "./Advanced.jsx";
import CacheSetting from "./CacheSetting.jsx";
import Mode from "./Mode.jsx";
import PageFormatting from "./PageFormatting.jsx";
import PageSpecification from "./PageSpecification.jsx";
// import ParsingButton from "./ParsingButton.jsx";
import SignUpForWaitList from "./SignUpForWaitList.jsx";
import ToggleButton from "./ToggleButton.jsx";
import WebHook from "./WebHook.jsx";
import * as pdfjs from "pdfjs-dist";
import axios from "axios";
import { useAppContext } from "./AppContext"; // Import the context
// import ReactJson from "react-json-view-lite";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-json"; // <-- Add this line
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import rehypeHighlight from "rehype-highlight";
import * as XLSX from "xlsx";
import ReactDOMServer from "react-dom/server";
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const sampleBarData = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: 'Votes',
      data: [12, 19, 3],
      backgroundColor: ['#3b82f6', '#6366f1', '#f59e42'],
    },
  ],
};
const samplePieData = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      data: [10, 20, 30],
      backgroundColor: ['#3b82f6', '#6366f1', '#f59e42'],
    },
  ],
};
const sampleLineData = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [
    {
      label: 'Sales',
      data: [33, 53, 85],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.2)',
    },
  ],
};
// If not installed, run: npm install remark-math rehype-katex rehype-highlight katex

const Parse = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Navbar />
      <section className="flex flex-1 min-h-0 min-w-0 h-[calc(100vh-80px)]">
        <Services collapsed={collapsed} setCollapsed={setCollapsed} />
        <ParseService collapsed={collapsed} />
      </section>
    </>
  );
};
export default Parse;

const ParseService = ({ collapsed }) => {
  const { selectedOption } = useAppContext(); // Access context state
  const { mainButtonLabel } = useAppContext();
  const { userData } = useAppContext();
  const { currentUser } = useAppContext();
  const [step, setStep] = useState(1);
  const [setFile, setSetFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pageCount, setPageCount] = useState(null);
  const [parsedContent, setParsedContent] = useState(null);
  const [jsonContent, setJsonContent] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {checkboxStates} =useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      setMessage("Please wait, we are parsing the Job...");
    }
  }, [loading]);
 
  function handleSendboxButton() {
    navigate("/parse");
  }
 
  function handleHistoryButton() {
    navigate("/parse/history");
  }
  const handleFileUpLoad = (e) => {
    const uploadedfile = e.target.files[0];
    setFile(uploadedfile);
    setStep(2);
  };
 
  // Handle close button in JobResult component
  const handleCloseJobResult = () => {
    setStep(1);

    // Go back to FileUpload component
  };

  const handleParsingOnClickButton = async () => {
    //loading
    setLoading(true);
    setMessage("Please wait, we are parsing the Job...");
    //    navigate('/parse-result')
    if (selectedFile !== null) {
      // frontend to backend request goes here

      setStep("2");

      // Simulating a delay for processing
      //  if(response!==NULL){
      //   setStep("3");
      //  }else{
      //   alert("Plese Try Again ")
      //  }

      setTimeout(() => {
        setStep("3");
      }, 10000);
    } else {
      alert("Please Choose Your File First");
    }

    // handling parse
    const token = localStorage.getItem("jwt"); // Get JWT from localStorage
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("parseMode", selectedOption);
    formData.append("Organization", mainButtonLabel);
    formData.append("userEmail", userData);
    formData.append("currentUser", currentUser);
    formData.append("token", token);
    formData.append("textAndImageHandling",checkboxStates);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/parse-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("front end recieve final data:", response);
      // jsonContent=JSON.parse(response.data)
      setParsedContent(response.data);
      console.log("type of result", typeof response.data);
      console.log("parsed content backend mathi aayvo:", response);
      // setJsonContent(JSON.parse(response.data.file.json));
    } catch (error) {
      console.error("Error during file parsing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <article
        className={`flex-1 min-h-0 min-w-0 flex flex-col overflow-hidden p-6 transition-all duration-300 ${
          collapsed ? "ml-14" : "ml-52 md:ml-64"
        }`}
      >
        <div className="ml-10 mt-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-2 items-center min-w-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 flex-shrink-0"
              viewBox="0 0 512 512"
            >
              <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm88 64l0 64-88 0 0-64 88 0zm56 0l88 0 0 64-88 0 0-64zm240 0l0 64-88 0 0-64 88 0zM64 224l88 0 0 64-88 0 0-64zm232 0l0 64-88 0 0-64 88 0zm64 0l88 0 0 64-88 0 0-64zM152 352l0 64-88 0 0-64 88 0zm56 0l88 0 0 64-88 0 0-64zm240 0l0 64-88 0 0-64 88 0z" />
            </svg>
            <div className="flex flex-col min-w-0">
              <h5 className="font-bold text-xl truncate">FileSculpt</h5>
              <p className="truncate">
                Analyze documents, tailored for optimal performance with RAG.
              </p>
            </div>
          </div>
          <button
            className="w-64 h-12 rounded-lg bg-gradient-to-r from-pink-400 to-blue-400 text-white shadow flex items-center justify-center gap-3 font-semibold text-base transition-all duration-200 animate-github-fade-in hover:from-blue-500 hover:to-pink-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
            style={{ animationDelay: "0.2s" }}
          >
            <a
              href="https://github.com/Gautam-Poriya/Document-Parsing/issues"
              target="_blank"
              className="w-full h-full flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-white"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
              </svg>
              Report issue on Github
            </a>
          </button>
          <style>{`
            @keyframes githubFadeIn {
              0% { opacity: 0; transform: translateY(32px) scale(0.92); }
              60% { opacity: 0.7; transform: translateY(-8px) scale(1.04); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            .animate-github-fade-in {
              animation: githubFadeIn 0.9s cubic-bezier(0.23, 1, 0.32, 1) both;
            }
          `}</style>
        </div>
        <div className="h-1 border-b-2 border-b-slate-50 w-full mt-2"></div>
        {/* Button row removed, as Report issue is now above */}

        {/* main funtionality of parsing */}

        <section className="h-72">
          <div className="flex">
            <div className="w-1/3">
              <div className="w-full h-72  rounded-md border-2 border-gray-300  overflow-y-scroll overflow-hidden scrollbar-gradient">
                <div>
                  <h5 className="ml-3 mt-3 font-bold text-xl">
                    Parse Settings
                  </h5>
                  <br />
                  <div className="ml-3 font-bold">Mode</div>
                  <div>
                    <Mode />
                    {console.log("Mode ni Niche:", selectedOption)}
                  </div>
                  {/* <div className=" flex items-center">
                  <p className="flex ml-3 mt-1 gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 mt-2 "
                      viewBox="0 0 512 512"
                    >
                      <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                    </svg>
                    Parsing Instruction
                  </p>
                </div> */}

                  {/* checkbox goes here bu not impleamented yet */}
                  {/* <div className="bg-slate-400 h-48">
                   <input type="textarea" placeholder="The provided document is a manga comic book. Most pages do NOT have a title. It does not contain tables. Try to reconstruct the dialogue spoken in a cohesive way." className="overflow-y-scroll overflow-x-clip w-full h-28 mr-3 ml-3 "/>
                   </div> */}
                  <div>
                    <ToggleButton />
                  </div>
                  <div>
                    <PageSpecification />
                  </div>
                  <div>
                    <PageFormatting />
                  </div>
                  <div>
                    <WebHook />
                  </div>
                  <div>
                    <CacheSetting />
                  </div>
                  <div>
                    <Advanced />
                  </div>
                </div>

                {/* <div><ParsingButton /></div>
                 */}
              </div>
              <div className="w-full flex justify-center">
                <div
                  className={`w-full max-w-xs mx-auto mt-4 p-4 rounded-xl shadow-md border border-slate-100 flex flex-col items-center bg-white/80 transition-all duration-300 animate-parse-fade-in`}
                >
                  <p className="mb-3 text-gray-700 text-sm font-medium">
                    Upload File first to parse
                  </p>
                  <button
                    className={`w-32 h-11 rounded-lg font-semibold text-base shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gradient-to-r from-pink-400 to-blue-400 text-white animate-parse-fade-in-btn
                      ${
                        selectedFile
                          ? "hover:from-blue-500 hover:to-pink-500 hover:scale-105 cursor-pointer"
                          : "bg-slate-300 text-white cursor-not-allowed"
                      }`}
                    onClick={handleParsingOnClickButton}
                    disabled={!selectedFile}
                  >
                    Parse
                  </button>
                  <style>{`
                    @keyframes parseFadeIn {
                      0% { opacity: 0; transform: translateY(32px) scale(0.98); }
                      100% { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    .animate-parse-fade-in {
                      animation: parseFadeIn 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
                    }
                    @keyframes parseFadeInBtn {
                      0% { opacity: 0; transform: translateY(16px) scale(0.96); }
                      100% { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    .animate-parse-fade-in-btn {
                      animation: parseFadeInBtn 0.7s 0.2s cubic-bezier(0.23, 1, 0.32, 1) both;
                    }
                  `}</style>
                </div>
              </div>
            </div>

            {/* File Upload area is here */}
            <div className="w-2/3">
              {loading ? (
                <FileUpLoading message={message} />
              ) : step == 1 ? (
                <FileUpload
                  selectedFile={selectedFile}
                  onFileUpLoad={handleFileUpLoad}
                  setSelectedFile={setSelectedFile}
                  collapsed={collapsed}
                />
              ) : step == 2 ? (
                <FileUpLoading message={message} />
              ) : step == 3 ? (
                <ParsedFileResult
                  onClose={handleCloseJobResult}
                  parsedContent={parsedContent}
                  setParsedContent={setParsedContent}
                  // job_id={parsedContent.job_id}
                  jsonContent={jsonContent}
                />
              ) : null}
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

const FileUpload = ({ selectedFile, setSelectedFile, collapsed }) => {
  const [cancelButtonClick, setCancelButtonClick] = useState(false);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  function handleCancelClick() {
    setCancelButtonClick(!cancelButtonClick);
    setSelectedFile(!selectedFile);
  }
  return (
    <div className="flex-1 min-h-0 flex items-center justify-center animate-fileupload-fade-in">
      <div
        className={`w-full max-w-2xl bg-white/80 rounded-xl shadow-lg p-6 flex flex-col items-center transition-all duration-300`}
      >
        <div className="w-full h-72 flex flex-col justify-center items-center border-2 border-dashed border-blue-300 rounded-xl bg-gradient-to-br from-blue-50 to-pink-50 relative transition-all duration-300 overflow-y-auto py-4">
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            onChange={handleFileChange}
          />
          <div className="z-0 flex flex-col items-center justify-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-blue-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="font-bold text-gray-600 text-lg mb-1">
              Drag & drop or click to select files
            </p>
            <p className="text-gray-400 text-sm">
              You can upload a file up to 315 MB.
            </p>
          </div>
        </div>

        {selectedFile && (
          <div className="w-full max-w-2xl flex items-center justify-between mt-4 bg-blue-50 rounded-lg p-3 shadow animate-fileupload-fade-in-selected">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="w-10 h-10 text-blue-500"
              >
                <path d="M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z" />
              </svg>
              <div>
                <div className="text-blue-900 font-semibold truncate max-w-xs">
                  {selectedFile.name}
                </div>
                <div className="text-blue-700 text-xs">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </div>
              </div>
            </div>
            <button
              onClick={handleCancelClick}
              className="ml-4 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-blue-200 shadow hover:bg-blue-100 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="w-6 h-6 text-blue-500"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fileuploadFadeIn {
          0% { opacity: 0; transform: translateY(24px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fileupload-fade-in {
          animation: fileuploadFadeIn 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes fileuploadFadeInSelected {
          0% { opacity: 0; transform: translateY(12px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fileupload-fade-in-selected {
          animation: fileuploadFadeInSelected 0.5s 0.1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
    </div>
  );
};

const FileUpLoading = ({ message }) => {
  return (
    <div className="w-full max-w-2xl mx-auto my-6 bg-white/80 rounded-xl shadow-lg p-8 flex flex-col items-center justify-center transition-all duration-300 animate-upload-fade-in">
      <div className="w-full h-72 flex flex-col justify-center items-center border-2 border-dashed border-blue-300 rounded-xl bg-gradient-to-br from-blue-50 to-pink-50 relative transition-all duration-300">
        <div className="flex-1 flex flex-col items-center justify-center w-full h-full">
          <span className="mb-8">
            <span className="inline-block w-20 h-20 rounded-full border-8 border-t-transparent border-r-transparent border-b-blue-400 border-l-pink-400 animate-upload-spin bg-gradient-conic-smooth"></span>
          </span>
          <p className="text-lg font-semibold text-blue-700 animate-upload-fade-in-message text-center">
            {message || "Uploading..."}
          </p>
        </div>
      </div>
      <style>{`
        @keyframes uploadSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-upload-spin {
          animation: uploadSpin 1.1s linear infinite;
        }
        @keyframes uploadFadeIn {
          0% { opacity: 0; transform: translateY(24px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-upload-fade-in {
          animation: uploadFadeIn 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes uploadFadeInMessage {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-upload-fade-in-message {
          animation: uploadFadeInMessage 1.2s 0.2s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        /* Extra smooth conic gradient for spinner */
        .bg-gradient-conic-smooth {
          background: conic-gradient(
            from 0deg,
            #f472b6 0%,
            #a78bfa 20%,
            #38bdf8 40%,
            #818cf8 60%,
            #06b6d4 80%,
            #f472b6 100%
          );
          /* For browsers that support it, mask the center for a donut effect */
          -webkit-mask-image: radial-gradient(circle, transparent 60%, black 100%);
          mask-image: radial-gradient(circle, transparent 60%, black 100%);
        }
      `}</style>
    </div>
  );
};

const ParsedFileResult = ({
  onClose,
  parsedContent,
  setParsedContent,
  job_id,
  jsonContent,
}) => {
  const [markDownIsOpen, setMarkDownIsOpen] = useState(null);
  const [textIsOpen, setTextIsOpen] = useState(null);
  const [jsonIsOpen, setJsonIsOpen] = useState(null);
  const [xlsxIsOpen, setXlsxIsOpen] = useState(null);
  const [imagesIsOpen, setImagesIsOpen] = useState(null);
  const [layoutIsOpen, setLayoutIsOpen] = useState(null);
  const [structuredIsOpen, setStructuredIsOpen] = useState(null);
  const [showRawMarkdown, setShowRawMarkdown] = useState(false);

  const JsonDisplay = ({ jsonContent }) => {
    // Check if jsonContent is an object
    const isObject = (obj) =>
      obj && typeof obj === "object" && !Array.isArray(obj);

    return (
      <div className="json-display">
        {jsonContent ? (
          <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap">
            {isObject(jsonContent)
              ? JSON.stringify(jsonContent, null, 2)
              : "Invalid JSON content"}
          </pre>
        ) : (
          <p>No JSON content available.</p>
        )}
      </div>
    );
  };

  function handleImagesClick() {
    setImagesIsOpen(!imagesIsOpen);
    setTextIsOpen(null);
    setJsonIsOpen(null);
    setXlsxIsOpen(null);
    setLayoutIsOpen(null);
    setStructuredIsOpen(null);
    setMarkDownIsOpen(null);
  }
  function handleMarkDownClick() {
    setMarkDownIsOpen(!markDownIsOpen);
    setTextIsOpen(null);
    setJsonIsOpen(null);
    setXlsxIsOpen(null);
    setImagesIsOpen(null);
    setLayoutIsOpen(null);
    setStructuredIsOpen(null);
  }
  function handleLayOutClick() {
    setLayoutIsOpen(!layoutIsOpen);
    setTextIsOpen(null);
    setJsonIsOpen(null);
    setXlsxIsOpen(null);
    setImagesIsOpen(null);
    setLayoutIsOpen(null);
    setStructuredIsOpen(null);
  }
  function handleTextClick() {
    setTextIsOpen(!textIsOpen);
    setMarkDownIsOpen(null);
    setJsonIsOpen(null);
    setXlsxIsOpen(null);
    setImagesIsOpen(null);
    setLayoutIsOpen(null);
    setStructuredIsOpen(null);
  }

  function handleJsonClick() {
    setJsonIsOpen(!jsonIsOpen);
    setMarkDownIsOpen(null);
    setTextIsOpen(null);
    setXlsxIsOpen(null);
    setImagesIsOpen(null);
    setLayoutIsOpen(null);
    setStructuredIsOpen(null);
  }

  function handleXlsxClick() {
    setXlsxIsOpen(!xlsxIsOpen);
    setMarkDownIsOpen(null);
    setTextIsOpen(null);
    setJsonIsOpen(null);
    setImagesIsOpen(null);
    setLayoutIsOpen(null);
    setStructuredIsOpen(null);
  }
  function handleStructuredClick() {
    setStructuredIsOpen(!structuredIsOpen);
    setMarkDownIsOpen(null);
    setTextIsOpen(null);
    setJsonIsOpen(null);
    setImagesIsOpen(null);
    setLayoutIsOpen(null);
    setStructuredIsOpen(null);
  }
  // Helper to get button style based on active state
  const getTabButtonClass = (isActive) =>
    `px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm text-base
    ${
      isActive
        ? "bg-gradient-to-r from-pink-400 to-blue-400 text-white scale-105 shadow-md"
        : "bg-white/80 text-black hover:bg-blue-100 hover:text-blue-700"
    }`;

  // Ref for the tab content area
  const contentRef = useRef(null);

  // Always scroll to top when JSON or Text tab is opened
  useEffect(() => {
    if (contentRef.current && (jsonIsOpen || textIsOpen)) {
      contentRef.current.scrollTop = 0;
    }
  }, [jsonIsOpen, textIsOpen]);

  // Scroll to top for all tab/content changes (fallback for other tabs)
  useEffect(() => {
    if (contentRef.current && !(jsonIsOpen || textIsOpen)) {
      contentRef.current.scrollTop = 0;
    }
  }, [
    markDownIsOpen,
    xlsxIsOpen,
    imagesIsOpen,
    layoutIsOpen,
    structuredIsOpen,
    parsedContent,
  ]);

  return (
    <div className="flex justify-center items-center w-full h-full min-h-[400px] animate-parse-result-fade-in">
      <div className="w-full max-w-3xl bg-white/80 rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-slate-200 backdrop-blur-md transition-all duration-300">
        {/* Header */}
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div
            className={`flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto text-center sm:text-left transition-all duration-300`}
          >
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
              <svg
                className="w-8 h-8 text-blue-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6"
                />
              </svg>
              <span className="font-bold text-xl text-blue-900 truncate">
                Results
              </span>
            </div>
            <span className="text-xs text-blue-500 bg-blue-100 rounded px-2 py-1 w-full sm:w-auto text-center sm:text-left">
              Job Id: {parsedContent ? parsedContent.job_id : "NO JOB ID"}
            </span>
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => {
                // Download logic based on active tab
                let data = "";
                let filename = "result";
                let type = "text/plain";
                if (markDownIsOpen && parsedContent?.markdown) {
                  data = parsedContent.markdown;
                  filename += ".md";
                } else if (textIsOpen && parsedContent?.text) {
                  data = parsedContent.text;
                  filename += ".txt";
                } else if (jsonIsOpen && parsedContent?.json) {
                  data = JSON.stringify(parsedContent.json, null, 2);
                  filename += ".json";
                  type = "application/json";
                } else if (imagesIsOpen && parsedContent?.image) {
                  data = parsedContent.image;
                  filename += ".png"; // or .jpg if you know the type
                  type = "image/png";
                } else if (layoutIsOpen && parsedContent?.layout) {
                  data = parsedContent.layout;
                  filename += "-layout.txt";
                } else if (structuredIsOpen && parsedContent?.structured) {
                  data = parsedContent.structured;
                  filename += "-structured.txt";
                } else if (xlsxIsOpen && parsedContent?.xlsx) {
                  data = parsedContent.xlsx;
                  filename += ".xlsx";
                  type =
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                } else {
                  alert("No content to download for this tab.");
                  return;
                }
                // For images/xlsx, if data is base64, handle accordingly
                let blob;
                if (
                  (imagesIsOpen || xlsxIsOpen) &&
                  data &&
                  typeof data === "string" &&
                  data.length > 100
                ) {
                  // Assume base64
                  const byteString = atob(data.split(",")[1] || data);
                  const ab = new ArrayBuffer(byteString.length);
                  const ia = new Uint8Array(ab);
                  for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                  }
                  blob = new Blob([ab], { type });
                } else {
                  blob = new Blob([data], { type });
                }
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                  window.URL.revokeObjectURL(url);
                  document.body.removeChild(a);
                }, 0);
              }}
              className="bg-gradient-to-r from-blue-400 to-pink-400 text-white px-5 py-2 rounded-lg font-semibold shadow transition-all duration-200 hover:from-pink-500 hover:to-blue-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
                />
              </svg>
              Download
            </button>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-pink-400 to-blue-400 text-white px-5 py-2 rounded-lg font-semibold shadow transition-all duration-200 hover:from-blue-500 hover:to-pink-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center gap-2"
            >
              Close
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="w-5 h-5"
                fill="currentColor"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="w-full flex flex-nowrap gap-2 justify-center items-center mb-4 overflow-x-auto scrollbar-hide transition-all duration-300">
          <button
            className={getTabButtonClass(markDownIsOpen) + " flex-1 min-w-0 h-9 text-center flex items-center justify-center text-sm"}
            onClick={handleMarkDownClick}
          >
            MarkDown
          </button>
          <button
            className={getTabButtonClass(textIsOpen) + " flex-1 min-w-0 h-9 text-center flex items-center justify-center text-sm"}
            onClick={handleTextClick}
          >
            Text
          </button>
          <button
            className={getTabButtonClass(jsonIsOpen) + " flex-1 min-w-0 h-9 text-center flex items-center justify-center text-sm"}
            onClick={handleJsonClick}
          >
            JSON
          </button>
          <button
            className={getTabButtonClass(imagesIsOpen) + " flex-1 min-w-0 h-9 text-center flex items-center justify-center text-sm"}
            onClick={handleImagesClick}
          >
            Images
          </button>
          <button
            className={getTabButtonClass(layoutIsOpen) + " flex-1 min-w-0 h-9 text-center flex items-center justify-center text-sm"}
            onClick={handleLayOutClick}
          >
            Layout
          </button>
          <button
            className={getTabButtonClass(xlsxIsOpen) + " flex-1 min-w-0 h-9 text-center flex items-center justify-center text-sm"}
            onClick={handleXlsxClick}
          >
            XLSX
          </button>
          <button
            className={getTabButtonClass(structuredIsOpen) + " flex-1 min-w-0 h-9 text-center flex items-center justify-center text-sm"}
            onClick={handleStructuredClick}
          >
            Structured
          </button>
        </div>
        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        {/* Tab Content */}
        <div
          ref={contentRef}
          className="w-full min-h-[180px] max-h-[340px] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50 rounded-xl border border-slate-200 shadow-inner p-4 overflow-y-auto animate-tab-content-fade-in"
        >
          {parsedContent && markDownIsOpen && (
            <div className="w-full h-full flex flex-col items-start justify-start animate-tab-content-fade-in overflow-auto bg-gradient-to-br from-white via-blue-50 to-pink-50 rounded-2xl p-8 shadow-2xl border border-blue-200">
              <div className="w-full flex justify-end mb-2 gap-2">
                <button
                  onClick={() => {
                    // Download rendered HTML
                    const html = ReactDOMServer.renderToStaticMarkup(
                      <div className="prose prose-blue bg-white/95 rounded-xl p-8 shadow-inner border border-slate-200">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkMath]}
                          rehypePlugins={[rehypeKatex, rehypeHighlight]}
                          components={{
                            table({node, ...props}) {
                              return (
                                <div className="overflow-x-auto w-full">
                                  <table className="min-w-max" {...props} />
                                </div>
                              );
                            }
                          }}
                        >
                          {parsedContent.markdown}
                        </ReactMarkdown>
                      </div>
                    );
                    const blob = new Blob([html], { type: "text/html" });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "rendered-table.html";
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(() => {
                      window.URL.revokeObjectURL(url);
                      document.body.removeChild(a);
                    }, 0);
                  }}
                  className="px-3 py-1 rounded bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition text-sm"
                >
                  Download as HTML
                </button>
                <button
                  onClick={() => setShowRawMarkdown((prev) => !prev)}
                  className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition text-sm"
                >
                  {showRawMarkdown ? "Show Raw" : "Show Formatted"}
                </button>
              </div>
              {parsedContent.markdown && parsedContent.markdown.trim() !== "" ? (
                showRawMarkdown ? (
                  <pre className="mx-auto max-w-5xl w-full min-w-full whitespace-pre break-words text-slate-800 font-mono text-base leading-relaxed selection:bg-blue-100 selection:text-blue-900 bg-white/95 rounded-xl p-8 shadow-inner border border-slate-200 overflow-x-auto custom-pre-scrollbar">
                    {parsedContent.markdown}
                  </pre>
                ) : (
                  <div className="w-full max-w-5xl mx-auto overflow-x-auto">
                    <div className="prose prose-blue bg-white/95 rounded-xl p-8 shadow-inner border border-slate-200">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex, rehypeHighlight]}
                        components={{
                          h1: ({node, ...props}) => <h1 className="font-bold text-2xl mt-6 mb-2 text-blue-800 border-b pb-1" {...props} />,
                          h2: ({node, ...props}) => <h2 className="font-bold text-xl mt-5 mb-2 text-blue-700" {...props} />,
                          h3: ({node, ...props}) => <h3 className="font-semibold text-lg mt-4 mb-1 text-blue-600" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold text-blue-900" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-2" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-2" {...props} />,
                          li: ({node, ...props}) => <li className="mb-1" {...props} />,
                          p: ({node, ...props}) => <p className="mb-2" {...props} />,
                          table: ({node, ...props}) => (
                            <div className="overflow-x-auto w-full my-4">
                              <table className="min-w-max border border-slate-300 bg-white shadow">
                                {props.children}
                              </table>
                            </div>
                          ),
                          th: ({node, ...props}) => <th className="px-4 py-2 font-bold bg-blue-50 border border-slate-300" {...props} />,
                          td: ({node, ...props}) => <td className="px-4 py-2 border border-slate-200" {...props} />,
                          code({node, inline, className, children, ...props}) {
                            return !inline ? (
                              <pre className="bg-gray-900 text-white rounded p-4 overflow-x-auto my-2">
                                <code className={className} {...props}>{children}</code>
                              </pre>
                            ) : (
                              <code className="bg-gray-100 px-1 rounded" {...props}>{children}</code>
                            );
                          }
                        }}
                      >
                        {parsedContent.markdown}
                      </ReactMarkdown>
                    </div>
                  </div>
                )
              ) : (
                <span className="text-gray-400 font-semibold text-lg text-center w-full">
                  NO MARKDOWN PARSED
                </span>
              )}
            </div>
          )}
          {parsedContent && textIsOpen && (
            <div className="w-full max-w-4xl h-full overflow-auto bg-white rounded-lg p-8 shadow-inner animate-tab-content-fade-in">
              {parsedContent.text && parsedContent.text.trim() !== "" ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex, rehypeHighlight]}
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-3xl font-normal mt-8 mb-4" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl font-normal mt-6 mb-3" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-normal mt-4 mb-2" {...props} />,
                    h4: ({node, ...props}) => <h4 className="text-lg font-normal mt-3 mb-1" {...props} />,
                    p: ({node, ...props}) => {
                      // Detect chart placeholder in paragraph
                      const text = props.children && props.children[0] && typeof props.children[0] === 'string' ? props.children[0] : null;
                      if (text && text.match(/^\[chart:(bar|pie|line)\]/i)) {
                        const chartType = text.match(/^\[chart:(bar|pie|line)\]/i)[1];
                        if (chartType === 'bar') {
                          return (
                            <div className="chart-container my-6 w-full h-64 bg-gray-100 flex items-center justify-center rounded">
                              <Bar data={sampleBarData} />
                            </div>
                          );
                        }
                        if (chartType === 'pie') {
                          return (
                            <div className="chart-container my-6 w-full h-64 bg-gray-100 flex items-center justify-center rounded">
                              <Pie data={samplePieData} />
                            </div>
                          );
                        }
                        if (chartType === 'line') {
                          return (
                            <div className="chart-container my-6 w-full h-64 bg-gray-100 flex items-center justify-center rounded">
                              <Line data={sampleLineData} />
                            </div>
                          );
                        }
                      }
                      return <p className="mb-3 text-base text-gray-800" {...props} />;
                    },
                    a: ({node, ...props}) => <a className="break-all" style={{ color: 'inherit', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer" {...props} />,
                    table: ({node, ...props}) => (
                      <div className="overflow-x-auto my-4">
                        <table className="min-w-max w-full border border-gray-300 bg-white shadow">{props.children}</table>
                      </div>
                    ),
                    tr: ({node, ...props}) => <tr className="even:bg-gray-50" {...props} />,
                    th: ({node, ...props}) => <th className="px-4 py-2 font-bold bg-blue-50 border border-gray-300" {...props} />,
                    td: ({node, ...props}) => <td className="px-4 py-2 border border-gray-200" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-3" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-3" {...props} />,
                    li: ({node, ...props}) => <li className="mb-1" {...props} />,
                    pre: ({node, ...props}) => <pre className="bg-gray-900 text-white rounded p-4 overflow-x-auto my-4"><code {...props} /></pre>,
                    code: ({node, inline, className, children, ...props}) =>
                      !inline ? (
                        <code className={className} {...props}>{children}</code>
                      ) : (
                        <code className="bg-gray-100 px-1 rounded" {...props}>{children}</code>
                      ),
                  }}
                >
                  {parsedContent.text}
                </ReactMarkdown>
              ) : (
                <span className="text-gray-400 font-semibold text-lg text-center w-full">
                  NO TEXT PARSED
                </span>
              )}
            </div>
          )}
          {jsonIsOpen && jsonContent && (
            <pre
              className="w-full max-w-2xl h-full whitespace-pre-wrap break-words text-blue-900 font-mono text-base animate-tab-content-fade-in overflow-auto bg-white rounded-lg p-4 shadow-inner language-json"
              dangerouslySetInnerHTML={{
                __html:
                  parsedContent.json &&
                  Object.keys(parsedContent.json).length > 0
                    ? Prism.highlight(
                        JSON.stringify(parsedContent.json, null, 2),
                        Prism.languages.json,
                        "json"
                      )
                    : "NO JSON PARSED",
              }}
            />
          )}
          {parsedContent && layoutIsOpen && (
            <pre className="w-full max-w-2xl h-full whitespace-pre-wrap break-words text-gray-900 font-mono text-base animate-tab-content-fade-in overflow-auto bg-white rounded-lg p-4 shadow-inner">
              {parsedContent.layout && parsedContent.layout.trim() !== ""
                ? parsedContent.layout
                : "NO LAYOUT PARSED"}
            </pre>
          )}
          {parsedContent && structuredIsOpen && (
            <pre className="w-full max-w-2xl h-full whitespace-pre-wrap break-words text-gray-900 font-mono text-base animate-tab-content-fade-in overflow-auto bg-white rounded-lg p-4 shadow-inner">
              {parsedContent.structured &&
              parsedContent.structured.trim() !== ""
                ? parsedContent.structured
                : "NO STRUCTURED PARSED"}
            </pre>
          )}
          {parsedContent && imagesIsOpen && (
            <div className="w-full max-w-2xl h-full flex items-center justify-center animate-tab-content-fade-in bg-white rounded-lg p-4 shadow-inner">
              {parsedContent.image && parsedContent.image.trim() !== "" ? (
                <img
                  src={
                    parsedContent.image.startsWith("data:image")
                      ? parsedContent.image
                      : `data:image/png;base64,${parsedContent.image}`
                  }
                  alt="Parsed"
                  className="max-h-72 max-w-full rounded shadow"
                />
              ) : (
                <span className="text-gray-400 font-semibold text-lg text-center w-full">
                  NO IMAGE PARSED
                </span>
              )}
            </div>
          )}
          {parsedContent && xlsxIsOpen && (
            <div className="w-full max-w-2xl h-full flex flex-col items-center justify-center animate-tab-content-fade-in bg-white rounded-lg p-4 shadow-inner">
              {parsedContent.xlsx && parsedContent.xlsx.trim() !== "" ? (
                (() => {
                  let workbook, sheetName, sheet, rows;
                  let isBase64 = false;
                  try {
                    // Try to parse as base64
                    const base64 = parsedContent.xlsx.includes(",")
                      ? parsedContent.xlsx.split(",")[1]
                      : parsedContent.xlsx;
                    const binary = atob(base64);
                    const bytes = new Uint8Array(binary.length);
                    for (let i = 0; i < binary.length; i++)
                      bytes[i] = binary.charCodeAt(i);
                    workbook = XLSX.read(bytes, { type: "array" });
                    sheetName = workbook.SheetNames[0];
                    sheet = workbook.Sheets[sheetName];
                    rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                    isBase64 = true;
                  } catch (e) {
                    // Not base64 or not a valid XLSX
                  }
                  if (isBase64 && rows && rows.length > 0) {
                    return (
                      <div className="w-full overflow-x-auto">
                        <table className="min-w-full border border-slate-200 rounded-lg shadow bg-white">
                          <tbody>
                            {rows.map((row, i) => (
                              <tr key={i} className="border-b last:border-b-0">
                                {row.map((cell, j) => (
                                  <td
                                    key={j}
                                    className="px-3 py-2 border-r last:border-r-0 text-slate-800 text-sm"
                                  >
                                    {cell !== undefined ? cell.toString() : ""}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <button
                          onClick={() => {
                            // Download logic for XLSX
                            const base64 = parsedContent.xlsx.includes(",")
                              ? parsedContent.xlsx.split(",")[1]
                              : parsedContent.xlsx;
                            try {
                              const binary = atob(base64);
                              const ab = new ArrayBuffer(binary.length);
                              const ia = new Uint8Array(ab);
                              for (let i = 0; i < binary.length; i++)
                                ia[i] = binary.charCodeAt(i);
                              const blob = new Blob([ab], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                              });
                              const url = window.URL.createObjectURL(blob);
                              const a = document.createElement("a");
                              a.href = url;
                              a.download = "result.xlsx";
                              document.body.appendChild(a);
                              a.click();
                              setTimeout(() => {
                                window.URL.revokeObjectURL(url);
                                document.body.removeChild(a);
                              }, 0);
                            } catch (e) {
                              alert(
                                "Failed to download XLSX. Data may be corrupted."
                              );
                            }
                          }}
                          className="mt-4 bg-gradient-to-r from-blue-400 to-pink-400 text-white px-5 py-2 rounded-lg font-semibold shadow transition-all duration-200 hover:from-pink-500 hover:to-blue-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
                            />
                          </svg>
                          Download XLSX
                        </button>
                      </div>
                    );
                  } else {
                    return (
                      <div className="w-full flex flex-col items-center justify-center">
                        <span className="text-gray-400 font-semibold text-lg text-center w-full mb-4">
                          Preview not available. Please download the file.
                        </span>
                        <button
                          onClick={() => {
                            // Download fallback
                            let data = parsedContent.xlsx;
                            let filename = "result.xlsx";
                            let type =
                              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                            try {
                              const base64 = data.includes(",")
                                ? data.split(",")[1]
                                : data;
                              const binary = atob(base64);
                              const ab = new ArrayBuffer(binary.length);
                              const ia = new Uint8Array(ab);
                              for (let i = 0; i < binary.length; i++)
                                ia[i] = binary.charCodeAt(i);
                              const blob = new Blob([ab], { type });
                              const url = window.URL.createObjectURL(blob);
                              const a = document.createElement("a");
                              a.href = url;
                              a.download = filename;
                              document.body.appendChild(a);
                              a.click();
                              setTimeout(() => {
                                window.URL.revokeObjectURL(url);
                                document.body.removeChild(a);
                              }, 0);
                            } catch (e) {
                              alert(
                                "Failed to download XLSX. Data may be corrupted."
                              );
                            }
                          }}
                          className="bg-gradient-to-r from-blue-400 to-pink-400 text-white px-5 py-2 rounded-lg font-semibold shadow transition-all duration-200 hover:from-pink-500 hover:to-blue-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
                            />
                          </svg>
                          Download XLSX
                        </button>
                      </div>
                    );
                  }
                })()
              ) : (
                <span className="text-gray-400 font-semibold text-lg text-center w-full">
                  NO XLSX PARSED
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add custom scrollbar styling for the pre block
<style>{`
  .custom-pre-scrollbar::-webkit-scrollbar {
    height: 8px;
    background: #e0e7ef;
    border-radius: 8px;
  }
  .custom-pre-scrollbar::-webkit-scrollbar-thumb {
    background: #a5b4fc;
    border-radius: 8px;
  }
`}</style>
