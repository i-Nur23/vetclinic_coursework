const express = require('express');
const mongoose = require('mongoose');


const app = express()
const port = 3000

var mongoDB = 'mongodb://127.0.0.1/veterenary_clinic';
mongoose.connect(mongoDB);
// Позволим Mongoose использовать глобальную библиотеку промисов
mongoose.Promise = global.Promise;
// Получение подключения по умолчанию
var db = mongoose.connection;


// Привязать подключение к событию ошибки  (получать сообщения об ошибках подключения)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



app.get('/', (req : any, res : any) => {
    res.send('Hello Word!')
})

app.listen(port, () => {
    console.log(`Server working on http://localhost:${port}`)
})