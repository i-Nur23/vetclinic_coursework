import {Base} from "./Base";

export class AccountApi extends Base{
  static isExists = async (login : string, password : string) : Promise<any> => {
    var url = `${this.baseURL}/account?login=${login}&password=${password}`;
    var response = await fetch(url, {headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }});
    if (response.status != 200){
      return {isFound : false}
    }
    var answer = await response.json();
    return answer;
  }
}