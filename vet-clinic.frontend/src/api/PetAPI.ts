import {Base} from "./Base";
import axios from "axios";

export class PetAPI extends Base {
  static getAll = async () => {
    var url = `${this.baseURL}/pets/all`

    var response = await axios.get(url)

    return response.data;
  }

  static createPet = async (type : string, breed : string, nickname : string, birthDate : string, image : File | null, ownerId : string) => {
    const formatData : any = new FormData();
    formatData.append('type', type)
    formatData.append('breed', breed)
    formatData.append('name', nickname)
    formatData.append('birthDate', birthDate)
    formatData.append('image', image)

    var url = `${this.baseURL}/client/${ownerId}/pets`;

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

  static deletePet = async (petId: string, clientId: string) => {
    var url = `${this.baseURL}/client/${clientId}/pets/${petId}`;

    axios.delete(url);

  }
}