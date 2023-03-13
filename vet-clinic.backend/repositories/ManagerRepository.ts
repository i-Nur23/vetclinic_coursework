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

  getById = async (id: string) => {
    this.connect();

    var manager = Manager
      .findById(id)
      .exec();

    return manager;
  }

  changeInfo = async (id: string, name: string, surName: string, email: string, phone: string) => {
    try {
      this.connect();

      var updatedManager = await Manager
        .updateOne({_id: id}, {name: name, surName: surName, email: email, phone: phone})
        .exec()

      if (updatedManager != null) {
        return true;
      }

      return false;

    } catch {
      return false;
    }
  }

  delete = async (userId: any) => {
    this.connect()

    await Manager
      .findByIdAndDelete(userId)
      .exec();
  }
}