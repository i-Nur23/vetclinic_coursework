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

    const response = await axios.post(url, body, {headers : {
        'Content-Type' : 'application/json'
    }})

    return response.data;
  }
}