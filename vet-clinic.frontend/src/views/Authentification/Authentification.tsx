import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Level} from "../../utils/Level";
import {Navigate, redirect, useLocation, useNavigate} from "react-router-dom";
import {LoginForm} from "./Forms/LoginForm";
import {RegistrateForm} from "./Forms/RegistrateForm";

export const Authentification = () => {
  const authLevel = useSelector((state: RootState) => state.level)
  const navigate = useNavigate()
  const location = useLocation()
  const [isLogin, setIsLogin] = useState(true)


  useEffect(() => {
    if (authLevel !== Level.Unauthozized){
      navigate("/")
    }
    setIsLogin(location.state.login)
    console.log(isLogin)

  },[])

  return(
    <div className='container pt-18'>
      {isLogin ?
        <LoginForm onChange={() => setIsLogin(false)}/> :
        <RegistrateForm onChange={() => setIsLogin(true)}/>}
    </div>)
}