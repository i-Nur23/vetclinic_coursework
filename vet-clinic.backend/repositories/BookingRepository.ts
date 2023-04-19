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

  GetUpcomingBookingsByClient = async (clientId : Types.ObjectId, date : Date) => {

    const bookings = await Booking
      .find({clientId : clientId, date : {$gt : date.getTime() + date.getTimezoneOffset() * 60000}})
      .sort('date')
      .exec();

    const bookingsLocalTime = bookings.map(booking =>
    {
      if (booking.date != undefined){
        booking.date.setTime(booking.date.getTime() - booking.date.getTimezoneOffset() *
          60000);
      }
      return booking;
    })


    return bookingsLocalTime;

  }

  GetPastBookingsByClient = async (clientId : Types.ObjectId, date : Date) => {

    var bookings = await Booking
      .find({clientId : clientId, date : {$lte : date.getTime() + date.getTimezoneOffset() * 60000}})
      .sort('-date')
      .exec();

    const bookingsLocalTime = bookings.map(booking =>
    {
      if (booking.date != undefined){
        booking.date.setTime(booking.date.getTime() -  booking.date.getTimezoneOffset() *
          60000);
      }
      return booking;
    })

    return bookingsLocalTime;

  }

  GetDoctorBookings = async (id: string) => {
    return Booking
      .find({doctorId : id})
      .exec();
  }
}