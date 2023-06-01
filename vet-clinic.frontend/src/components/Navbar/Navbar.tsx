import React from 'react'
import {Link} from "react-router-dom";
import logo from '../../assets/images/homepage/logo.png'
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Level} from "../../utils/Level";
import {AuthorizedControls, UnauthorizedControls} from "./AccountControls";

const Navbar = () => {
    const authLevel = useSelector((state: RootState) => state.level)
    return (
      <>
        <nav className="z-50 flex flex-wrap items-center justify-between bg-blue-200 px-2 bg py-3 mb-3 sticky top-0">
          <div className="container px-7 mx-auto flex flex-wrap items-center justify-between">
            <div style={{width: '25%'}}>
              <Link to="/">
                <div className='flex align-middle' style={{height: "50px"}}>
                  <img src={logo} alt='logo' style={{maxHeight: "100%"}}/>
                  <div className='m-auto ml-4'>
                    <div className='pt-2 text-lg text-center align-middle font-rus text-black'>Питомец</div>
                  </div>      
                </div>
              </Link>
            </div>
            <div
              className="flex"
              id="example-navbar-danger"
              style={{width: '50%'}}
            >
              <ul className="flex flex-col lg:flex-row list-none lg:m-auto">
                <li className="nav-item ">
                  <Link
                    className="mx-2 px-3 py-2 flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
                    to="/"
                  >
                    <p className="text-lg leading-lg text-black opacity-75 "></p><span className="">О нас</span>
                  </Link>
                </li>
                <li className="/">
                  <Link
                    className="mx-2 px-3 py-2 flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
                    to="/doctors"
                  >
                    <i className="leading-lg text-black opacity-75"></i><span className="">Наши специалисты</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="mx-2 px-3 py-2 flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
                    to="/services"
                  >
                    <i className="leading-lg text-black opacity-75"></i><span className="">Услуги</span>
                    <div className=""></div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex justify-end" style={{width: '25%'}}>
              {authLevel != Level.Client ? <UnauthorizedControls/> : <AuthorizedControls/>}
            </div>
          </div>
        </nav>
      </>
    )
}

export default Navbar