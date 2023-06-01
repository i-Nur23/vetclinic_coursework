import IManagerRepository from "./interfaces/IManagerRepository";
import {Manager} from "../models/Manager";

export class ManagerRepository implements IManagerRepository{

  createManager = async (name: string, surName: string, email: string, phone: string) => {

    var newMan = new Manager({name: name, surName: surName, email: email, phone : phone})

    newMan.save();

    return newMan._id;
  }

  getById = async (id: string) => {

    var manager = Manager
      .findById(id)
      .exec();

    return manager;
  }

  changeInfo = async (id: string, name: string, surName: string, email: string, phone: string) => {
    try {

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

    await Manager
      .findByIdAndDelete(userId)
      .exec();
  }
}