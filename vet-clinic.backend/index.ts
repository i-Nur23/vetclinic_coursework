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
const bodyParser = require('body-parser');



const app = express()
const port = 3000

/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));*/

app.use(express.json({extended : true}))


var mongoDB = 'mongodb://127.0.0.1/veterenary_clinic';

var clientRepo = new ClientRepository(mongoDB);
var accountRepo = new AccountRepository(mongoDB);
var petRepo = new PetRepository(mongoDB);

var clientService = new ClientService(clientRepo, accountRepo, petRepo);
var accountService = new AccountService(accountRepo, clientRepo);

var clientController = new ClientController(clientService);
var accountController = new AccountController(accountService);

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




app.get('/client/:id', (req : any, res : any) => clientController.get(req, res))
app.patch('/client/:id', (req : any, res : any) => clientController.changeInfo(req, res))
app.get('/client/:id/pets', (req : any, res : any) => clientController.getPets(req, res))
app.post('/client/:id/pets', uploadPet.single('image'), (req : any, res : any) =>{
    console.log(req.file)
    clientController.addPet(req, res)
})
app.get('/account', (req : any, res : any) => accountController.find(req, res))
app.post('/account', (req : any, res : any) => accountController.create(req, res))

app.listen(port, () => {
    console.log(`Server working on http://localhost:${port}`)
})