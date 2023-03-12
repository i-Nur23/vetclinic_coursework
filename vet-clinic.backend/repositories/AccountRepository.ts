import mongoose from "mongoose";
import IAccountRepository from "./interfaces/IAccountRepository";
import {Account} from "../models/Account";
import {BaseRepository} from "./BaseRepository";
import {Client, IClient} from "../models/Client";
import {Manager, IManager} from "../models/Manager";
import {Register, IRegister} from "../models/Register";

export class AccountRepository extends BaseRepository implements IAccountRepository{

  constructor(db : string) {
    super(db);
  }

  getByLoginPassword = async (login : string, password : string) => {
    this.connect();

    var account = Account
      .findOne({'login': login, 'password': password})
      .exec()

    console.log(`${login} ${password}`)

    return account
  }

  isLoginExists = async (login: string) => {
    this.connect()

    var account = await Account
      .findOne({'login':login})
      .exec();

    return account != null;

  }

  createAccount = async (login: string, password: string, type: string, userId: string) => {
    this.connect();

    var newAccount = new Account({login: login, password: password, type: type, userId: userId})

    await newAccount.save();

    return newAccount.id;

  }

  getById = async (id: string) => {
    try {
      this.connect();

      var account = await Account
        .findById(id)
        .exec();

      return account;
    } catch {
      return null;
    }
  }

  changeLogin = async (id: string, login: string) => {
    try{
      this.connect();

      var updatedAccount = await Account
        .updateOne({_id : id}, {login : login})
        .exec()

      if (updatedAccount != null){
        return true;
      }

      return false;

    } catch {
      return false;
    }
  }

  getAllWorkers = async () => {
    try {
      this.connect();

      var accounts = Account
        .find()
        .exec();

      return accounts;

    } catch {
      return null;
    }
  }
}