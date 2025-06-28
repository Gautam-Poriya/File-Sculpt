import React from "react";
import { useState,useEffect } from "react";
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

const Parse = () => {
  return (
    <>
      <Navbar />
      <section className="flex">
        <Services />
        <ParseService />
      </section>
    </>
  );
};
export default Parse;

const ParseService = () => {
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
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      setMessage("Please wait, we are parsing the Job...");
    }
  }, [loading]);
  function handleDocumentation() {
    window.location.href = "https://docs.cloud.llamaindex.ai/";
  }
  function handleSendboxButton() {
    navigate("/parse");
  }
  // function navigateToGitHub(){
  //   navigate("https://github.com/Gautam-Poriya/Document-Parsing/issues")
  // }
  function handleHistoryButton() {
    navigate("/parse/history");
  }
  const handleFileUpLoad = (e) => {
    const uploadedfile = e.target.files[0];
    setFile(uploadedfile);
    setStep(2);
  };
  // Handle parse button click (job processing)
  // const handleParse = () => {
  //   // Show JobId component for 5 seconds
  //   if(!selectedFile==null){
  //     alert("Please Choose Your File First")
  //   }else{

  //     setStep(2);

  //     setTimeout(() => {
  //       setStep(3); // After 5 seconds, move to JobResult component
  //     }, 5000);
  //   }
  // };
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
      console.log("type of result",typeof response.data);
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
      <article className="h-screen w-4/5">
        <div className="ml-10 mt-5 ">
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 mt-2"
              viewBox="0 0 512 512"
            >
              <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm88 64l0 64-88 0 0-64 88 0zm56 0l88 0 0 64-88 0 0-64zm240 0l0 64-88 0 0-64 88 0zM64 224l88 0 0 64-88 0 0-64zm232 0l0 64-88 0 0-64 88 0zm64 0l88 0 0 64-88 0 0-64zM152 352l0 64-88 0 0-64 88 0zm56 0l88 0 0 64-88 0 0-64zm240 0l0 64-88 0 0-64 88 0z" />
            </svg>
            <h5 className="font-bold text-xl">FileSculpt</h5>
          </div>
          <p>Analyze documents, tailored for optimal performance with RAG.</p>
        </div>
        <div className="h-1 border-b-2 border-b-slate-50 w-full mt-2"></div>
        <div className="h-20 mt-0 pt-0">
          <button
            className="justify-center mt-8 ml-10 w-28 h-10 bg-slate-100"
            onClick={handleSendboxButton}
          >
            Sendbox
          </button>
          <button
            className="ml-8 bg-slate-100 h-10 w-28"
            onClick={handleHistoryButton}
          >
            History
          </button>

          {/* <button
            className="ml-80 border-zinc-400   border w-40 rounded-md h-10 hover:bg-black hover:text-white"
            onClick={handleDocumentation}
          >
            Documentation
          </button> */}
          <button className="ml-[500px] border-zinc-400   border w-48 rounded-md h-10 hover:bg-black hover:text-white" >
             <a href="https://github.com/Gautam-Poriya/Document-Parsing/issues" target="_blank" className="w-full h-full">
               
            Report issue on Github
              </a>
          </button>
        </div>

        {/* main funtionality of parsing */}

        <section className="h-72">
          <div className="flex">
            <div className="w-1/3">
              <div className="w-full h-72  rounded-md border-2 border-gray-300  overflow-y-scroll overflow-hidden ">
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
              <div>
                {/* <ParsingButton  validationOfFiles={selectedFile}/> */}
                <div
                  className={`flex rounded-md border border-slate-100  ml-2 w-[320px] mt-1 h-14 items-center  ${
                    selectedFile ? "bg-green-300" : "bg-white"
                  }`}
                >
                  <p className="ml-2">Upload File first to parse</p>
                  <button
                    className={`ml-14 w-20 h-10 rounded-md text-white bg-black ${
                      selectedFile
                        ? "bg-black text-white cursor-pointer"
                        : "bg-slate-300 text-white cursor-not-allowed"
                    }`}
                    onClick={handleParsingOnClickButton}
                  >
                    Parse
                  </button>
                </div>
              </div>
            </div>

            {/* File Upload area is here */}
            <div className="w-2/3">
              {step == 1 && (
                <FileUpload
                  selectedFile={selectedFile}
                  onFileUpLoad={handleFileUpLoad}
                  setSelectedFile={setSelectedFile}
                />
              )}
              {step == 2 && (
                <>
                  <FileUpLoading message={message} />
                  {/* <button onClick={handleParse}>Parse</button> */}
                </>
              )}
              {step == 3 && (
                <ParsedFileResult
                  onClose={handleCloseJobResult}
                  parsedContent={parsedContent}
                  setParsedContent={setParsedContent}
                  // job_id={parsedContent.job_id}
                  jsonContent={jsonContent}
                />
              )}
            </div>
          </div>
          {/* </div> */}
        </section>
      </article>
    </>
  );
};

