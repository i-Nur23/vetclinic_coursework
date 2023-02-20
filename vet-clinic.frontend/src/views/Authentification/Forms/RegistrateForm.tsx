import React from "react";

export const RegistrateForm = ({onChange} : any) => {

  return(<div className='flex flex-col gap-6 p-2 justify-between w-1/3 h-3/5 top-1/2 m-auto shadow-zinc-600 rounded-lg'>
    <p className='text-center text-2xl'>Создание учетной записи</p>
    <input
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0"
      placeholder="Имя"
    />
    <input
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0"
      placeholder="Фамилия"
    />
    <input
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0"
      placeholder="Почта"
    />
    <input
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0"
      placeholder="Логин"
    />
    <input
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0"
      type="password"
      placeholder="Пароль"
    />

    <button className="bg-gray-200 rounded-lg p-4">
      Зарегестрироваться
    </button>
    <div className="flex justify-between">
      <p>
        Уже есть учетная запись?
      </p>
      <button className="underline" onClick={onChange}>
        Войти
      </button>
    </div>
  </div>)
}