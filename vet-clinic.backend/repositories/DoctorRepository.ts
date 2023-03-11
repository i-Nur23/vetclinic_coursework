import mongoose, {Types} from "mongoose";
import {Doctor} from "../models/Doctor";
import {BaseRepository} from "./BaseRepository";
import IDoctorRepository from "./interfaces/IDoctorRepository";

export class DoctorRepository extends BaseRepository implements IDoctorRepository{
  constructor(db : string) {
    super(db);
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
}