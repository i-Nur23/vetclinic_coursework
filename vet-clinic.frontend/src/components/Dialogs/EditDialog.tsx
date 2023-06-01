import React, {FormEvent, useState} from "react";
import {Dialog} from "@headlessui/react";

export const EditDialog = (props : {pet : any, close : Function}) => {
  const [type, setType] = useState<string>(props.pet.type)
  const [breed, setBreed] = useState<string>(props.pet.breed)
  const [name, setName] = useState<string>(props.pet.nickname)
  const [birthDate, setBirthDate] = useState<string>(new Date(props.pet.birthDate).toISOString().substring(0,10))
  const [message, setMessage] = useState<string>('')



  const HandleUpdate = async () => {

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

    if (new Date(birthDate) > new Date()){
      setMessage('Вы ввели не наступившую дату')
      return;
    }

    /*var response = await ClientApi.updatePet(props.id, type, breed, name, birthDate);
    if (!response.ok){
      setMessage(response.message);
    } else {
      props.close();
    }*/
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


  return(
    <div>
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900 text-center"
        >
          Обновление питомца
        </Dialog.Title>

        <form className="mt-2 flex flex-col gap-6 p-2 justify-between">
          <input
            value={type}
            className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
            placeholder="Вид"
            onChange={e => setValue(e, setType)}
            onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Заполните это поле')}
            onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
          />
          <input
            value={breed}
            className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700"
            placeholder="Порода"
            onChange={e => setValue(e, setBreed)}
            onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Заполните это поле')}
            onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
          />
          <input
            value={name}
            className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
            placeholder="Кличка"
            onChange={e => setValue(e, setName)}
            onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Заполните это поле')}
            onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
          />
          <div>
            <p className='mx-3 mb-2'>Дата рождения:</p>
            {/*<DatePicker selected={birthDate} onChange={(date) => setBirthDate(date)} className='mx-2 w-11/12'/>*/}
            <input
              value={birthDate}
              type='date'
              className="form-input ml-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
              placeholder="Кличка"
              onChange={e => setValue(e, setBirthDate)}
              onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Заполните это поле')}
              onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
              style={{width: '95%'}}
            />
          </div>
        </form>
        <div>
          <p className="text-red-700 font-light" style={{minHeight:'2em'}}>
            {message}
          </p>
        </div>
        <div className="flex justify-between gap-2 mt-4">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => props.close()}
          >
            Отмена
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => HandleUpdate()}
          >
            Обновить
          </button>
        </div>
      </Dialog.Panel>
    </div>
  )

}