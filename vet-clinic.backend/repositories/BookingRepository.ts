import {Types} from "mongoose";
import {Booking} from "../models/Booking";

export class BookingRepository{

  BookProcedure = async (clientId : Types.ObjectId, typeId: Types.ObjectId, serviceId: Types.ObjectId, date: Date) => {
    var new_book = new Booking({
      clientId : clientId,
      typeId : typeId,
      serviceId : serviceId,
      date : date
    })

    new_book.save();

    return new_book._id;
  }
}