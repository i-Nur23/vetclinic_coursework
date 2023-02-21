import IAccountService from "./interfaces/IAccountService";
import IAccountRepository from "../repositories/interfaces/IAccountRepository";

export class AccountService implements IAccountService{
  accountRepository : IAccountRepository

  constructor(accountRepository : IAccountRepository) {
    this.accountRepository = accountRepository
  }

  findAccount = async (login: string, password: string): Promise<any> => {
    return await this.accountRepository.getByLoginPassword(login, password);
  }
}