import {Doctor} from "../models/Doctor";
import IDoctorRepository from "./interfaces/IDoctorRepository";

export class DoctorRepository implements IDoctorRepository{

  changeInfo = async (id: string, name: string, surName: string, email: string, phone: string, spec: string) => {
    try {

      var updatedDoc = await Doctor
        .updateOne({_id: id}, {name: name, surName: surName, email: email, phone: phone, spec : spec})
        .exec()

      if (updatedDoc != null) {
        return true;
      }

      return false;

    } catch {
      return false;
    }
  }

  changeInfoAndPhoto = async (id: string, name: string, surName: string, email: string, phone: string, spec: string, image: string) => {
    try {

      var updatedManager = await Doctor
        .updateOne({_id: id}, {name: name, surName: surName, email: email, phone: phone, spec : spec, image : image})
        .exec()

      if (updatedManager != null) {
        return true;
      }

      return false;

    } catch {
      return false;
    }
  }

  createDoc = async (name: string, surName: string, email: string, phone: string) => {

    var newDoc = new Doctor({name: name, surName: surName, email: email, phone : phone})

    newDoc.save();

    return newDoc._id;
  }

  addDocInfo = async ( id : string , spec: string, image: string) => {

    Doctor
      .updateOne({_id : id}, {spec : spec, image : image})
      .exec();
  }

  getById(id: string): Promise<any> {

    return Doctor
      .findById(id)
      .exec();
  }

  getPathToImage = async (userId: string) => {
    var path = Doctor
      .findById(userId)
      .exec()
      .then(doc => {return doc?.image})

    return path
  }

  delete = async (userId: any) => {

    await Doctor
      .findByIdAndDelete(userId)
      .exec();
  }

  getAll = async () => {
    var doctors = Doctor
      .find()
      .select('name surName image spec')
      .exec()

    return doctors;
  }

  getAllWithTimes = async () => {
    var doctors = Doctor
      .find()
      .select('name surName spec workHours oldWorkHours changeDate')
      .exec()

    return doctors;
  }

  setTimeTable = async (id: string, timeTable: [string | null]) => {
    try{

      var doc = await Doctor
        .findById(id)
        .exec()

      var oldTime = doc?.workHours;
      var changeDate = new Date();
      changeDate.setDate(changeDate.getDate() + 14)
      changeDate.setUTCHours(20, 50, 50);

      var doc_upd = await Doctor
        .updateOne({_id : id}, {workHours : timeTable, oldWorkHours : oldTime, changeDate : changeDate}, {new : true})
        .exec()

      return (doc_upd != null)
    } catch {
      return false;
    }
  }

  getBySpec = async (spec: string) => {
    const docs = Doctor
      .find({spec : spec})
      .select('name surName')
      .exec();

    return docs;
  }

  GetDocTimes = async (id: string) => {
    return Doctor
      .findById(id)
      .select('-_id workHours oldWorkHours changeDate')
      .exec()

  }
}