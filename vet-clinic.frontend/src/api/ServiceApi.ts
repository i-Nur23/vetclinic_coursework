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

  static getAvailableServices = async () => {
    var url = `${this.baseURL}/available_services`;

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

  static AddService = async (typeId : string, name : string, price : number) => {
    var body : any = new FormData();
    body.append('name', name);
    body.append('price', price);

    var url = `${this.baseURL}/services/${typeId}`;

    var response = await axios.post(url, body, {headers :
        {'Content-Type' : 'application/json'}
    });

    return (response.data)
  }

  static getServiceSpecs = async  () => {
    var url = `${this.baseURL}/services/specs`;

    var response = await axios.get(url);

    return response.data
  }

  static getTypeServices = async (typeId: string) => {
    var url = `${this.baseURL}/services/by_type/${typeId}`;

    var response = await axios.get(url);

    return response.data
  }
}