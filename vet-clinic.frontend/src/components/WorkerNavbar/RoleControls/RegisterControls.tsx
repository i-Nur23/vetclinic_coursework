import React from "react";

export const RegisterControls = () => {
  return(
    <ul className="flex flex-col lg:flex-row list-none lg:m-auto">
      <li className="nav-item ">
        <a
          className="mx-2 px-3 py-2 flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
          href="applications"
        >
          <p className="text-lg leading-lg text-black opacity-75 "></p><span className="">Заявки</span>
        </a>
      </li>
      <li>
        <a
          className="mx-2 px-3 py-2 flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
          href="petcards"
        >
          <i className="leading-lg text-black opacity-75"></i><span className="">Карточки пациентов</span>
        </a>
      </li>
      <li className="nav-item">
        <a
          className="mx-2 px-3 py-2 flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
          href="timesheet"
        >
          <i className="leading-lg text-black opacity-75"></i><span className="">Расписание</span>
        </a>
      </li>
    </ul>
  )
}