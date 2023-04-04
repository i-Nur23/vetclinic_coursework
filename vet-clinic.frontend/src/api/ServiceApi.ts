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
}