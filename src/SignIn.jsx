import React from "react";
// import {   GoogleAuthProvider } from "./firebaseClient";
import { auth, Provider } from "./firebaseClient.jsx";
import { useNavigate } from "react-router-dom";
// import { signInWithGoogle } from "./firebaseClient";
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";
//   const auth = getAuth(app);
//   const Provider = new GoogleAuthProvider();

const SignIn = () => {
  const navigate = useNavigate();
  //   const handleGoogleSignIn = async () => {
  //     try {
  //    const result= await signInWithPopup(auth, provider);
  //    const user=result.user;

  //       console.log(`user imfo:`, user);
  //       alert(`Welcome ${user.displayName}`);
  //       navigate("/")
  //     } catch (error) {
  //       console.error("error during Google sign In", error.message);
  //     }
  //   };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, Provider);
      const idToken = await result.user.getIdToken();

      const response = await fetch("https://file-sculpt-backend.onrender.com/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: idToken }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        // onLogin(data.token)
      }
      navigate("/home");
      // console.log(`user imfo:`, token);
      //       alert(`Welcome ${token.displayName}`);
      //       navigate("/")
    } catch (error) {
      console.error("Google Sign-in Failed", error);
    }
  };
  return (
    <>
      <div className="flex">
        <div className="  border-zinc-600 ml-[300px] border-[1px] min-h-screen bg-slate-100  w-[700px] h-screen ">
          <div className="rounded-md w-[350px]  h-[450px] bg-slate-800 ml-[170px] mt-[50px]">
            <div className="h-[100px] ">
              <div className="flex items-center justify-center  h-20 ">
                <img
                  src="https://cloud.llamaindex.ai/_next/image?url=%2Fassets%2Frounded_corners_logo.png&w=256&q=75 "
                  className="w-20 h-20 rounded-xl mt-7 "
                />
              </div>
              <div className="mt-5 text-xl text-white ml-16">
                Welcome to LlamaCloud
              </div>
              <div className="mt-2 text-white ml-6">
                Sign in or create an account to get started.
              </div>
            </div>

            <div className=" mt-24 ml-2">
              <div className="w-[300px] flex items-center justify-center bg-slate-200 ml-4 rounded-xl">
                {" "}
                <button
                  onClick={signInWithGoogle}
                  className="w-full h-10 bg-slate-200 rounded-xl flex gap-2 items-center justify-start"
                >
                  <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" className="w-8 h-8 ml-3"/>
                 <p>Sign In With Google</p> 
                </button>
              </div>
            </div>



            <div>
              <div className="mt-40">
                <div className="text-sm ml-3 text-white">By continuing, you are indicating that you accept our</div>
                <div className="text-sm ml-[70px] text-white"><a>Terms of Service</a> and<a> Privacy Policy.</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignIn;


