import React from "react";

export const AdminHome = () => {
  return(
    <div className='flex flex-col gap-6 p-2 justify-between w-1/3 h-3/5 top-1/2 m-auto shadow-zinc-600 rounded-lg'>
      <p className='text-center text-2xl'>Действия</p>
      <ul>
        <li className="nav-item ">
          <a
            className="p-5 flex items-center uppercase leading-snug text-black border-b-2 hover:border-b-black"
            href="addusers"
          >
            <p className="text-lg leading-lg text-black opacity-75 "></p><span className="">Добавление пользователей</span>
          </a>
        </li>
        <li>
          <a
            className="p-5 flex items-center uppercase leading-snug text-black border-b-2 hover:border-b-black"
            href="catalog"
          >
            <i className="leading-lg text-black opacity-75"></i><span className="">Изменение справочной информации</span>
          </a>
        </li>
        <li>
          <a
            className="p-5 flex items-center uppercase leading-snug text-black border-b-2 hover:border-b-black"
            href="users"
          >
            <i className="leading-lg text-black opacity-75"></i><span className="">Список пользователей</span>
          </a>
        </li>
      </ul>
    </div>
  )
}