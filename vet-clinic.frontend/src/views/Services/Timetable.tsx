import {useEffect, useState} from "react";
import {DoctorApi} from "../../api/DoctorApi";
import {TimeHandler} from "../../utils/TimeHandler";
import {current} from "@reduxjs/toolkit";

export const Timetable = ({id} : {id : string}) => {

  const [hours, setHours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [times, setTimes] = useState<Array<Array<any>>>([]);
  const [nowTime, setNowTime] = useState<Date>();
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
        setNowTime(new Date());
        setWeek(allDaysOfWeek())


        const resData = await DoctorApi.GetDoctorBookingTimes(id);
        if (resData.ok){
          setHours(resData.doctor.hours);
          setBookings(resData.doctor.hours);
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
      week.push(currentDate
        //`${('0' + currentDate.getDate()).slice(-2)}.${('0' + (currentDate.getMonth() + 1)).slice(-2)}`
      );

      currentDate.setDate(currentDate.getDate() +1);
    }

    return week;
  }


  return(
      <table className='border-collapse border w-full'>
        <thead>
          <tr>
            {
              week.map(day =>
                <th className='font-normal border py-3'>
                  {('0' + day.getDate()).slice(-2)}.{('0' + (day.getMonth() + 1)).slice(-2)}
                </th>
              )
            }
          </tr>
        </thead>
        <tbody>
        {
          week.map((day, index) => {
            const [hour, min] = times[index][1].split(':');


            return(
              <tr>

              </tr>
            )
          })
        }
        </tbody>
      </table>
    )
}