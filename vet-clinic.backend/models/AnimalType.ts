import mongoose from "mongoose";

var Schema = mongoose.Schema;

var AnimalTypeSchema = new Schema({
  type: String,
  breeds : [{type: Schema.Types.ObjectId, ref: 'Breed'}]
})

export const AnimalType = mongoose.model('AnimalType', AnimalTypeSchema)