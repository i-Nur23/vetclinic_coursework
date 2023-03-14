import {BaseRepository} from "./BaseRepository";
import {AnimalType} from "../models/AnimalType";
import {IPet, Pet} from "../models/Pet";
import {Breed, IBreed} from "../models/Breed";
import {Client} from "../models/Client";

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

    return newBreed._id;
  }

  addBreedToType = async (typeId : string, breedId : string) => {
    this.connect();

    AnimalType
      .findOneAndUpdate(
        { _id: typeId },
        { $push: { breeds: breedId } }
      )
      .exec();
  }

  findBreed = async (name : string) => {
    this.connect()

    return Breed
      .find({name : name})
      .exec()
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

  deleteBreed = async (breedId) => {
    this.connect();

    Breed
      .findByIdAndDelete(breedId)
      .exec();
  }

  deleteType = async (typeId) => {
    this.connect()

    var animalType = await AnimalType
      .findById(typeId)
      .exec()

    animalType.breeds.forEach(breedId => await this.deleteBreed(breedId))

    AnimalType
      .findByIdAndDelete(typeId);
      .exec()

  }
}