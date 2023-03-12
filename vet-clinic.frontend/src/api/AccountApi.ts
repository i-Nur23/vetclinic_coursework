import {Base} from "./Base";
import axios from "axios";

export class AccountApi extends Base{
  static getAccount = async (login : string, password : string) : Promise<any> => {
    var url = `${this.baseURL}/account?login=${login}&password=${password}`;
    var response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }});
    if (response.status != 200){
      return {isFound : false, data: null}
    }
    var answer = await response.json();
    return answer;
  }

  static createAccount = async(login: string, password : string, name: string, surName : string, email : string, phone : string, role: string) : Promise<any> => {
    var url = `${this.baseURL}/account?login=${login}&password=${password}&name=${name}&surName=${surName}&email=${email}&role=${role}&phone=${phone}`;
    var response = await fetch(url,{
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin':'*'
    }});
    if (!response.ok){
      return {ok: false, message: 'ошибка запроса'}
    }

    var answer = await response.json();
    return answer;

  }

  static GetAllWorkers = async () => {
    var url = `${this.baseURL}/workers`
    var response = await axios.get(url);
    return response.data;
  }
}