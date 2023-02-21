import mongoose from "mongoose";
import IAccountRepository from "./interfaces/IAccountRepository";
import {Account} from "../models/Account";

export class AccountRepository implements IAccountRepository{
  mongoDb : string

  constructor(db : string) {
    this.mongoDb = db;
  }

  getByLoginPassword = async (login : string, password : string) => {
    mongoose.connect(this.mongoDb);
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    var account = Account
      .findOne({'login': login, 'password': password})
      .exec()

    console.log(`${login} ${password}`)

    return account
  }
}