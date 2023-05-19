import {ClientApi} from "../../api/ClientApi";
import React, {FormEvent, Fragment, useEffect, useState} from "react";
import {AnimalApi} from "../../api/AnimalApi";
import {TypesCombobox} from "./TypesCombobox";
import {BreedsCombobox} from "./BreedsCombobox";

export const AddPet = () => {
  const [type, setType] = useState<any>();
  const [breed, setBreed] = useState<any>();
  const [name, setName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>((new Date()).toISOString())
  const [message, setMessage] = useState<string>('')
  const [image, setImage] = useState<File | null>(null);
  const [animals, setAnimals] = useState([])
  const [breeds, setBreeds] = useState([])

  useEffect(() => {
    AnimalApi.getAll()
      .then(animals => setAnimals(animals));
  },[])

  const HandleAdding = async () => {
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

  /*var response = await ClientApi.AddPet(props.id, type, breed, name, birthDate, image);
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

const onTypeChanged = (_type : any) => {
    setType(_type);

    if (_type._id !== type._id){
      setBreed(null);
    }

    setBreeds(type._breeds);
}


return(
  <div className='w-2/5 mx-auto'>
      <form className="mt-2 flex flex-col gap-6 p-2 justify-between">
        {/*<input
          value={type}
          className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
          placeholder="Вид"
          onChange={e => setValue(e, setType)}
          onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Заполните это поле')}
          onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
        />*/}
        <div className='flex gap-3 px-5 w-full'>
          <p className='my-auto w-1/5'>Вид: </p>
          <div className='w-full'>
            <TypesCombobox initList={animals} selected={type} setSelected={(type : any) => onTypeChanged(type)}/>
          </div>
        </div>
        <div className='flex gap-3 px-5 w-full'>
          <p className='my-auto w-1/5'>Порода: </p>
          <div className='w-full'>
            <BreedsCombobox initList={breeds} selected={breed} setSelected={(breed : any) => setBreed(breed)}/>
          </div>
        </div>
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
            className="form-input w-full ml-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
            placeholder="Кличка"
            onChange={e => setValue(e, setBirthDate)}
            onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Заполните это поле')}
            onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
            style={{width : '97.5%'}}
          />
        </div>
        <div>
          <p className='mx-3 mb-2'>Фото:</p>
          <input
            name='image'
            type='file'
            className='mx-2 focus:ring-0'
            onChange={e => setImage(e.target.files ? e.target.files[0] : null)}/>
        </div>
      </form>
      <div>
        <p className="text-red-700 font-light" style={{minHeight:'2em'}}>
          {message}
        </p>
      </div>
      <div className="flex justify-between gap-2 mt-4">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => HandleAdding()}
        >
          Добавить
        </button>
      </div>
  </div>
)
}