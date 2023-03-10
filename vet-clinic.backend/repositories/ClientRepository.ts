import mongoose, {Types} from "mongoose";
import {Client} from "../models/Client";
import {Pet, IPet} from "../models/Pet";
import IClientRepository from "./interfaces/IClientRepository";
import {BaseRepository} from "./BaseRepository";

export class ClientRepository extends BaseRepository implements IClientRepository {

  constructor(db: string) {
    super(db);
  }

  getAll = async () => {
    this.connect();

    var clients = Client
      .find()
      .populate<{ pets: IPet[] }>({path: 'pets', model: Pet})
      .exec();

    return clients;
  }

  createClient = async (name: string, surName: string, email: string, phone : string) => {
    this.connect();

    var newClient = new Client({name: name, surName: surName, email: email, phone : phone})

    newClient.save();

    return newClient._id;
  }

  getById = async (id: string) => {
    this.connect();

    var client = await Client
      .findById(id)
      .populate<{ pets: IPet[] }>({path: 'pets', model: Pet})
      .exec();

    return client;
  }

  changeInfo = async (userId: string, name: string, surName: string, email: string) => {
    try {
      this.connect();

      var updatedClient = await Client
        .updateOne({_id: userId}, {name: name, surName: surName, email: email})
        .exec()

      if (updatedClient != null) {
        return true;
      }

      return false;

    } catch {
      return false;
    }
  }

  getPets = async (id: any) => {
    try {
      this.connect();

      var client = Client
        .findById(id)
        .populate<{ pets: IPet[] }>({path: 'pets', model: Pet})
        .exec();

      return client;

    } catch {
      return null;
    }
  }

  addPet = async (id: string, petId : Types.ObjectId) => {
    this.connect();

    Client
      .findOneAndUpdate(
      { _id: id },
      { $push: { pets: petId } }
      )
      .exec();
  }

  removePet = async (clientId: string, petId : Types.ObjectId) => {
    this.connect();

    Client
      .findOneAndUpdate(
        { _id: clientId },
        { $pull: { pets: petId } }
      )
      .exec();
  }
}