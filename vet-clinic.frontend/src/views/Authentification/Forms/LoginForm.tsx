import React, {FormEvent, useState} from "react";
import '@tailwindcss/forms'
import {AccountApi} from "../../../api/AccountApi";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store/store";
import {authorize} from "../../../store/slicers/authSlice";
import {Level} from "../../../utils/Level";

export const LoginForm = ({onChange} : any) => {

  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate();

  const [message, setMessage] = useState< string >(' ')
  const [login, setLogin] = useState< string >('')
  const [password, setPassword] = useState< string >('')


  const Handle = async () => {

    var isStop = false;

    var inputs = document.getElementsByClassName('required');
    Array.prototype.slice.call(inputs)
      .forEach((input) => {
        if (input.value === '') {
          (input as HTMLInputElement).setCustomValidity('Это обязательное поле')
          isStop = true
        }
      }
    );

    if (isStop){
      setMessage('Это поля обязательны к заполнению')
      return;
    }

    var answer = await AccountApi.getAccount(login, password);
    if (answer.isFound){
      console.log(answer.data)
      dispatch(authorize( {level: Level.Client, id: answer.data.id}))
      //navigate('/')
    } else {
      setMessage("Аккаунт не найден")
    }
  }

  const setValue = (e : FormEvent, action : any) => {
    var inputs = document.getElementsByClassName('required');
    Array.prototype.slice.call(inputs)
      .forEach((input) => {
        (input as HTMLInputElement).setCustomValidity('')
      }
    );

    action((e.target as HTMLInputElement).value)
    setMessage(' ')
  }

  return(<div className='flex flex-col gap-6 p-2 justify-between w-1/3 h-3/5 top-1/2 m-auto shadow-zinc-600 rounded-lg'>
    <p className='text-center text-2xl'>Вход</p>
    <input
      value={login}
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
      placeholder="Логин"
      onChange={e => setValue(e, setLogin)}
      onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Заполните это поле')}
      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
    />
    <input
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
      placeholder="Пароль"
      value={password}
      type="password"
      onChange={e => setValue(e, setPassword)}
      onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Заполните это поле')}
      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
    />
    <button className="bg-gray-200 rounded-lg p-4" onClick={() => Handle()}>
      Войти
    </button>
    <div>
      <p className="text-red-700 font-light" style={{minHeight:'2em'}}>
        {message}
      </p>
    </div>
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

