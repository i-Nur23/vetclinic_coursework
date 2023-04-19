import mongoose, {Types} from "mongoose";

var Schema = mongoose.Schema;

var BookingSchema = new Schema({
  date : Date,
  clientId : Types.ObjectId,
  doctorId : Types.ObjectId,
  typeId : Types.ObjectId,
  serviceId : Types.ObjectId,
})

export interface BookingExtended {
  _id : Types.ObjectId,
  date : Date | undefined,
  clientId : String | undefined,
  doctorId : String | undefined,
  typeId : String | undefined,
  serviceId : String | undefined,
  doctor : String | undefined,
  service : String | undefined,
  type : String | undefined
}

export const Booking = mongoose.model('Booking', BookingSchema)