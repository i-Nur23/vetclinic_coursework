import IPetRepository from "./interfaces/IPetRepository";
import {IPet, Pet} from "../models/Pet";
import {Types} from "mongoose";

export class PetRepository implements IPetRepository{

  getMaxCardNumber = async ()  => {

    var number = 0;

    var maxNum = Pet
      .findOne()
      .sort('-cardNumber')
      .exec()

    var number = await maxNum.then(data => {return  data?.cardNumber ?? 0})

    return number + 1;
  }

  addPet = async (pet: IPet) => {

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

  remove = async (petId: Types.ObjectId) => {

    Pet
      .findByIdAndDelete(petId)
      .exec()
  }

  getPathToImage = (petId: Types.ObjectId) => {
    var path = Pet
      .findById(petId)
      .exec()
      .then(pet => {return pet?.image})

    return path
  }

  getAll = async () => {
    return Pet
      .find()
      .exec()

  }
}