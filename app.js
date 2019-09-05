const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const userController = require('./controllers/userController.js');
const cardController = require('./controllers/cardController.js');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

//start controllers
userController(app);
cardController(app);



app.listen('5001', () =>{
 console.log('Server started on port 5001');
});