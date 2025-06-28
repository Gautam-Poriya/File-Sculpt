import React from "react";
import Navbar from "./Navbar.jsx";
import Services from "./Aside/Services.jsx";
import { useState } from "react";
const ApiKey = () => {
  return (
    <>
      <Navbar />
      <section className="flex">
        <Services />
        <ApiKeyFunctionality />
      </section>
    </>
  );
};
export default ApiKey;

const ApiKeyFunctionality = () => {
  return (
    <>
      <div className="w-full h-fulls">
        <div className="w-full border-b-2 border-b-slate-100 h-20">
          <h5 className="ml-11 mt-3 text-xl font-semibold ">API KEY</h5>
          <p className="ml-6 ">Generate and manage your API keys.</p>
        </div>

        <div className="w-full h-full ">
          <div className="mt-8 ml-8 w-48 h-10 rounded-md items-center">
            <button className="w-48 h-10 bg-black rounded-md text-white">
              Generate New Key
            </button>
          </div>
          <div className="h-40 mr-10 border-2 border-slate-100 rounded-lg mt-6 ml-8 ">
            <div className="h-12 flex  items-center border-b-2 border-b-slate-100">
              <div className="ml-10">Key Name</div>
              <div className="ml-44">API Key</div>
              <div className="ml-44">Date Created</div>
              <div className="ml-44">Last Used</div>
            </div>
            <div className="flex items-center justify-center text-slate-500 mt-10">
              No Results
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
