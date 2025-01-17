import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// Advanced Component
const Advanced = () => {
    const [isAdvancedIsOpen, setIsAdvancedIsOpen] = useState(false);
    const handleAdvancedButton = (event) => {
      event.preventDefault();
      setIsAdvancedIsOpen(!isAdvancedIsOpen);
    };
    return (
      <>
        <div className="ml-5 ">
          <button onClick={handleAdvancedButton} className="flex items-center">
            <span className="inline-block hover:border-b-2 hover:border-black">
              Advanced
            </span>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 ml-[188px]"
              viewBox="0 0 448 512"
            >
              <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
            </svg>
          </button>
        </div>
        {isAdvancedIsOpen && (
          <div className="ml-9 ">
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
        )}
      </>
    );
  };
export default Advanced;