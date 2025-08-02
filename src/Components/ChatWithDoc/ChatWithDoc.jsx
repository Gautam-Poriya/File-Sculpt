import React from "react";

function ChatWithDoc() {
  return (
    <>
      <article
        className={`flex-1 min-h-0 min-w-0 flex items-center justify-center overflow-hidden p-6 transition-all duration-300`}
      >
        <div className="flex flex-col items-center justify-center max-w-lg w-full h-full text-center">
          <div className="flex flex-col items-center justify-center space-y-4 p-6 rounded-xl border border-gray-200 shadow-md bg-white">
            <div className="animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800">
              Chat with Docs
            </h2>
            <p className="text-gray-600">
              This feature is currently undergoing scheduled maintenance to
              bring you a smoother, smarter experience.
              <br /> We’ll be back shortly — thank you for your patience!
            </p>

            <button className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
              Notify Me When It's Live
            </button>
          </div>
        </div>
      </article>
    </>
  );
}

export default ChatWithDoc;
