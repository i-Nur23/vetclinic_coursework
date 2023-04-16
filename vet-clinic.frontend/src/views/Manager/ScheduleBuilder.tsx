import {Disclosure} from "@headlessui/react";
import {ChevronDownIcon, PlusIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";
import {DoctorApi} from "../../api/DoctorApi";
import {DoctorTimetable} from "./DoctorTimetable";

export const ScheduleBuilder = () => {
  
  const [doctors, setDoctors] = useState([])
  
  useEffect(() => {
    (
      async () => {
        var doctors = await DoctorApi.GetAllForTimesheet();
        setDoctors(doctors);
      }
    )()
  },[])

  const refresh = () => {
    setTimeout(() => DoctorApi.GetAllForTimesheet().then(
      docs => {
        setDoctors(docs);
        console.log(docs);
      }
    ), 1000);
  }
  
  
  return(
    <div className='px-20'>
      {
        doctors.map((doc : any) => (
          <Disclosure>
            {({ open }) => (
              <div className='text-center'>
                <Disclosure.Button className="flex w-full rounded justify-between hover:bg-blue-50 px-5 py-8 font-medium focus:outline-none">
                  <p>{doc.name} {doc.surName}, <span className='text-gray-400'>{doc.spec}</span></p>
                  <ChevronDownIcon
                    className={`${
                      open ? 'rotate-180 transform duration-200' : 'duration-200'
                    } h-5 w-5 text-blue-600`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 text-gray-500">
                  <DoctorTimetable timesheet={doc.workHours} id={doc._id} refresh={ () => {refresh() } }/>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))
      }
    </div>
  )
}