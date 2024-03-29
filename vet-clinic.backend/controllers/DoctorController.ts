import IDoctorService from "../services/interfaces/IDoctorService";

export class DoctorController{
  doctorService : IDoctorService

  constructor(doctorService : IDoctorService) {
    this.doctorService = doctorService;
  }

  addInfo = async (req : any, res : any) => {
    var id = req.params.id;
    var spec = req.body.spec;
    if (req.file !== undefined){
      var image = req.file.filename;
    }

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

    const typeId = req.query.type;
    let doctors;
    if (typeId == null) {
      doctors = await this.doctorService.getAll();
    } else {
      doctors = await this.doctorService.getAllBySpec(typeId);
    }

    res.json(doctors)
  }

  GetAllDoctorsWithTime = async (req: any, res: any) => {
    var doctors = await this.doctorService.getAllWithTimes();
    res.json(doctors)
  }

  SetDoctorTime = async (req: any, res: any) => {
    var id = req.params.id;
    var timeTable = req.body.timetable;

    var result = await this.doctorService.setTimeTable(id, timeTable);
    res.json(result);
  }

  GetDoctorHours = async (req: any, res: any) => {
    var id = req.params.id;

    var result = await this.doctorService.getTimes(id);

    res.json(result)
  }

  GetDoctorsAppointments = async (req: any, res: any) => {
    var userId = req.params.userId;

    var result = await this.doctorService.getAllAppointments(userId);

    res.json(result)
  }

  GetCurrentAppointment = async (req  :any, res : any) => {
    var userId = req.params.userId;

    var result = await this.doctorService.getCurrentAppointment(userId);

    res.json(result)
  }
}