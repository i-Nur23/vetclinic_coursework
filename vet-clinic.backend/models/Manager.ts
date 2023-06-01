import mongoose from "mongoose";

var Schema = mongoose.Schema;

var ManagerSchema = new Schema({
  name: String,
  surName: String,
  phone: String,
  email: String,
})

export const Manager = mongoose.model('Manager', ManagerSchema)