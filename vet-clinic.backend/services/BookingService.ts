import {BookingRepository} from "../repositories/BookingRepository";
import {ServiceRepository} from "../repositories/ServiceRepository";
import {ClientRepository} from "../repositories/ClientRepository";
import {DoctorRepository} from "../repositories/DoctorRepository";
import {Types} from "mongoose";
import {AccountRepository} from "../repositories/AccountRepository";
import {BookingExtended} from "../models/Booking";

export class BookingService{
  private bookingRepository : BookingRepository;
  private serviceRepository : ServiceRepository;
  private clientRepository : ClientRepository;
  private doctorRepository : DoctorRepository;
  private accountRepository : AccountRepository;


  constructor(
    accountRepository : AccountRepository,
    bookingRepository : BookingRepository,
    serviceRepository : ServiceRepository,
    clientRepository : ClientRepository,
    doctorRepository : DoctorRepository,
    ) {
    this.accountRepository = accountRepository;
    this.bookingRepository = bookingRepository;
    this.serviceRepository = serviceRepository;
    this.clientRepository = clientRepository;
    this.doctorRepository = doctorRepository;
  }

  BookProcedure = async (userId : Types.ObjectId, typeId: Types.ObjectId, serviceId: Types.ObjectId, date: Date) => {
    const clientId = await this.accountRepository.getClientId(userId)

    if (clientId == null){
      return {ok : false};
    }

    const result = await this.bookingRepository.BookProcedure(clientId, typeId, serviceId, date);

    return {ok : (result != null)};
  }

  private GetExtendedBookings = async (bookings : any) => {
    const result = await bookings.map(async (book : any) => {
      let _book : BookingExtended =
        {
          date : book.date,
          _id : book._id,
          clientId : book.clientId?.toString(),
          doctorId : book.doctorId?.toString(),
          typeId : book.typeId?.toString(),
          serviceId : book.serviceId?.toString(),
          doctor : undefined,
          type : undefined,
          service : undefined
        }

      if (book.doctorId != undefined){
        const doc = await this.doctorRepository.getById(book.doctorId.toString())
        _book.doctor = doc.name + ' ' + doc.surName;
      }

      if (book.serviceId != undefined && book.typeId != undefined){
        const service = await this.serviceRepository.getTypeById(book.typeId.toString())
        if (service != null){
          _book.type = service.type;
          const s = service.services_list.find(x => x._id?.toString() === book.serviceId?.toString())
          _book.service = s?.name;
        }
      }

      return _book;
    })


    return Promise.all(result)
  }

  GetClientBookings = async (userId : Types.ObjectId) => {
    const clientId = await this.accountRepository.getClientId(userId);

    if (clientId == null){
      return {ok : false};
    }

    const date = new Date();

    const pastBookings  = await  this.bookingRepository.GetPastBookingsByClient(clientId, date);
    const upcomingBookings  = await  this.bookingRepository.GetUpcomingBookingsByClient(clientId, date);

    const uBooks = await this.GetExtendedBookings(upcomingBookings);
    const pBooks = await this.GetExtendedBookings(pastBookings);


    if (pastBookings.length != 0 || upcomingBookings.length !== null){
      return {ok : true, bookings :
          {
            past : pBooks,
            upcoming : uBooks
          }
      }
    }

    return {ok : false}

  }

  BookAppointment = async (
    userId: Types.ObjectId,
    doctorId: Types.ObjectId,
    typeId: Types.ObjectId,
    serviceId: Types.ObjectId,
    date : Date
    ) => {
    const clientId = await this.accountRepository.getClientId(userId);

    if (clientId == null){
      return {ok : false};
    }

    const result = await this.bookingRepository.BookAppointment(clientId, doctorId, typeId, serviceId, date);

    return {ok : result != null}

  }
}