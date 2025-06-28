import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// Web Hook Component
const WebHook = () => {
  const [isWebHookIsOpen, setIsWebHookIsOpen] = useState(false);
  const handleWebHookButton = (event) => {
    event.preventDefault();
    setIsWebHookIsOpen(!isWebHookIsOpen);
  };
  return (
    <>
      <div className="ml-5 ">
        <button onClick={handleWebHookButton} className="flex items-center">
          <span className="inline-block hover:border-b-2 hover:border-black font-semibold">
            Web Hook
          </span>{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 ml-[184px]"
            viewBox="0 0 448 512"
          >
            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
          </svg>
        </button>
      </div>
      {isWebHookIsOpen && (
        <>
        <div className="ml-9 text-sm">
          <p>
            The URL of the webhook endpoint 
            <br />where data will be sent.
            <br />
            This should be a valid URL 
            <br />that your application or service is  <br />set up to handle incoming
           <br/> data from.
            <br />
            The protocol must be HTTPS.
            <br />
            The host must be a domain name <br /> rather than an IP address.
          </p>
        </div>
        {/* <div className="mockup-code w-16 ml-4">
        <pre data-prefix="$"><code>npm i daisyui</code></pre>
      </div> */}
      </>
      )}
    </>
  );
};

export default WebHook