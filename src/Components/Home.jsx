import React, { useState } from "react";
import Navbar from "./Navbar.jsx"
import Services from "./Aside/Services.jsx"
import Landing from "./Landing.jsx"

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Navbar />
      <section className='flex flex-1 min-h-0 min-w-0 h-[calc(100vh-80px)]'>
        <Services collapsed={collapsed} setCollapsed={setCollapsed} />
        <Landing collapsed={collapsed} />
      </section>
    </>
  );
};

export default Home;