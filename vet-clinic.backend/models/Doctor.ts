import mongoose from "mongoose";

var Schema = mongoose.Schema;

var DoctorSchema = new Schema({
  name: String,
  surName: String,
  phone: String,
  email: String,
  spec: String,
  image: String,
  workHours: [String]
})

export interface IDoctor{
  name: string,
  surName: string,
  phone: string,
  email : string,
  spec: string,
  image: string
}

export const Doctor = mongoose.model('Doctor', DoctorSchema)
