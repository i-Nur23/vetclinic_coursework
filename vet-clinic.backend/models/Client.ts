import mongoose from "mongoose";

var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  name: String,
  surName: String,
  birthDate: Date,
  pets: [{type: Schema.Types.ObjectId, ref: 'Pet'}]
})

export const Client = mongoose.model('Client', ClientSchema)