import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {useAppContext}   from './AppContext';  // Import the context

// pages parsing filter
const Mode = () => {
 // const [selectedOption, setSelectedOption] = useState("Accurate");
 const { selectedOption, setSelectedOption } = useAppContext(); // Access context state

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <>
      <div className="ml-3 ">
        <label className="flex">
          <input
            type="radio"
            name="options"
            value="Fast"
            checked={selectedOption === "Fast"}
            onChange={handleOptionChange}
            className="hidden"
          />
          <div className="icon">
            {selectedOption === "Fast" ? (
              <span className="checked-icon">✓</span> // Custom icon for selected state
            ) : (
              <span className="unchecked-icon">○</span> // Custom icon for unselected state
            )}
          </div>
          <span className="ml-2">Fast </span>
          <span className=" w-24 bg-slate-200 h-5 rounded-xl ml-2 flex items-center justify-center mt-1 text-sm">
            1 cred. /3 p.
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-[13px] h-[13px] ml-1 mt-1 text-slate-200"
          >
            <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
          </svg>
        </label>
        {/* Option 2  */}
        <label className="flex">
          <input
            type="radio"
            name="options"
            value="Accurate"
            checked={selectedOption === "Accurate"}
            onChange={handleOptionChange}
            className="hidden"
          />
          <div className="icon">
            {selectedOption === "Accurate" ? (
              <span className="checked-icon">✓</span> // Custom icon for selected state
            ) : (
              <span className="unchecked-icon">○</span> // Custom icon for unselected state
            )}
          </div>

          <span className="ml-2">Accurate</span>
          <span className=" w-24 bg-slate-200 h-5 rounded-xl ml-2 flex items-center justify-center mt-1 text-sm">
            1 cred. /1 p.
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-[13px] h-[13px] ml-1 mt-1 text-slate-200"
          >
            <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
          </svg>
        </label>
        {/* Option 3 */}
        <label className="flex">
          <input
            type="radio"
            name="options"
            value="Premium mode (our most accurate mode)"
            checked={selectedOption === "Premium mode (our most accurate mode)"}
            onChange={handleOptionChange}
            className="hidden"
          />
          <div className="icon">
            {selectedOption === "Premium mode (our most accurate mode)" ? (
              <span className="checked-icon">✓</span> // Custom icon for selected state
            ) : (
              <span className="unchecked-icon">○</span> // Custom icon for unselected state
            )}
          </div>
          <span className="ml-2 ">
            Premium mode (our most accurate{" "}
            <span className="m-auto flex">
              mode)
              <span className=" w-24 bg-slate-200 h-5 rounded-xl ml-1 flex items-center justify-center text-sm">
                1 cred. /1 p.
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-[13px] h-[13px] ml-1 mt-1 text-slate-200"
              >
                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
              </svg>
            </span>
          </span>
        </label>
        {/* option 4 */}
        <label className="flex">
          <input
            type="radio"
            name="options"
            value="3rd Party multi-modal model"
            checked={selectedOption === "3rd Party multi-modal model"}
            onChange={handleOptionChange}
            className="hidden"
          />
          <div className="icon">
            {selectedOption === "3rd Party multi-modal model" ? (
              <span className="checked-icon">✓</span> // Custom icon for selected state
            ) : (
              <span className="unchecked-icon">○</span> // Custom icon for unselected state
            )}
          </div>
          <span className="ml-2">3rd Party multi-modal</span>

          <span className=" w-24 bg-slate-200 h-5 rounded-xl ml-1 flex items-center justify-center text-sm">
            n cred. /1 p.
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-[13px] h-[13px] ml-1 mt-1 text-slate-200"
          >
            <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
          </svg>
        </label>
        {/* option 5 */}
        <label className="flex">
          <input
            type="radio"
            name="options"
            value="Continuous mode Beta"
            checked={selectedOption === "Continuous mode Beta"}
            onChange={handleOptionChange}
            className="hidden"
          />
          <div className="icon">
            {selectedOption === "Continuous mode Beta" ? (
              <span className="checked-icon">✓</span> // Custom icon for selected state
            ) : (
              <span className="unchecked-icon">○</span> // Custom icon for unselected state
            )}
          </div>
          <span className="ml-2">
            Continuous mode <sup className="text-sm">Beta</sup>
          </span>
          <br />
          <span className=" w-24 bg-slate-200 h-5 rounded-xl ml-1 flex items-center justify-center text-sm">
            10 cred. /1 p.
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-[13px] h-[13px] ml-1 mt-1 text-slate-200"
          >
            <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
          </svg>
        </label>
      </div>
    </>
  );
};

export default Mode