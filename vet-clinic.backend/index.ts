import {ClientRepositry} from "./repositories/ClientRepository";
import {ClientService} from "./services/ClientService";
import {ClientController} from "./controllers/ClientController";

const express = require('express');
const mongoose = require('mongoose');


const app = express()
const port = 3000

var mongoDB = 'mongodb://127.0.0.1/veterenary_clinic';
/*mongoose.connect(mongoDB);
// Позволим Mongoose использовать глобальную библиотеку промисов
mongoose.Promise = global.Promise;
// Получение подключения по умолчанию
var db = mongoose.connection;
// Привязать подключение к событию ошибки  (получать сообщения об ошибках подключения)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));*/

var clientRepo = new ClientRepositry(mongoDB);

var clientService = new ClientService(clientRepo);

var clientController = new ClientController(clientService);

var arr = async () => {
    var alls = await clientRepo.getAll();
    console.log(alls);
}

arr()




app.get('/', (req : any, res : any) => clientController.get(req, res))

app.listen(port, () => {
    console.log(`Server working on http://localhost:${port}`)
})