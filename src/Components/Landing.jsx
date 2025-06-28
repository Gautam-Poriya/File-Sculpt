import React from "react";
import {useNavigate} from "react-router-dom"
const Landing = () => {
  const navigate = useNavigate();
  function handleSignUpForWaitList(){
      navigate("/uuid/waitlist-form")
  }
  return (
    <> 
    <article className="h-screen w-4/5  " >
      <div className="items-center justify-center mt-32 flex">
        <div>
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
