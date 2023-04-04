import mongoose from "mongoose";

var Schema = mongoose.Schema;

var ServiceSchema = new Schema({
  type: String,
  services_list: [{
    name: String,
    price: Number
  }]
})

export interface IService{
  type: string,
  services_list: [{
    name: string,
    price: number
  }]
}

export const Service = mongoose.model('Service', ServiceSchema)