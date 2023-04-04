import {Base} from './Base';
import axios from "axios";

export class ServiceApi extends Base {
  static getServiceTypes = async () => {
    var url = `${this.baseURL}/services/types`;

    var response = await axios.get(url);

    return response.data
  }

  static getAllServices = async () => {
    var url = `${this.baseURL}/services`;

    var response = await axios.get(url);

    return response.data
  }

  static Archive = async (typeId : string, id : string) => {

    var url = `${this.baseURL}/services/${typeId}/${id}/archive`;

    var response = await axios.patch(url);

    return (response.data)
  }

  static Unarchive = async (typeId : string, id : string) => {

    var url = `${this.baseURL}/services/${typeId}/${id}/unarchive`;

    var response = await axios.patch(url);

    return (response.data)
  }

  static ChangeInfo = async (typeId : string, id : string, name : string, price : number ) => {
    var body : any = new FormData();
    body.append('name', name);
    body.append('price', price);

    var url = `${this.baseURL}/services/${typeId}/${id}`;

    var response = await axios.put(url, body, {headers :
        {'Content-Type' : 'application/json'}
    });

    return (response.data)
  }
}