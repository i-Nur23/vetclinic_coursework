import {Base} from "./Base";
import axios from "axios";

export class AnimalApi extends Base{

  static getAll = async () => {
    var url = `${this.baseURL}/animals`

    var response = await axios.get(url);

    return response.data;
  }

  static addType = async (name : string) => {
    var url = `${this.baseURL}/animals?name=${name}`

    var response = await axios.post(url);

    return response.data
  }

  static addBreed = async (typeId : string, name : string) => {
    var url = `${this.baseURL}/animals/${typeId}?name=${name}`

    var response = await axios.post(url);

    return response.data
  }

  static changeType = async (typeId : string, name : string) => {
    var url = `${this.baseURL}/animals/${typeId}?name=${name}`

    var response = await axios.patch(url);

    return response.data
  }

  static changeBreed = async (typeId : string, breedId : string, name : string) => {
    var url = `${this.baseURL}/breeds/${breedId}?name=${name}&typeId=${typeId}`

    var response = await axios.patch(url);

    return response.data
  }

  static deleteType = async (typeId : string) => {
    var url = `${this.baseURL}/animals/${typeId}`

    var response = await axios.delete(url);

    return response.data
  }

  static deleteBreed = async (typeId : string, breedId : string) => {
    var url = `${this.baseURL}/breeds/${breedId}?typeId=${typeId}`

    var response = await axios.delete(url);

    return response.data
  }

}