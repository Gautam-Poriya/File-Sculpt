import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ReactDOM from "react-dom";
import { OrganizationProvider } from "./Components/OrganizationContext";
console.log("Hello World");
import AppProvider from "./Components/AppContext"; // Import the context provider
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>

//     <App />

//   </React.StrictMode>
// );
// const rootElement = document.getElementById("root");

// if (rootElement) {
//   const root = createRoot(rootElement);
//   root.render(
//     <React.StrictMode>
//       {/* <OrganizationProvider> */}
//         <App />
//       {/* </OrganizationProvider> */}
//     </React.StrictMode>
//   );
// } else {
//   console.error(
//     'Failed to find the root element. Ensure index.html has a div with id="root"'
//   );
// }

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);
// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);
// root.render(
//   <OrganizationProvider>
//     <App />
//   </OrganizationProvider>
// );

// ReactDOM.render(
//   <OrganizationProvider>
//     <App />
//   </OrganizationProvider>,
//   document.getElementById('root')
// );
