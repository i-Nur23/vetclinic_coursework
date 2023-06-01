import {BookingService} from "../services/BookingService";

export class BookingController{
  private bookingService : BookingService;

  constructor(bookingService : BookingService) {
    this.bookingService = bookingService;
  }

  GetFutureBookings = async (req : any, res : any) => {
    res.json(await this.bookingService.GetFutureBookings())
  }

  BookProcedure = async (req: any, res: any) => {
    const clientId = req.body.id;
    const typeId = req.body.type;
    const serviceId = req.body.service;
    const date = req.body.date;

    res.json(await this.bookingService.BookProcedure(clientId, typeId, serviceId, date))
  }

  BookProcedureClient = async (req: any, res: any) => {
    const clientId = req.body.id;
    const typeId = req.body.type;
    const serviceId = req.body.service;
    const date = req.body.date;

    res.json(await this.bookingService.BookProcedure(clientId, typeId, serviceId, date, true))
  }

  GetClientBookings = async (req : any, res : any) => {
    const userId = req.params.id;

    res.json(await this.bookingService.GetClientBookings(userId));
  }

  BookAppointment = async (req: any, res: any) => {
    const userId = req.body.userId;
    const doctorId = req.body.doctorId;
    const typeId = req.body.typeId;
    const serviceId = req.body.serviceId;
    const date = req.body.date;

    res.json(await this.bookingService.BookAppointment(userId, doctorId, typeId, serviceId, date))
  }

  BookAppointmentClient = async (req: any, res: any) => {
    const userId = req.body.userId;
    const doctorId = req.body.doctorId;
    const typeId = req.body.typeId;
    const serviceId = req.body.serviceId;
    const date = req.body.date;

    res.json(await this.bookingService.BookAppointment(userId, doctorId, typeId, serviceId, date, true))
  }

  DeleteBookings = async (req: any, res: any) => {
    const bookingId = req.params.bookingId;
    await this.bookingService.deleteBooking(bookingId)
    res.json({})
  }
}