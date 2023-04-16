import {ServiceRepository} from "../repositories/ServiceRepository";

export class ServiceController {
  serviceRepository : ServiceRepository;

  constructor(serviceRepository : ServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  getTypes = async (req : any, res : any) => {
    var types = await this.serviceRepository.getAllTypes();

    res.json(types);
  }

  getAll = async (req : any, res : any) => {
    var types = await this.serviceRepository.getAll();

    res.json(types);
  }

  changeIsActive = async (newIsActive : boolean, req : any , res : any) => {
    var id = req.params.id;
    var typeId = req.params.typeId;

    var ok = await  this.serviceRepository.changeIsActive(id, newIsActive);

    res.json({ok : ok})
  }

  changeServiceInfo = async (req : any, res : any) => {
    var id = req.params.id;
    var typeId = req.params.typeId;
    var name = req.body.name;
    var price = req.body.price;

    var ok = await this.serviceRepository.changeService(typeId, id, name, price);

    res.json({ok : ok})
  }

  AddService = async (req: any, res: any) => {
    var typeId = req.params.typeId;
    var name = req.body.name;
    var price = req.body.price;

    var ok = await this.serviceRepository.AddService(typeId, name, price);

    res.json({ok : ok})
  }

  getSpecs = async (req: any, res: any) => {
    var specs = await this.serviceRepository.getAllSpecs();

    res.json(specs);
  }

  getAvailable = async (req: any, res: any) => {
    var services = await this.serviceRepository.getAvailable();

    res.json(services);
  }
}