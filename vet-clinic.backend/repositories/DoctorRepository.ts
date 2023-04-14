import mongoose, {Types} from "mongoose";
import {Doctor} from "../models/Doctor";
import {BaseRepository} from "./BaseRepository";
import IDoctorRepository from "./interfaces/IDoctorRepository";

export class DoctorRepository extends BaseRepository implements IDoctorRepository{
  constructor(db : string) {
    super(db);
  }

  changeInfo = async (id: string, name: string, surName: string, email: string, phone: string, spec: string) => {
    try {
      this.connect();

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
      this.connect();

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
    this.connect();

    var newDoc = new Doctor({name: name, surName: surName, email: email, phone : phone})

    newDoc.save();

    return newDoc._id;
  }

  addDocInfo = async ( id : string , spec: string, image: string) => {
    this.connect();

    Doctor
      .updateOne({_id : id}, {spec : spec, image : image})
      .exec();
  }

  getById(id: string): Promise<any> {
    //this.connect()

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
    this.connect()

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
}