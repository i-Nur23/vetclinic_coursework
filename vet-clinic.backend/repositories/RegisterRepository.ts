import {BaseRepository} from "./BaseRepository";
import IRegisterRepository from "./interfaces/IRegisterRepository";
import {Register} from "../models/Register";
import {Manager} from "../models/Manager";
import {Doctor} from "../models/Doctor";

export class RegisterRepository extends BaseRepository implements IRegisterRepository{
  constructor(db : string) {
    super(db);
  }

  createRegister = async (name: string, surName: string, email: string, phone: string) => {
    this.connect();

    var newReg = new Register({name: name, surName: surName, email: email, phone : phone})

    newReg.save();

    return newReg._id;
  }

  getById = async (id: string) => {
    this.connect()

    var register = Register
      .findById(id)
      .exec()
      .then(register => register);

    return register;
  }

  changeInfo = async (id: string, name: string, surName: string, email: string, phone: string) => {
    try {
      this.connect();

      var updatedRegister = await Register
        .updateOne({_id: id}, {name: name, surName: surName, email: email, phone: phone})
        .exec()

      if (updatedRegister != null) {
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