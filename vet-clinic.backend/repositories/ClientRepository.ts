import mongoose from "mongoose";
import {Client} from "../models/Client";
import {Pet, IPet} from "../models/Pet";
import IClientRepository from "./interfaces/IClientRepository";

export class ClientRepositry implements IClientRepository{
  mongoDb : string

  constructor(db : string) {
    this.mongoDb = db;
  }

  getAll = async () => {
    mongoose.connect(this.mongoDb);
    // Позволим Mongoose использовать глобальную библиотеку промисов
    mongoose.Promise = global.Promise;
    // Получение подключения по умолчанию
    var db = mongoose.connection;
      // Привязать подключение к событию ошибки  (получать сообщения об ошибках подключения)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    var clients = Client
      .find()
      .populate<{pets:IPet[]}>({path:'pets', model: Pet})
      .exec();

    //console.log(clients[0].pets[0].breed)

    return clients;
  }




}