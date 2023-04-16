import {TimeSlider} from "./TimeSlider";
import React, {RefObject, useEffect, useState} from "react";
import {DoctorApi} from "../../api/DoctorApi";
import {TimeHandler} from "../../utils/TimeHandler";
import {Alert, Snackbar} from "@mui/material";
export const DoctorTimetable = (props : {timesheet : Array<string | null>, id : string, refresh : any}) => {

  const [refs, setRefs] = useState<RefObject<any>[]>([]);
  const [open, setOpen] = useState(false);
  const [ok, setOk] = useState(true);

  useEffect(() => {
    var arr = [];
    for (let i = 0; i < 6; i ++){
      arr.push(React.createRef());
    }
    setRefs(arr);
  },[props.timesheet])

  const handleSettingTime = async () => {
    var times : Array<string | null> = [];

    refs.forEach(ref => {
      var state = ref.current.state;
      if (state.disabled){
        times.push(null);
      } else {
        times.push(`${TimeHandler.toTimeString(state.time[0])}-${TimeHandler.toTimeString(state.time[1])}`)
      }
    })

    var response  = await DoctorApi.SetTimeTable(props.id, times);
    setOk(response.ok);
    setOpen(true);

  }

  return(
    <div className='py-4 flex flex-col gap-6'>
      <div className='grid grid-cols-6'>
        {props.timesheet.map((tsh,index) => (
            <TimeSlider currentTime={tsh} ref={refs[index]!}/>
        ))}
      </div>
      <div className='flex justify-end'>
        <button
          className='bg-blue-500 rounded-xl text-white p-3 hover:bg-blue-700 focus:outline-none'
          onClick={() => {handleSettingTime().then(props.refresh())}}
        >
          Сохранить
        </button>
      </div>
      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        {
          ok ?
            <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
              Изменения применены успешно
            </Alert>
          :
            <Alert onClose={() => setOpen(false)} severity="error">
              Ошибка сохранения изменений
            </Alert>
        }
      </Snackbar>
    </div>
  )
}