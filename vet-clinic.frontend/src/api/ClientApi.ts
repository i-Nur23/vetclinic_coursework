import {Base} from './Base';

export class ClientApi extends Base{
  static getClient = async (id: string) => {
    var url = `${this.baseURL}/account/${id}`;
    var response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }});
    if (response.status != 200){
      return {ok : false, data: null}
    }
    var answer = await response.json();
    return answer;
  }
}