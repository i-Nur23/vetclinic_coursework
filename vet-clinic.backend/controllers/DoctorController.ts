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

  changeInfo = async (req  :any, res : any) => {
    var accId = req.params.id;
    var userId = req.body.userId;
    var login = req.body.login;
    var password = req.body.password;
    var name = req.body.name;
    var surName = req.body.surName;
    var email = req.body.email;
    var phone = req.body.phone;
    var spec = req.body.spec;


    var response = await this.doctorService.changeDocInfo(accId, userId, login, password, name, surName, email, phone, spec)

    res.json(response)
  }

  changeInfoAndPhoto = async (req  :any, res : any) => {
    var accId = req.params.id;
    var image = req.file.filename;
    var userId = req.body.userId;
    var login = req.body.login;
    var password = req.body.password;
    var name = req.body.name;
    var surName = req.body.surName;
    var email = req.body.email;
    var phone = req.body.phone;
    var spec = req.body.spec;


    var response = await this.doctorService.changeDocInfoAndPhoto(accId, userId, login, password, name, surName, email, phone, spec, image)

    res.json(response)
  }

  GetAllDoctors = async (req: any, res: any) => {
    var doctors = await this.doctorService.getAll();
    res.json(doctors)
  }

  GetAllDoctorsWithTime = async (req: any, res: any) => {
    var doctors = await this.doctorService.getAllWithTimes();
    res.json(doctors)
  }
}