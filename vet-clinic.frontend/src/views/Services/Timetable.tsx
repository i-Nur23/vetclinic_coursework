import React, {useEffect, useState} from "react";
import {DoctorApi} from "../../api/DoctorApi";
import {TimeHandler} from "../../utils/TimeHandler";
import './TimeTable.css'
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/solid";
import {Alert, Snackbar} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {BookingAPI} from "../../api/BookingAPI";
import {useNavigate} from "react-router-dom";
import {Level} from "../../utils/Level";

export const Timetable = ({docId, typeId, serviceId, clientId} : {docId : string, typeId : string, serviceId : string, clientId : string}) => {

  const [currentHours, setCurrentHours] = useState([]);
  const [oldHours, setOldHours] = useState([]);
  const [changeDate, setChangeDate] = useState<Date>(new Date());
  const [bookings, setBookings] = useState<any[]>([]);
  const [times, setTimes] = useState<Array<Array<any>>>([]);
  const [nowTime, setNowTime] = useState<Date>(new Date());
  const [week, setWeek] = useState<Date[]>([]);
  const [weeksCount, setWeekCount] = useState<number>(3);
  const [weekNumber, setWeekNumber] = useState<number>(1);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

  const level = useSelector((state : RootState) => state.level);

  const WORK_START = 8;
  const WORK_END = 18;
  const userId = useSelector((state : RootState) => state.id);
  const navigate = useNavigate();

  useEffect(() => {
    (
      async () => {
        let times = [];

        for (let i = WORK_START; i < WORK_END; i += 0.5){
          times.push([i, TimeHandler.toTimeString(i)]);
        }

        setTimes(times);
        setWeek(allDaysOfWeek());


        const resData = await DoctorApi.GetDoctorBookingTimes(docId);
        if (resData.ok){
          var today = new Date();
          today.setDate(today.getDate() + 16);
          setChangeDate(today);
          //setStringHours(resData.doctor.hours.workHours);

          if (resData.doctor.hours.oldWorkHours.length === 0){
            setOldHours(resData.doctor.hours.workHours.map((h : string | null) => {
              if (!h) return  h

              return h.split('-').map(x => TimeHandler.toTimeNumber(x))

            }));
          } else {
            setChangeDate(new Date(resData.doctor.hours.changeDate));

            setOldHours(resData.doctor.hours.oldWorkHours.map((h : string | null) => {
              if (!h) return  h

              return h.split('-').map(x => TimeHandler.toTimeNumber(x))

            }));

            setCurrentHours(resData.doctor.hours.workHours.map((h : string | null) => {
              if (!h) return  h

              return h.split('-').map(x => TimeHandler.toTimeNumber(x))

            }));
          }

          setBookings(resData.doctor.bookings);
        }
      }
    )()
  },[])

  const allDaysOfWeek = () => {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7 * (weekNumber - 1));
    let week = [];

    if (currentDate == undefined){
      return [];
    }

    currentDate.setDate((currentDate.getDate() - ( currentDate.getDay() - 1 ) ));

    for (let i = 0; i < 6; i++) {
      week.push(new Date(currentDate));

      currentDate.setDate(currentDate.getDate() +1);
    }

    return week;

  }

  const changeWeek = async (number: number) => {
    setWeekNumber(weekNumber + number);
  }

  useEffect(() => {
    setWeek(allDaysOfWeek());
  },[weekNumber])

  const BookAppointment = async (date : Date | undefined) => {
    if (date == undefined){
      setIsToastOpen(true);
      return;
    }


    let resData;

    if (level === Level.Unauthozized){
      setIsToastOpen(true);
      return;
    } else if (clientId === undefined){

      resData = await BookingAPI.BookAppointment(userId, docId, typeId, serviceId, date);
    } else {
      resData = await BookingAPI.BookAppointmentClient(clientId, docId, typeId, serviceId, date);
    }


    if (!resData.ok){
      setIsToastOpen(true);
    } else {
      if (clientId === undefined){
        navigate('/client/bookings')
      } else {
        if (level === Level.Register){
          navigate('/workers/registrator/book')
        } else if (level === Level.Doctor){
          navigate('/workers/doctor/home')
        }
      }
    }
  }

  return(
    <div>
      <div className='overflow-auto'>
        <table className='w-full'>
          <thead>
          <tr>
            {
              week.map(day =>
                <th className='border-2 border-black font-normal p-3 h-12 w-1/6'>
                  {('0' + day.getDate()).slice(-2)}.{('0' + (day.getMonth() + 1)).slice(-2)}
                </th>
              )
            }
          </tr>
          </thead>
          <tbody>
          {
            times.map((day, index) => {
              const stringTime = day[1];
              const numberTime = day[0];
              const [hour, min] = stringTime.split(':').map((x: string) => Number(x));

              let row = [];
              let date = new Date(week[0].getTime());
              let _date : Date;

              if (! (nowTime.getDay() == 0 || nowTime.getDay() == 6 && nowTime.getHours() >= 18)){
                date.setDate(date.getDate()  - 1)
              }

              date.setHours(hour, min, 0, 0);

              for (let i = 0; i < 6; i++) {
                date.setDate(date.getDate() + 1);
                _date = new Date(date.getTime());
                if (date.getTime() < nowTime.getTime() ||
                  (date.getTime() - nowTime.getTime()) / (1000 * 60 * 60 * 24) > 14) {
                  row.push(null)
                  continue;
                }

                if (date < changeDate){
                  if (
                    oldHours[i] == null ||
                    oldHours[i][0] > numberTime ||
                    oldHours[i][1] <= numberTime
                  ) {
                    row.push({type : 0, text : ''})
                    continue;
                  }
                } else {
                  if (
                    currentHours[i] == null ||
                    currentHours[i][0] > numberTime ||
                    currentHours[i][1] <= numberTime
                  ) {
                    row.push({type : 0, text : ''})
                    continue;
                  }
                }



                if (bookings.filter(b => new Date(b.date)?.getTime() == date.getTime()).length != 0){
                  row.push({type : 1, text : stringTime})
                  continue;
                }

                row.push({type : 2, text : stringTime, date : _date});
              }

              return (
                <tr className='text-center'>
                  {row.map(cell =>
                    {
                      if (!cell) return <td className='border-2 border-black p-3 h-12 crossed'></td>
                      if (cell.type == 0) return <td className='border-2 border-black p-3 h-12 bg-gray-100'></td>
                      if (cell.type == 1) return <td className='border-2 border-black p-3 h-12 bg-gray-400 text-gray-700'>{cell.text}</td>
                      if (cell.type == 2) return (
                      <td
                        className='border-2 border-black p-3 h-12 bg-green-400 text-green-800 cursor-pointer hover:bg-green-600 hover:text-black'
                        onClick={() => BookAppointment(cell.date)}
                      >
                        {cell.text}
                      </td>)
                    })
                  }
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
      <div className='flex justify-between mt-8'>
        {
          weekNumber != 1 ?
            <button className='rounded bg-gray-100 p-3 flex gap-4 hover:bg-gray-200'
              onClick={() => changeWeek(-1)}
            >
              <ArrowLeftIcon className='w-5 my-auto'/>
              Предыдущая неделя
            </button>
          :
            <div></div>
        }
        {
          weekNumber != weeksCount ?
              <button className='rounded bg-gray-100 p-3 flex gap-4 hover:bg-gray-200'
                onClick={() => changeWeek(1)}
              >
                Следующая неделя
                <ArrowRightIcon className='w-5 my-auto'/>
              </button>
            :
              <div></div>
        }
      </div>

      <Snackbar open={isToastOpen} autoHideDuration={4000} onClose={() => setIsToastOpen(false)}>
        <Alert onClose={() => setIsToastOpen(false)} severity="error">
          Ошибка записи
        </Alert>
      </Snackbar>
    </div>
  )
}