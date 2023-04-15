export const DoctorTimetable = (props : {timesheet : [String], id : String}) => {

  return(
    <div className='py-4'>
      <div className='grid grid-cols-6'>
        {props.timesheet.map(tsh => (
          <p>Время: {tsh == null}</p>
        ))}
      </div>
      <div className='flex justify-end'>
        <button className='bg-blue-500 rounded-xl text-white p-3 hover:bg-blue-700'>Сохранить</button>
      </div>
    </div>
  )
}