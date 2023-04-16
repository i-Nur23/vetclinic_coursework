import {TimeSlider} from "./TimeSlider";
export const DoctorTimetable = (props : {timesheet : [[String]], id : String}) => {


  return(
    <div className='py-4 flex flex-col gap-6'>
      <div className='grid grid-cols-6'>
        {props.timesheet.map((tsh,index) => (
            <TimeSlider currentTime={tsh} index={index}/>
        ))}
      </div>
      <div className='flex justify-end'>
        <button className='bg-blue-500 rounded-xl text-white p-3 hover:bg-blue-700'>Сохранить</button>
      </div>
    </div>
  )
}