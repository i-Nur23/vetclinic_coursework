import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import React, {FormEvent, useEffect, useState} from "react";
import {ClientApi} from "../../../api/ClientApi";
import {AccountApi} from "../../../api/AccountApi";

export const Profile = () => {
  const userId = useSelector((state : RootState) => state.id);

  const [message, setMessage] = useState< string >(' ')
  const [name, setName] = useState< string >('')
  const [surName, setSurName] = useState< string >('')
  const [login, setLogin] = useState< string >('')
  const [password, setPassword] = useState< string >('')
  const [email, setEmail] = useState< string >('')
  const [isDisabled, setIsDisabled] = useState< boolean >(true)


  useEffect(() => {
    (
      async () => {
        var response = await ClientApi.getClient(userId);
        if (response.ok){
          var client = response.data;

          setName(client.name);
          setSurName(client.surName);
          setEmail(client.email);
          setLogin(client.login);
          setPassword(client.password);
        }
      }
    )();
  },[]);

  const changeDisability = () => {
    setIsDisabled(!isDisabled)
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

    var answer = await AccountApi.createAccount(login, password, name, surName, email, 'client');
    if (answer.ok){

    } else {
      setMessage(answer.message)
    }
  }

  return(<div className='flex flex-col gap-6 p-2 justify-between w-1/3 h-3/5 top-1/2 m-auto shadow-zinc-600 rounded-lg'>
    <p className='text-center text-2xl'>Профиль</p>
    <input
      value={login}
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
      placeholder="Логин"
      onChange={e => setValue(e, setLogin)}
      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
    />
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
      disabled={true}
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
    <div>
      <p className="text-red-700 font-light" style={{minHeight:'2em'}}>
        {message}
      </p>
    </div>
    {isDisabled ?
      <button className="bg-gray-200 rounded-lg p-4" onClick={() => changeDisability()}>
        Войти
      </button>
      :
      <div className="flex justify-between gap-6">
        <button className="bg-gray-200 rounded-lg p-4" onClick={() => changeDisability()}>
          Отмена
        </button>
        <button className="bg-black rounded-lg p-4" onClick={() => Handle()}>
          Сохранить
        </button>
      </div>

    }
  </div>)
}