import IClientService from "../services/interfaces/IClientService";

export class ClientController{
  clientService : IClientService
   constructor(clientService : IClientService) {
    this.clientService = clientService
   }

   get = async (req : any, res : any) => {
    var id = req.params.id;
    var client = await this.clientService.getClient(id)

    if (client == null){
     res.json({ok : false, data : null})
    } else {
     res.json({ok: true, data : client})
    }


   }
}