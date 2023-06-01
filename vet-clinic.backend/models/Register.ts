import mongoose from "mongoose";

var Schema = mongoose.Schema;

var RegisterSchema = new Schema({
  name: String,
  surName: String,
  phone: String,
  email: String,
})

export const Register = mongoose.model('Register', RegisterSchema)