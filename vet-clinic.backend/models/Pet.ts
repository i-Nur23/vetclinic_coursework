import mongoose from "mongoose";
import {Int32} from "mongodb";

var Schema = mongoose.Schema;

var PetSchema = new Schema({
  cardNumber: Int32,
  type: String,
  breed: String,
  ncikname: String,
  age: Int32
})