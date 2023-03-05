import React, {FormEvent, Fragment, useState} from "react";
import { Dialog, Transition } from '@headlessui/react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

export const AddingDialog = (props:any) => {
  const [type, setType] = useState<string>('')
  const [breed, setBreed] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [birthDate, setBirthDate] = useState<Date | null>(new Date())
  const [message, setMessage] = useState<string>(' ')


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
        Добавление питомца
      </Dialog.Title>

      <div className="mt-2 flex flex-col gap-6 p-2 justify-between">
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
        <DatePicker selected={birthDate} onChange={date => setBirthDate(date)}/>
      </div>

      <div className="flex justify-between gap-2 mt-4">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => props.setAddOpen(false)}
        >
          Отмена
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => props.setAddOpen(false)}
        >
          Добавить
        </button>
      </div>
    </Dialog.Panel>
    </div>
  )
}