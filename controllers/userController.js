/*
const mysql = require('mysql');

require('dotenv').config();

const db = mysql.createConnection({
 host : process.env.DB_HOST,
 user : process.env.DB_USER,
 password : process.env.DB_PASS,
 database : process.env.DB_NAME
});

//Connects to Mysql
db.connect((err) =>{
 if(err) throw err;
 console.log("MySQL connected...");
})
*/

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const User = require("../models/User");
process.env.SECRET_KEY = 'secret';

module.exports = function(app){

 //Post function to register user
 app.post('/register', (req,res) =>{
  
  //Stores request body into userData
  const userData = {
   username: req.body.username,
   first_name: req.body.firstname,
   email: req.body.email,
   password: req.body.password
  }

  User.findOne({
   where: {
    email: req.body.email
   }
  }).then(user=>{
   if(!user){
    bcrypt.hash(req.body.password, 10, (err, hash) =>{
     userData.password = hash; //Stores password as a hashed string
     //Insert into DB with userData
     User.create(userData)
     .then(user =>{
      res.json({
        msg: 'Successfully registered'
      })
     })
     .catch(err => {
      res.send('error: ' + err )
     })
    })
   }else{
    res.json({error: "User already exists"})
   }
  })
 });

 //Post function to login a user
 app.post('/login', (req, res) =>{

  User.findOne({
   where: {
    username: req.body.username
   }
  }).then(user =>{
   if(user){
    if(bcrypt.compareSync(req.body.password, user.password)){
     var token = jwt.sign(user.dataValues, 'secret', { expiresIn: '2h' } );
     res.send(token);
    }
   }else{
    res.json({
     msg: 'Error! Username does not exist...'
    })
   }
  }).catch(err =>{
   res.send('error');
  })

 })

/*
 //Post method for registering a user
 app.post('/register', (req,res) =>{
  //Attaches req.body to variables
  var username = req.body.username;
  var firstname = req.body.firstname;
  var email = req.body.email;
  var password = req.body.password;

  var userData = [
   [username, firstname, email, password]
  ]

  //Query to insert into DB
  let sql = "INSERT INTO user (username, first_name, email, password) VALUES ?";
  db.query(sql, [userData], (err, data) =>{
   if(err){
      //Handles duplicate error 
      if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062){
       res.json({
        msg: 'Username or Email already in use!'
       });
      }
       else{
        res.json({
         msg: 'Error'
        });
       }
      }else{
       res.json({
        msg: 'Successfully registered'
       });
      }
  });

 });
 */


}