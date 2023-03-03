import IAccountService from "./interfaces/IAccountService";
import IAccountRepository from "../repositories/interfaces/IAccountRepository";
import IClientRepository from "../repositories/interfaces/IClientRepository";

export class AccountService implements IAccountService{
  accountRepository : IAccountRepository
  clientRepository : IClientRepository

  constructor(
    accountRepository : IAccountRepository,
    clientRepository: IClientRepository
    ) {
    this.accountRepository = accountRepository
    this.clientRepository = clientRepository
  }

  findAccount = async (login: string, password: string): Promise<any> => {
    return await this.accountRepository.getByLoginPassword(login, password);
  }

  createAccount = async (login: string, password : string, name: string, surName : string, email : string, role: string) => {
    if (await this.accountRepository.isLoginExists(login)){
      return {ok: false, message: 'Логин занят'}
    }

    var insertedId = null;

    if (role = 'client'){
      insertedId = await this.clientRepository.createClient(name, surName, email);
    } else if (role = 'applicant') {
      // add code
    }

    await this.accountRepository.createAccount(login, password, role, insertedId);
    return {ok: true, id: insertedId}

  }

}