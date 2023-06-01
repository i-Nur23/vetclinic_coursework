import {Types} from "mongoose";
import IAccountRepository from "./interfaces/IAccountRepository";
import {Account} from "../models/Account";

export class AccountRepository implements IAccountRepository{
  findClientNumber = async () => {
    return await Account
      .find({type : {$eq : "Клиент"}})
      .count()
      .exec()
  }

  getByLoginPassword = async (login : string, password : string) => {

    var account = Account
      .findOne({'login': login, 'password': password})
      .exec()

    return account
  }

  isLoginExists = async (login: string) => {

    var account = await Account
      .findOne({'login':login})
      .exec();

    return account != null;

  }

  createAccount = async (login: string, password: string, type: string, userId: string) => {

    var newAccount = new Account({login: login, password: password, type: type, userId: userId})

    await newAccount.save();

    return newAccount.id;

  }

  getById = async (id: string) => {
    try {

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

  changeLoginAndPassword = async (id: string, login: string, password : string) => {
    try{

      var updatedAccount = await Account
        .updateOne({_id : id}, {login : login, password : password})
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

      var accounts = Account
        .find()
        .exec();

      return accounts;

    } catch {
      return null;
    }
  }

  deleteAccount = async (accId: any) => {

    await Account
      .findByIdAndDelete(accId)
      .exec();
  }

  getClientId= async (userId: Types.ObjectId) => {
    var client = await Account.findOne({_id : userId}).exec();

    if (client == null){ return null; }


    if (client.type == 'Клиент') {
      return  client.userId;
    }

    return null;

  }
}