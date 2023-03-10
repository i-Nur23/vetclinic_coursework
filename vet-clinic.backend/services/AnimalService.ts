import { AnimalRepository } from "../repositories/AnimalRepository";
import { Types } from "mongoose";

export class AnimalService {
    AnimalRepository : AnimalRepository

    constructor (AnimalRepository : AnimalRepository){
        this.AnimalRepository = AnimalRepository;
    }

    getAll  = async () => {
        return await this.AnimalRepository.getAll();
    }


    addType = async (typeName : string) => {
        if ((await this.AnimalRepository.findType(typeName)) != null){
            return {ok : false, message : 'Такой вид уже существует'}
        }


        await this.AnimalRepository.addType(typeName)

        return {ok : true}
    }

    addBreed = async (typeId : string, breedName : string) => {

        if ((await this.AnimalRepository.findBreed(breedName)) != null){
            return {ok : false, message : 'Такая порода уже существует'}
        }

        var newBreedId = await this.AnimalRepository.addBreed(breedName);

        await this.AnimalRepository.addBreedToType(typeId, newBreedId);

        return {ok : true}
    }


    changeType =  async (typeId : string, typeName : string) => {
        if ((await this.AnimalRepository.findType(typeName)) != null){
            return {ok : false, message : 'Такой вид уже существует'}
        }

        await this.AnimalRepository.changeTypeName(typeId, typeName);

        return {ok : true}
    }

    changeBreed = async (breedId : string, breedName : string) => {
        if ((await this.AnimalRepository.findBreed(breedName)) != null){
            return {ok : false, message : 'Такая порода уже существует'}
        }

        await this.AnimalRepository.changeBreedName(breedId, breedName);

        return {ok : true}
    }

    deleteType = async (typeId : string) => {
        await this.AnimalRepository.deleteType(typeId);
    }

    deleteBreed = async (breedId : Types.ObjectId) => {
        await this.AnimalRepository.deleteBreed(breedId);
    }
}