import {BaseRepository} from "./BaseRepository";
import {AnimalType} from "../models/AnimalType";
import {Breed, IBreed} from "../models/Breed";
import { Schema, Types } from "mongoose";

export class AnimalRepository extends BaseRepository{

  constructor(db : string) {
    super(db);
  }

  getAll = async () => {
    this.connect()

    var listOfAnimals = AnimalType
      .find()
      .populate<{ breeds: IBreed[] }>({path: 'breeds', model: Breed})
      .exec();

    return listOfAnimals
  }

  addBreed = async (name : string) => {
    this.connect();

    var newBreed = new Breed({
      name: name
    })

    newBreed.save();

    return newBreed._id;
  }

  addBreedToType = async (typeId : string, breedId : Types.ObjectId) => {
    this.connect();

    AnimalType
      .findOneAndUpdate(
        { _id: typeId },
        { $push: { breeds: breedId } }
      )
      .exec();
  }

  addType = async (name : string) => {
    this.connect()


    var newAnimalType = new AnimalType({
      type : name,
      breeds : []
    })

    newAnimalType.save()

    return newAnimalType._id;

  }

  findType = async (name : string) => {
    this.connect()

    var type =  AnimalType
      .findOne({type : name})
      .exec()

    return type;
  }

  findTypeById = async (id : string) => {
    this.connect()

    var type =  AnimalType
      .findById(id)
      .exec()

    return type;
  }

  findBreed = async (typeId : string, name : string) => {
    this.connect()

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
    this.connect();

    AnimalType
      .findByIdAndUpdate(typeId, {type : newName})
      .exec();
  }

  changeBreedName = async (breedId : string, newName : string) => {
    this.connect();

    Breed
      .findByIdAndUpdate(breedId, {type : newName})
      .exec();
  }

  deleteBreed = async (breedId : Types.ObjectId) => {
    this.connect();

    Breed
      .findByIdAndDelete(breedId)
      .exec();
  }

  deleteType = async (typeId : string) => {
    this.connect()

    var animalType = await AnimalType
      .findById(typeId)
      .exec()

      if (animalType != null){
        animalType.breeds.forEach(async breedId => await this.deleteBreed(breedId))

        AnimalType
          .findByIdAndDelete(typeId)
          .exec()
      }

  }
}