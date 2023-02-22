import mongoose from "mongoose";

export class BaseRepository{
  mongoDb : string

  constructor(db : string) {
    this.mongoDb = db;
  }

  connect(){
    mongoose.connect(this.mongoDb);
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  }
}