import React, {FormEvent, useState} from "react";
import {AccountApi} from "../../api/AccountApi";
import {useNavigate} from "react-router-dom";
import {AlertColor, Snackbar} from "@mui/material";
import {SnackbarLeftBottom} from "../../components/Snackbars";

export  const AddNewClient = () => {
  const [message, setMessage] = useState< string >(' ')
  const [name, setName] = useState< string >('')
  const [surName, setSurName] = useState< string >('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState< string >('')

  const [severety, setSeverety] = useState<AlertColor>("success")
  const [text, setText] = useState("Добавление успешно")
  const [open, setOpen] = useState(false);

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


    try{
      await AccountApi.generateNewClient(name, surName, email, phone);
      setSeverety("success")
      setText("Добавление успешно")
      setOpen(true);
      setName('')
      setSurName('')
      setEmail('')
      setPhone('')

    } catch (e) {
      setSeverety("error")
      setText("Ошибка при добавлении")
      setOpen(true);
    }
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
        className="bg-transparent form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 w-4/5 disabled:bg-gray-200"
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
    <div>
      <p className="text-red-700 font-light" style={{minHeight:'2em'}}>
        {message}
      </p>
    </div>
    <button className="bg-black rounded-lg p-4 w-full text-white" onClick={() => Handle()}>
      Сохранить
    </button>

    <SnackbarLeftBottom severety={severety} text={text} open={open} setOpen={setOpen}/>
  </div>)
}