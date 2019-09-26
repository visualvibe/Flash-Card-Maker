const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const userController = require('./controllers/userController.js');
const cardController = require('./controllers/cardController.js');

const app = express();
app.use(morgan("tiny")); // logging framework

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));


//start controllers
userController(app);
cardController(app);


// Express will serve up production assets
app.use('/', express.static(__dirname + '/client/build', { redirect: false }))

  // Express will serve up the front-end index.html file if it doesn't recognize the route
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname + '/build/index.html'))
  );


  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS")
    res.header("Access-Control-Allow-Credentials", true)
    next()
  })


app.listen('5001', () =>{
 console.log('Server started on port 5001');
});