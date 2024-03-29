import mongoose, {Types} from "mongoose";

var Schema = mongoose.Schema;

var ServiceSchema = new Schema({
  type: String,
  spec : String,
  services_list: [{
    _id: Types.ObjectId,
    name: String,
    price: Number,
    isActive : Boolean
  }]
})

export const Service = mongoose.model('Service', ServiceSchema)