import React from "react";
import { useNavigate } from "react-router-dom";

// SidebarToggle component
const SidebarToggle = ({ collapsed, setCollapsed }) => (
  <div
    className="absolute left-full top-0 z-50 flex justify-center w-0"
    style={{ transform: "translateX(-50%)" }}
  >
    <div className="relative flex items-center justify-center">
      {/* Halo background to mask border/artifacts */}
      <div
        className="absolute w-11 h-11 bg-white rounded-full z-0 shadow"
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      />
      <button
        className="relative z-10 w-9 h-9 bg-white border border-black/20 rounded-full shadow-lg flex items-center justify-center focus:outline-none"
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <span className="text-xl text-blue-600 font-bold select-none">
          {collapsed ? ">" : "<"}
        </span>
      </button>
    </div>
  </div>
);

const Services = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  function handleParseClick() {
    navigate("/parse");
  }
  function handleSettingButton() {
    navigate("/settings");
  }
  function handleApiKeyButton() {
    navigate("/Project/uuid/ApiKey");
  }
  function handleDocumentation() {
    window.location.href = "https://docs.cloud.llamaindex.ai/";
  }
  function openEmailApp() {
    const recipient = "gautamporiya1234@gmail.com";
    const subject = "Hello!";
    const body = "I would like to get in touch regarding...";
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }

  return (
    <>
      <aside
        className={`fixed left-0 top-20 h-[calc(100vh-80px)] z-40 transition-all duration-500 ease-in-out ${
          collapsed ? "w-14" : "w-52 md:w-64"
        } bg-white/80 backdrop-blur-lg shadow-xl border-r border-slate-200 animate-sidebar-slide-in flex flex-col`}
      >
        <SidebarToggle collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="relative flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
          <div className="transition-all duration-500">
            <div
              className={
                collapsed
                  ? "flex flex-col items-center justify-center gap-6 h-full pt-10"
                  : "ml-5 mt-8"
              }
            >
              {!collapsed && (
                <span className="font-light text-gray-700 text-lg">Tools</span>
              )}
              {!collapsed && <br />}
              <button
                className={`ml-3 mt-2 flex gap-2 items-center group rounded-lg px-2 py-1 transition-all duration-200 whitespace-nowrap max-w-full overflow-hidden text-ellipsis justify-center ${
                  collapsed
                    ? "hover:bg-blue-50 bg-white/80 w-10 h-10 flex items-center justify-center shadow-md animate-icon-fade-in"
                    : "hover:bg-blue-50"
                }`}
                onClick={handleParseClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-5 h-5 text-blue-500 group-hover:scale-125 group-hover:opacity-80 transition-transform duration-200 ${
                    collapsed ? "" : "mt-0.5"
                  }`}
                  viewBox="0 0 512 512"
                >
                  <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm88 64l0 64-88 0 0-64 88 0zm56 0l88 0 0 64-88 0 0-64zm240 0l0 64-88 0 0-64 88 0zM64 224l88 0 0 64-88 0 0-64zm232 0l0 64-88 0 0-64 88 0zm64 0l88 0 0 64-88 0 0-64zM152 352l0 64-88 0 0-64 88 0zm56 0l88 0 0 64-88 0 0-64zm240 0l0 64-88 0 0-64 88 0z" />
                </svg>
                {!collapsed && (
                  <span className="font-medium text-gray-800 group-hover:text-blue-600">
                    Parse
                  </span>
                )}
              </button>
              <div
                className={
                  collapsed ? "flex flex-col items-center gap-6 w-full" : "mt-6"
                }
              >
                {!collapsed && (
                  <span className="font-light text-gray-700 text-lg">
                    Resources
                  </span>
                )}
                {!collapsed && <br />}
                <button
                  className={`ml-3 mt-2 flex gap-2 items-center group rounded-lg px-2 py-1 transition-all duration-200 whitespace-nowrap max-w-full overflow-hidden text-ellipsis justify-center ${
                    collapsed
                      ? "hover:bg-blue-50 bg-white/80 w-10 h-10 flex items-center justify-center shadow-md animate-icon-fade-in"
                      : "hover:bg-blue-50"
                  }`}
                  onClick={handleSettingButton}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 text-blue-500 group-hover:scale-125 group-hover:opacity-80 transition-transform duration-200 ${
                      collapsed ? "" : "mt-0.5"
                    }`}
                    viewBox="0 0 512 512"
                  >
                    <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                  </svg>
                  {!collapsed && (
                    <span className="font-medium text-gray-800 group-hover:text-blue-600">
                      Settings
                    </span>
                  )}
                </button>
                <button
                  className={`ml-3 mt-2 flex gap-2 items-center group rounded-lg px-2 py-1 transition-all duration-200 whitespace-nowrap max-w-full overflow-hidden text-ellipsis justify-center ${
                    collapsed
                      ? "hover:bg-blue-50 bg-white/80 w-10 h-10 flex items-center justify-center shadow-md animate-icon-fade-in"
                      : "hover:bg-blue-50"
                  }`}
                  onClick={() => navigate("/parse/history")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 text-blue-500 group-hover:scale-125 group-hover:opacity-80 transition-transform duration-200 ${
                      collapsed ? "" : "mt-0.5"
                    }`}
                    viewBox="0 0 512 512"
                  >
                    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 48c110.5 0 200 89.5 200 200 0 44.2-14.7 85-39.6 117.7l-27.7-27.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l27.7 27.7C341 441.3 300.2 456 256 456c-110.5 0-200-89.5-200-200S145.5 56 256 56zm0 72c-13.3 0-24 10.7-24 24v104c0 6.6 2.7 12.9 7.1 17.5l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L280 248.4V152c0-13.3-10.7-24-24-24z"/>
                  </svg>
                  {!collapsed && (
                    <span className="font-medium text-gray-800 group-hover:text-blue-600">
                      History
                    </span>
                  )}
                </button>
                {/* <button
                  className={`ml-3 mt-2 flex gap-2 items-center group rounded-lg px-2 py-1 transition-all duration-200 whitespace-nowrap max-w-full overflow-hidden text-ellipsis justify-center ${
                    collapsed
                      ? "hover:bg-blue-50 bg-white/80 w-10 h-10 flex items-center justify-center shadow-md animate-icon-fade-in"
                      : "hover:bg-blue-50"
                  }`}
                  onClick={handleApiKeyButton}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 text-blue-500 group-hover:scale-125 group-hover:opacity-80 transition-transform duration-200 ${
                      collapsed ? "" : "mt-0.5"
                    }`}
                    viewBox="0 0 512 512"
                  >
                    <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
                  </svg>
                  {!collapsed && (
                    <span className="font-medium text-gray-800 group-hover:text-blue-600">
                      API key
                    </span>
                  )}
                </button> */}
              </div>
              <div
                className={
                  collapsed
                    ? "flex flex-col items-center gap-6 w-full mt-6"
                    : "mt-6"
                }
              >
                {!collapsed && (
                  <span className="font-light text-gray-700 text-lg">
                    Contacts
                  </span>
                )}
                {!collapsed && <br />}
                <button
                  className={`ml-3 mt-2 flex gap-2 items-center group rounded-lg px-2 py-1 transition-all duration-200 whitespace-nowrap max-w-full overflow-hidden text-ellipsis justify-center ${
                    collapsed
                      ? "hover:bg-blue-50 bg-white/80 w-10 h-10 flex items-center justify-center shadow-md animate-icon-fade-in"
                      : "hover:bg-blue-50"
                  }`}
                  onClick={openEmailApp}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className={`w-5 h-5 text-blue-500 group-hover:scale-125 group-hover:opacity-80 transition-transform duration-200`}
                  >
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                  </svg>
                  {!collapsed && (
                    <span className="font-medium text-gray-800 group-hover:text-blue-600">
                      Email Us
                    </span>
                  )}
                </button>
                <button
                  className={`ml-3 mt-2 flex gap-2 items-center group rounded-lg px-2 py-1 transition-all duration-200 whitespace-nowrap max-w-full overflow-hidden text-ellipsis justify-center ${
                    collapsed
                      ? "hover:bg-blue-50 bg-white/80 w-10 h-10 flex items-center justify-center shadow-md animate-icon-fade-in"
                      : "hover:bg-blue-50"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className={`w-5 h-5 text-blue-500 group-hover:scale-125 group-hover:opacity-80 transition-transform duration-200`}
                  >
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                  </svg>
                  {!collapsed && (
                    <a
                      href="https://www.linkedin.com/in/gautam-poriya-48756825a/"
                      target="_blank"
                      className="font-medium text-gray-800 group-hover:text-blue-600"
                    >
                      LinkedIn
                    </a>
                  )}
                </button>
                <button
                  className={`ml-3 mt-2 flex gap-2 items-center group rounded-lg px-2 py-1 transition-all duration-200 whitespace-nowrap max-w-full overflow-hidden text-ellipsis justify-center ${
                    collapsed
                      ? "hover:bg-blue-50 bg-white/80 w-10 h-10 flex items-center justify-center shadow-md animate-icon-fade-in"
                      : "hover:bg-blue-50"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    className={`w-5 h-5 text-blue-500 group-hover:scale-125 group-hover:opacity-80 transition-transform duration-200`}
                  >
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                  </svg>
                  {!collapsed && (
                    <a
                      href="https://github.com/Gautam-Poriya"
                      target="_blank"
                      className="font-medium text-gray-800 group-hover:text-blue-600"
                    >
                      GitHub
                    </a>
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Custom styles for animation */}
          <style>{`
            @keyframes sidebarSlideIn {
              0% { opacity: 0; transform: translateX(-40px); }
              100% { opacity: 1; transform: translateX(0); }
            }
            .animate-sidebar-slide-in {
              animation: sidebarSlideIn 0.7s cubic-bezier(0.23, 1, 0.32, 1);
            }
            @keyframes iconFadeIn {
              0% { opacity: 0; transform: scale(0.8); }
              100% { opacity: 1; transform: scale(1); }
            }
            .animate-icon-fade-in {
              animation: iconFadeIn 0.5s cubic-bezier(0.23, 1, 0.32, 1);
            }
          `}</style>
        </div>
      </aside>
    </>
  );
};
export default Services;
