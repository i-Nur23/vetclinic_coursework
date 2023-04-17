import {BookingService} from "../services/BookingService";

export class BookingController{
  private bookingService : BookingService;

  constructor(bookingService : BookingService) {
    this.bookingService = bookingService;
  }

  BookProcedure = async (req: any, res: any) => {
    const clientId = req.body.id;
    const typeId = req.body.type;
    const serviceId = req.body.service;
    const date = req.body.date;

    res.json(await this.bookingService.BookProcedure(clientId, typeId, serviceId, date))
  }
}