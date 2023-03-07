import {Request, Response} from "express";

import IClientService from "../services/interfaces/IClientService";
import {IPet} from "../models/Pet";

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

 changeInfo = async (req: any, res: any) => {
  var id = req.params.id
  var login = req.query.login;
  var name = req.query.name;
  var surName = req.query.surName;
  var email = req.query.email;

  var result = await this.clientService.changeInfo(id ,login, name, surName, email);

  res.json(result);
 }

  getPets = async (req: any, res: any) => {
    var id = req.params.id;

    var result = await this.clientService.getPets(id);

    res.json(result)
  }

  addPet = async (req : any, res : any) => {
   var id = req.params.id;
   var filename = req.file.filename

   var pet : IPet = {
    type : req.body.type,
    breed : req.body.breed,
    nickname : req.body.name,
    birthDate : req.body.birthDate,
    image: filename,
    cardNumber: -1
   };

   var response = await this.clientService.addPet(id ,pet, req.body.image);

   if (!response) {
    res.json({ok : false, message : 'Ошибка добавления'})
   } else {
    res.json({ok : true})
   }



  }
}