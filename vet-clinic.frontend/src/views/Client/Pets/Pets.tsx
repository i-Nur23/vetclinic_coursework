import React, {Fragment, useEffect, useRef, useState} from "react";
import {ClientApi} from "../../../api/ClientApi";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {AddingDialog} from "./AddingDialog";
import {Dialog, Transition} from "@headlessui/react";
import './style.css'
import {AgeCalculator} from "../../../utils/AgeCalculator";

export const Pets = () => {
  const [pets, setPets] = useState<any[]>([]);
  const [isAddOpen, setAddOpen] = useState<boolean>(false)
  const [isEditOpen, setEditOpen] = useState<boolean>(false)
  const [isDelOpen, setDelOpen] = useState<boolean>(false)

  const clientId = useSelector((state: RootState) => state.id)

  const fetchPets = async () => {
    var response = await ClientApi.getPets(clientId);
    if (response.ok){
      setPets(response.data)
    }
  }


  useEffect(() => {
    (
      fetchPets
    )()
  },[])

  return(
    <>
      <div className='container px-9'>
        <div className='flex justify-center text-2xl'>Ваши питомцы</div>
        <ul>
          {pets.map( (pet : any) => (
            <li>
              <div className='flex justify-between border-b-2 border-gray-400 p-4'>
                <div className='w-1/6 rounded-lg '>
                  <img
                    src={`http://localhost:3000/public/pets/${pet.image}`}
                    className='rounded-lg my-auto'
                  />
                </div>
                  <div className='w-4/6 flex flex-col gap-2 my-auto'>
                    <p>Карточка №: {pet.cardNumber}</p>
                    <p>Вид: {pet.type}</p>
                    <p>Порода: {pet.breed}</p>
                    <p>Возраст (в годах): {AgeCalculator(pet.birthDate)}</p>
                    <p>Кличка: {pet.nickname}</p>
                  </div>
                <div className='flex flex-col gap-2 justify-between'>
                  <button className='hover:bg-red-300 rounded-lg p-4 ease-in-out duration-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6 control">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <button className='hover:bg-blue-300 rounded-lg p-4 ease-in-out duration-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6 control">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>

                  </button>
                </div>

              </div>
            </li>
          ))}
        </ul>
        <div className='flex justify-center hover:bg-blue-200 p-6 ease-in-out duration-100' onClick={()=> setAddOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6 border-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <Transition.Root appear show={isAddOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={async () => { setAddOpen(false) }}>
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
                <AddingDialog close={() => { setAddOpen(false); fetchPets() }} id={clientId}/>
              </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}