const FileUpload = ({ selectedFile, setSelectedFile }) => {
  const [cancelButtonClick, setCancelButtonClick] = useState(false);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  function handleCancelClick() {
    // alert("somone click cancel button")
    setCancelButtonClick(!cancelButtonClick);
    setSelectedFile(!selectedFile);
  }
  return (
    <div className="w-full min-h-[200px] h-fit border border-slate-300 rounded-2xl ml-1 mt-1 mb-1 mr-5 relative ">
      {/* <div className="w-full h-72 border border-slate-300 rounded-2xl ml-1 mt-1 mb-1 mr-5"> */}
      <div className="h-64 mt-1 ml-1 mr-1 mb-3  rounded-xl  border-dashed border-gray-400 border-2 overflow-hidden justify-center items-center relative ">
        <div>
          <input
            type="file"
            className="w-full h-64 block items-center -mt-20 text-white file:hidden absolute "
            onChange={handleFileChange}
          />

          <p className="relative text-center mt-20">
            <span className="font-bold text-gray-500">
              Drag 'n' drop files here, or click to select files
            </span>
            <br />
            <span className="ml-7 text-gray-300">
              You can upload a file up to 315 MB.
            </span>
          </p>
        </div>
      </div>

      {selectedFile && (
        <>
          <div className="flex ">
            <div className="w-full h-16  mb-2 mr-1 relative text-white rounded-lg flex ml-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  className="w-10 h-10 mt-3"
                >
                  <path
                    d="M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"
                    className="w-10 h-10 text-black"
                  />
                </svg>
              </div>
              <div className="ml-3 items-center justify-center mt-2">
                <div className="text-black ">{selectedFile.name}</div>
                <div className="text-black">
                  {" "}
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </div>
              </div>
            </div>
            <div className="mr-6 flex items-center justify-center mt-2 border-2 border-black rounded-full w-10 h-10">
              <button onClick={handleCancelClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  className="w-6 h-6"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const FileUpLoading = ({ message }) => {
  return (
    <>
    {/* <div className=" w-full h-full justify-center-items items-center flex">

    <div>{message}</div>
    </div> */}
     <div className="w-full min-h-[200px] h-fit border border-slate-300 rounded-2xl ml-1 mt-1 mb-1 mr-5 relative ">
      {/* <div className="w-full h-72 border border-slate-300 rounded-2xl ml-1 mt-1 mb-1 mr-5"> */}
      <div className="h-64 mt-1 ml-1 mr-1 mb-3 flex rounded-xl  border-dashed border-gray-400 border-2 overflow-hidden justify-center items-center relative ">
       {message}
      </div>
    </div>
    </>
  )
  
  
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
  const [imagesIsOpen,setImagesIsOpen]=useState(null);
   const [layoutIsOpen,setLayoutIsOpen]=useState(null);
    const [structuredIsOpen,setStructuredIsOpen]=useState(null);


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

  function handleImagesClick(){
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
  function handleLayOutClick(){
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
  function handleStructuredClick(){
    setStructuredIsOpen(!structuredIsOpen)
     setMarkDownIsOpen(null);
    setTextIsOpen(null);
    setJsonIsOpen(null);
     setImagesIsOpen(null);
    setLayoutIsOpen(null);
    setStructuredIsOpen(null);
  }
  // Helper to get button style based on active state
  const getTabButtonClass = (isActive) =>
    `w-full h-full rounded-md transition-colors duration-200 ${
      isActive
        ? "bg-black text-white"
        : "bg-slate-200 text-black hover:bg-slate-300"
    }`;

  return (
    <>
      <div>
        <div className="w-full rounded-md border-[1px] border-gray max-h-[600px]  ml-6">
          <div className="h-10 w-full flex items-center justify-start ml-3">
            <p className="font-semibold text-black text-xl mt-3">Results</p>
            <button
              onClick={onClose}
              className="bg-slate-100 border-[1px] flex items-center justify-center gap-3 border-gray w-28 text-black h-10 rounded-md ml-[465px] mt-3 font-semibold text-md hover:bg-black hover:duration-200 hover:text-white"
            >
              Close{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="w-5 h-5 "
                fill="currentColor"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          </div>
          <div className="h-8  mt-3 flex items-center justify-start gap-3">
            <div className="ml-4 text-black font-semibold">File Name</div>
            <div className="w-[380px] h-6 bg-slate-200  ml-3 flex items-center rounded-md text-sm">
              {" "}
              <p className="ml-2 flex gap-1">
                <span className="font-semibold"></span> Job Id:
                <span>{parsedContent ? parsedContent.job_id : "NO JOB ID"}</span>
              </p>
              <p className="ml-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-4 h-4 text-gray-900 ml-1 "
                  fill="currentColor"
                >
                  <path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z" />
                </svg>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="w-[100px] from-neutral-500 rounded-md ml-2">
              <button
                className={getTabButtonClass(markDownIsOpen)}
                onClick={handleMarkDownClick}
              >
                MarkDown
              </button>
            </div>
            <div className="w-16 from-neutral-500 rounded-md ml-2">
              <button
                className={getTabButtonClass(textIsOpen)}
                onClick={handleTextClick}
              >
                Text
              </button>
            </div>
            <div className="w-16 from-neutral-500 rounded-md ml-2">
              <button
                className={getTabButtonClass(jsonIsOpen)}
                onClick={handleJsonClick}
              >
                JSON
              </button>
            </div>
            <div className="w-20 from-neutral-500 rounded-md ml-2">
              <button className={getTabButtonClass(false)}  onClick={handleImagesClick}>Images</button>
            </div>
            <div className="w-20 from-neutral-500 rounded-md ml-2">
              <button className={getTabButtonClass(false)}  onClick={handleLayOutClick}>Layout</button>
            </div>
            <div className="w-16 from-neutral-500 rounded-md ml-2">
              <button
                className={getTabButtonClass(xlsxIsOpen)}
                onClick={handleXlsxClick}
              >
                XLSX
              </button>
            </div>
            <div className="w-28 from-neutral-500 rounded-md ml-2">
              <button className={getTabButtonClass(false)}  onClick={handleStructuredClick}>Structured</button>
            </div>
          </div>
          {parsedContent && markDownIsOpen && (
            <div className="w-[650px] rounded-md  border-dashed border-black border-[1px] max-h-64 overflow-y-scroll ml-2 mr-4 bg-slate-200 mt-2 mb-2">
              {parsedContent.markdown || "NO MARKDOWN PARSED"}
            </div>
          )}
          {parsedContent && textIsOpen && (
            <div className="w-[650px] rounded-md   border-dashed  border-black border-[1px] max-h-64 overflow-y-scroll ml-2 mr-4 bg-slate-200 mt-2 mb-2">
              {parsedContent.text || "NO TEXT PARSED"}
            </div>
          )}
          {jsonIsOpen && jsonContent && (
            <div className="w-[650px] rounded-md border-dashed border-black border-[1px] max-h-64 overflow-y-scroll ml-2 mr-4 bg-slate-200 mt-2 mb-2">
              {JSON.stringify(parsedContent.json, null, 2) || "NO JSON PARSED"}
            </div>
          )}
           { parsedContent && layoutIsOpen && (
            <div className="w-[650px] rounded-md border-dashed border-black border-[1px] max-h-64 overflow-y-scroll ml-2 mr-4 bg-slate-200 mt-2 mb-2">
              {parsedContent.layout || "NO Layout PARSED"}
            </div>
          )}
           { parsedContent && structuredIsOpen &&(
            <div className="w-[650px] rounded-md border-dashed border-black border-[1px] max-h-64 overflow-y-scroll ml-2 mr-4 bg-slate-200 mt-2 mb-2">
              {parsedContent.structured || "NO Structure PARSED"}
            </div>
          )}
           {parsedContent && imagesIsOpen && (
            <div className="w-[650px] rounded-md border-dashed border-black border-[1px] max-h-64 overflow-y-scroll ml-2 mr-4 bg-slate-200 mt-2 mb-2">
              {parsedContent.image || "NO Image PARSED"}
            </div>
          )}
          {parsedContent && xlsxIsOpen && (
            <div className="w-[650px]  rounded-md  border-dashed  border-black border-[1px] max-h-64  overflow-y-scroll ml-2 mr-4 bg-slate-200 mt-2 mb-2">
              {/* {parsedContent.xlsx && (
                <a
                  href={`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${parsedContent.xlsx}`}
                  download={`${parsedContent.filename}.xlsx`}
                >
                  Download XLSX
                </a>
              )} */}
              {parsedContent.xlsx || "NO xlsx PARSED"}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
