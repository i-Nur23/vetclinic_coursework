import {Slider} from "@mui/material";
import {useEffect, useState} from "react";

export const TimeSlider = ({currentTime, index} : {currentTime : [String] | null, index : Number }) => {

  const marks = Array.from({length : 11}, (_, index) => {
    return({
      value : index + 8,
      label : index + 8
    })
  })

  const [time, setTime] = useState<number[]>([8,9])
  const [disabled, setDisabled] = useState<boolean>(true)

  const minDistance = 1;

  useEffect(() => {
    if (currentTime != null){
      var timeArray = currentTime?.map(ct => toTimeNumber(ct))
      setTime(timeArray);
      setDisabled(false);
    }

  },[])

  function valuetext(value: number) {

  }

  const toTimeString = (time : number) => {
    var hours = Math.trunc(time);
    var minutes = time.toString().split('.')[1] == '5' ? '30' : '00'
    return `${hours}:${minutes}`
  }

  const toTimeNumber = (time : String) => {
    var splittedTime = time.split(':');
    var hours = parseInt(splittedTime[0]);
    var minutes = splittedTime[1] == '00' ? 0 : 5;
    return parseFloat(`${hours}.${minutes}`)
  }

  function HandleChange(
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setTime([Math.min(newValue[0], time[1] - minDistance), time[1]]);
    } else {
      setTime([time[0], Math.max(newValue[1], time[0] + minDistance)]);
    }
  }

  return(
    <div>
      <div className='h-72 mb-4'>
        <Slider
          aria-label="Small steps"
          orientation='vertical'
          value={time}
          step={0.5}
          marks={marks}
          min={8}
          max={18}
          disabled={disabled}
          onChange = {HandleChange}
        />
      </div>
      <p>Начало: {toTimeString(time[0])}</p>
      <p>Конец:{toTimeString(time[1])}</p>
      <button
        className='bg-gray-100 hover:bg-gray-200 mt-4 p-2 rounded-lg'
        onClick={() => {setDisabled(!disabled)}}
      >
        {disabled ? 'Установить время' : 'Сделать нерабочим'}
      </button>
    </div>
  )
}