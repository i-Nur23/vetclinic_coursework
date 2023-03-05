import mongoose, {Types} from "mongoose";

var Schema = mongoose.Schema;

var PetSchema = new Schema({
  cardNumber: {
    type: Number,
    min: 0,
    max: 10000
  },
  type: String,
  breed: String,
  ncikname: String,
  age: {
    type: Number,
    min: 0,
    max: 60
  },
  image:{
    data: Buffer,
    type: String
  }
})

export interface IPet{
  cardNumber: Number,
  type: String,
  breed: String,
  ncikname: String,
  age: Number
}

export const Pet = mongoose.model('Pet', PetSchema)