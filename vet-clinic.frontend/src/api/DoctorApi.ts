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
}