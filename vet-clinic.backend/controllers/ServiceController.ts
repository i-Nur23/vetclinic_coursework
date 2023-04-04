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

}