import {AnimalType} from "../models/AnimalType";
import {Breed, IBreed} from "../models/Breed";
import { Schema, Types } from "mongoose";

export class AnimalRepository{

  getAll = async () => {

    var listOfAnimals = AnimalType
      .find()
      .populate<{ breeds: IBreed[] }>({path: 'breeds', model: Breed})
      .exec();

    return listOfAnimals
  }

  addBreed = async (name : string) => {

    var newBreed = new Breed({
      name: name
    })

    newBreed.save();

    return newBreed._id;
  }

  addBreedToType = async (typeId : string, breedId : Types.ObjectId) => {

    AnimalType
      .findOneAndUpdate(
        { _id: typeId },
        { $push: { breeds: breedId } }
      )
      .exec();
  }

  addType = async (name : string) => {


    var newAnimalType = new AnimalType({
      type : name,
      breeds : []
    })

    newAnimalType.save()

    return newAnimalType._id;

  }

  findType = async (name : string) => {

    var type =  AnimalType
      .findOne({type : name})
      .exec()

    return type;
  }

  findTypeById = async (id : string) => {

    var type =  AnimalType
      .findById(id)
      .exec()

    return type;
  }

  findBreed = async (typeId : string, name : string) => {

    var type = await this.findTypeById(typeId);

    if (type == null){
      return null
    }

    var breeds = await Breed
      .find({name : name})
      .exec()

    if (breeds.length == 0){
      return null;
    }

    var valueToReturn = null;

    if (type != null){
      breeds.every(breed => {

        if (type?.breeds.indexOf(breed._id) != -1){
          valueToReturn = breed;
          return false;
        }
      })
    }

    return valueToReturn;
  }

  changeTypeName = async (typeId : string, newName : string) => {

    AnimalType
      .findByIdAndUpdate(typeId, {type : newName})
      .exec();
  }

  changeBreedName = async (breedId : string, newName : string) => {

    Breed
      .findByIdAndUpdate(breedId, {name : newName})
      .exec();
  }

  deleteBreed = async (typeId  : Types.ObjectId, breedId : Types.ObjectId) => {

    Breed
      .findByIdAndDelete(breedId)
      .exec();

      AnimalType
      .updateOne({_id : typeId}, 
        {$pull : { breeds : breedId}}
      )
      .exec()
  }

  deleteType = async (typeId : string) => {

    var animalType = await AnimalType
      .findById(typeId)
      .exec()

      if (animalType != null){
        animalType.breeds.forEach(async breedId => await this.deleteBreed(animalType!._id ?? null, breedId))

        AnimalType
          .findByIdAndDelete(typeId)
          .exec()
      }

  }
}