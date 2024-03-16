import React, { useState } from "react";
import SideTab from "../Components/SideTab";
import MainImg from "../images/mainimg.jpg";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

const Home = () => {
  const [counterOn, setCounterOn] = useState(false);

  return (
    <div className="flex flex-row">
      <div className="flex-none">
        <SideTab />
      </div>
      
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-center p-4 pt-10">
            Welcome to Admin Dashboard
          </h1>
          <hr className="w-1/3 mx-auto font-semibold h-1 bg-gray-200 border-0 dark:bg-gray-700"/>
          <img src={MainImg} className="w-96 h-96 mx-auto" alt="Main" />
          <div className="grid grid-cols-2 mx-auto place-content-center w-2/3">
            <div className="bg-white rounded-lg shadow-lg p-4 m-4  h-44">
              <h2 className="text-3xl font-bold text-center">Project Count</h2>
              <h1 className="text-5xl font-bold text-slate-800 text-center p-4"> 
              <ScrollTrigger
               onEnter={() => setCounterOn(true)}
               onExit={() => {
                    setCounterOn(false);
               }}
               >
                    {counterOn && <CountUp start={0} end={50} duration={5} delay={0} /> }
               +
               </ScrollTrigger>
               </h1>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 m-4  h-44">
               <h2 className="text-3xl font-bold text-center">Customer Count</h2>
               <h1 className="text-5xl font-bold text-slate-800 text-center p-4"> 
              <ScrollTrigger
               onEnter={() => setCounterOn(true)}
               onExit={() => {
                    setCounterOn(false);
               }}
               >
                    {counterOn && <CountUp start={0} end={15} duration={3} delay={0} /> }
               +
               </ScrollTrigger>
               </h1>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Home;
