import React from "react";
import Navbar from "./Navbar.jsx";
import Services from "./Aside/Services.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const OragnizationMembers = () => {
  return (
    <>
      <Navbar />
      <section className="flex">
        <Services />
        <Members />
      </section>
    </>
  );
};
export default OragnizationMembers;

const Members = () => {
  const navigate = useNavigate();
  function handleOrganizationButton() {
    navigate("/settings");
  }
  return (
    <>
      <div className="w-full">
        <div className="h-20 border-b-slate-100 border-b-2 w-full ">
          <h5 className="font-semibold text-xl ml-10 mt-1">Settings</h5>
          <p className="ml-5">Manage organization settings and members.</p>
        </div>
        <br />
        <div>
          <div className="flex  ml-10 mr-10 bg-slate-100 h-11  rounded-md">
            <div className="rounded-md w-1/2 flex  items-center m-1">
              {" "}
              <button className=" w-full " onClick={handleOrganizationButton}>
                Organization
              </button>
            </div>
            <div className="rounded-md w-1/2 flex bg-white m-1 items-center">
              {" "}
              <button className=" w-full">Members</button>
            </div>
          </div>
          {/* <div className="min-h-40 border mt-3 ml-10 mr-10 rounded-md">
            <div className="flex gap-72 mt-3 items-center border-b-2 h-11 border-b-slate-100 rounded-md">

                <div className="ml-10 mr-10   ">
                    Organization ID
                </div>
                <div className="ml-10 mr-10">
                    Organization Name
                </div>
            </div>
                <div className="flex justify-center items-center font-bold h-28">API ID GOES HERE </div>
            </div> */}
          <div className="w-full">
            <MemberFunctionalities />
          </div>
        </div>
      </div>
    </>
  );
};

const MemberFunctionalities = () => {
  return (
    <>
      <div className="  ml-10 mr-10 h-80 border rounded-md mt-2">
        <div className="ml-5 mt-7 ">
          <h5 className="font-semibold text-xl">Members</h5>
          <p className="mt-3">
            <span>
              Members within an organization have access to all projects under
              the organization.
            </span>
            <br />
            <span className="mt-3">
              {" "}
              Billing and API keys are still handled at the individual account
              level.{" "}
            </span>
          </p>
        </div>
        <div className="mt-5 w-full  flex ">
          <button className="bg-black text-white ml-auto mr-5 h-10 w-36 rounded-md">
            Add members
          </button>
        </div>
        <div className="border rounded-md ml-5 mr-5 h-28 mt-3">
          <div className="h-12 w-full flex items-center border-b-2 border-b-slate-200">
            <div className="ml-3">Email</div>
            <div className="ml-72">Added By</div>
            <div className="ml-12">Role</div>
            <div className="ml-40">Projects</div>
            <div className="ml-28">Actions</div>
          </div>
          <div className="h-18 items-center flex justify-center mt-3 text-slate-500">
           No Member Added
          </div>
        </div>
      </div>
    </>
  );
};
