import IAccountService from "./interfaces/IAccountService";
import IAccountRepository from "../repositories/interfaces/IAccountRepository";
import IClientRepository from "../repositories/interfaces/IClientRepository";
import IDoctorRepository from "../repositories/interfaces/IDoctorRepository";
import IRegisterRepository from "../repositories/interfaces/IRegisterRepository";
import IManagerRepository from "../repositories/interfaces/IManagerRepository";

export class AccountService implements IAccountService{
  accountRepository : IAccountRepository
  clientRepository : IClientRepository
  doctorRepository : IDoctorRepository
  registerRepository : IRegisterRepository
  managerRepository : IManagerRepository

  constructor(
    accountRepository : IAccountRepository,
    clientRepository: IClientRepository,
    doctorRepository : IDoctorRepository,
    managerRepository : IManagerRepository,
    registerRepository : IRegisterRepository
    ) {
    this.accountRepository = accountRepository
    this.clientRepository = clientRepository
    this.doctorRepository = doctorRepository
    this.managerRepository = managerRepository
    this.registerRepository = registerRepository
  }

  findAccount = async (login: string, password: string): Promise<any> => {
    return await this.accountRepository.getByLoginPassword(login, password);
  }

  createAccount = async (login: string, password : string, name: string, surName : string, email : string,  phone : string, role: string) => {
    if (await this.accountRepository.isLoginExists(login)){
      return {ok: false, message: 'Логин занят'}
    }

    var insertedId = null;

    if (role == 'Клиент'){
      insertedId = await this.clientRepository.createClient(name, surName, email, phone);
    } else if (role == 'Врач') {
      insertedId = await this.doctorRepository.createDoc(name, surName, email, phone);
    } else if (role == 'Регистратор'){
      insertedId = await this.registerRepository.createRegister(name, surName, email, phone);
    } else if (role == 'Менеджер'){
      insertedId = await this.managerRepository.createManager(name, surName, email, phone);
    }

    await this.accountRepository.createAccount(login, password, role, insertedId);
    return {ok: true, id: insertedId}

  }

  getWorkerByRole = async (user : any) => {
    var worker;

    if (user.type == 'Регистратор')
        worker = await this.registerRepository.getById(user.userId);
    else if (user.type == 'Менеджер')
        worker = this.managerRepository.getById(user.userId).then(x => {return x});
    else if (user.type == 'Врач')
        worker = this.doctorRepository.getById(user.userId).then(x => x);

    return worker;
  }

  getAllWorkers = async () => {
    var users = await this.accountRepository.getAllWorkers();

    users = users.filter((x : any) => x.type != 'Клиент')

    var workers = await Promise.all(users.map( async  (user : any) => {

      var worker = await this.getWorkerByRole(user);

      var item =
      {
          'account' : user,
          'info' : worker
      }

      return item;
    }))

    return workers;
  }

}