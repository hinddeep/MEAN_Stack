const express = require('express');
const cors = require('cors');
const app = express();
var crudi = require('./insert.js');
var crudd = require('./delete');
var crudu = require('./update');
var mongojs = require('mongojs');
var dburl = "student";
var collections = ["stud","details"];
var i = 0;

var db = mongojs(dburl,collections);

db.on('connect',function()
{
    console.log('db connected!');
});

db.on('error',function(err)
{
    console.log('DB not connected.');
});

const port = 5000;

app.use(cors({origin:'http://localhost:4200'}));
app.use(express.json());

app.listen(port, ()=>{
    console.log("Server started on port " + port);
                    }
    );

app.post('/addForm',function(req, res)
    {
        console.log( req.body.fname); //req.query.fname in case of GET request
        console.log( req.body.lname);
        var lname = req.body.lname;
        var fname = req.body.fname;  
        crudi.insert(res,db,++i,fname,lname);          
    });

app.get('/read',function(req, res)
{
    db.stud.find({}, function(error, students){
        if(error || !students)
        {
            console.log("No students found...");
        }
        else
        {
            res.json(students);
        }  
    });
});

app.post('/update',function(req,res)
{
    crudu.update(res,db,parseInt(req.body.id),req.body.fname,req.body.lname);   
});

app.post('/delete',function(req,res)
{    
    crudd.del(db,parseInt(req.body.id),res);        
});

app.post('/login', function(req,res)
{  
    db.details.find({"email":req.body.usr},function(error, user){
            if(error || !user)
            {
                console.log('error');
                res.json({'ok':'error'});
            }
            else if(user.length > 0)
            {                  
               user.forEach(element => {
                if(req.body.pwd == element["password"])
                {
                    console.log('match');
                    res.json({'ok':'match'});
                }
                else
                {
                    console.log('noMatch');
                    res.json({'ok':'noMatch'});
                }
               });                
            } 
            else
            {
                console.log('userNotFound');
                res.json({'ok':'userNotFound'});
            }            
    });
});

app.post('/register',function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    var age = req.body.age;
    var subjects = req.body.subjects;
    var gender = req.body.gender;
    console.log('in register');
    db.details.insert({"email":email, "password":password, "age":age, "subjects":subjects, "gender":gender},function(error, user){
        if( error || !user )
        { 
        console.log("Record not saved");
        res.json({"ok":0});
        res.end();	 				
        }
        else {
        console.log("Inserted Successfully!"); 
        res.json({"ok":1});	
        res.end();
        }
    });
});