import React from "react";
import '@tailwindcss/forms'

export const LoginForm = ({onChange} : any) => {

  return(<div className='flex flex-col gap-6 p-2 justify-between w-1/3 h-3/5 top-1/2 m-auto shadow-zinc-600 rounded-lg'>
    <p className='text-center text-2xl'>Вход</p>
    <input
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0"
      placeholder="Логин"
    />
    <input
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0"
      placeholder="Пароль"
      type="password"
    />
    <button className="bg-gray-200 rounded-lg p-4">
      Войти
    </button>

    <div className="flex justify-between">
      <p>
        Ещё нет учетной записи?
      </p>
      <button className="underline" onClick={onChange}>
        Зарегестрироваться
      </button>
    </div>
  </div>)
}

