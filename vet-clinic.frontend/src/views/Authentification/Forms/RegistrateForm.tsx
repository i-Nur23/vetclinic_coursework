import React,{FormEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import { AccountApi } from "../../../api/AccountApi";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store/store";
import {authorize} from "../../../store/slicers/authSlice";
import {Level} from "../../../utils/Level";

export const RegistrateForm = ({onChange} : any) => {

  const [message, setMessage] = useState< string >(' ')
  const [login, setLogin] = useState< string >('')
  const [password, setPassword] = useState< string >('')
  const [name, setName] = useState< string >('')
  const [surName, setSurName] = useState< string >('')
  const [email, setEmail] = useState< string >('')
  const [phone, setPhone] = useState<string>('')

  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate();

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

  const Handle = async() => {
    var isStop = false;

    var inputs = document.getElementsByClassName('required');
    Array.prototype.slice.call(inputs)
      .forEach((input) => {
        if (input.value === ''){
          (input as HTMLInputElement).setCustomValidity('Это обязательное поле')
          isStop = true
        }
      }
    );

    if (isStop){
      setMessage('Это поля обязательны к заполнению')
      return;
    }

    var answer = await AccountApi.createAccount(login, password, name, surName, email,phone, 'Клиент');
    if (answer.ok){
      dispatch(authorize( {level: Level.Client, id: answer.id}))
      navigate('/')
    } else {
      setMessage(answer.message)
    }
  }

  return(<div className='flex flex-col gap-6 p-2 justify-between w-1/3 h-3/5 top-1/2 m-auto shadow-zinc-600 rounded-lg'>
    <p className='text-center text-2xl'>Создание учетной записи</p>
    <input
      value={name}
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
      placeholder="Имя"
      onChange={e => setValue(e, setName)}
      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
    />
    <input
      value={surName}
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
      placeholder="Фамилия"
      onChange={e => setValue(e, setSurName)}
      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
    />
    <input
      value={email}
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
      placeholder="Почта"
      onChange={e => setValue(e, setEmail)}
      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
    />
    <input
      value={phone}
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
      placeholder="Телефон"
      onChange={e => setValue(e, setPhone)}
      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
    />
    <input
      value={login}
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
      placeholder="Логин"
      onChange={e => setValue(e, setLogin)}
      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
    />
    <input
      value={password}
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
      type="password"
      placeholder="Пароль"
      onChange={e => setValue(e, setPassword)}
      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
    />

    <button className="bg-gray-200 rounded-lg p-4" onClick={() => Handle()}>
      Зарегестрироваться
    </button>
    <div>
      <p className="text-red-700 font-light" style={{minHeight:'2em'}}>
        {message}
      </p>
    </div>
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