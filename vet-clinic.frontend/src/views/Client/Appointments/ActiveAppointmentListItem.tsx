import {useEffect, useState} from "react";
import {BookingAPI} from "../../../api/BookingAPI";

export const ActiveAppointmentListItem = ({booking, refresh} : {booking : any, refresh : any}) => {

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDate(new Date(booking.date))
  },[])

  const cancelBooking = () => {
        BookingAPI.DeleteBookings(booking._id)
          .then(refresh())
  }

  return(
    <li className='p-3 border-b flex justify-between'>
      <div>
        <p className='flex gap-2'><p className='text-gray-400'>Услуга:</p> {booking.service}({booking.type})</p>
        {
          booking.doctor ? <p className='flex gap-2'><p className='text-gray-400'>Врач:</p> {booking.doctor}</p>  : null
        }
        <p className='flex gap-2'><p className='text-gray-400'>Дата и время:</p> {date.getDate()}.{('0' + date.getMonth()).slice(-2)}.{date.getFullYear()}
          {(booking.type != 'Прививки' && booking.type != 'Лабораторные исследования') ? `, ${date.getHours()}:${ ('0' + date.getMinutes()).slice(-2) }` : null }</p>
      </div>
      <button className='text-red-900' onClick={cancelBooking}>Отменить</button>
    </li>
  )
}