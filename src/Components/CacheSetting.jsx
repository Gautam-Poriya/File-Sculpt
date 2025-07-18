import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// Cache Setting Component
const CacheSetting = () => {
  const [isCacheSettingIsOpen, setIsCacheSettingIsOpen] = useState(false);
  const handleCacheSetting = (event) => {
    event.preventDefault();
    setIsCacheSettingIsOpen(!isCacheSettingIsOpen);
  };
  return (
    <>
      <div className="w-full max-w-xl mx-auto my-4 bg-white/80 rounded-xl shadow-md p-4 transition-all duration-300 animate-toggle-fade-in">
        <button
          onClick={handleCacheSetting}
          className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-100 to-pink-100 hover:from-pink-200 hover:to-blue-200 font-semibold text-gray-800 shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <span className="inline-block">Cache setting</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 ml-2 transform transition-transform duration-300 ${isCacheSettingIsOpen ? 'rotate-180' : 'rotate-0'}`}
            viewBox="0 0 448 512"
          >
            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
          </svg>
        </button>
        <div
          className={`overflow-hidden transition-all duration-500 ${isCacheSettingIsOpen ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}
        >
          <div className="flex flex-col gap-3 text-sm px-2">
            <p>
              The URL of the webhook endpoint where
              <br /> data will be sent
              <br />
              This should be a valid URL that your
              <br /> application or service is set up to handle <br /> incoming
              data from.
              <br />
              The protocol must be HTTPS.
              <br />
              The host must be a domain name rather than <br /> an IP address.
            </p>
          </div>
        </div>
        <style>{`
          @keyframes toggleFadeIn {
            0% { opacity: 0; transform: translateY(24px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-toggle-fade-in {
            animation: toggleFadeIn 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
          }
        `}</style>
      </div>
    </>
  );
};
export default CacheSetting