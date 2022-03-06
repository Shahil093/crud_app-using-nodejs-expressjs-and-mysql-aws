const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const mysql = require('mysql'); 
const Connection = require('mysql/lib/Connection');
const res = require('express/lib/response');
const { info } = require('console');
const app = express();
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'SampleDB'
});

connection.connect(function(error) {
    if(!!error) console.log(error);
    else console.log('Database Connected!');

});
//set views
app.set('views',path.join(__dirname,'views'));

//set views file
app.set('view engine','ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false}));

//Define index path /route
app.get('/',(req,res)=>{
   // res.send('CRUD operation using Node/Mysql/Express')
   let sql = "SELECT * FROM user";
   let query = connection.query(sql,(err,rows) =>{
       if(err) throw err;
   res.render('user_index',{
       title : 'CRUD operation using Node/Mysql/Express',
       user : rows
   });
});
    });

    //Add user

app.get('/add',(req,res)=>{
    res.render('user_add',{
        title : 'CRUD operation using Node/Mysql/Express'
    });

});
app.post('/save',(req, res) =>{
     let data = {id: req.body.id, name: req.body.name, age: req.body.age, department: req.body.department};
    let sql = "INSERT INTO user SET ?";
     let query = connection.query(sql,data,(err, results) =>{
        if(err) throw err;
       res.redirect('/');
   });
 });

app.get('/edit/:userID',(req,res) =>{
    const userID = req.params.userID;
    let sql = 'Select * from user Where id = ${userID}';
    let query = connection.query(sql,(err, result) =>{
        if(err) throw err;
        res.render('user_edit', {
            title : 'CRUD operation using Node/Mysql/Express',
            user : result[0]
        });
    });
});

app.post('/update',(req, res) =>{
     const userID = req.body.id;
    let sql = "update user SET name='"+req.body.name+"', age ='"+req.body.age+"', department = '"+req.body.department+"' Where id = "+userID;
    let query = connection.query(sql,(err, results) =>{
       if(err) throw err;
      res.redirect('/');
  });
});

app.get('/delete/:userID',(req,res) =>{
    const userID = req.params.userID;
    let sql = 'DELETE * FROM user WHERE id = ${userID}';
    let query = connection.query(sql,(err, result) =>{
        if(err) throw err;
       res.redirect('/');
    });
});


//server listening
app.listen(3000, ()=>{
    console.log('Server is running at port number : 3000')});

