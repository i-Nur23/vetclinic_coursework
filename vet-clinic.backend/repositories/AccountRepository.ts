import mongoose from "mongoose";
import IAccountRepository from "./interfaces/IAccountRepository";
import {Account} from "../models/Account";
import {BaseRepository} from "./BaseRepository";

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

  isLoginExists = (login: string) => {
    this.connect()

    var account = Account
      .findOne({'login': login})
      .exec()

    return  ( account != null )
  }

  createAccount = async (login: string, password: string, type: string, userId: string) => {
    this.connect();

    var newAccount = new Account({login: login, password: password, type: type, userId: userId})

    await newAccount.save();

    return newAccount.id;

  }
}