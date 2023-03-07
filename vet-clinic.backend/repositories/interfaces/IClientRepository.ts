import {Types} from "mongoose";

export default interface IClientRepository{
  getAll() : Promise<any>;
  createClient(name:string, surName:string, email:string) : Promise<any>;
  getById(id : string) : Promise<any>;
  changeInfo (userId : string, name: string, surName: string, email: string): Promise<boolean>;
  getPets(id: any): Promise<any>;
  addPet(id : string, petId : Types.ObjectId) : Promise<any>;
  removePet(clientId: string, petId: Types.ObjectId): Promise<void>;
}