import {Types} from "mongoose";
import {Client} from "../models/Client";
import {Pet, IPet} from "../models/Pet";
import IClientRepository from "./interfaces/IClientRepository";

export class ClientRepository implements IClientRepository {

  getAll = async () => {

    var clients = await Client
      .find()
      //.populate<{ pets: IPet[] }>({path: 'pets', model: Pet})
      .exec();

    return clients;
  }

  createClient = async (name: string, surName: string, email: string, phone : string) => {

    var newClient = new Client({name: name, surName: surName, email: email, phone : phone})

    newClient.save();

    return newClient._id;
  }

  getById = async (id: string) => {

    var client = await Client
      .findById(id)
      .populate<{ pets: IPet[] }>({path: 'pets', model: Pet})
      .exec();

    return client;
  }

  changeInfo = async (userId: string, name: string, surName: string, email: string) => {
    try {

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

    Client
      .findOneAndUpdate(
      { _id: id },
      { $push: { pets: petId } }
      )
      .exec();
  }

  removePet = async (clientId: string, petId : Types.ObjectId) => {

    Client
      .findOneAndUpdate(
        { _id: clientId },
        { $pull: { pets: petId } }
      )
      .exec();
  }

  findByPetId = async (petId : Types.ObjectId) => {
    return await Client
      .findOne({pets : petId})
      .exec()
  }
}