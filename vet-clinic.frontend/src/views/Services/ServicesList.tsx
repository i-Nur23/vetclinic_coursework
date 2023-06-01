import React, {useEffect, useState} from "react";
import {ServiceApi} from "../../api/ServiceApi";
import {Disclosure} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Level} from "../../utils/Level";
import {Alert, Snackbar} from "@mui/material";

export const ServicesList = (props : any) => {
  const [services, setServices] = useState([]);
  const [isToastOpen, setIsToastOpen] = useState(false)
  const [choosenTypeId, setChoosenTypeId] = useState('')
  const [clientId, setClientId] = useState();
  const level = useSelector((state : RootState) => state.level)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (
      async () => {

        var services = await ServiceApi.getAvailableServices();
        setServices(services);
        if (location != undefined && location.state != undefined) {
          setChoosenTypeId(location.state.typeId);
          setClientId(location.state.clientId);
        }

      }
    )()
  },[])

  useEffect(() => {
    if (location != undefined && location.state != undefined){
      var typeId =  location.state.typeId;
      const element = document.getElementById(typeId)
      element?.scrollIntoView({block : "center", behavior : "smooth"})

    }
  },[services])

  const handleClick = (typeId  : string, serviceId : string) => {
    if (level != Level.Client && !(level == Level.Register && location.state.clientId != undefined)){
      setIsToastOpen(true);
    } else {
      navigate( `procedure/${typeId}_${serviceId}`,{state : {clientId : clientId}})
    }
  }

  return(
    <div className='container px-20'>
      {
        services.map((service_group : any) => (
          <Disclosure defaultOpen={choosenTypeId === service_group._id}>
            {({ open }) => (
              <div className='text-center' id={service_group._id}>
                <Disclosure.Button className="flex w-full rounded justify-between hover:bg-blue-50 px-5 py-8 font-medium focus:outline-none">
                  <span>{service_group.type}</span>
                  <ChevronDownIcon
                    className={`${
                      open ? 'rotate-180 transform duration-200' : 'duration-200'
                    } h-5 w-5 text-blue-600`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2">
                  <ul className='mb-3'>
                    {service_group.services_list.map((service : any) =>
                      <li className='flex justify-between py-2 border-b'>
                        <p>{service.name}, Цена: {service.price}</p>
                        {service_group.type == 'Прививки' || service_group.type == 'Лабораторные исследования'
                          ?
                          <button
                            onClick={() => handleClick(service_group._id, service._id)}
                            className='hover:underline'
                          >
                            Записаться
                          </button>
                          :
                          <Link
                            to={`${service_group._id}_${service._id}`}
                            state={{clientId : clientId}}
                            className='hover:underline'
                          >
                            Смотреть расписание
                          </Link>
                        }
                      </li>)
                    }
                  </ul>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))
      }

      <Snackbar open={isToastOpen} autoHideDuration={4000} onClose={() => setIsToastOpen(false)}>
        <Alert onClose={() => setIsToastOpen(false)} severity="error">
          Вы не авторизованы
        </Alert>
      </Snackbar>
    </div>
  )
}