import IDoctorService from "./interfaces/IDoctorService";
import IDoctorRepository from "../repositories/interfaces/IDoctorRepository";
import IAccountRepository from "../repositories/interfaces/IAccountRepository";
import fs from "fs";

export class DoctorService implements IDoctorService {

  doctorRepository : IDoctorRepository
  accountRepository : IAccountRepository

  constructor(doctorRepository : IDoctorRepository,
              accountRepository : IAccountRepository) {
    this.doctorRepository = doctorRepository
    this.accountRepository = accountRepository
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
}