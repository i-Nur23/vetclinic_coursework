import IClientService from "../services/interfaces/IClientService";

export class ClientController{
  clientService : IClientService
   constructor(clientService : IClientService) {
    this.clientService = clientService
   }

   get = async (req : any, res : any) => {
    res.json(await this.clientService.getAll())
   }
}