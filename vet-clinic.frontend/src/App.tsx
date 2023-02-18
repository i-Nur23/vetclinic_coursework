import React, {JSXElementConstructor} from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";


const App = ({children} : any) => {
  return (
    <div className=''>
      <Navbar/>
      {children}
      <Footer/>
    </div>
  );
}

export default App;
