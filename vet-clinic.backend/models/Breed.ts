import mongoose from "mongoose";

var Schema = mongoose.Schema;

var BreedSchema = new Schema({
  name: String
})

export interface IBreed{
  name: string
}

export const Breed = mongoose.model('Breed', BreedSchema)