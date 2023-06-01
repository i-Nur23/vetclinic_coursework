import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {useNavigate} from "react-router-dom";
import React, {FormEvent, useEffect, useState} from "react";
import {AccountApi} from "../../api/AccountApi";
import {authorize} from "../../store/slicers/authSlice";
import {Level} from "../../utils/Level";
export const WorkerLogin = () =>{
  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate();

  const [message, setMessage] = useState< string >(' ')
  const [login, setLogin] = useState< string >('')
  const [password, setPassword] = useState< string >('')
  const level = useSelector((state : RootState) => state.level);

  useEffect( () => {
        (
          async () => {
            if (level >= 2){
              switch (level){
                case(Level.Admin):
                  navigate('admin/home')
                  break;
                case(Level.Register):
                  navigate('registrator/home')
                  break;
                case(Level.Manager):
                  navigate('manager/home')
                  break;
              }
            }

          }
        )();
      },[]);


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
    if (answer.isFound && answer.data.role != 'Клиент'){
      if (answer.data.role == 'admin'){
        dispatch(authorize( {level: Level.Admin, id: answer.data.id}))
        navigate('admin/home')
      }
      else if (answer.data.role == 'Врач'){
        dispatch(authorize( {level: Level.Doctor, id: answer.data.id}))
        navigate('doctor/home')
      }
      else if (answer.data.role == 'Менеджер') {
        dispatch(authorize( {level: Level.Manager, id: answer.data.id}))
        navigate('manager/home')
      }
      else if (answer.data.role == 'Регистратор') {
        dispatch(authorize( {level: Level.Register, id: answer.data.id}))
        navigate('registrator/home')
      }
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
  </div>)
}