import {useEffect, useState} from "react";
import {DoctorApi} from "../../api/DoctorApi";
import {TimeHandler} from "../../utils/TimeHandler";
import {current} from "@reduxjs/toolkit";
import {DateHandler} from "../../utils/DateHandler";
import './TimeTable.css'
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/solid";

export const Timetable = ({id} : {id : string}) => {

  const [stringHours, setStringHours] = useState([]);
  const [floatHours, setFloatHours] = useState([])
  const [bookings, setBookings] = useState<any[]>([]);
  const [times, setTimes] = useState<Array<Array<any>>>([]);
  const [nowTime, setNowTime] = useState<Date>(new Date());
  const [week, setWeek] = useState<Date[]>([]);
  const [weeksCount, setWeekCount] = useState<number>(3);
  const [weekNumber, setWeekNumber] = useState<number>(1);

  const WORK_START = 8;
  const WORK_END = 18;


  useEffect(() => {
    (
      async () => {
        let times = [];

        for (let i = WORK_START; i < WORK_END; i += 0.5){
          times.push([i, TimeHandler.toTimeString(i)]);
        }

        setTimes(times);
        setWeek(allDaysOfWeek());


        const resData = await DoctorApi.GetDoctorBookingTimes(id);
        if (resData.ok){
          setStringHours(resData.doctor.hours.workHours);
          setFloatHours(resData.doctor.hours.workHours.map((h : string | null) => {
            if (!h) return  h

            return h.split('-').map(x => TimeHandler.toTimeNumber(x))

          }));
          setBookings(resData.doctor.bookings);
        }
      }
    )()
  },[])

  const allDaysOfWeek = () => {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7 * (weekNumber - 1));
    console.log(currentDate);
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

  const BookAppointment = async () => {
    
  }

  return(
    <div>
      <div className='overflow-auto' style={{height : '60vh'}}>
        <table className='border-collapse border-2 border-black w-full'>
          <thead className='sticky'>
          <tr>
            {
              week.map(day =>
                <th className='font-normal border-2 border-black p-3 h-12 w-1/6'>
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
              date.setHours(hour, min, 0, 0);

              for (let i = 0; i < 6; i++) {

                if (date.getTime() < nowTime.getTime() ||
                  (date.getTime() - nowTime.getTime()) / (1000 * 60 * 60 * 24) > 14) {
                  row.push(null)
                  date.setDate(date.getDate() + 1);
                  continue;
                }

                if (
                  floatHours[i] == null ||
                  floatHours[i][0] > numberTime ||
                  floatHours[i][1] <= numberTime
                ) {
                  row.push({type : 0, text : ''})
                  date.setDate(date.getDate() + 1);
                  continue;
                }


                if (bookings.filter(b => b.date.getDate() == date.getDate()).length != 0){
                  row.push({type : 1, text : stringTime})
                  date.setDate(date.getDate() + 1);
                  continue;
                }

                row.push({type : 2, text : stringTime});
                date.setDate(date.getDate() + 1);
              }

              return (
                <tr className='text-center'>
                  {row.map(cell =>
                    {
                      if (!cell) return <td className='border-2 border-black p-3 h-12 crossed'></td>
                      if (cell.type == 0) return <td className='border-2 border-black p-3 h-12 bg-gray-100'></td>
                      if (cell.type == 1) return <td className='border-2 border-black p-3 h-12 bg-gray-100 text-gray-500'>{cell.text}</td>
                      if (cell.type == 2) return (
                      <td
                        className='border-2 border-black p-3 h-12 bg-green-400 text-green-800 cursor-pointer hover:bg-green-600 hover:text-black'
                        onClick={BookAppointment}
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
    </div>
  )
}