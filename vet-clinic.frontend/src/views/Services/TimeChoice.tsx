import { Tab } from "@headlessui/react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {DoctorApi} from "../../api/DoctorApi";
import {Timetable} from "./Timetable";

export const TimeChoice = () => {
  const[typeId, setTypeId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [doctors, setDoctors] = useState([]);

  function classNames(...classes : any) {
    return classes.filter(Boolean).join(' ')
  }



  const {combinedId} = useParams();

  useEffect(() => {(
    async () => {
        const splittedParams = combinedId?.split('_');
        if (splittedParams != undefined){
          setTypeId(splittedParams[0]);
          setServiceId(splittedParams[1]);
          const resData = await DoctorApi.GetDoctorsBySpec(splittedParams[0]);
          if (resData.ok){
            setDoctors(resData.doctors)
          }
        }
      }
    )()
  },[])



  return(
    <div className='px-20 container'>
      <center className='text-xl mt-3 mb-8'>Выберите врача и время</center>
      <Tab.Group>
        <Tab.List className='overflow-auto'>
          {doctors.map((doc: any) =>
            <Tab className = {({selected}) =>
              classNames('py-2 px-4 transition duration-200 rounded-t-lg focus:outline-none outline-none',
                selected ? 'border-b-2 border-blue-600 bg-gray-100' : 'hover:border-b-2 hover:border-b-cyan-400')
            }
            >
              {doc.name} {doc.surName}
            </Tab>
          )}
        </Tab.List>
        <Tab.Panels>
          {
            doctors.map((doc : any) =>
              <Tab.Panel>
                <Timetable docId={doc._id} serviceId={serviceId} typeId={typeId}/>
              </Tab.Panel>
            )
          }
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}