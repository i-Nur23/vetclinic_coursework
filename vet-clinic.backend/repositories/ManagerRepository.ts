import {BaseRepository} from "./BaseRepository";
import IManagerRepository from "./interfaces/IManagerRepository";
import {Manager} from "../models/Manager";

export class ManagerRepository extends BaseRepository implements IManagerRepository{
  constructor(db : string) {
    super(db);
  }

  createManager = async (name: string, surName: string, email: string, phone: string) => {
    this.connect();

    var newMan = new Manager({name: name, surName: surName, email: email, phone : phone})

    newMan.save();

    return newMan._id;
  }
}