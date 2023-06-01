import IPetRepository from "../repositories/interfaces/IPetRepository";
import IClientRepository from "../repositories/interfaces/IClientRepository";
import {IPetExtended} from "../models/Pet";

export class PetService {
  petRepository : IPetRepository
  clientRepository : IClientRepository

  constructor(petRepository : IPetRepository, clientRepository : IClientRepository) {
    this.petRepository = petRepository;
    this.clientRepository = clientRepository
  }

  getAllPets = async () => {
    var pets = await this.petRepository.getAll();

    var _pets = pets.map(async (pet : any) => {

      var _owner = await this.clientRepository.findByPetId(pet._id)

      var _pet : IPetExtended = {
        _id : pet._id,
        cardNumber : pet.cardNumber,
        image : pet.image,
        birthDate : pet.birthDate,
        breed : pet.breed,
        type : pet.type,
        nickname : pet.nickname,
        owner : {
          _id : _owner?._id,
          name : _owner?.name,
          surName : _owner?.surName,
          phone : _owner?.phone,
          email : _owner?.email
        }
      }
      return _pet
    })

    return Promise.all(_pets)
  }
}