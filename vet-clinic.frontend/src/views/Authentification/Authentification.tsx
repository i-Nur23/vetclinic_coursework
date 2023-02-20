import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Level} from "../../utils/Level";
import {Navigate, redirect, useNavigate} from "react-router-dom";

export const Authentification = ({type : any} : any) => {
  const authLevel = useSelector((state: RootState) => state.auth.level)
  const navigate = useNavigate()


  useEffect(() => {
    if (authLevel !== Level.Unauthozized){
      console.log("Here")
      navigate("/")
    }
  },[])

  return(<div>
    Auth page
  </div>)

}