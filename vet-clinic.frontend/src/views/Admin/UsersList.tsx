import {CustomListbox} from "../../components/Listbox";
import React, {FormEvent, useEffect, useState} from "react";
import {Level} from "../../utils/Level";
import {AccountApi} from "../../api/AccountApi";
import {AgeCalculator} from "../../utils/AgeCalculator";
import './style.css';

export const UsersList = () => {
  const roles = [
    'Все',
    'Врач',
    'Регистратор',
    'Менеджер'
  ]

  const [selectedRole, setSelectedRole] = useState<string>(roles[0])
  const [text, setText] = useState<string>('')
  const [allWorkers, setAllWorkers] = useState<any[]>([]);
  const [selectedWorkers, setSelectedWorkers] = useState<any[]>([])

  useEffect( () => {
    (
      async () => {
        var workers = await AccountApi.GetAllWorkers();
        setAllWorkers(workers);
        setSelectedWorkers(workers);

      }
    )();
  },[]);

  useEffect( () => {
      searchChange();
  },[selectedRole, text]);

  const searchChange = () => {
    var list = null;

    if (selectedRole != 'Все'){
      list = allWorkers.filter(w => w.account.type == selectedRole)
    } else {
      list = allWorkers;
    }

    if (text != ''){
      list = list.filter(w => (
        w.info.name.indexOf(text) != -1 ||
        w.info.surName.indexOf(text) != -1 ||
        w.info.email.indexOf(text) != -1 ||
        w.info.phone.indexOf(text) != -1
      ))
    }

    setSelectedWorkers(list);


  }

  return(
    <div className='container px-14 mt-7'>
      <div className='grid grid-cols-6 gap-4'>
        <div className='col-span-4'>
          <input
            className='w-full border-0 rounded-lg shadow-md'
            type='text'
            placeholder='Поиск'
            onChange={e => { setText(e.target.value) } }
          />
        </div>
        <div className='col-span-2'>
          <CustomListbox value={selectedRole} action= { setSelectedRole } list={roles}/>
        </div>
      </div>
      <ul>
        {selectedWorkers.map( (w : any) => (
          <li>
            <div className='flex justify-between border-b-2 border-gray-400 p-4'>
              <div className='my-auto'>
                <p>{w.info.name} {w.info.surName}</p>
                <p>Телефон: {w.info.phone}</p>
                <p>e-Mail: {w.info.email}</p>
                <p>{w.account.type}</p>
              </div>
              <div className='flex flex-col gap-2 justify-between'>
                <button className='hover:bg-red-300 rounded-lg p-4 ease-in-out duration-200' onClick={() => {}}>
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
    </div>
  )
}