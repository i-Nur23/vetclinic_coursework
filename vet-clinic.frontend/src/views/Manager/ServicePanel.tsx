import {CheckIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {ChangeEvent, useEffect, useState} from "react";
import {ServiceApi} from "../../api/ServiceApi";

export const ServicePanel = (props : {service : any, typeId : string}) => {

  const [name, setName] = useState<string>('');
  const [oldName, setOldName] = useState<string>('')
  const [price, setPrice] = useState<number>(0);
  const [isActive, setActivity] = useState<boolean>()
  const [id, setId] = useState<string>('');
  const [typeId, setTypeId] = useState<string>('');

  useEffect(() => {
    setName(props.service.name);
    setOldName(props.service.name);
    setPrice(props.service.price);
    setActivity(props.service.isActive);
    setId(props.service._id);
    setTypeId(props.typeId);
  },[])

  const onPriceChange = (e : ChangeEvent) => {
    var text = Number((e.target as HTMLInputElement).value);
    if (!isNaN(text)){
      setPrice(text);
    }
  }

  const handleChanging = async () => {
    var data = await ServiceApi.ChangeInfo(typeId, id, name, price);
    if (data.ok){
      setOldName(name);
    } else {
      setName(oldName);
    }
  }

  const handleArchiving = async () => {
    var data = await ServiceApi.Archive(typeId, id);
    if (data.ok){
      setActivity(!isActive);
    }
  }

  const handleUnarchiving = async () => {
    var data = await ServiceApi.Unarchive(typeId, id);
    if (data.ok){
      setActivity(!isActive);
    }
  }

  return(
    <div className='flex justify-between py-6 border-b'>
      <div className='flex gap-6 text-middle'>
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
        {
          !isActive ? <p className='text-red-600 my-auto'>в архиве</p> : null
        }
      </div>
      <div className='flex gap-6'>
        <button className='hover:text-green-600' onClick={handleChanging}>
          <CheckIcon className='h-6 w-6'/>
        </button>
        {
          isActive ?
            <button className='hover:text-red-600 flex flex-col justify-center' onClick={handleArchiving}>
              <span className="material-symbols-outlined h-6 w-6">
                archive
              </span>
            </button>
            :
            <button className='hover:text-purple-600 flex flex-col justify-center' onClick={handleUnarchiving}>
              <span className="material-symbols-outlined h-6 w-6">
                unarchive
              </span>
            </button>
        }
      </div>
    </div>
  )
}