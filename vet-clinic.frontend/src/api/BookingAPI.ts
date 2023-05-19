import {Base} from "./Base";
import axios from "axios";

export class BookingAPI extends Base {
  static BookProcedure = async (id : string, type : string, service : string, date : Date) => {
    const url =  `${this.baseURL}/bookings/procedure`

    let body : any = new FormData();
    body.append('id', id)
    body.append('type', type);
    body.append('service', service);
    body.append('date', date);

    console.log(date);
    console.log(body);

    const response = await axios.post(url, body, {headers : {
        'Content-Type' : 'application/json'
    }})

    return response.data;
  }

  static BookAppointment = async (id : string | null, doctor : string, type : string, service : string, date : Date) => {
    const url =  `${this.baseURL}/bookings`

    console.log(date);

    let body : any = new FormData();
    body.append('userId', id);
    body.append('doctorId', doctor);
    body.append('typeId', type);
    body.append('serviceId', service);
    body.append('date', date);

    const response = await axios.post(url, body, {headers : {
        'Content-Type' : 'application/json'
      }})

    return response.data;
  }

  static AllClientBookings  = async (id : string) => {
    const url =  `${this.baseURL}/bookings/${id}`

    const response = await axios.get(url);

    return response.data;
  }

  static DeleteBookings = async (bookingId : string) => {
    const url =  `${this.baseURL}/bookings/${bookingId}`

    await axios.delete(url);
  }

  static AllFutureBookings  = async () => {
    const url =  `${this.baseURL}/bookings/future`

    await axios.get(url);

    const response = await axios.get(url);

    return response.data;
  }
}