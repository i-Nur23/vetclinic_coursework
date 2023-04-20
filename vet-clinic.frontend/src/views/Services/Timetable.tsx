import {useEffect, useState} from "react";
import {DoctorApi} from "../../api/DoctorApi";
import {TimeHandler} from "../../utils/TimeHandler";
import {current} from "@reduxjs/toolkit";
import {DateHandler} from "../../utils/DateHandler";
import './TimeTable.css'

export const Timetable = ({id} : {id : string}) => {

  const [stringHours, setStringHours] = useState([]);
  const [floatHours, setFloatHours] = useState([])
  const [bookings, setBookings] = useState([]);
  const [times, setTimes] = useState<Array<Array<any>>>([]);
  const [nowTime, setNowTime] = useState<Date>(new Date());
  const [week, setWeek] = useState<Date[]>([])

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
        setWeek(allDaysOfWeek())


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


  return(
      <table className='border-collapse border-2 border-black w-full'>
        <thead>
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
            const stringTime = times[index][1];
            const numberTime = times[index][0];
            const [hour, min] = stringTime.split(':');

            let row = [];
            let date = new Date(week[0].getTime());

            for (let i = 0; i < 6; i++){
              date.setHours(hour, min);

              if (date.getTime() < nowTime.getTime()){
                row.push(null)
                date.setDate(date.getDate() + 1);
                continue;
              }

              if (
                floatHours[index] == null ||
                floatHours[index] > numberTime ||
                floatHours[index] <= numberTime
              ){
                row.push('Записи нет')
                date.setDate(date.getDate() + 1);
                continue;
              }

              row.push(stringTime);
              date.setDate(date.getDate() + 1);
            }

            return(
              <tr className='text-center'>
                {row.map(cell => !cell ?
                  <td className='border-2 border-black p-3 h-12 bg-gray-300'></td>
                  :
                  <td className='border-2 border-black p-3 h-12'>{cell}</td>)}
              </tr>
            )
          })
        }
        </tbody>
      </table>
    )
}