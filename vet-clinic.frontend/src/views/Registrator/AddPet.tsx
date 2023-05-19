import {ClientApi} from "../../api/ClientApi";
import React, {FormEvent, Fragment, useEffect, useState} from "react";
import {AnimalApi} from "../../api/AnimalApi";
import {TypesCombobox, BreedsCombobox, ClientsCombobox} from "../../components/Comboboxes";
import {AgeCalculator} from "../../utils/AgeCalculator";
import {PetAPI} from "../../api/PetAPI";
import {Dialog, Transition} from "@headlessui/react";
import {DeleteDialog} from "../../components/Dialogs/DeleteDialog";
import {EditDialog} from "../../components/Dialogs";
import {SnackbarLeftBottom} from "../../components/Snackbars";
import {MonthsCalculator} from "../../utils/MonthsCalculator";

export const AddPet = () => {
  const [type, setType] = useState<any>();
  const [breed, setBreed] = useState<any>();
  const [name, setName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>((new Date()).toISOString().substring(0,10))
  const [message, setMessage] = useState<string>('')
  const [image, setImage] = useState<File | null>(null);
  const [animals, setAnimals] = useState<any[]>([])
  const [breeds, setBreeds] = useState([])
  const [clients, setClients] = useState<any[]>([])
  const [client, setClient] = useState<any>()
  const [pets, setPets] = useState<any[]>([])
  const [shownPets, setShownPets] = useState<any[]>([])
  const [isDelOpen, setDelOpen] = useState<boolean>(false)
  const [isToastOpen, setToastOpen] = useState<boolean>(false)
  const [selectedPet, setSelectedPet] = useState<any>()
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    AnimalApi.getAll()
      .then(animals => ClientApi.getAllClients()
        .then(resData => PetAPI.getAll()
          .then(pets => {
            var clients = resData.data;
            setAnimals(animals)
            setType(animals[0])
            setBreeds(animals[0].breeds)
            setBreed(animals[0].breeds[0])
            setClients(clients)
            setClient(clients[0])
            setPets(pets)
            setShownPets(pets)
          })
        ))
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

  if (new Date(birthDate) > new Date()){
    setMessage('Вы ввели не наступившую дату')
    return;
  }


  var response = await PetAPI.createPet( type.type, breed === undefined ? undefined : breed.name, name, birthDate, image, client._id,);
  if (!response.ok){
    setMessage(response.message);
  } else {
    setToastOpen(true)
    setName('')
    setBirthDate((new Date()).toISOString().substring(0,10))
    setImage(null)
    setType(animals[0])
    setBreed(animals[0].breeds[0])
    setClient(clients[0])
    await fetchPets();
  }
}

const fetchPets = async () => {
    var response = await PetAPI.getAll();
    setPets(response);
    setShownPets(response);
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

    console.log(_type.breeds)
    setBreeds(_type.breeds);
    if (_type.breeds.length != 0){
      setBreed(_type.breeds[0])
    } else {
      setBreed(undefined)
    }
}


return(
  <div>
    <div className='w-2/5 mx-auto'>
      <form className="mt-2 flex flex-col gap-6 p-2 justify-between">
        <div className='flex gap-3 px-5 w-full'>
          <p className='my-auto w-1/5'>Вид: </p>
          <div className='w-full'>
            <TypesCombobox initList={animals} selected={type} setSelected={(type: any) => onTypeChanged(type)}/>
          </div>
        </div>
        <div className='flex gap-3 px-5 w-full'>
          <p className='my-auto w-1/5'>Порода: </p>
          <div className='w-full'>
            <BreedsCombobox initList={breeds} selected={breed} setSelected={(breed: any) => setBreed(breed)}/>
          </div>
        </div>
        <div className='flex gap-3 px-5 w-full'>
          <p className='my-auto w-1/5'>Хозяин: </p>
          <div className='w-full'>
            <ClientsCombobox initList={clients} selected={client} setSelected={(client: any) => setClient(client)}/>
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
          <input
            value={birthDate}
            type='date'
            className="form-input w-full ml-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
            placeholder="Кличка"
            onChange={e => setValue(e, setBirthDate)}
            onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Заполните это поле')}
            onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
            style={{width: '97.5%'}}
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
        <p className="text-red-700 font-light" style={{minHeight: '2em'}}>
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

    <hr className='my-5'/>

    <div className='mx-20'>
      <center className='text-lg'>Питомцы в системе</center>
      <input
        className='py-2 px-4 rounded-lg my-2 mx-3 focus:ring-0 focus:border-gray-500 w-full'
        type='text'
        value={query}
        onChange={e => {
          var query = e.target.value;
          setQuery(query)
          setShownPets(pets.filter(pet =>
            `${pet.nickname}${pet.breed}${pet.owner.email}${pet.owner.name}${pet.owner.surName}${pet.owner.phone}`
              .toLowerCase().indexOf(query.toLowerCase()) !== -1
          ))
        }}
        placeholder='Поиск...'

      />
      <ul>
        {shownPets.map( (pet : any) => (
          <li>
            <div className='flex justify-between border-b-2 border-gray-400 p-4'>
              <div className='w-1/6 rounded-lg my-auto'>
                <img
                  src={`http://localhost:3000/public/pets/${pet.image}`}
                  className='rounded-lg my-auto'
                />
              </div>
              <div className='w-4/6 flex flex-col gap-2 my-auto'>
                <p>Карточка №: {pet.cardNumber}</p>
                <p>Вид: {pet.type}</p>
                <p>Порода: {pet.breed == 'undefined' ? '' : pet.breed}</p>
                <p>Возраст : {AgeCalculator(pet.birthDate)} лет(год), {MonthsCalculator(pet.birthDate)} месяца(-ев)</p>
                <p>Кличка: {pet.nickname}</p>
                <p>Хозяин: {pet.owner.name} {pet.owner.surName}, {pet.owner.phone}, {pet.owner.email}</p>
              </div>
              <div className='flex flex-col gap-2 justify-center'>
                <button className='hover:bg-red-300 rounded-lg p-4 ease-in-out duration-200 h-full' onClick={() => {
                  setDelOpen(true);
                  setSelectedPet(pet);
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6 control">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {/*<button className='hover:bg-blue-300 rounded-lg p-4 ease-in-out duration-200' onClick={() => {
                  setEditOpen(true);
                  setSelectedPet(pet);
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6 control">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </button>*/}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Transition.Root appear show={isDelOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => { setDelOpen(false); fetchPets() }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              ><div>
                <DeleteDialog close={ () => { setDelOpen(false); setTimeout( () => fetchPets(), 1000)}} pet = {selectedPet}/>
              </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <SnackbarLeftBottom severety="success" text="Питомец добавлен" open={isToastOpen} setOpen={setToastOpen}/>
    </div>
  </div>
)
}