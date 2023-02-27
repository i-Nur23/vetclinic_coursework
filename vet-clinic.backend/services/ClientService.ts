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
}