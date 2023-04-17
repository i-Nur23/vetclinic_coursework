import mongoose, {Types} from "mongoose";

var Schema = mongoose.Schema;

var BookingSchema = new Schema({
  date : Date,
  clientId : Types.ObjectId,
  doctorId : Types.ObjectId,
  typeId : Types.ObjectId,
  serviceId : Types.ObjectId,
})

export const Booking = mongoose.model('Booking', BookingSchema)