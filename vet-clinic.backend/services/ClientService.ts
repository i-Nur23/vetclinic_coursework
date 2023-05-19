import IClientService from './interfaces/IClientService'
import IClientRepository from "../repositories/interfaces/IClientRepository";
import IAccountRepository from "../repositories/interfaces/IAccountRepository";

import { IPet } from '../models/Pet';
import IPetRepository from "../repositories/interfaces/IPetRepository";
import {Schema, Types} from "mongoose";

const fs = require('fs')

export class ClientService implements IClientService {
  clientRepository: IClientRepository
  accountRepository: IAccountRepository
  petRepository : IPetRepository

  constructor(clientRepository: IClientRepository,
              accountRepository: IAccountRepository,
              petRepository : IPetRepository) {
    this.clientRepository = clientRepository;
    this.accountRepository = accountRepository;
    this.petRepository = petRepository
  }

  getAll = async () => {
    var clients = await this.clientRepository.getAll()
    return {ok : true, data: clients}
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

  addPet = async (id: string, pet: IPet) => {

    pet.cardNumber = await this.petRepository.getMaxCardNumber();

    var petId = await this.petRepository.addPet(pet);

    this.clientRepository.addPet(id, petId)
  }

  removePet = async (clientId: string, petId: Types.ObjectId) => {

    var filepath = await this.petRepository.getPathToImage(petId);

    console.log(filepath)

    fs.unlink('public/pets/'+filepath, (err:any) => console.log(err));

    await this.clientRepository.removePet(clientId, petId);

    await this.petRepository.remove(petId);

  }
}