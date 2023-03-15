import { AnimalService } from "../services/AnimalService";

export class AnimalController {

    AnimalService : AnimalService;

    constructor (AnimalService : AnimalService){
        this.AnimalService = AnimalService;
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
    }

    deleteBreed = async (req : any, res : any) => {
        var id = req.params.id;
        await this.AnimalService.deleteBreed(id);
    }

}