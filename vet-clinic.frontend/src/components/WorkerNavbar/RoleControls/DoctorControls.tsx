import React from "react";
import {Link} from "react-router-dom";

export const DoctorControls = () => {
  return(
    <ul className="flex flex-col lg:flex-row list-none lg:m-auto">
      <li className="nav-item ">
        <Link
          className="mx-2 px-3 py-2 flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
          to="/workers/doctor/appointments"
        >
          <p className="text-lg leading-lg text-black opacity-75 "></p><span className="">Приемы</span>
        </Link>
      </li>
    </ul>
  )
}