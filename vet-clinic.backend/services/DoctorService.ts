import IDoctorService from "./interfaces/IDoctorService";
import IDoctorRepository from "../repositories/interfaces/IDoctorRepository";
import IAccountRepository from "../repositories/interfaces/IAccountRepository";
import fs from "fs";
import {ServiceRepository} from "../repositories/ServiceRepository";
import {BookingRepository} from "../repositories/BookingRepository";
import {DoctorRepository} from "../repositories/DoctorRepository";
import {Types} from "mongoose";
import IClientRepository from "../repositories/interfaces/IClientRepository";

export class DoctorService implements IDoctorService {

  doctorRepository : IDoctorRepository
  accountRepository : IAccountRepository
  serviceRepository : ServiceRepository
  bookingRepository : BookingRepository
  clientRepository : IClientRepository

  constructor(doctorRepository : IDoctorRepository,
              accountRepository : IAccountRepository,
              serviceRepository : ServiceRepository,
              bookingRepository : BookingRepository,
              clientRepository : IClientRepository) {
    this.doctorRepository = doctorRepository
    this.accountRepository = accountRepository
    this.serviceRepository = serviceRepository
    this.bookingRepository = bookingRepository
    this.clientRepository = clientRepository
  }


  getAllWithTimes = async  () => {
        return await this.doctorRepository.getAllWithTimes();
    }

  getAll = async () => {
        return await this.doctorRepository.getAll();
    }

  addDocInfo = async (id : string, spec: string, image: string) => {
    await this.doctorRepository.addDocInfo(id, spec, image)
  }

  changeDocInfo = async (accId : string, userId : string, login : string, password : string, name : string, surName : string,
                         email : string, phone  :string, spec : string) => {

    var isAccChangeOk;
    var isInfoChangeOk;

    var accountById = await this.accountRepository.getById(accId);

    if (login == 'admin'){
      return {ok:false, message: 'Логин занят'};
    }

    if (accountById.login !== login) {
      if (await this.accountRepository.isLoginExists(login)) {
        return {ok: false, message: 'Логин занят'};
      }
    }

    isAccChangeOk = await this.accountRepository.changeLoginAndPassword(accId, login, password);

    if (!isAccChangeOk) {
      return {ok : false, message: 'Не удалось обновить логин или пароль'}
    }

    isInfoChangeOk = await this.doctorRepository.changeInfo(userId, name, surName, email, phone, spec)

    if (!isInfoChangeOk) {
      return {ok : false, message: 'Не удалось обновить информацию'}
    }

    return {ok : true}
  }

  changeDocInfoAndPhoto = async (accId : string, userId : string, login : string, password : string, name : string, surName : string,
                         email : string, phone  :string, spec : string, image : string) => {
    var isAccChangeOk;
    var isInfoChangeOk;

    var accountById = await this.accountRepository.getById(accId);

    if (login == 'admin'){
      return {ok:false, message: 'Логин занят'};
    }

    if (accountById.login !== login) {
      if (await this.accountRepository.isLoginExists(login)) {
        return {ok: false, message: 'Логин занят'};
      }
    }

    isAccChangeOk = await this.accountRepository.changeLoginAndPassword(accId, login, password);

    if (!isAccChangeOk) {
      return {ok : false, message: 'Не удалось обновить логин или пароль'}
    }

    var filepath = await this.doctorRepository.getPathToImage(userId);

    console.log(filepath)

    fs.unlink('public/doctors/'+filepath, (err:any) => console.log(err));

    isInfoChangeOk = await this.doctorRepository.changeInfoAndPhoto(userId, name, surName, email, phone, spec, image)

    if (!isInfoChangeOk) {
      return {ok : false, message: 'Не удалось обновить информацию'}
    }

    return {ok : true}
  }

  setTimeTable = async (id: string, timeTable: [string | null]) => {
    var ok = await this.doctorRepository.setTimeTable(id, timeTable);
    return {ok : ok}
  }

  getAllBySpec = async (typeId: any) => {
    const type = await this.serviceRepository.getTypeById(typeId);
    if (type == null || type.spec == undefined){
      return {ok : false}
    }

    const docs = await this.doctorRepository.getBySpec(type.spec);
    if (docs == null){
      return {ok : false}
    } else {
      return {ok : true, doctors : docs}
    }


  }

  getTimes = async (id: string) => {
    const docTimes = await this.doctorRepository.GetDocTimes(id);
    const docBookings = await this.bookingRepository.GetDoctorBookings(id);

    if (docTimes == null){
      return {ok : false}
    }

    return {ok : true, doctor : {_id : id, hours : docTimes, bookings : docBookings}}
  }

  getAllAppointments = async (userId: string) => {

    var account = await this.accountRepository.getById(userId);

    if (account === null) return  {ok:false, message: 'Аккаунт не найден'}

    var docId = account.userId;

    var extendedAppointments : any[];
    var appointments = await this.bookingRepository.GetDoctorUpcomingBookings(docId);

    extendedAppointments = appointments.map(async (app : any) => {
      var type = await this.serviceRepository.getTypeById(app.typeId)
      var client = await this.clientRepository.getById(app.clientId)
      var services_list = type?.services_list;
      var service =  services_list?.find(async (service: any) => service._id === app.serviceId)

      var extendedApp = {
        _id: app._id,
        type: type?.type,
        service: service?.name,
        client: client,
        time : `${app.date.getHours()}:${('0' + app.date.getMinutes()).slice(-2)}`
      }

      return extendedApp
    })


    return {ok : true, data : await Promise.all(extendedAppointments)}

  }

  getCurrentAppointment = async (userId: string) => {
    var account = await this.accountRepository.getById(userId);

    if (account === null) return  {ok:false, message: 'Аккаунт не найден'}

    var docId = account.userId;

    var currentAppointment : any = await this.bookingRepository.getCurrentAppointment(docId);

    if (currentAppointment === null) return null;

    var type = await this.serviceRepository.getTypeById(currentAppointment.typeId)
    var client = await this.clientRepository.getById(currentAppointment.clientId)
    var services_list = type?.services_list;
    var service =  services_list?.find(async (service: any) => service._id === currentAppointment.serviceId)

    var currentApp = {
      _id: currentAppointment._id,
      docId : currentAppointment.doctorId,
      typeId : currentAppointment.typeId,
      type: type?.type,
      service: service?.name,
      client: client,
      time : `${currentAppointment.date.getHours()}:${('0' + currentAppointment.date.getMinutes()).slice(-2)}`
    }

    return currentApp;

  }
}