import React, {FormEvent, Fragment, useEffect, useState} from "react";
import {AccountApi} from "../../api/AccountApi";
import {AnimalApi} from "../../api/AnimalApi";
import {Dialog, Transition} from "@headlessui/react";
import {TypeCard, BreedCard} from "./Cards";

export const AdminCatalog = () => {

  const [typesList, setTypesList] = useState([])
  const [breedsList, setBreedsList] = useState<any[] | null>(null)
  const [selectedType, setSelectedType] = useState<any>()
  const [selectedBreed, setSelectedBreed] = useState()
  const [type, setType] = useState('')
  const [breed, setBreed] = useState('')
  const [message, setMessage] = useState('')
  const [isDialogOpen, setDialog] = useState<boolean>(false)

  useEffect( () => {
    (
      async () => {
        await refreshTypeList();
      }
    )();
  },[]);

  const refreshTypeList = async () => {
    var animals = await AnimalApi.getAll();
    console.log(animals)
    setTypesList(animals);
  }

  const refreshBreedList = async () => {
    var animals = await AnimalApi.getAll();
    setTypesList(animals);

    var prevSelectedType = animals.find((animal : any) => animal._id == selectedType._id); 

    setBreedsList(prevSelectedType.breeds);
  }

  const setValue = (e : FormEvent, action : any) => {
    e.preventDefault()
    var inputs = document.getElementsByClassName('required');
    Array.prototype.slice.call(inputs)
      .forEach((input) => {
          (input as HTMLInputElement).setCustomValidity('')
        }
      );

    action((e.target as HTMLInputElement).value)
  }

  const handleAddingType = async () => {
    if (type == ''){
      setMessage('Вы ввели пустую строку')
      setDialog(true);
      return
    }

    var response = await AnimalApi.addType(type);

    if (!response.ok){
      setMessage(response.message)
      setDialog(true);
    } else {
      var animals = await AnimalApi.getAll();
      setTypesList(animals);
    }
  }

  const handleAddingBreed = async () => {
    if (breed == ''){
      setMessage('Вы ввели пустую строку')
      setDialog(true);
      return
    }

    var response = await AnimalApi.addBreed(selectedType._id, breed);

    if (!response.ok){
      setMessage(response.message)
      setDialog(true);
    } else {
      var animals = await AnimalApi.getAll();
      setTypesList(animals);

      var prevSelectedType = animals.find((animal : any) => animal._id == selectedType._id); 

      setBreedsList(prevSelectedType.breeds);

      setBreed('');
    }
  }


  const handleTypeChoosing = async (type : any) => {

    console.log(type)
    setSelectedType(type);
    
    setBreedsList(type.breeds);
  }

  return(
    <div className='container px-14 h-96'>
      <div className='grid grid-cols-2 gap-x-10 h-full'>
        <div className='overflow-auto'>
          <div className="text-center"><h2>Виды</h2></div>
          <ul>
            {
              typesList.map((animal : any) => (
                <li className='hover:bg-gray-50' onClick={(e : FormEvent) => handleTypeChoosing(animal)}>
                    <TypeCard 
                      animal = {animal} 
                      refresh={
                        async () => await refreshTypeList()} 
                      showMessage={
                        (mes : string) => {
                          setMessage(mes);
                          setDialog(true);
                        }
                      }
                    />
                </li>
              )
              )
            }
            <li>
              <div className='flex justify-between border-b-2 border-gray-400 p-4 '>
                <input
                  className='rounded-lg border-gray-400 w-1/2'
                  type = 'text'
                  value = {type}
                  placeholder='Новый вид'
                  onChange={(e : FormEvent) => setValue(e, setType)}
                />
                <button className='bg-white hover:bg-gray-200 p-2 ease-in-out duration-150 rounded-lg' onClick={handleAddingType}>
                  Добавить
                </button>
              </div>
            </li>
          </ul>
        </div>
        <div className='overflow-auto'>
        <div className="text-center"><h2>Породы</h2></div>
          {
            breedsList != null ? (
                <ul>
                  {
                    breedsList.map((breed : any) => (
                        <li>
                            <BreedCard 
                              typeId = {selectedType._id}
                              breed = {breed} 
                              refresh={
                                async () => await refreshBreedList()} 
                              showMessage={
                                (mes : string) => {
                                  setMessage(mes);
                                  setDialog(true);
                                }
                              }
                            />
                        </li>
                      )
                    )
                  }
                  <li>
                    <div className='flex justify-between border-b-2 border-gray-400 p-4 '>
                      <input
                        className='rounded-lg border-gray-400 w-1/2'
                        type = 'text'
                        value = {breed}
                        placeholder='Новая порода'
                        onChange={(e : FormEvent) => setValue(e, setBreed)}
                      />
                      <button className='bg-white hover:bg-gray-200 p-2 ease-in-out duration-150 rounded-lg' onClick={handleAddingBreed}>
                        Добавить
                      </button>
                    </div>
                  </li>
                </ul>
            ) :
              null
          }
        </div>
      </div>

      <Transition.Root appear show={isDialogOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setDialog(false)}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  {message}
                </Dialog.Title>
                <div className="flex justify-between gap-2 mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setDialog(false)}
                  >
                    Хорошо
                  </button>
                </div>
              </Dialog.Panel>
            </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
      </Transition.Root>
    </div>
  )
}
