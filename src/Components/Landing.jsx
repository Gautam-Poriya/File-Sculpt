import React from "react";
import { useNavigate } from "react-router-dom";
const Landing = ({ collapsed }) => {
  const navigate = useNavigate();
  function handlePlayGroundArea() {
    navigate("/parse");
  }
  function handleChatwithDocument(){
    navigate("/Chat-With-Document")
  }
  return (
    <>
     
      <article
        className={`flex-1 min-h-0 min-w-0 flex items-center justify-center overflow-hidden p-6 transition-all duration-300 ${
          collapsed ? "ml-14" : "ml-52 md:ml-64"
        }`}
      >
        <div className="flex flex-1 items-center justify-center w-full h-full">
          <div className="max-w-xl w-full flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold mb-4">FileSculpt</h1>

            <p className="text-lg text-gray-700">
              Turn complex, unstructured PDFs into meaningful, machine-readable
              data — instantly.
              <br />
              <br />
              <strong>FileSculpt</strong> is the world’s first unified parsing
              engine powered by intelligent OCR and customizable filters —
              extract tables, text, forms, and layouts into clean formats like
              JSON, Markdown, Excel, and more.
              <br />
              <br />
              No manual clean-up. No more data chaos. Just precise,
              developer-friendly output in seconds.
            </p>

            <button
              className="bg-black text-white w-full h-10 rounded-md mt-6 hover:bg-gray-900 transition"
              onClick={handlePlayGroundArea}
            >
             Play Ground Area
            </button>

            <button  onClick={handleChatwithDocument} className="bg-black text-white w-full h-10 rounded-md mt-3 hover:bg-gray-900 transition">
              Chat With Document
            </button>
          </div>
        </div>
      </article>
    </>
  );
};
export default Landing;
