import {ClientRepository} from "./repositories/ClientRepository";
import {AccountRepository} from "./repositories/AccountRepository";

import {ClientService} from "./services/ClientService";
import {AccountService} from "./services/AccountService";

import {ClientController} from "./controllers/ClientController";
import {AccountController} from "./controllers/AccountController";

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')


const app = express()
const port = 3000

var mongoDB = 'mongodb://127.0.0.1/veterenary_clinic';

var clientRepo = new ClientRepository(mongoDB);
var accountRepo = new AccountRepository(mongoDB);

var clientService = new ClientService(clientRepo);
var accountService = new AccountService(accountRepo);

var clientController = new ClientController(clientService);
var accountController = new AccountController(accountService);

app.use(cors())


app.get('/', (req : any, res : any) => clientController.get(req, res))
app.get('/account', (req : any, res : any) => accountController.find(req, res))

app.listen(port, () => {
    console.log(`Server working on http://localhost:${port}`)
})