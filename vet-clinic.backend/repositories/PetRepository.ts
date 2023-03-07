import {BaseRepository} from "./BaseRepository";
import IAccountRepository from "./interfaces/IAccountRepository";
import IPetRepository from "./interfaces/IPetRepository";
import {IPet, Pet} from "../models/Pet";

export class PetRepository extends BaseRepository implements IPetRepository{

  constructor(db : string) {
    super(db);
  }

  getMaxCardNumber = async ()  => {
    this.connect();

    var number = 0;

    var maxNum = Pet
      .findOne()
      .sort('-cardNumber')
      .exec()

    maxNum.then( data =>
      number = data?.cardNumber ?? -1
    )

    return number + 1;
  }

  addPet = async (pet: IPet) => {
    this.connect();

    var newPet = new Pet({
      cardNumber: pet.cardNumber,
      type: pet.type,
      breed: pet.breed,
      nickname: pet.nickname,
      birthDate : pet.birthDate,
      image: pet.image
    })

    newPet.save();

    return newPet._id;
  }


}