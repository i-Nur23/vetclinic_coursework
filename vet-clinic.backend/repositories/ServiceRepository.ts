import {BaseRepository} from "./BaseRepository";
import {Service} from "../models/Service";
import {Schema, Types} from "mongoose";

export class ServiceRepository extends BaseRepository {
  constructor(db : string) {
    super(db);
  }

  getAllTypes = async () => {
    /*this.connect();*/

    var types = await Service
      .find()
      .select('type')
      .exec();

    return types;
  }

  getAllSpecs = async () => {
    /*this.connect();*/

    var types = await Service
      .find()
      .select('spec')
      .exec();

    return types.filter((type : any) => type.spec != undefined);
  }

  getAll = async () => {
    /*this.connect();*/

    var types = await Service
      .find()
      .exec();

    return types;
  }

  changeService = async (typeId : Types.ObjectId, serviceId : Types.ObjectId, name : string, price : number) => {
    /*this.connect();*/
    var updatedServiceType = await Service
      .findById(typeId)
      .exec();

    if (!updatedServiceType){
      return false;
    }

    var updatedService = updatedServiceType.services_list.find(ser => ser._id == serviceId);
    var ServiceWithSameName = updatedServiceType.services_list.find(ser => ser.name == name);

    console.log(ServiceWithSameName);

    if (!updatedService || updatedService != ServiceWithSameName && ServiceWithSameName){
      return false;
    }

    try {
      await Service.update({_id : typeId, 'services_list._id' : serviceId}, {'$set' : {
          'services_list.$.name' : name,
          'services_list.$.price' : price
        }}).exec()
    } catch {
      return false;
    }

    return true;

  }

  changeIsActive = async (serviceId : Types.ObjectId, isActive : boolean) => {
    /*this.connect();*/

    try {
      await Service.update({'services_list._id' : serviceId}, {'$set' : {
          'services_list.$.isActive' : isActive
        }}).exec()
    } catch {
      return false;
    }

    return true;
  }

  AddService = async (typeId: Types.ObjectId, name: string, price: number) => {
    /*this.connect();*/

    var updatedServiceType = await Service
      .findById(typeId)
      .exec();

    if (!updatedServiceType){
      return false;
    }

    var ServiceWithSameName = updatedServiceType.services_list.find(ser => ser.name == name);

    if (ServiceWithSameName){
      return false;
    }

    try {
      var id = new Types.ObjectId();

      await Service.update({_id : typeId}, {'$push' : {
          services_list : {
            name : name,
            price : price,
            isActive : true,
            _id : id
          }
        }}).exec()
    } catch {
      return false;
    }

    return true;

  }

  getAvailable = async () => {
    var types = await Service
      .find()
      .exec();

    types.forEach(type => {
      type.services_list = type.services_list.filter(s => s.isActive)
    })

    return types;
  }
}