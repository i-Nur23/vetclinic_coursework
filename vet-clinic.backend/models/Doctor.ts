import mongoose from "mongoose";

var Schema = mongoose.Schema;

var DoctorSchema = new Schema({
  name: String,
  surName: String,
  birthDate: Date,
  spec: String
})

export const Doctor = mongoose.model('Doctor', DoctorSchema)
