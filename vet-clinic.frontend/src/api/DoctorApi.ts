import {Base} from './Base';
import axios from "axios";

export class DoctorApi extends Base{
  static SetDocInfo(id : string, spec  : string, image : null | File){
    var url = `${this.baseURL}/doctor/${id}`;
    var body : any = new FormData();
    body.append('id',id);
    body.append('spec',spec)
    body.append('image', image)
    axios.post(url, body,
      {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=dsasfd',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin':'*'
        }
      })
  }

  static GetAll = async () => {
    var url = `${this.baseURL}/doctors`;

    var response = await axios.get(url);

    return response.data;

  }

  static GetAllForTimesheet = async () => {
    var url = `${this.baseURL}/doctors/times`;

    var response = await axios.get(url);

    return response.data;

  }

  static SetTimeTable = async (id : string, timetable : Array<string | null>) => {
    var url = `${this.baseURL}/doctors/times/${id}`;

    var body = {timetable : timetable};

    var response = await axios.patch(url, body, {headers : {
      'Content-Type' : 'application/json'
    }})

    return response.data;
  }

  static GetDoctorsBySpec = async (typeId : string) => {
    var url = `${this.baseURL}/doctors?type=${typeId}`

    var response = await axios.get(url);

    return response.data;
  }

  static GetDoctorBookingTimes = async (docId : string) => {
    var url = `${this.baseURL}/doctors/times/${docId}`

    var response = await axios.get(url);

    return response.data;
  }
}