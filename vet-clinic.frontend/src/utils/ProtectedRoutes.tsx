import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {Navigate, Route, Outlet} from "react-router-dom";
import {Level} from "./Level";

export const ProtectedRoutes = (props : {role: Level}) => {

  const level = useSelector((state: RootState) => state.level);

  return (
      level != props.role ? <Navigate to='..\' replace={true}/> : <Outlet/>
  )

  /*if (level != props.role){
    navigate('/')
  }

  return(
    <Route>
      {props.children}
    </Route>*/
}
