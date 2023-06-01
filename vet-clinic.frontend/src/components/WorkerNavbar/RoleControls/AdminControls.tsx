import React from "react";
import {Link} from "react-router-dom";

export const AdminControls = () => {
  return(
    <ul className="flex flex-col lg:flex-row list-none lg:m-auto">
      <li className="nav-item ">
        <Link
          className="mx-2 px-3 py-2 flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
          to="/workers/admin/addusers"
        >
          <p className="text-lg leading-lg text-black opacity-75 "></p><span className="">Добавление пользователей</span>
        </Link>
      </li>
      <li>
        <Link
          className="mx-2 px-3 py-2 flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
          to="/workers/admin/catalog"
        >
          <i className="leading-lg text-black opacity-75"></i><span className="">Изменение справочной информации</span>
        </Link>
      </li>
      <li>
        <Link
          className="mx-2 px-3 py-2 flex items-center uppercase leading-snug text-black border-b-2 border-b-blue-200 hover:border-b-black"
          to="/workers/admin/users"
        >
          <i className="leading-lg text-black opacity-75"></i><span className="">Список пользователей</span>
        </Link>
      </li>
    </ul>
  )
}