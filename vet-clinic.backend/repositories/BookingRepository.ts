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

    await new_book.save();

    return new_book._id;
  }

  GetUpcomingBookingsByClient = async (clientId : Types.ObjectId, date : Date) => {

    const bookings = await Booking
      .find({clientId : clientId, date : {$gt : date.getTime()}})
      .sort('date')
      .exec();

    return bookings

  }

  GetPastBookingsByClient = async (clientId : Types.ObjectId, date : Date) => {

    var bookings = await Booking
      .find({clientId : clientId, date : {$lte : date.getTime()}})
      .sort('-date')
      .exec();

    return bookings

  }

  GetDoctorBookings = async (id: string) => {
    const bookings = await Booking
      .find({doctorId : id})
      .exec();

    return bookings;

  }

  BookAppointment = async (
    clientId: Types.ObjectId,
    doctorId: Types.ObjectId,
    typeId: Types.ObjectId,
    serviceId: Types.ObjectId,
    date: Date
  ) => {
    const new_book = new Booking({
      clientId : clientId,
      doctorId : doctorId,
      typeId : typeId,
      serviceId : serviceId,
      date : date
    })

    await new_book.save();

    return new_book._id;
  }

  DeleteBooking = (bookingId: Types.ObjectId) => {
    Booking
      .deleteOne({_id : bookingId})
      .exec();

  }

  async GetAllUpcomingBookings() {
    return await Booking
      .find({date : {$gt : (new Date()).getTime()}})
      .sort('date')
      .exec();
  }

  async GetDoctorUpcomingBookings(docId: Types.ObjectId) {
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const bookings = await Booking
      .find({doctorId : docId, date : {$gt : today.getTime(), $lt : tomorrow.getTime()}})
      .exec();

    return bookings;
  }

  async getCurrentAppointment(docId: Types.ObjectId) {
    var currentTime = new Date();
    var halfHourBackTime = new Date();
    halfHourBackTime.setMinutes(currentTime.getMinutes() - 30);


    const bookings = Booking
      .findOne({doctorId : docId, date : {$lt : currentTime.getTime(), $gt : halfHourBackTime.getTime()}})
      .exec();

    return bookings;
  }
}