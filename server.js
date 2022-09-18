
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();


const gameController = require('./controllers/games.js');

const methodOverride = require('method-override');

app.use(methodOverride('_method'));

mongoose.connect(process.env.DATABASE_URL)


app.use(express.urlencoded({ extended: false }));

app.use('/games', gameController);






app.get('/', (req, res) => {
    res.render('index.ejs');
});



const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));




app.listen(3000, () => {
    console.log('listening....');
});