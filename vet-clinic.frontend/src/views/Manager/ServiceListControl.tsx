import { Disclosure } from "@headlessui/react";
import {ChangeEvent, useEffect, useState} from "react";
import {ServiceApi} from "../../api/ServiceApi";
import {ChevronDownIcon, PlusIcon} from "@heroicons/react/24/solid";
import {ServicePanel} from "./ServicePanel";

export const ServiceListControl = () => {

  const [services, setServices] = useState([]);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    (
      async () => {
        var services = await ServiceApi.getAllServices();

        setServices(services)
      }
    )()
  },[])

  const onPriceChange = (e : ChangeEvent) => {
    var text = (e.target as HTMLInputElement).value;
    if (!text.match(/[a-zA-Z]/g)){
      var number = Number(text);
      setPrice(number);
    }
  }

  const handleAdd = async (typeId : string) => {
    var data = await ServiceApi.AddService(typeId, name, price);
    if (data.ok) {
      var services = await ServiceApi.getAllServices();
      setServices(services)
      setPrice(0);
      setName('')
    } else {
      setMessage('Ошибка при добавлении')
    }
  }

  return(
    <div className='container px-20'>
      {
        services.map((service_group : any) => (
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
                  <ul>
                    {service_group.services_list.map((service : any) => <li><ServicePanel service={service} typeId={service_group._id}/></li>)}
                    <li className='py-6 border-b'>
                      <div className='flex justify-between'>
                        <div>
                          <p className='text-start mb-3 pl-2'>
                            Новая услуга
                          </p>
                          <div className='flex gap-6 text-middle'>
                            <input
                              className='p-2 border rounded-lg focus:outline-none'
                              value={name}
                              onChange={e => {setMessage(''); setName(e.target.value)}}
                            />
                            <input
                              className='p-2 border rounded-lg focus:outline-none w-14'
                              value={price}
                              onChange={e => onPriceChange(e)}
                            />
                          </div>
                        </div>
                        <div className='flex gap-6'>
                          <button className='hover:text-blue-500 flex flex-col justify-center' onClick={() => {setMessage(''); handleAdd(service_group._id)}}>
                            <PlusIcon className='w-6 h-6'/>
                          </button>
                        </div>
                      </div>
                      <p className='text-pink-400'>
                        {message}
                      </p>
                    </li>
                  </ul>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))
      }
    </div>
  )
}