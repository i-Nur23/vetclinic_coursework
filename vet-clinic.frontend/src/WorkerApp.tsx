import React from 'react';
import Footer from "./components/Footer/Footer";
import {Outlet} from "react-router-dom";
import {WorkerNavbar} from "./components/WorkerNavbar";

const ClientApp = ({children} : any) => {
  return (
    <div className='flex flex-col min-h-screen justify-between'>
      <div className='flex flex-col'>
        <WorkerNavbar/>
        <div className="pb-20">
          <Outlet/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ClientApp;