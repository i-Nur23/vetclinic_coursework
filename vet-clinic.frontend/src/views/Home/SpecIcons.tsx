import React, {useEffect} from "react";
import {Link} from "react-router-dom";

export const SpecIcons = (props : any) => {

  useEffect(() => {
    console.log(props.typeId)
  })

  return (
    <Link to={`services`} key={props.typeId} state={{typeId : props.typeId}} className="p-4 rounded-lg flex justify-center bg-blue-200 hover:shadow hover:shadow-zinc-200 hover:bg-blue-400">
      {props.children}
    </Link>
  )
}