import {ClientRepository} from "./repositories/ClientRepository";
import {AccountRepository} from "./repositories/AccountRepository";

import {ClientService} from "./services/ClientService";
import {AccountService} from "./services/AccountService";

import {ClientController} from "./controllers/ClientController";
import {AccountController} from "./controllers/AccountController";
import {PetRepository} from "./repositories/PetRepository";

const express = require('express');
const cors = require('cors')
const multer = require('multer')
import { v4 as uuidv4 } from 'uuid';
import {DoctorRepository} from "./repositories/DoctorRepository";
import {ManagerRepository} from "./repositories/ManagerRepository";
import {RegisterRepository} from "./repositories/RegisterRepository";
import {DoctorService} from "./services/DoctorService";
import {DoctorController} from "./controllers/DoctorController";
import { AnimalRepository } from "./repositories/AnimalRepository";
import { AnimalService } from "./services/AnimalService";
import { AnimalController } from "./controllers/AnimalController";
const bodyParser = require('body-parser');



const app = express()
const port = 3000

/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));*/

app.use(express.json({extended : true}))
app.use('/public',express.static('public'));



var mongoDB = 'mongodb://127.0.0.1/veterenary_clinic';

var clientRepo = new ClientRepository(mongoDB);
var accountRepo = new AccountRepository(mongoDB);
var petRepo = new PetRepository(mongoDB);
var docRepo = new DoctorRepository(mongoDB);
var manRepo = new ManagerRepository(mongoDB);
var regRepo = new RegisterRepository(mongoDB);
var animalRepo = new AnimalRepository(mongoDB);

var clientService = new ClientService(clientRepo, accountRepo, petRepo);
var accountService = new AccountService(accountRepo, clientRepo, docRepo, manRepo, regRepo);
var doctorService = new DoctorService(docRepo, accountRepo);
var animalService = new AnimalService(animalRepo);

var clientController = new ClientController(clientService);
var accountController = new AccountController(accountService);
var doctorController = new DoctorController(doctorService);
var animalController = new AnimalController(animalService);

app.use(cors())

const petStorage = multer.diskStorage({
    destination: (req : any, file  :any, cb : any) => {
        cb(null, './public/pets');
    },
    filename: (req : any, file : any, cb : any) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var uploadPet = multer({
    storage: petStorage,
});

const docStorage = multer.diskStorage({
    destination: (req : any, file  :any, cb : any) => {
        cb(null, './public/doctors');
    },
    filename: (req : any, file : any, cb : any) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var uploadPet = multer({
    storage: petStorage,
});

var uploadDoc = multer({
    storage: docStorage
})




app.get('/client/:id', (req : any, res : any) => clientController.get(req, res))
app.patch('/client/:id', (req : any, res : any) => clientController.changeInfo(req, res))
app.get('/client/:id/pets', (req : any, res : any) => clientController.getPets(req, res))
app.post('/client/:id/pets', uploadPet.single('image'), (req : any, res : any) => clientController.addPet(req, res))
app.delete('/client/:userId/pets/:petId', (req : any, res : any) => clientController.removePet(req, res))

app.get('/account', (req : any, res : any) => accountController.find(req, res))
app.post('/account', (req : any, res : any) => accountController.create(req, res))

app.post('/doctor/:id', uploadDoc.single('image'),(req : any, res : any) => doctorController.addInfo(req, res))
app.patch('/doctor/:id', (req : any, res : any) => doctorController.changeInfo(req, res))
app.patch('/doctor/withphoto/:id', uploadDoc.single('image'),(req : any, res : any) => doctorController.changeInfoAndPhoto(req, res))

app.get('/workers', (req :any, res : any) => accountController.getWorkers(req, res))
app.patch('/workers/:id', (req : any, res : any) => accountController.changeWorkersInfo(req, res))
app.delete('/accounts/:id', (req : any, res : any) => accountController.deleteWorker(req, res))

app.get('/animals', (req :any, res : any) => animalController.getAll(req, res))
app.post('/animals', (req :any, res : any) => animalController.addType(req, res))
app.post('/animals/:id', (req :any, res : any) => animalController.addBreed(req, res))
app.patch('/animals/:id', (req :any, res : any) => animalController.changeType(req, res))
app.patch('/breeds/:id', (req :any, res : any) => animalController.changeBreed(req, res))
app.delete('/animals/:id', (req :any, res : any) => animalController.deleteType(req, res))
app.delete('/breeds/:id', (req :any, res : any) => animalController.deleteBreed(req, res))

app.listen(port, () => {
    console.log(`Server working on http://localhost:${port}`)
})