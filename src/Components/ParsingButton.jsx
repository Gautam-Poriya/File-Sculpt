import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const ParsingButton = ( {validationOfFiles}) => {
    const navigate = useNavigate();

    function handleParsingOnClickButton(){
    //    navigate('/parse-result')
    if(validationOfFiles!==null){
            // frontend to backend request goes here
            alert("Button work sucessfully")
    }else {
        alert("Please Choose Your File First")
    }
    }

  return (
    <>
      <div className="flex rounded-md border border-slate-400 ml-2 w-[320px] mt-1 h-14 items-center  ">
        <p className="ml-2">Upload File first to parse</p>
        <button className="ml-14 w-20 h-10 rounded-md text-white bg-gray-400" onClick={handleParsingOnClickButton}>
          Parse
        </button>
      </div>
    </>
  );
};

export default ParsingButton