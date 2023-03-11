import {Link, redirect} from "react-router-dom";
import logo from "../../assets/images/homepage/logo.png";
import {Level} from "../../utils/Level";
import {AuthorizedControls, UnauthorizedControls} from "../Navbar/AccountControls";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import { WorkerControls } from "./WorkerControls";
import {unauthorize} from "../../store/slicers/authSlice";

export const WorkerNavbar = () => {
  const authLevel = useSelector((state : RootState) => state.level);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <nav className="z-50 flex flex-wrap items-center justify-between bg-blue-200 px-2 bg py-3 mb-3 sticky top-0">
        <div className="container px-7 mx-auto flex flex-wrap items-center justify-between">
          <div style={{width: '25%'}}>
            <Link to="/">
              <div className='flex align-middle' style={{height: "50px"}}>
                <div className='m-auto ml-4'>
                  <div className='p-2 text-lg text-center align-middle text-black'>Перейти на клиентский сайт</div>
                </div>
              </div>
            </Link>
          </div>
          <WorkerControls role={authLevel}/>
          <div className="flex justify-end" style={{width: '25%'}}>
            {authLevel == Level.Unauthozized || authLevel == Level.Client ?
              <div/>
              :
              <Link to="/workers" state={{login: false}}>
                <button className="rounded-lg bg-red-300 p-2" onClick={() => {
                  dispatch(unauthorize());
                  redirect('/workers')
                }}>
                  Выход
                </button>
              </Link>}
          </div>
        </div>
      </nav>
    </>
  )
}