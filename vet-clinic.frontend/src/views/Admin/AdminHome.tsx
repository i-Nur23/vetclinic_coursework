import React from "react";
import {Link} from "react-router-dom";

export const AdminHome = () => {
  return(
    <div className='flex flex-col gap-6 p-2 justify-between w-1/3 h-3/5 top-1/2 m-auto shadow-zinc-600 rounded-lg'>
      <p className='text-center text-2xl'>Действия</p>
      <ul>
        <li className="nav-item ">
          <Link
            className="p-5 flex items-center uppercase leading-snug text-black border-b-2 hover:border-b-black"
            to="/workers/admin/addusers"
          >
            <p className="text-lg leading-lg text-black opacity-75 "></p><span className="">Добавление пользователей</span>
          </Link>
        </li>
        <li>
          <Link
            className="p-5 flex items-center uppercase leading-snug text-black border-b-2 hover:border-b-black"
            to="/workers/admin/catalog"
          >
            <i className="leading-lg text-black opacity-75"></i><span className="">Изменение справочной информации</span>
          </Link>
        </li>
        <li>
          <Link
            className="p-5 flex items-center uppercase leading-snug text-black border-b-2 hover:border-b-black"
            to="/workers/admin/users"
          >
            <i className="leading-lg text-black opacity-75"></i><span className="">Список пользователей</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}