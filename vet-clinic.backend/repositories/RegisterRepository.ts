import IRegisterRepository from "./interfaces/IRegisterRepository";
import {Register} from "../models/Register";
import {Manager} from "../models/Manager";

export class RegisterRepository implements IRegisterRepository{

  createRegister = async (name: string, surName: string, email: string, phone: string) => {

    var newReg = new Register({name: name, surName: surName, email: email, phone : phone})

    newReg.save();

    return newReg._id;
  }

  getById = async (id: string) => {

    var register = Register
      .findById(id)
      .exec()
      .then(register => register);

    return register;
  }

  changeInfo = async (id: string, name: string, surName: string, email: string, phone: string) => {
    try {

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

    await Manager
      .findByIdAndDelete(userId)
      .exec();
  }
}