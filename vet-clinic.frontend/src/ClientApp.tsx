import React, {JSXElementConstructor} from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import {Outlet} from "react-router-dom";

const ClientApp = ({children} : any) => {
  return (
    <div className='flex flex-col min-h-screen justify-between'>
      <div className='flex flex-col'>
        <Navbar/>
        <div className="pb-20">
          <Outlet/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ClientApp;