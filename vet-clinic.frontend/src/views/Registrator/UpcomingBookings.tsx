import {useEffect, useState} from "react";
import {BookingAPI} from "../../api/BookingAPI";

export  const UpcomingBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    BookingAPI.AllFutureBookings()
      .then(resData => {
        if (resData.ok){
          setBookings(resData.bookings);
        }
      })
  },[])

  const cancelBooking = (id : string) => {
    BookingAPI.DeleteBookings(id)
      .then(_ => {
        BookingAPI.AllFutureBookings()
          .then(resData => {
            if (resData.ok){
              setBookings(resData.bookings);
            }
          })
      })
  }

  return(
    <div className='px-20'>
      <center className='text-lg'>Записи клиники</center>
      <ul>
        {
          bookings.map((b: any) => (
            <li className='p-3 border-b flex justify-between'>
              <div className='grid grid-cols-2 w-3/5 gap-3 divide-x'>
                <div className='flex flex-col px-3'>
                  <p>Услуга: {b.service}</p>
                  <p>Время: {(new Date(b.date)).getDate()}.{('0' + (new Date(b.date)).getMonth()).slice(-2)}.{(new Date(b.date)).getFullYear()}
                    {(b.type != 'Прививки' && b.type != 'Лабораторные исследования') ? `, ${(new Date(b.date)).getHours()}:${('0' + (new Date(b.date)).getMinutes()).slice(-2)}` : null}</p>
                  <p>Врач: {b.doctor}</p>
                </div>
                <div className='flex flex-col px-3'>
                  <p>Клиент: {b.client.name} {b.client.surName}</p>
                  <p>Тел. : {b.client.phone}</p>
                  <p>E-mail : {b.client.email}</p>
                </div>
              </div>
              <div className='flex flex-col justify-center'>
                <button className='text-red-900' onClick={() => cancelBooking(b._id)}>Отменить</button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}