import React, {FormEvent, useEffect, useState} from "react";

export const TypeCard = (props : any) => {

  const [animal, setAnimal] = useState('')
  const [value, setValue] = useState(props.animal.type);

  useEffect( () => {
    setAnimal(props.animal)
  },[])

  const handleTypeEditing = async (type : any) => {

  }

  return(
      <div className='flex justify-between border-b-2 border-gray-400 p-4'>
        <input
          className='rounded-lg border-0 w-1/2'
          type = 'text'
          value = {value}
          placeholder='Вид'
          onChange={(e : FormEvent) => setValue((e.target as HTMLInputElement).value)}
        />
        <div className='flex justify-between'>
          <button className='hover:bg-blue-300 rounded-lg p-4 ease-in-out duration-200 mr-3'
                  onClick={() => handleTypeEditing(animal)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill='black' viewBox="0 0 48 48" strokeWidth={1.5} stroke="none" className="w-6 h-6 control">
              <path d="M42 13.85V39q0 1.2-.9 2.1-.9.9-2.1.9H9q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h25.15Zm-3 1.35L32.8 9H9v30h30ZM24 35.75q2.15 0 3.675-1.525T29.2 30.55q0-2.15-1.525-3.675T24 25.35q-2.15 0-3.675 1.525T18.8 30.55q0 2.15 1.525 3.675T24 35.75ZM11.65 18.8h17.9v-7.15h-17.9ZM9 15.2V39 9Z"/>
            </svg>

            {/*<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6 control">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>*/}
          </button>
          <button className='hover:bg-red-300 rounded-lg p-4 ease-in-out duration-200'
                  onClick={() => {}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6 control">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
  )
}