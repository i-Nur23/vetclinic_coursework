import {IPet} from "../../models/Pet";

export default interface IPetRepository{
  getMaxCardNumber() : Promise<Number>
  addPet(pet : IPet) : Promise<any>
}