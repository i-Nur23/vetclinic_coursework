import {Base} from './Base';

export class ClientApi extends Base{
  static getClient = async (id: string | null) => {
    var url = `${this.baseURL}/client/${id}`;
    var response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }});
    if (!response.ok){
      return {ok : false, data: null}
    }
    var answer = await response.json();
    return answer;
  }

  static changeClient = async (id: string | null, login: string, name: string, surName: string, email : string) => {
    console.log('in api')
    var url = `${this.baseURL}/client/${id}?login=${login}&name=${name}&surName=${surName}&email=${email}`;
    var response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }});
    if (response.status != 200){
      return {ok : false, message : 'Ошибка запроса'}
    }
    var answer = await response.json();
    return answer;
  }
}