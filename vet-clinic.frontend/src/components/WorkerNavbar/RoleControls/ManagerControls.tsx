import React from "react";

export const ManagerControls = () => {
  return(
    <ul className="flex flex-col lg:flex-row list-none lg:m-auto">
      <li className="nav-item ">
        <a
          className="mx-2 px-3 py-2 flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
          href="manager/services"
        >
          <p className="text-lg leading-lg text-black opacity-75 "></p><span className="">Изменение перечня услуг</span>
        </a>
      </li>
      <li>
        <a
          className="mx-2 px-3 py-2 flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
          href="manager/shedulue"
        >
          <i className="leading-lg text-black opacity-75"></i><span className="">Составление расписания</span>
        </a>
      </li>
    </ul>
  )
}