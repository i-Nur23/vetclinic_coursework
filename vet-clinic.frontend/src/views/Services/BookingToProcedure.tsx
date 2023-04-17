import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {DateHandler} from "../../utils/DateHandler";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {BookingAPI} from "../../api/BookingAPI";
import {Alert, Snackbar} from "@mui/material";

export const BookingToProcedure = () => {

  const[typeId, setTypeId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [dates, setDates] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const {combinedId} = useParams();
  const id = useSelector((state : RootState) => state.id)
  const navigate = useNavigate();

  useEffect(() => {
    var splittedParams = combinedId?.split('_');
    if (splittedParams != undefined){
      setTypeId(splittedParams[0]);
      setServiceId(splittedParams[1]);
    }
    setDates(DateHandler.GetFortnight())
  },[])

  const handleBooking = async (date: Date) => {
    if (id != null){
      const response = await BookingAPI.BookProcedure(id , typeId, serviceId, date);

      if (response.ok){
        navigate('/client/bookings')
      } else {
        setOpen(true);
      }
    }
  }

  return(
    <div className='px-20'>
      <center className='text-lg'>Выберите день</center>
      <center className='text-lg'>Процедурный кабинет (404) работает каждый день с 8 до 18</center>
      <div className='mt-10 grid grid-cols-4 gap-5'>
        {
          dates.map(date =>
            <button className='p-4 border hover:border-black rounded-lg' onClick={() => handleBooking(date.date)}>
              {date.date.getDate()} {date.month}, {date.day}
            </button>
          )
        }
      </div>

      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="error">
          Ошибка при бронировании
        </Alert>
      </Snackbar>
    </div>
  )
}