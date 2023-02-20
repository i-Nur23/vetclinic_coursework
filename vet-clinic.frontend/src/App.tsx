import React, {JSXElementConstructor} from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import {Outlet} from "react-router-dom";


const App = ({children} : any) => {
  return (
    <div className='flex flex-col min-h-screen justify-between'>
      <Navbar/>
      <div className="pb-20">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
