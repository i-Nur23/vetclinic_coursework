import { Disclosure } from "@headlessui/react";
import {useEffect, useState} from "react";
import {ServiceApi} from "../../api/ServiceApi";
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import {ServicePanel} from "./ServicePanel";

export const ServiceListControl = () => {

  const [servcies, setServices] = useState([]);

  useEffect(() => {
    (
      async () => {
        var services = await ServiceApi.getAllServices();

        setServices(services)
      }
    )()
  },[])

  return(
    <div className='container px-20'>
      {
        servcies.map((service_group : any) => (
          <Disclosure>
            {({ open }) => (
              <div className='text-center'>
                <Disclosure.Button className="flex w-full rounded justify-between hover:bg-blue-50 px-5 py-8 font-medium focus:outline-none">
                  <span>{service_group.type}</span>
                  <ChevronDownIcon
                    className={`${
                      open ? 'rotate-180 transform duration-200' : 'duration-200'
                    } h-5 w-5 text-blue-600`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 text-gray-500">
                  {service_group.services_list.map((service : any) => <ServicePanel service={service} typeId={service_group._id}/>)}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))
      }
    </div>
  )
}