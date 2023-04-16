import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export const BookingToProcedure = () => {

  const[typeId, setTypeId] = useState('');
  const [serviceId, setServiceId] = useState('');

  const {combinedId} = useParams();

  useEffect(() => {
    var splittedParams = combinedId?.split('_');
    if (splittedParams != undefined){
      setTypeId(splittedParams[0]);
      setServiceId(splittedParams[1]);
    }
  },[])

  return(
    <div>{typeId}, {serviceId}</div>
  )
}