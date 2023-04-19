import {useEffect, useState} from "react";

export const PassiveAppointmentListItem = ({item} : {item : any}) => {

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDate(new Date(item.date))
  },[])

  return(
    <li className='p-3 border-b flex justify-between text-gray-400'>
      <div>
        <p className='flex gap-2'><p>Услуга:</p> {item.service}({item.type})</p>
        {
          item.doctor ? <p className='flex gap-2'><p>Врач:</p> {item.doctor}</p>  : null
        }
        <p className='flex gap-2'><p>Дата и время:</p> {date.getDate()}.{('0' + date.getMonth()).slice(-2)}.{date.getFullYear()}
          {(item.type != 'Прививки' && item.type != 'Лабораторные исследования') ? `${date.getHours()}:${date.getMinutes()}` : null }</p>
      </div>
    </li>
  )
}