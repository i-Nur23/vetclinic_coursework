import {useEffect, useState} from "react";
import {BookingAPI} from "../../../api/BookingAPI";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {ActiveAppointmentListItem} from "./ActiveAppointmentListItem";
import {PassiveAppointmentListItem} from "./PassiveAppointmentListItem";

export const Appointments = () => {

  const [active, setActive] = useState([]);
  const [passive, setPassive] = useState([]);
  const id = useSelector((state : RootState) => state.id)


  useEffect(() => {
    (
      async () => {
        if (id != null){
          var response = await BookingAPI.AllClientBookings(id);
          if (response.ok){
            setActive(response.bookings.upcoming);
            setPassive(response.bookings.past);
          }
        }
      }
    )()
  },[])

  const refresh = () => {
    if (id != null){
      BookingAPI.AllClientBookings(id)
        .then(response => {
          if (response.ok){
            setActive(response.bookings.upcoming);
            setPassive(response.bookings.past);
          }
        })
    }
  }


  return(
    <div className='container px-20'>
      <center className='text-xl mb-8 mt-3'>Ваши приемы</center>
      {
        (active.length !== 0)
          ?
          <div>
            <p className='text-lg underline mb-3'>Активные записи</p>
            <ul>
              {
                active.map(book => <ActiveAppointmentListItem booking={book} refresh={() => refresh()}/>)
              }
            </ul>
          </div>
          : null
      }
      {
        passive.length !== 0
          ?
          <div>
            <p className='text-lg underline mb-3 mt-3'>Прошедшие записи</p>
            <ul>
              {
                passive.map(book => <PassiveAppointmentListItem item={book}/>)
              }
            </ul>
          </div>
          : null
      }
    </div>
  )
}