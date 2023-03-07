import {IPet} from "../../models/Pet";
import {Types} from "mongoose";

export default interface IPetRepository{
  getMaxCardNumber() : Promise<Number>
  addPet(pet : IPet) : Promise<any>
  remove(petId: Types.ObjectId): Promise<any>;
  getPathToImage(petId: Types.ObjectId): Promise<any>;
}