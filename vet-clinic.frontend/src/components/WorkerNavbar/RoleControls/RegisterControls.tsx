import React from "react";
import {Link} from "react-router-dom";

export const RegisterControls = () => {
  return(
    <ul className="flex flex-col lg:flex-row list-none lg:m-auto">
      <li className="nav-item ">
        <Link
          className="mx-2 px-3 py-2 text-center flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
          to="/workers/registrator/appointments"
        >
          <p className="text-lg leading-lg text-black opacity-75 "></p><span className="">Записи на услуги</span>
        </Link>
      </li>
      <li>
        <Link
          className="mx-2 px-3 py-2 text-center flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
          to="/workers/registrator/new_client"
        >
          <i className="leading-lg text-black opacity-75"></i><span className="">Добавление клиентов</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="mx-2 px-3 py-2 text-center h-full my-auto flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
          to="/workers/registrator/book"
        >
          <i className="leading-lg text-black opacity-75"></i><span className="my-auto">Запись</span>
        </Link>
      </li>
      <li className="nav-item my-auto">
        <Link
          className="mx-2 px-3 py-2 flex text-center items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
          to="/workers/registrator/add_pet"
        >
          <i className="leading-lg text-black opacity-75"></i><span className="my-auto">Карточки питомцев</span>
        </Link>
      </li>
    </ul>
  )
}