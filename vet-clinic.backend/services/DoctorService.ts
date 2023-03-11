import IDoctorService from "./interfaces/IDoctorService";
import IDoctorRepository from "../repositories/interfaces/IDoctorRepository";

export class DoctorService implements IDoctorService {

  doctorRepository : IDoctorRepository

  constructor(doctorRepository : IDoctorRepository) {
    this.doctorRepository = doctorRepository
  }

  addDocInfo = async (id : string, spec: string, image: string) => {
    await this.doctorRepository.addDocInfo(id, spec, image)
  }
}