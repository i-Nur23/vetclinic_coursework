import {CheckIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {ChangeEvent, useEffect, useState} from "react";

export const ServicePanel = (props : {service : any}) => {

  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [isActive, setActivity] = useState<boolean>()

  useEffect(() => {
    setName(props.service.name);
    setPrice(props.service.price);
    setActivity(props.service.isActive);
  },[])

  const onPriceChange = (e : ChangeEvent) => {
    var text = Number((e.target as HTMLInputElement).value);
    if (!isNaN(text)){
      setPrice(text);
    }
  }

  return(
    <div className='flex justify-between py-6 border-b'>
      <div className='flex gap-6'>
        <input
          className='p-2 border rounded-lg focus:outline-none'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className='p-2 border rounded-lg focus:outline-none w-14'
          value={price}
          onChange={e => onPriceChange(e)}
        />
      </div>
      <div className='flex gap-6'>
        <button className='hover:text-green-600'>
          <CheckIcon className='h-6 w-6'/>
        </button>
        {
          isActive ?
            <button className='hover:text-red-600 flex flex-col justify-center'>
              <span className="material-symbols-outlined h-6 w-6">
                archive
              </span>
            </button>
            :
            <button className='hover:text-purple-600 flex flex-col justify-center'>
              <span className="material-symbols-outlined h-6 w-6">
                unarchive
              </span>
            </button>
        }
      </div>
    </div>
  )
}