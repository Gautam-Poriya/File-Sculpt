import React from "react";
import Navbar from "./Navbar.jsx";
import Services from "./Aside/Services.jsx";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "./AppContext";
import axios from "axios";
import Prism from "prismjs";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
const History = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Navbar/>
      <section className="flex">
        <Services collapsed={collapsed} setCollapsed={setCollapsed} />
        <JobHistory collapsed={collapsed} />
      </section>
    </>
  );
};
export default History;

const ITEMS_PER_PAGE = 10;

// Popup component for file name
function FileNamePopup({ fileName, fileId, fileInfo, loading, onClose }) {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Markdown");
  const tabLabels = ["Markdown", "Text", "JSON", "Image", "Layout", "XLSX", "Structured"];

  const renderTabContent = () => {
    if (loading) {
      return <span className="text-blue-500 text-lg font-semibold animate-pulse">Loading file info...</span>;
    }
    if (!fileInfo) {
      return null;
    }
    console.log('FileInfo in popup:', fileInfo); // Debug log
    const previewBoxClass = "w-full h-full max-h-[420px] overflow-x-auto overflow-y-auto bg-white rounded-lg p-4 shadow-inner custom-scrollbar";
    switch (activeTab) {
      case "Markdown":
        return (
          <div className={previewBoxClass + " prose prose-blue max-w-none text-gray-900 font-sans text-lg leading-relaxed animate-tab-content-fade-in bg-blue-50 p-6 rounded-xl shadow-inner markdown-preview"}>
            {fileInfo.markDown && fileInfo.markDown.trim() !== '' ? (
              /[#*\-|`>\[\]_~]/.test(fileInfo.markDown) ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex, rehypeHighlight]}
                >
                  {fileInfo.markDown}
                </ReactMarkdown>
              ) : (
                <pre className="whitespace-pre-wrap break-words text-slate-800 font-mono text-base leading-relaxed selection:bg-blue-100 selection:text-blue-900 w-full">{fileInfo.markdown}</pre>
              )
            ) : <span className="text-gray-400 font-semibold text-lg text-center w-full">NO MARKDOWN PARSED</span>}
            <style>{`
              .markdown-preview h1, .markdown-preview h2, .markdown-preview h3 {
                font-weight: 700;
                color: #1e293b;
                margin-top: 1.5rem;
                margin-bottom: 1rem;
              }
              .markdown-preview code {
                background: #f1f5f9;
                color: #0f172a;
                border-radius: 0.375rem;
                padding: 0.2em 0.4em;
                font-size: 1em;
              }
              .markdown-preview pre {
                background: #f1f5f9;
                color: #0f172a;
                border-radius: 0.5rem;
                padding: 1em;
                font-size: 1em;
                overflow-x: auto;
              }
              .markdown-preview blockquote {
                border-left: 4px solid #60a5fa;
                background: #e0e7ef;
                color: #334155;
                padding: 0.5em 1em;
                margin: 1em 0;
                border-radius: 0.5rem;
              }
              .markdown-preview table {
                width: 100%;
                border-collapse: collapse;
                background: #fff;
                border-radius: 0.5rem;
                overflow: hidden;
              }
              .markdown-preview th, .markdown-preview td {
                border: 1px solid #cbd5e1;
                padding: 0.5em 1em;
                text-align: left;
              }
              .markdown-preview tr:nth-child(even) {
                background: #f1f5f9;
              }
            `}</style>
          </div>
        );
      case "Text":
        return (
          <div className={previewBoxClass + " animate-tab-content-fade-in"}>
            {fileInfo.text && fileInfo.text.trim() !== '' ? (
              (() => {
                const text = fileInfo.text;
                // If it's a single line or looks like code/log, use <pre>
                if (text.split('\n').length === 1 || /\t|\s{2,}/.test(text)) {
                  return <pre className="whitespace-pre-wrap break-words text-slate-800 font-mono text-base leading-relaxed selection:bg-blue-100 selection:text-blue-900 w-full">{text}</pre>;
                }
                // Otherwise, split into paragraphs
                return text.split(/\n\s*\n/).map((para, idx) => {
                  // Highlight keywords and linkify URLs
                  let html = para
                    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="text-blue-600 underline" target="_blank">$1</a>')
                    .replace(/\b(Error|Warning|Success)\b/gi, '<span class="font-bold px-1 rounded text-white bg-red-500">$1</span>');
                  return <p key={idx} className="mb-4 text-slate-800 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: html}} />;
                });
              })()
            ) : <span className="text-gray-400 font-semibold text-lg text-center w-full">NO TEXT PARSED</span>}
          </div>
        );
      case "JSON":
        return (
          <pre className={previewBoxClass + " font-mono text-base text-blue-900 bg-slate-100 border border-slate-200 animate-tab-content-fade-in language-json"} style={{whiteSpace:'pre-wrap', wordBreak:'break-word'}}
          dangerouslySetInnerHTML={{
            __html: (typeof Prism !== 'undefined' && Prism.highlight && fileInfo.json && Object.keys(fileInfo.json).length > 0)
              ? Prism.highlight(JSON.stringify(fileInfo.json, null, 2), Prism.languages.json, 'json')
              : (fileInfo.json && Object.keys(fileInfo.json).length > 0 ? JSON.stringify(fileInfo.json, null, 2) : 'NO JSON PARSED')
          }}
        />
        );
      case "Image":
        return (
          <div className={previewBoxClass + " flex items-center justify-center animate-tab-content-fade-in"}>
            {fileInfo.image && fileInfo.image.trim() !== '' ? (
              <img src={fileInfo.image.startsWith('data:image') ? fileInfo.image : `data:image/png;base64,${fileInfo.image}`} alt="Parsed" className="max-h-72 max-w-full rounded shadow" />
            ) : <span className="text-gray-400 font-semibold text-lg text-center w-full">NO IMAGE PARSED</span>}
          </div>
        );
      case "Layout":
        return (
          <pre className={previewBoxClass + " font-mono text-base animate-tab-content-fade-in"}>
            {fileInfo.layout && fileInfo.layout.trim() !== '' ? fileInfo.layout : 'NO LAYOUT PARSED'}
          </pre>
        );
      case "XLSX":
        return (
          <div className={previewBoxClass + " flex flex-col items-center justify-center animate-tab-content-fade-in"}>
            {fileInfo.xlsx && fileInfo.xlsx.trim() !== '' ? (
              <span className="text-blue-700 font-semibold">XLSX data available (download/preview logic needed)</span>
            ) : <span className="text-gray-400 font-semibold text-lg text-center w-full">NO XLSX PARSED</span>}
          </div>
        );
      case "Structured":
        return (
          <pre className={previewBoxClass + " font-mono text-base animate-tab-content-fade-in"}>
            {fileInfo.structured && fileInfo.structured.trim() !== '' ? fileInfo.structured : 'NO STRUCTURED PARSED'}
          </pre>
        );
      default:
        return null;
    }
  };

  const getTabButtonClass = (label) =>
    `px-5 py-2 rounded-lg font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-blue-200 ${activeTab === label ? 'bg-gradient-to-r from-blue-400 to-pink-400 text-white scale-105' : 'bg-white text-blue-900 hover:bg-blue-50 hover:scale-105'}`;

  const handleTabClick = (label) => setActiveTab(label);

  // Download logic for the popup modal
  const handleDownload = () => {
    let data = '';
    let filename = 'result';
    let type = 'text/plain';
    if (activeTab === 'Markdown' && fileInfo.markDown) {
      data = fileInfo.markDown;
      filename += '.md';
    } else if (activeTab === 'Text' && fileInfo.text) {
      data = fileInfo.text;
      filename += '.txt';
    } else if (activeTab === 'JSON' && fileInfo.json) {
      data = JSON.stringify(fileInfo.json, null, 2);
      filename += '.json';
      type = 'application/json';
    } else if (activeTab === 'Image' && fileInfo.image) {
      data = fileInfo.image;
      filename += '.png';
      type = 'image/png';
    } else if (activeTab === 'Layout' && fileInfo.layout) {
      data = fileInfo.layout;
      filename += '-layout.txt';
    } else if (activeTab === 'Structured' && fileInfo.structured) {
      data = fileInfo.structured;
      filename += '-structured.txt';
    } else if (activeTab === 'XLSX' && fileInfo.xlsx) {
      data = fileInfo.xlsx;
      filename += '.xlsx';
      type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else {
      alert('No content to download for this tab.');
      return;
    }
    // For images/xlsx, if data is base64, handle accordingly
    let blob;
    if ((activeTab === 'Image' || activeTab === 'XLSX') && data && typeof data === 'string' && data.length > 100) {
      // Assume base64
      const byteString = atob(data.split(',')[1] || data);
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
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl p-10 w-[80vw] max-w-4xl h-[80vh] max-h-[800px] flex flex-col animate-popup-fade-in"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'popupFadeIn 0.4s cubic-bezier(0.23, 1, 0.32, 1)' }}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-6 text-gray-400 hover:text-blue-600 text-3xl font-bold transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {/* File name */}
        <div className="w-full flex flex-col items-start mb-2">
          <span className="text-2xl font-bold text-blue-900 break-words text-left">{fileName}</span>
        </div>
        {/* File ID with copy button and download */}
        <div className="w-full flex flex-row items-center gap-2 mb-4">
          <span className="text-base font-mono font-semibold bg-green-100 text-green-800 border border-green-300 rounded px-4 py-1 truncate max-w-[calc(100vw-250px)] min-w-[260px] min-h-[1.25rem] flex items-center overflow-x-auto whitespace-nowrap">
            {fileId}
          </span>
          <button
            className="px-4 py-1 min-h-[1.25rem] flex items-center rounded bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs border border-blue-200 transition-all duration-150"
            onClick={() => {navigator.clipboard.writeText(fileId); setCopied(true); setTimeout(() => setCopied(false), 1200);}}
            title="Copy File ID"
            style={{ height: 'auto' }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            className="px-5 py-2 min-h-[1.75rem] flex items-center gap-2 rounded bg-black text-white text-xs font-semibold border border-gray-800 shadow transition-all duration-200 hover:bg-gray-900 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black animate-download-btn ml-auto"
            onClick={handleDownload}
            title="Download File"
            style={{ height: 'auto' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download
          </button>
        </div>
        {/* Buttons row */}
        <div className="w-full flex flex-row flex-wrap gap-3 items-center mb-2">
          {tabLabels.map((label) => (
            <button
              key={label}
              className={getTabButtonClass(label)}
              style={{ minWidth: 100 }}
              onClick={() => handleTabClick(label)}
            >
              {label}
            </button>
          ))}
        </div>
        {/* Divider - now directly below buttons with minimal margin and full width */}
        <div className="w-full border-b-2 border-blue-100 mb-6 mt-0"></div>
        {/* Tab content area */}
        <div className="flex-1 w-full min-h-0 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full min-h-0 flex-1 flex items-center justify-center">
            {renderTabContent()}
          </div>
        </div>
        <style>{`
          @keyframes popupFadeIn {
            0% { opacity: 0; transform: scale(0.95) translateY(32px);}
            100% { opacity: 1; transform: scale(1) translateY(0);}
          }
          .animate-popup-fade-in {
            animation: popupFadeIn 0.4s cubic-bezier(0.23, 1, 0.32, 1) both;
          }
          .animate-download-btn {
            transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.2s;
          }
          .animate-download-btn:hover {
            transform: scale(1.08) translateY(-2px);
            box-shadow: 0 6px 24px 0 rgba(0,0,0,0.18), 0 1.5px 4px 0 rgba(0,0,0,0.10);
          }
        `}</style>
      </div>
    </div>
  );
}

function syntaxHighlight(json) {
  if (!json) return '';
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = 'text-blue-700';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'text-pink-600'; // key
      } else {
        cls = 'text-green-700'; // string
      }
    } else if (/true|false/.test(match)) {
      cls = 'text-purple-700';
    } else if (/null/.test(match)) {
      cls = 'text-gray-500';
    } else {
      cls = 'text-orange-600'; // number
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}

function JobHistory({ collapsed }) {
  const [copiedId, setCopiedId] = useState(null);
  const copyTimeout = useRef();
  const [jobData, setJobData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(jobData.length / ITEMS_PER_PAGE);
  const { mainButtonLabel } = useAppContext();
  const token = localStorage.getItem("jwt");
  const [popupFile, setPopupFile] = useState(null);
  const [popupJobId, setPopupJobId] = useState("");
  const [popupFileInfo, setPopupFileInfo] = useState(null);
  const [popupLoading, setPopupLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/history", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            organization: mainButtonLabel,
          },
        });
        setJobData(response.data);
      } catch (error) {
        console.error("Error fetching job data in History section:", error);
      }
    };
    fetchHistory();
  }, [token, mainButtonLabel]);

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

  const handleFileClick = async (job) => {
    setPopupFile(job.filename || job.file_Name);
    setPopupJobId(job.jobId || "");
    setPopupLoading(true);
    setPopupFileInfo(null);
    try {
      const response = await axios.get("http://localhost:5000/file-info", {
        params: { jobId: job.jobId },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setPopupFileInfo(response.data);
    } catch (error) {
      setPopupFileInfo({ error: "Failed to fetch file info" });
    }
    setPopupLoading(false);
  };

  return (
    <div
      className="p-6 w-full max-w-6xl mx-auto animate-fade-in transition-all duration-300"
      style={{ marginLeft: collapsed ? '3.5rem' : '16rem' }}
    >
      <div className="flex gap-x-4 bg-gradient-to-r from-blue-100 to-pink-100 font-semibold p-3 rounded-xl shadow mb-2">
        <div className="flex-1 flex justify-start items-center text-blue-900 font-semibold">
          Filename
        </div>
        <div className="w-48 flex justify-center items-center text-blue-900 font-mono">
          Job ID
        </div>
        {/* <div className="w-1/6 flex justify-center items-center text-blue-900">
          Created By
        </div> */}
        <div className="w-1/5 flex justify-center items-center text-blue-900">
          Created At
        </div>
        <div className="w-1/12 flex justify-center items-center text-blue-900">
          Details
        </div>
      </div>
      {displayedJobs.length === 0 ? (
        <div className="flex justify-center items-center h-32 text-lg text-gray-500 font-semibold animate-fade-in">
          No job history found.
        </div>
      ) : (
        displayedJobs.map((job, index) => (
          <div
            key={index}
            className="flex gap-x-4 border-b border-slate-200 px-2 py-1.5 items-center text-sm bg-white/80 rounded-lg mb-1 shadow-sm hover:bg-blue-50 transition-all duration-200 animate-row-fade-in min-h-[44px]"
            style={{ animationDelay: `${0.05 * index}s` }}
          >
            <div
              className="flex-1 flex items-center text-gray-800 font-medium truncate group"
              onClick={() => handleFileClick(job)}
              style={{ minWidth: 0, cursor: 'pointer' }}
            >
              <span
                className="transition-all duration-200 group-hover:text-blue-600 group-hover:underline group-hover:decoration-blue-500 group-hover:decoration-2 group-hover:underline-offset-2"
                style={{ width: '100%', display: 'inline-block' }}
              >
                {job.filename || job.file_Name}
              </span>
            </div>
            <div
              className="w-48 flex flex-col justify-center items-center text-blue-700 font-mono break-words text-center gap-0.5"
              title={job.jobId}
            >
              {(() => {
                const id = job.jobId || '';
                const mid = Math.ceil(id.length / 2);
                return (
                  <>
                    <span className="leading-tight">{id.slice(0, mid)}</span>
                    <span className="leading-tight">{id.slice(mid)}</span>
                  </>
                );
              })()}
              <button
                className="mt-0.5 px-2 py-0.5 rounded bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs border border-blue-200 transition-all duration-150"
                onClick={() => {
                  navigator.clipboard.writeText(job.jobId);
                  setCopiedId(job.jobId);
                  clearTimeout(copyTimeout.current);
                  copyTimeout.current = setTimeout(() => setCopiedId(null), 1200);
                }}
                title="Copy Job ID"
              >
                {copiedId === job.jobId ? 'Copied!' : 'Copy'}
              </button>
            </div>
            {/* <div className="w-1/6 flex justify-center items-center text-gray-700">
              {job.createdBy}
            </div> */}
            <div className="w-1/5 flex justify-center items-center text-gray-700">
              {job.createdAt}
            </div>
            <div className="w-1/12 flex justify-center items-center">
              <button className="bg-gradient-to-r from-blue-200 to-pink-200 px-2 py-1 rounded-md text-xs font-semibold text-blue-900 shadow hover:from-blue-300 hover:to-pink-300 transition-all duration-200">
                More than 48h old
              </button>
            </div>
          </div>
        ))
      )}
      {popupFile && (
        <FileNamePopup fileName={popupFile} fileId={popupJobId} fileInfo={popupFileInfo} loading={popupLoading} onClose={() => setPopupFile(null)} />
      )}
      <div className="flex flex-row justify-between items-center mt-6 animate-fade-in w-full">
        <div className="text-gray-600 flex-shrink-0">
          Items per Page: {ITEMS_PER_PAGE}
        </div>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center justify-center w-9 h-9 bg-blue-200 rounded-full font-semibold text-blue-900 shadow hover:bg-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="text-gray-700 font-medium min-w-[120px] text-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="flex items-center justify-center w-9 h-9 bg-blue-200 rounded-full font-semibold text-blue-900 shadow hover:bg-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(24px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes rowFadeIn {
          0% { opacity: 0; transform: translateY(12px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-row-fade-in {
          animation: rowFadeIn 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          background: #f1f5f9;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 8px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f5f9;
        }
      `}</style>
    </div>
  );
}

// useEffect(() => {
//   return () => clearTimeout(copyTimeout.current);
// }, []);
