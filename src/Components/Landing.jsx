import React from "react";
import {useNavigate} from "react-router-dom"
const Landing = ({ collapsed }) => {
  const navigate = useNavigate();
  function handleSignUpForWaitList(){
      navigate("/uuid/waitlist-form")
  }
  return (
    <> 
    <article className={`flex-1 min-h-0 min-w-0 flex items-center justify-center overflow-hidden p-6 transition-all duration-300 ${collapsed ? 'ml-14' : 'ml-52 md:ml-64'}`}>
      <div className="flex flex-1 items-center justify-center w-full h-full">
        <div className="max-w-xl w-full flex flex-col items-center justify-center">
          <h4 className="text-4xl font-bold">FileSculpt</h4>
          
          <p className="mt-1">
            FileSculpt is an AI infrastructure platform that helps you spend <br/>
            less time managing infra & tuning parameters, and focus on your AI<br/>
            product.
          </p>
          <br/>
          <button className="bg-black text-white w-full h-10 rounded-md" onClick={handleSignUpForWaitList}>Sign up for waitlist</button>
          <br/>
          <button className="bg-black text-white w-full h-10 rounded-md mt-3">contact sales</button>
        </div>
      </div>
      </article>
    </>
  );
};
export default Landing;
