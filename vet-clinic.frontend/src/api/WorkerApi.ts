import {Base} from './Base';
import axios from "axios";

export class WorkerApi extends Base{
  static ChangeWorkerInfo = async (
    accId : string,
    userId : string,
    login : string,
    password : string,
    name : string,
    surName : string,
    email : string,
    phone : string,
    role : string
  ) => {
    var url = `${this.baseURL}/workers/${accId}`;
    var body : any = new FormData();
    body.append('userId', userId)
    body.append('login', login)
    body.append('password', password)
    body.append('name', name)
    body.append('surName', surName)
    body.append('email', email)
    body.append('phone', phone)
    body.append('role', role)
    var response = await axios.patch(url, body, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    })

    return response.data;

  }

  static ChangeDocInfo = async (
    accId : string,
    userId : string,
    login : string,
    password : string,
    name : string,
    surName : string,
    email : string,
    phone : string,
    spec : string,
  ) => {
    var url = `${this.baseURL}/doctor/${accId}`;
    var body : any = new FormData();
    body.append('userId', userId)
    body.append('login', login)
    body.append('password', password)
    body.append('name', name)
    body.append('surName', surName)
    body.append('email', email)
    body.append('phone', phone)
    body.append('spec', spec)

    var response = await axios.patch(url, body, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    })

    return response.data
  }

  static ChangeDocInfoAndPhoto = async (
    accId : string,
    userId : string,
    login : string,
    password : string,
    name : string,
    surName : string,
    email : string,
    phone : string,
    spec : string,
    image : File | null
  ) => {
    var url = `${this.baseURL}/doctor/withphoto/${accId}`;
    var body : any = new FormData();
    body.append('userId', userId)
    body.append('login', login)
    body.append('password', password)
    body.append('name', name)
    body.append('surName', surName)
    body.append('email', email)
    body.append('phone', phone)
    body.append('spec', spec)
    body.append('image', image)

    var response = await axios.patch(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=dsasfd',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    })

    return response.data
  }

  static Delete = async (accId : string) => {
    var url = `${this.baseURL}/accounts/${accId}`

    var response = await axios.delete(url)

    return response.data
  }
}