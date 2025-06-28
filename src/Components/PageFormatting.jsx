import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// Page Formatting Component
const PageFormatting = () => {
  const [isPageFormattingIsOpen, setIsPageFormattingIsOpen] = useState(false);
  const handlePageFormatting = (event) => {
    event.preventDefault();
    setIsPageFormattingIsOpen(!isPageFormattingIsOpen);
  };
  return (
    <>
      <div className="ml-5 ">
        <button onClick={handlePageFormatting} className="flex items-center">
          <span className="inline-block hover:border-b-2 hover:border-black font-semibold">
            Page Formatting
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 ml-[142px]"
            viewBox="0 0 448 512"
          >
            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
          </svg>
        </button>
      </div>
      {isPageFormattingIsOpen && (
        <div className="ml-9  text-sm">
          <p>
            If the string contains the string <br />
            pageNumber it will be replaced by the <br />
            page number.
          </p>
          <span className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="w-[13px] h-[13px] ml-1 mt-1 text-slate-200"
            >
              <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
            </svg>
            <p className="ml-1">Page separator</p>
          </span>{" "}
          <input
            type="text"
            className="w-40 h-8 rounded-md border border-spacing-1 mt-2"
            placeholder="\n---\n"
          />

          <p className="mt-3 flex gap-1"><svg xmlns="http://www.w3.org/2000/svg"   className="w-[13px] h-[13px] ml-1 mt-1 text-slate-200" viewBox="0 0 640 512"><path d="M318.4 16l-161 480h77.5l25.4-81.4h119.5L405 496h77.5L318.4 16zm-40.3 341.9l41.2-130.4h1.5l40.9 130.4h-83.6zM640 405l-10-31.4L462.1 358l19.4 56.5L640 405zm-462.1-47L10 373.7 0 405l158.5 9.4 19.4-56.4z"/></svg>Page Prefix</p>
          <input
            type="text"
            className="w-40 h-8 rounded-md border border-spacing-1 mt-2"
          />
          <p className="mt-3">Page Suffix</p>
          <input
            type="text"
            className="w-40 h-8 rounded-md border border-spacing-1 mt-2"
          />
        </div>
      )}
    </>
  );
};

export default PageFormatting
