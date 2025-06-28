 <div className="flex">
      <div className="border-zinc-600 ml-[300px] border-[1px] min-h-screen bg-slate-100 w-[700px] h-screen">
        <div className="rounded-md w-[350px] h-[450px] bg-slate-800 ml-[170px] mt-[50px]">
          <div className="h-[100px]">
            <div className="flex items-center justify-center h-20">
              <img
                src="FileSculpt.svg"
                className="w-20 h-20 rounded-xl mt-7"
              />
            </div>
            <div className="mt-5 text-xl text-white ml-16">Welcome to LlamaCloud</div>
            <div className="mt-2 text-white ml-6">Sign in or create an account to get started.</div>
          </div>
          <div className="mt-24 ml-2">
            <div className="w-[300px] flex items-center justify-center bg-slate-200 ml-4 rounded-xl">
              <button
                onClick={signInWithGoogle}
                className="w-full h-10 bg-slate-200 rounded-xl flex gap-2 items-center justify-start"
              >
                <img
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  className="w-8 h-8 ml-3"
                />
                <p>Sign In With Google</p>
              </button>
            </div>
          </div>
          <div className="mt-40">
            <div className="text-sm ml-3 text-white">By continuing, you are indicating that you accept our</div>
            <div className="text-sm ml-[70px] text-white">
              <a>Terms of Service</a> and <a>Privacy Policy.</a>
            </div>
          </div>
        </div>
      </div>
    </div>