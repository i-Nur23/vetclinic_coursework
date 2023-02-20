import React, {useState} from 'react'
import {Link, NavLink, redirect} from "react-router-dom";
import logo from '../../assets/images/homepage/logo.png'

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    return (
      <>
        <nav className="z-50 flex flex-wrap items-center justify-between bg-blue-200 px-2 bg py-3 mb-3 sticky top-0">
          <div className="container px-7 mx-auto flex flex-wrap items-center justify-between">
            <div>
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
              className={
              "lg:flex flex-grow items-center" +
                (navbarOpen ? " flex" : " hidden")
              }
              id="example-navbar-danger"
            >
              <ul className="flex flex-col lg:flex-row list-none lg:m-auto">
                <li className="nav-item ">
                  <a
                    className="mx-2 px-3 py-2 flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
                    href="/"
                  >
                    <p className="text-lg leading-lg text-black opacity-75 "></p><span className="">О нас</span>
                  </a>
                </li>
                <li className="/">
                  <a
                    className="mx-2 px-3 py-2 flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
                    href="#pablo"
                  >
                    <i className="leading-lg text-black opacity-75"></i><span className="">Наши специалисты</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="mx-2 px-3 py-2 flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
                    href="#pablo"
                  >
                    <i className="leading-lg text-black opacity-75"></i><span className="">Услуги</span>
                    <div className=""></div>
                  </a>
                </li>
                <li>
                  <a
                    className="mx-2 px-3 py-2 flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
                    href="#pablo"
                  >
                    <i className="leading-lg text-black opacity-75"></i><span className="">Вакансии</span>
                    <div className=""></div>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <Link to="/auth" state={{login: true}}>
                <button className="rounded-lg bg-white p-2 mr-3">
                  Войти
                </button>
              </Link>
              <Link to="/auth" state={{login: false}}>
                <button className="rounded-lg bg-blue-500 p-2" onClick={() => redirect('/auth')}>
                  Зарегистрироваться
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </>
    )
}

export default Navbar