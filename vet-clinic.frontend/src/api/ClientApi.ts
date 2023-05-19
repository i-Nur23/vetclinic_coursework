import {Base} from './Base';
import axios from "axios";

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

  static getPets = async (id: string | null) => {
    var url = `${this.baseURL}/client/${id}/pets`;

    var response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }});
    if (!response.ok){
      return {ok : false, message : 'Ошибка запроса'}
    }

    var answer = await response.json();
    return answer;
  }

  static AddPet = async (id : string,type : string, breed : string, name : string, birthDate : string, image : File | null) => {

    const formatData : any = new FormData();
    formatData.append('type', type)
    formatData.append('breed', breed)
    formatData.append('name', name)
    formatData.append('birthDate', birthDate)
    formatData.append('image', image)

    var url = `${this.baseURL}/client/${id}/pets`;

    var response = await axios.post( url, formatData,{
      headers: {
        'Content-Type': 'multipart/form-data; boundary=dsasfd',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    })

    if (response.statusText != 'OK'){
      return {ok : false, message : 'Ошибка запроса'}
    }

    var answer = await response.data;
    return answer;
  }

  static DeletePet = async (userId: string, petId: string) => {
    var url = `${this.baseURL}/client/${userId}/pets/${petId}`;

    axios.delete(url);

  }

  static getAllClients = async () => {
    var url = `${this.baseURL}/client/all`;

    var response = await axios.get(url);

    return response.data

  }
}