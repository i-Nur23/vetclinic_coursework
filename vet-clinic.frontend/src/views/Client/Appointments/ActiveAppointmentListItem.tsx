import {useEffect, useState} from "react";

export const ActiveAppointmentListItem = ({item} : {item : any}) => {

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDate(new Date(item.date))
  },[])

  return(
    <li className='p-3 border-b flex justify-between'>
      <div>
        <p className='flex gap-2'><p className='text-gray-400'>Услуга:</p> {item.service}({item.type})</p>
        {
          item.doctor ? <p className='flex gap-2'><p className='text-gray-400'>Врач:</p> {item.doctor}</p>  : null
        }
        <p className='flex gap-2'><p className='text-gray-400'>Дата и время:</p> {date.getDate()}.{('0' + date.getMonth()).slice(-2)}.{date.getFullYear()}
          {(item.type != 'Прививки' && item.type != 'Лабораторные исследования') ? `, ${date.getHours()}:${ ('0' + date.getMinutes()).slice(-2) }` : null }</p>
      </div>
      <button className='text-red-900'>Отменить</button>
    </li>
  )
}