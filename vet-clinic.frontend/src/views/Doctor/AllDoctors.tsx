import {useEffect, useState} from "react";
import {DoctorApi} from "../../api/DoctorApi";
import docPlaceholder from "../../assets/images/placeholders/docPlaceholder.png"

export const AllDoctors = () => {

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    (
      async () => {
        var docs = await DoctorApi.GetAll();
        setDoctors(docs);
      }
    )()
  },[])

  let content = !doctors ? <p>Loading</p> :
    <div className='container px-20 mt-10'>
      <div className='grid grid-cols-3 gap-2'>
        {
          doctors.map( (doc : any) =>
            <div className='mb-10 flex justify-center' key={doc._id}>
              <div className='mx-auto'>
              <img className='h-44 object-fill rounded-lg' src={doc.image !== undefined ? `http://localhost:3000/public/doctors/${doc.image}` : docPlaceholder}/>
              <p className='text-semibold text-lg'>{doc.surName} {doc.name}</p>
              <p className='text-gray-400'> Врач-{doc.spec}</p>
              </div>
            </div>)
        }
      </div>
    </div>

  return (content);

}