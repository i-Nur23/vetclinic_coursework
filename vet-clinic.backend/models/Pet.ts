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
  nickname: String,
  birthDate: Date,
  image:{
    data: Buffer,
    type: String
  }
})

export interface IPet{
  cardNumber: Number,
  type: String,
  breed: String,
  nickname: String,
  birthDate: Date
  image: String
}

export const Pet = mongoose.model('Pet', PetSchema)