import React, {useEffect, useState} from "react";
import {ClientApi} from "../../api/ClientApi";
import {ClientsCombobox} from "../../components/Comboboxes";
import {Link} from "react-router-dom";

export const ClientChoiceToBook = () => {
  const [clients, setClients] = useState([])
  const [client, setClient] = useState<any>()

  useEffect(() => {
    ClientApi.getAllClients()
      .then(resData => {
        var clients = resData.data;
        setClients(clients)
        setClient(clients[0])
      })
  },[])

  return(
    <div className='mx-20'>
      <div className='w-1/2 mt-32 m-auto flex flex-col gap-6'>
        <center className='text-xl'>Выберите клиента: </center>
        <ClientsCombobox initList={clients} selected={client} setSelected={setClient}/>
        <Link
          to={'/services'}
          state={{clientId : client?._id}}
          className='w-full bg-blue-200 text-center text-blue-700 hover:bg-blue-300 p-2 rounded-lg'>
          Далее
        </Link>
        <a href="/workers/registrator/new_client" className='underline text-end'>Новый клиент</a>
      </div>
    </div>
  )
}