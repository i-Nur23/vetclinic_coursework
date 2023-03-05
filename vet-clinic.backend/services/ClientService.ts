import IClientService from './interfaces/IClientService'
import IClientRepository from "../repositories/interfaces/IClientRepository";
import IAccountRepository from "../repositories/interfaces/IAccountRepository";

export class ClientService implements IClientService{
  clientRepository : IClientRepository
  accountRepository : IAccountRepository

  constructor(clientRepository : IClientRepository, accountRepository : IAccountRepository) {
    this.clientRepository = clientRepository;
    this.accountRepository = accountRepository;
  }

  getAll = async () => {
    return await this.clientRepository.getAll()
  }

  getClient = async (id : string) => {
    var account = await this.accountRepository.getById(id);

    if (account == null) return null;

    var client = await this.clientRepository.getById(account.userId)

    if (client == null) return null;

    return {
      login : account.login,
      name : client.name,
      surName : client.surName,
      email : client.email,
      pets : client.pets
    }
  }

  changeInfo = async (id : string ,login: string, name: string, surName: string, email: string) => {
    var accountById = await this.accountRepository.getById(id);

    if (login == 'admin'){
      return {ok:false, message: 'Логин занят'};
    }

    if (accountById.login !== login) {
      if (await this.accountRepository.isLoginExists(login)) {
        return {ok: false, message: 'Логин занят'};
      }
    }


      var isLoginChanged = await this.accountRepository.changeLogin(id, login);

      if (!isLoginChanged){
        return {ok :false, message: 'Ошибка при изменении логина'};
      }

      var isInfoChanged = await this.clientRepository.changeInfo(accountById.userId, name, surName, email);

      if (!isInfoChanged){
        return {ok : false, message: 'Ошибка при изменении информации'};
      }

      return {ok: true};
  }

  getPets = async (id: any) => {
    var account = await this.accountRepository.getById(id);

    if (account == null) return {ok:false, message: 'Аккаунт не найден'};

    var client = await this.clientRepository.getById(account.userId)

    var result = (client == null || client.pets.length == 0) ? {ok:false, message: 'Животных не найдено'} : {ok: true, data: client.pets}

    return result;
  }
}