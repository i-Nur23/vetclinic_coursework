import {BaseRepository} from "./BaseRepository";
import IRegisterRepository from "./interfaces/IRegisterRepository";
import {Register} from "../models/Register";

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
}