import IDoctorService from "../services/interfaces/IDoctorService";

export class DoctorController{
  doctorService : IDoctorService

  constructor(doctorService : IDoctorService) {
    this.doctorService = doctorService;
  }

  addInfo = async (req : any, res : any) => {
    var id = req.params.id;
    var spec = req.body.spec;
    var image = req.file.filename

    await this.doctorService.addDocInfo(id, spec, image);

    res.json({ok : true})

  }
}