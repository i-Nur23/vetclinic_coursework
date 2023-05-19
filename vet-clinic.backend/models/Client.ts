import mongoose from "mongoose";
//import {IPet} from "./Pet";

var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  name: String,
  surName: String,
  email: String,
  phone: String,
  pets: [{type: Schema.Types.ObjectId, ref: 'Pet'}]
})

export interface IClient{
  name: string,
  surName: string,
  email: string,
  phone: string,
}

export const Client = mongoose.model('Client', ClientSchema)