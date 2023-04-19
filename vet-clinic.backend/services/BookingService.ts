import {BookingRepository} from "../repositories/BookingRepository";
import {ServiceRepository} from "../repositories/ServiceRepository";
import {ClientRepository} from "../repositories/ClientRepository";
import {DoctorRepository} from "../repositories/DoctorRepository";
import {Types} from "mongoose";
import {AccountRepository} from "../repositories/AccountRepository";

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

  GetClientBookings = async (userId : Types.ObjectId) => {
    const clientId = await this.accountRepository.getClientId(userId)

    if (clientId == null){
      return {ok : false};
    }

    const result = await  this.bookingRepository.GetBookingsByClient(clientId)

    if (result != null){
      return {ok : true, bookings : result}
    }

    return {ok : false}



  }

}