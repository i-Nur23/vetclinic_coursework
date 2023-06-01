import React from "react";
import {Link} from "react-router-dom";

export const RegistratorHome = () => {
  return(
    <div className='flex flex-col gap-6 p-2 justify-between w-1/3 h-3/5 top-1/2 m-auto shadow-zinc-600 rounded-lg'>
      <p className='text-center text-2xl'>Действия</p>
      <ul>
        <li className="nav-item ">
          <Link
            className="p-5 flex items-center uppercase leading-snug text-black border-b-2 hover:border-b-black"
            to="/workers/registrator/appointments"
          >
            <p className="text-lg leading-lg text-black opacity-75 "></p><span className="">Записи на услуги</span>
          </Link>
        </li>
        <li>
          <Link
            className="p-5 flex items-center uppercase leading-snug text-black border-b-2 hover:border-b-black"
            to="/workers/registrator/new_client"
          >
            <i className="leading-lg text-black opacity-75"></i><span className="">Добавление клиентов</span>
          </Link>
        </li>
        <li>
          <Link
            className="p-5 flex items-center uppercase leading-snug text-black border-b-2 hover:border-b-black"
            to="/workers/registrator/book"
          >
            <i className="leading-lg text-black opacity-75"></i><span className="">Запись</span>
          </Link>
        </li>
        <li>
          <Link
            className="p-5 flex items-center uppercase leading-snug text-black border-b-2 hover:border-b-black"
            to="/workers/registrator/add_pet"
          >
            <i className="leading-lg text-black opacity-75"></i><span className="">Карточки питомцев</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}