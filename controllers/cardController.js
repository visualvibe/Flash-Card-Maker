const mysql = require('mysql')

require('dotenv').config()

//Creates MySql Connection
const db = mysql.createPool({
 connectionLimit : 100,
 host : process.env.DB_HOST,
 user : process.env.DB_USER,
 password : process.env.DB_PASS,
 database : process.env.DB_NAME
})

//Connects to Mysql

module.exports = function(app){
 app.post('/api/addcard', (req, res) =>{
  var newCard = [
   [req.body.title,
   req.body.subject,
   req.body.user_id]
  ]

  //Query card to insert into DB
  let sql = "INSERT INTO cardset (title, subject, user_id) VALUES ?"
  db.query(sql, [newCard], (err, data) =>{
   if(err){
      //Handles duplicate error 
      if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062){
       res.json({
        msg: 'Duplicate card!'
       })
      }
       else{
        res.json({
         msg: err
        })
       }
      }else{
       res.json(data)
      }
   })
  })

 //Method to edit flashcard title
 app.post('/api/edittitle', (req, res) =>{
  var newTitle = [req.body.title, req.body.set_id]
  
  //Query to delete card
  let sql = "UPDATE cardset SET cardset.title = ? WHERE cardset.set_id = ?"
  db.query(sql, newTitle, (err, data) =>{
   if(err) throw err
   res.json({
    msg: 'Success'
   })
  })
 })

 //Method to edit flashcard subject
 app.post('/api/editsubject', (req, res) =>{
  var newSubject = [req.body.subject, req.body.set_id]
  
  //Query to delete card
  let sql = "UPDATE cardset SET cardset.subject = ? WHERE cardset.set_id = ?"
  db.query(sql, newSubject, (err, data) =>{
   if(err) throw err
   res.json({
    msg: 'Success'
   })
  })
 })
 //Remove card method
 app.post('/api/removecard', (req, res) =>{
  var set_id = req.body.set_id
  
  //Query to delete card
  let sql = "DELETE FROM cardset WHERE cardset.set_id = ?"
  db.query(sql, set_id, (err, data) =>{
   if(err) throw err
   res.json({
    msg: 'Success'
   })
  })
 })

 //Add question to specific card
 app.post('/api/addquestion', (req, res) =>{
  var newQuestion = [
   [req.body.q_value,
   req.body.q_answer,
   req.body.set_id]
  ]

  //Query card to insert into DB
  let sql = "INSERT INTO question (q_value, q_answer, set_id) VALUES ?"
  db.query(sql, [newQuestion], (err, data) =>{
   if(err){
      //Handles duplicate error 
      if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062){
       res.json({
        msg: 'Duplicate question!'
       })
      }
       else{
        res.json({
         msg: err
        })
       }
      }else{
       res.json(data)
      }
  })
 })

  //Edit answer method
  app.post('/api/editanswer', (req, res) =>{
   var newAnswer = [req.body.q_answer, req.body.q_id]
   
   //Query to delete card
   let sql = "UPDATE question SET question.q_answer = ? WHERE question.q_id = ?"
   db.query(sql, newAnswer, (err, data) =>{
    if(err) throw err
    res.json({
     msg: 'Success'
    })
   })
  })

   //Edit question method
   app.post('/api/editquestion', (req, res) =>{
    var newQuestion = [req.body.q_value, req.body.q_id]
    
    //Query to delete card
    let sql = "UPDATE question SET question.q_value = ? WHERE question.q_id = ?"
    db.query(sql, newQuestion, (err, data) =>{
     if(err) throw err
     res.json({
      msg: 'Success'
     })
    })
   })

 //Remove question method
 app.post('/api/removequestion', (req, res) =>{
  var q_id = req.body.q_id
  
  //Query to delete card
  let sql = "DELETE FROM question WHERE question.q_id = ?"
  db.query(sql, q_id, (err, data) =>{
   if(err) throw err
   res.json({
    msg: 'Success'
   })
  })
 })

 //Post to view all card sets belonging to specific user
 app.post('/api/cards', (req, res) =>{

   var user_id = req.body.user_id

  let sql = "SELECT c.*, count(q.set_id) as numQuestions FROM cardset c left join question q on c.set_id = q.set_id WHERE c.user_id = ? group by c.title ORDER BY c.date_created desc"
  db.query(sql, user_id, (err, data) =>{
   if(err) throw err
   res.json(data)
  })

 })

  //Post to view get specific card info
  app.post('/api/cards/info', (req, res) =>{
   var set_id = req.body.set_id
 
   let sql = "SELECT * FROM cardset WHERE cardset.set_id = ?"
   db.query(sql, set_id, (err, data) =>{
    if(err) throw err
    res.json(data[0])
   })
 
  })

 //Post to view questions to specific cards
 app.post('/api/cards/questions', (req, res) =>{
  var set_id = [req.body.set_id, req.body.set_id]
  
  let sql = "SELECT * FROM question INNER JOIN cardset ON cardset.set_id = ? WHERE question.set_id = ? "
  db.query(sql, set_id, (err, data) =>{
   if(err) throw err
   res.json(data)
  })

 })
  //Post to toggle the isFavorite field of cardset table
   app.post('/api/cards/favorite', (req, res) =>{
      var set_id = req.body.set_id

      let sql = "UPDATE cardset SET isFavorite = !isFavorite WHERE cardset.set_id = ?"
      db.query(sql, set_id, (err, data) =>{
         if(err) throw err
         res.json(data)
      })
   })

   //Post to order cardset table by Favorite
   app.post('/api/cards/orderbyfavorite', (req, res) =>{
      var set_id = req.body.user_id

      let sql = "SELECT c.*, count(q.set_id) as numQuestions FROM cardset c left join question q on c.set_id = q.set_id WHERE c.user_id = ? group by c.title ORDER BY c.isFavorite desc"
      db.query(sql, set_id, (err, data) =>{
         if(err) throw err
         res.json(data)
      })
   })


   //Post to order cardset table by newest
   app.post('/api/cards/orderbyoldest', (req, res) =>{
      var set_id = req.body.user_id

      let sql = "SELECT c.*, count(q.set_id) as numQuestions FROM cardset c left join question q on c.set_id = q.set_id WHERE c.user_id = ? group by c.title ORDER BY c.date_created asc"
      db.query(sql, set_id, (err, data) =>{
         if(err) throw err
         res.json(data)
      })
   })
}