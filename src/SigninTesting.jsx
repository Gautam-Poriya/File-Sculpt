import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAppContext } from "./Components/AppContext";
import { useEffect } from "react";

const Signin = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const { setUserData } = useAppContext();

  useEffect(() => {
    document.body.classList.add("animated-bg");
    return () => document.body.classList.remove("animated-bg");
  }, []);

  const signInWithGoogle = async () => {
    try {
     // const result = await signInWithPopup(auth, provider);
      const result =await signInWithRedirect(auth, provider);
      const idToken = await result.user.getIdToken();
      const response = await fetch("https://file-sculpt-backend.onrender.com/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: idToken }),
      });
      const data = await response.json();
      setUserData(data);
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Google Sign-in Failed", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 animate-gradient-move opacity-60"></div>
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30 animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 animate-float"></div>
      </div>
      {/* Card */}
      <div className="relative z-10 border border-zinc-200 shadow-2xl rounded-3xl bg-white/90 backdrop-blur-lg w-[370px] md:w-[400px] h-[500px] flex flex-col items-center justify-between p-8 animate-fade-in-up">
        <div className="flex flex-col items-center gap-2">
          <img
            src="FileSculpt.svg"
            className="w-20 h-20 rounded-xl mt-2 shadow-lg"
            alt="FileSculpt Logo"
          />
          <div className="mt-3 text-2xl font-bold text-gray-800 text-center">Welcome to FileSculpt</div>
          <div className="mt-1 text-gray-600 text-center text-base">Sign in or create an account to get started.</div>
        </div>
        <div className="w-full flex flex-col items-center mt-8">
          <button
            onClick={signInWithGoogle}
            className="w-full h-12 bg-white border border-gray-300 rounded-xl flex gap-3 items-center justify-center shadow-md hover:shadow-xl hover:bg-blue-50 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 group"
          >
            <img
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              className="w-8 h-8"
              alt="Google Icon"
            />
            <span className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors">Sign In With Google</span>
          </button>
        </div>
        <div className="mt-8 text-xs text-gray-500 text-center">
          By continuing, you are indicating that you accept our
          <br />
          <a className="underline cursor-pointer hover:text-blue-600">Terms of Service</a> and <a className="underline cursor-pointer hover:text-blue-600">Privacy Policy.</a>
        </div>
      </div>
      {/* Custom styles for animation */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradientMove 8s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }
        .animate-float-slow {
          animation: floatSlow 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Signin;
