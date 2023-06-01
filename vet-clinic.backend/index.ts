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
import {ServiceRepository} from "./repositories/ServiceRepository";
import {ServiceController} from "./controllers/ServiceController";
import mongoose from 'mongoose';
import {BookingRepository} from "./repositories/BookingRepository";
import {BookingService} from "./services/BookingService";
import {BookingController} from "./controllers/BookingController";
import {EmailService} from "./services/EmailService";
import {PetService} from "./services/PetService";
import * as path from "path";
const bodyParser = require('body-parser');



const app = express()
const port = 3000

app.use(express.json({"extended" : true}))
app.use(express.static(path.join(__dirname, 'build_client')))
app.use('/public',express.static('public'));

var mongoDB = 'mongodb://127.0.0.1/veterenary_clinic';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var clientRepo = new ClientRepository();
var accountRepo = new AccountRepository();
var petRepo = new PetRepository();
var docRepo = new DoctorRepository();
var manRepo = new ManagerRepository();
var regRepo = new RegisterRepository();
var animalRepo = new AnimalRepository();
var serviceRepo = new ServiceRepository();
var bookingRepo = new BookingRepository();

var emailService = new EmailService();
var clientService = new ClientService(clientRepo, accountRepo, petRepo);
var accountService = new AccountService(accountRepo, clientRepo, docRepo, manRepo, regRepo, emailService);
var doctorService = new DoctorService(docRepo, accountRepo, serviceRepo, bookingRepo, clientRepo);
var animalService = new AnimalService(animalRepo);
var petService = new PetService(petRepo, clientRepo);
var bookingService = new BookingService(accountRepo, bookingRepo, serviceRepo, clientRepo, docRepo);

var clientController = new ClientController(clientService);
var accountController = new AccountController(accountService);
var doctorController = new DoctorController(doctorService);
var animalController = new AnimalController(animalService, petService);
var serviceController = new ServiceController(serviceRepo);
var bookingController = new BookingController(bookingService);

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

app.get('/api/client/all',(req : any, res : any) => clientController.getAllClients(req, res))
app.get('/api/client/:id', (req : any, res : any) => clientController.get(req, res))
app.patch('/api/client/:id', (req : any, res : any) => clientController.changeInfo(req, res))
app.get('/api/client/:id/pets', (req : any, res : any) => clientController.getPets(req, res))
app.post('/api/client/:id/pets', uploadPet.single('image'), (req : any, res : any) => clientController.addPet(req, res))
app.delete('/api/client/:userId/pets/:petId', (req : any, res : any) => clientController.removePet(req, res))

app.get('/api/pets/all', (req : any, res  :any) => animalController.getAllPets(req, res))

app.get('/api/account', (req : any, res : any) => accountController.find(req, res))
app.post('/api/account', (req : any, res : any) => accountController.create(req, res))
app.post('/api/account/gen_client', (req : any, res : any) => accountController.genClient(req, res) )

app.post('/api/doctor/:id', uploadDoc.single('image'),(req : any, res : any) => doctorController.addInfo(req, res))
app.patch('/api/doctor/:id', (req : any, res : any) => doctorController.changeInfo(req, res))
app.patch('/api/doctor/withphoto/:id', uploadDoc.single('image'),(req : any, res : any) => doctorController.changeInfoAndPhoto(req, res))

app.get('/api/workers', (req :any, res : any) => accountController.getWorkers(req, res))
app.patch('/api/workers/:id', (req : any, res : any) => accountController.changeWorkersInfo(req, res))
app.delete('/api/accounts/:id', (req : any, res : any) => accountController.deleteWorker(req, res))

app.get('/api/animals', (req :any, res : any) => animalController.getAll(req, res))
app.post('/api/animals', (req :any, res : any) => animalController.addType(req, res))
app.post('/api/animals/:id', (req :any, res : any) => animalController.addBreed(req, res))
app.patch('/api/animals/:id', (req :any, res : any) => animalController.changeType(req, res))
app.patch('/api/breeds/:id', (req :any, res : any) => animalController.changeBreed(req, res))
app.delete('/api/animals/:id', (req :any, res : any) => animalController.deleteType(req, res))
app.delete('/api/breeds/:id', (req :any, res : any) => animalController.deleteBreed(req, res))

app.get('/api/services/types', (req :any, res : any) => serviceController.getTypes(req, res))
app.get('/api/services/by_type/:typeId', (req :any, res : any) => serviceController.getServicesByType(req, res))
app.get('/api/services/specs', (req :any, res : any) => serviceController.getSpecs(req, res))
app.get('/api/services', (req :any, res : any) => serviceController.getAll(req, res))
app.get('/api/available_services', (req :any, res : any) => serviceController.getAvailable(req, res))

app.patch('/api/services/:typeId/:id/archive', (req : any, res : any) => serviceController.changeIsActive(false,req, res))
app.patch('/api/services/:typeId/:id/unarchive', (req : any, res : any) => serviceController.changeIsActive(true,req, res))
app.put('/api/services/:typeId/:id', (req : any, res : any) => serviceController.changeServiceInfo(req, res))
app.post('/api/services/:typeId', (req : any, res : any) => serviceController.AddService(req, res))

app.get('/api/doctors', (req : any, res : any) => doctorController.GetAllDoctors(req, res))
app.get('/api/doctors/times', (req : any, res : any) => doctorController.GetAllDoctorsWithTime(req, res))
app.patch('/api/doctors/times/:id', (req : any, res : any) => doctorController.SetDoctorTime(req, res))
app.get('/api/doctors/times/:id', (req : any, res : any) => doctorController.GetDoctorHours(req, res))
app.get('/api/doctors/appointments/current/:userId', (req : any, res : any) => doctorController.GetCurrentAppointment(req, res))
app.get('/api/doctors/appointments/:userId', (req : any, res : any) => doctorController.GetDoctorsAppointments(req, res))

app.post('/api/bookings/procedure/client', (req : any, res : any) => bookingController.BookProcedureClient(req, res))
app.post('/api/bookings/procedure', (req : any, res : any) => bookingController.BookProcedure(req, res))
app.get('/api/bookings/future', (req : any, res : any) => bookingController.GetFutureBookings(req, res))
app.get('/api/bookings/:id', (req : any, res : any) => bookingController.GetClientBookings(req, res))
app.delete('/api/bookings/:bookingId', (req : any, res : any) => bookingController.DeleteBookings(req, res))
app.post('/api/bookings/client', (req : any, res : any) => bookingController.BookAppointmentClient(req, res))
app.post('/api/bookings/', (req : any, res : any) => bookingController.BookAppointment(req, res))

app.get('/*', (req : any, res : any) => {
    res.sendFile(path.join(__dirname, 'build_client', 'index.html'))
})

app.listen(port, () => {
    console.log(`Server working on http://localhost:${port}`)
})