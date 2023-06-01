import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {ServiceApi} from "../../api/ServiceApi";
import {ServicesCombobox} from "../../components/Comboboxes";
import {Timetable} from "../Services/Timetable";

export const BookCurrentClient = () => {
  const location = useLocation();
  const [docId, setDocId] = useState('')
  const [clientId, setClientId] = useState('')
  const [typeId, setTypeId] = useState('')
  const [services, setServices] = useState([])
  const [service, setService] = useState<any>(null)
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    (
      async () => {
        var locState = location.state;
        setDocId(locState.docId);
        setClientId(locState.clientId);
        setTypeId(locState.typeId)

        var services = await ServiceApi.getTypeServices(locState.typeId);
        setServices(services);
        setService(services[0]);

        setLoaded(true);
      }
    )()
  },[])

  return !loaded ? <h2>Загрузка...</h2> : (
    <div className='mx-20 mt-8 flex flex-col gap-5'>
      <center className='text-lg'>Выберите время</center>
      <ServicesCombobox initList={services} selected={service} setSelected={setService}/>
      <Timetable docId={docId} typeId={typeId} serviceId={service?._id} clientId={clientId}/>
    </div>
  )
}