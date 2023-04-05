import React from "react";
import {Link} from "react-router-dom";

export const SpecIcons = ({children} : any, props : {typeId : string}) => (
  <Link to={`services`} state={{typeId : props.typeId}} className="p-4 rounded-lg flex justify-center bg-blue-200 hover:shadow hover:shadow-zinc-200 hover:bg-blue-400">
    {children}
  </Link>
)