import mongoose from "mongoose";
import {Client} from "../models/Client";
import {Pet, IPet} from "../models/Pet";
import IClientRepository from "./interfaces/IClientRepository";
import {BaseRepository} from "./BaseRepository";

export class ClientRepository extends BaseRepository implements IClientRepository{

  constructor(db : string) {
    super(db);
  }

  getAll = async () => {
    this.connect();

    var clients = Client
      .find()
      .populate<{pets:IPet[]}>({path:'pets', model: Pet})
      .exec();

    return clients;
  }

  createClient = async (name: string, surName : string, email : string) => {
    this.connect();

    var newClient = new Client({name:name, surName : surName, email:email})

    newClient.save();

    return newClient._id;
    
  }
}