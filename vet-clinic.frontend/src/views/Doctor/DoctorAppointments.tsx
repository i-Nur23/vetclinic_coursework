import React, {useEffect, useState} from "react";
import {DoctorApi} from "../../api/DoctorApi";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Disclosure} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import {Link} from "react-router-dom";
import {AgeCalculator} from "../../utils/AgeCalculator";
import {MonthsCalculator} from "../../utils/MonthsCalculator";

export const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState<any[]>([])
  const [currentAppointment, setCurrentAppointment] = useState<any>()
  const [loaded, setLoaded] = useState<boolean>(false);
  const userId = useSelector((state : RootState) => state.id);

  useEffect(() => {
    (
      async () => {
        if (userId === null) return;

        DoctorApi.GetDoctorAppointments(userId)
          .then(appointments => DoctorApi.GetDoctorCurrentAppointment(userId)
            .then(current => {
              setAppointments(appointments.data);
              setCurrentAppointment(current);
              setLoaded(true);
            }))
      }
    )()
    },[])


  return !loaded ? <h2>Загрузка...</h2> : (
    <div className='mx-20 mt-12'>
      {
        (currentAppointment != null && currentAppointment != undefined) ?
          <div>
            <div className='flex gap-5'>
              <p className='font-semibold'>Текущий клиент</p>
              <Link
                to={'new'}
                state={{docId : currentAppointment.docId, typeId : currentAppointment.typeId, clientId : currentAppointment.client._id}}
                className='hover:underline text-gray-300 hover:text-black'
              >
                Записать на следующую дату
              </Link>
            </div>
            <div className='py-2 flex flex-col gap-2'>
              <p>Услуга: {currentAppointment.service}, {currentAppointment.type}</p>
              <p>Клиент: {currentAppointment.client.name} {currentAppointment.client.surName}</p>
              <p>Время: {currentAppointment.time}</p>
              <Disclosure>
                {({ open }) => (
                  <div className=''>
                    <Disclosure.Button className="flex rounded justify-between focus:outline-none">
                      <span>Питомцы </span>
                      <ChevronDownIcon
                        className={`${
                          open ? 'rotate-180 transform duration-200' : 'duration-200'
                        } h-5 w-5 my-auto`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="pb-2">
                      <ul>
                        {
                          currentAppointment.client.pets.map( (pet : any) =>
                            <li className='flex border-b-2 border-gray-400 p-4 gap-5'>
                              <div className='w-1/6 rounded-lg my-auto'>
                                <img
                                  src={`http://localhost:3000/public/pets/${pet.image}`}
                                  className='rounded-lg my-auto'
                                />
                              </div>
                              <div className='text-left flex flex-col gap-2 '>
                                <p>Карточка №: {pet.cardNumber}</p>
                                <p>Вид: {pet.type}</p>
                                <p>Порода: {pet.breed == 'undefined' ? '' : pet.breed}</p>
                                <p>Возраст : {AgeCalculator(pet.birthDate)} лет(год), {MonthsCalculator(pet.birthDate)} месяца(-ев)</p>
                                <p>Кличка: {pet.nickname}</p>
                              </div>
                            </li>
                          )
                        }
                      </ul>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            </div>
          </div>
          :
          null
      }
      <p className='font-semibold mt-14'>Предстящие записи</p>
      <ul>
        {
          appointments.map(appointment =>
            <li className='py-3 border-b flex flex-col gap-2'>
              <p>Услуга: {appointment.service}, {appointment.type}</p>
              <p>Клиент: {appointment.client.name} {appointment.client.surName}</p>
              <p>Время: {appointment.time}</p>
            </li>
          )
        }
      </ul>
    </div>
  )
}