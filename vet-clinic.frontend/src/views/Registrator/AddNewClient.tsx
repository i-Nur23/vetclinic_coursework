import React, {FormEvent, useEffect, useState} from "react";
import {ClientApi} from "../../api/ClientApi";
import {AccountApi} from "../../api/AccountApi";
import {authorize} from "../../store/slicers/authSlice";
import {Level} from "../../utils/Level";
import {useNavigate} from "react-router-dom";

export  const AddNewClient = () => {
  const [message, setMessage] = useState< string >(' ')
  const [name, setName] = useState< string >('')
  const [surName, setSurName] = useState< string >('')
  const [login, setLogin] = useState< string >('')
  const [password, setPassword] = useState< string >('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState< string >('')

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

  const navigate = useNavigate();
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

    navigate('/workers/registrator/home')

    /*var answer = await AccountApi.createAccount(login, password, name, surName, email, phone, 'Клиент');
    if (answer.ok){
      navigate('.');
    } else {
      setMessage(answer.message)
    }*/
  }

  return(<div className='flex flex-col gap-6 p-2 justify-between w-1/3 h-3/5 top-1/2 m-auto shadow-zinc-600 rounded-lg'>
    <p className='text-center text-2xl'>Новый клиент</p>
    <div className='flex'>
      <span className='inline-block align-bottom mt-2 text-gray-400 mx-2 w-1/5'>
        Имя
      </span>
      <input
        value={name}
        className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required w-4/5 disabled:bg-gray-200"
        onChange={e => setValue(e, setName)}
        onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
      />
    </div>
    <div className='flex'>
      <span className='inline-block align-bottom mt-2 text-gray-400 mx-2 w-1/5'>
        Фамилия
      </span>
      <input
        value={surName}
        className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required w-4/5 disabled:bg-gray-200"
        onChange={e => setValue(e, setSurName)}
        onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
      />
    </div>
    <div className='flex'>
      <span className='inline-block align-bottom mt-2 text-gray-400 mx-2 w-1/5'>
        Почта
      </span>
      <input
        value={email}
        className="bg-transparent form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required w-4/5 disabled:bg-gray-200"
        onChange={e => setValue(e, setEmail)}
        onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
      />
    </div>
    <div className='flex'>
      <span className='inline-block align-bottom mt-2 text-gray-400 mx-2 w-1/5'>
        Телефон
      </span>
      <input
        value={phone}
        className="bg-transparent form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required w-4/5 disabled:bg-gray-200"
        onChange={e => setValue(e, setPhone)}
        onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
      />
    </div>
    <div className='flex'>
      <span className='inline-block align-bottom mt-2 text-gray-400 mx-2 w-1/5'>
        Логин
      </span>
      <input
        value={login}
        className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required w-4/5 disabled:bg-gray-200"
        onChange={e => setValue(e, setLogin)}
        onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
      />
    </div>
    <div className='flex'>
      <span className='inline-block align-bottom mt-2 text-gray-400 mx-2 w-1/5'>
        Пароль
      </span>
      <input
        value={password}
        className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required w-4/5 disabled:bg-gray-200"
        onChange={e => setValue(e, setPassword)}
        onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
      />
    </div>
    <div>
      <p className="text-red-700 font-light" style={{minHeight:'2em'}}>
        {message}
      </p>
    </div>
    <button className="bg-black rounded-lg p-4 w-full text-white" onClick={() => Handle()}>
      Сохранить
    </button>
  </div>)
}