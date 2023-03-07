import {IPet} from "../../models/Pet";
import {Types} from "mongoose";

export default interface IClientService{
  getAll() : Promise<any>
  getClient(id : string) : Promise<any>
  changeInfo(id : string,login: string, name: string, surName: string, email: string): Promise<any>
  getPets(id: any): Promise<any>;
  addPet(id: string, pet: IPet): Promise<any>;
  removePet(userId: string, petId: Types.ObjectId): Promise<void>;
}