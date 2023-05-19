import { AnimalService } from "../services/AnimalService";
import {PetService} from "../services/PetService";
import {IPet} from "../models/Pet";

export class AnimalController {

    AnimalService : AnimalService;
    PetService : PetService;

    constructor (AnimalService : AnimalService, PetService : PetService){
        this.AnimalService = AnimalService;
        this.PetService = PetService
    }

    getAll = async (req : any, res : any) => {
        res.json(await this.AnimalService.getAll());    
    }

    addType = async (req : any, res : any) => {

        var name = req.query.name;

        res.json(await this.AnimalService.addType(name));
    }

    addBreed = async (req : any, res : any) => {

        var id = req.params.id;
        var name = req.query.name;

        res.json(await this.AnimalService.addBreed(id, name));
    }

    changeBreed = async (req : any, res : any) => {
        var id = req.params.id;
        var typeId = req.query.typeId;
        var name = req.query.name;

        res.json(await this.AnimalService.changeBreed(typeId, id, name))
    }

    changeType = async (req : any, res : any) => {
        var id = req.params.id;
        var name = req.query.name;

        res.json(await this.AnimalService.changeType(id, name))
    }

    deleteType = async (req : any, res : any) => {
        var id = req.params.id;
        await this.AnimalService.deleteType(id);
        res.json();
    }

    deleteBreed = async (req : any, res : any) => {
        var id = req.params.id;
        var typeId = req.query.typeId;
        await this.AnimalService.deleteBreed(typeId, id);
        res.json();
    }

    getAllPets = async (req : any, res : any) => {
        res.json(await this.PetService.getAllPets())
    }

}