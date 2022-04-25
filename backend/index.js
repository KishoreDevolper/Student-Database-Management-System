const express = require("express");
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2')
const app = express();
const bcrypt=require('bcrypt');

app.use(cors());

app.use(bodyparser.json());

//database connection

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"student_details",
    port:3306
})

//check database connection

db.connect(err=>{
    if(err) {console.log('err');}
    console.log('database connected...');
})
//StaffLoginIDCreation
app.post('/idcreation',(req,res)=>{
    let email_id = req.body.email_id;
  let password=bcrypt.hash(req.body.password,10);
  let gr =`insert into staff_details(email_id,password)values('${email_id}','${password}')`;

  db.query(gr,(err,results)=>{
      if(err){console.log(err);}
      console.log(results,"results")
      res.send({
          message:" staff id data inserted "
      })
  })
})



//selectdepartmentdata
app.get('/department',(req,res)=>{
    let dr=`SELECT department FROM student_details.department_details`
    console.log(dr)
    db.query(dr,(err,results)=>{
        if(err)
        {
            console.log(err,'err')
        }
        if(results.length>0){
        res.send({
            message:`all department details`,
            data:results
        })
        }
    })
})

app.get('/subject',(req,res)=>{
    let dr=`SELECT subject_name FROM student_details.subject_details`
    console.log(dr)
    db.query(dr,(err,results)=>{
        if(err)
        {
            console.log(err,'err')
        }
        if(results.length>0){
        res.send({
            message:`all Subject details`,
            data:results
        })
        }
    })
})
app.get('/student',(req,res)=>{
    let qr = `select * from student_table`

    db.query(qr,(err,results)=>{
        if(err)
        {
            console.log(err,'errs')
        }
        if(results.length>0)
        {
            res.send({
                message:`all user data`,
                data:results
            });
        }
    })
})
app.get('/staff',(req,res)=>{
    console.log("params", req.query)
    let gID = req.query.id;
    let gDOB = req.query.dob;
    console.log("gDOB", gDOB)
    let gr = `select * from staff_details where email_id = "${gID}" and password ="${gDOB}"`;
    console.log(gr)
    db.query(gr,(err,results)=>{
        if(err){
            console.log(err);
            res.send({
                message:" not found",
                
            })
        
        }
        else{
            res.send({
                message:"single data",
                data:results
            })
        }
             })
})
app.get('/student/:id',(req,res)=>{
    let gID = req.params.id;
    let gr = `select * from student_table where id = ${gID}`;
    
    db.query(gr,(err,results)=>{
        if(err){console.log(err);}
        if(results.length>0)
        {
            res.send({
                message:"get single data",
                data:results
            });
        }
        else
        {
            res.send({
                message:"data not found"
            })
        }
    })
})
app.get('/studentLoginspecific',(req,res)=>{
    console.log("params", req.query)
    let gID = req.query.id;
    let gDOB = req.query.dob;
    console.log("gDOB", gDOB)
    let gID1 = req.params.id;
    let gr = `select * from student_table where roll_number = "${gID}" and date_of_birth="${gDOB}"`;
    console.log(gr)
    db.query(gr,(err,results)=>{
     let errormessage ="data not found"
        if(results.length>0){
            res.send({
                message:`login user data`,
                data:results
            });
          
        }
        else{
            res.send({
                abc:errormessage   
            })
          
        }
             })
})
app.get('/mark/:id',(req,res)=>{
    let gID = req.params.id;
    console.log(gID)
    let gr =`select * from student_mark_details where student_id = "${gID}"`
    console.log(gr)
    db.query(gr,(err,results)=>{
        if(err){console.log(err);}
        if(results.length>0)
          {
            res.send({
                message:"get single data",
                data:results
            });
        }
        else
        {
            res.send({
                message:"data not found"
            })
        }
    })
})
app.get('/student/:id',(req,res)=>{
    let gID = req.params.id;
    let gr = `select * from student_table where id = ${gID}`;
    
    db.query(gr,(err,results)=>{
        if(err){console.log(err);}
        if(results.length>0)
        {
            res.send({
                message:"get single data",
                data:results
            });
        }
        else
        {
            res.send({
                message:"data not found"
            })
        }
    })
})
//createmarkdataapp.post('/student',(req,res)=>{
    app.post('/marksubmit',(req,res)=>{
    console.log(req.body,'createdata');
    let student_id = req.body.student_id;
    let mark = req.body.mark;
    let percentage= req.body.percentage;
   
    
    let is_passed = req.body.is_passed;
    let subject_name = req.body.subject_name;
   

    let gr = `insert into student_mark_details(student_id,mark,percentage,is_passed,subject_name)
              values('${student_id}','${mark}','${percentage}','${is_passed}','${subject_name}')`;
     
              db.query(gr,(err,results)=>{
                  if(err){console.log(err);}
                  console.log(results,"results")
                  res.send({
                      message:'data inserted',
                  })
   
              });
})




//createstudentdata
app.post('/student',(req,res)=>{
    console.log(req.body,'createdata');

    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let date_of_birth= req.body.date_of_birth;
    let email_id = req.body.email_id;
    let mobile_number = req.body.mobile_number;
    let roll_number = req.body.roll_number;
    let department = req.body.department;
    let year = req.body.year;

    let gr = `insert into student_table(first_name,last_name,date_of_birth,email_id,mobile_number,roll_number,department,year)
              values('${first_name}','${last_name}','${date_of_birth}','${email_id}','${mobile_number}','${roll_number}','${department}','${year}')`;
     
              db.query(gr,(err,results)=>{
                  if(err){console.log(err);}
                  console.log(results,"results")
                  res.send({
                      message:'data inserted',
                  })
   
              });
})

app.delete('/student/:id',(req,res)=>{
    let qID = req.params.id;
    let qr = `delete  from student_table where id ='${qID}'`;
    db.query(qr,(err,results)=>{
        if(err){console.log(err);}
            res.send({
                message:"data deleted",
            });
        
        
    })
});


app.put('/student/:id',(req,res)=>{
    console.log(req.body,'updatedata');
    let gID = req.params.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let date_of_birth= req.body.date_of_birth;
    let email_id = req.body.email_id;
    let mobile_number = req.body.mobile_number;
    let roll_number = req.body.roll_number;
    let department = req.body.department;
    let year = req.body.year;
let gr = `update student_table set first_name = '${first_name}', last_name='${last_name}',date_of_birth='${date_of_birth}',email_id='${email_id}',mobile_number='${mobile_number}',roll_number='${roll_number}',department='${department}',year='${year}' where id = ${gID}`;

db.query(gr,(err,results)=>{
    if(err){console.log(err);}
    res.send({
        message:'data updated'
    });
  });
});
app.listen(3000,()=>{
    console.log('server running..');
    
})
