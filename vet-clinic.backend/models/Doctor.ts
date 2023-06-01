import mongoose from "mongoose";

var Schema = mongoose.Schema;

var DoctorSchema = new Schema({
  name: String,
  surName: String,
  phone: String,
  email: String,
  spec: String,
  image: String,
  workHours: [String],
  oldWorkHours : [String],
  changeDate : Date
})

export const Doctor = mongoose.model('Doctor', DoctorSchema)
