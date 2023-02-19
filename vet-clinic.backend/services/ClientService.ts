import IClientService from './interfaces/IClientService'
import IClientRepository from "../repositories/interfaces/IClientRepository";

export class ClientService implements IClientService{
  clientRepository : IClientRepository

  constructor(clientRepository : IClientRepository) {
    this.clientRepository = clientRepository
  }

  getAll = async () => {
    return await this.clientRepository.getAll()
  }
}