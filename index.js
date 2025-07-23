const express = require("express");
const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require('method-override');
require("dotenv").config();


const path= require("path");

const port = process.env.PORT || 3000;

const app= express();

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});


function getRandomUser() {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
}

// let data=[];
// for(let i=0; i<100; i++){
//     data.push(getRandomUser());
// }

// let q=`INSERT INTO user(id,username,email,password) VALUES ?`
// try{
//     connection.query(q,[data],(err,result)=>{
//     if(err) throw err;
//     console.log(result);
// });
// }catch(err){
//     console.loglog(err);
// }

app.get("/",(req,res)=>{
  let q=`SELECT COUNT(*) from user`;
  try{
      connection.query(q,(err,result)=>{
      if(err) throw err;
      let count=result[0]['COUNT(*)'];
      res.render("index.ejs", {count});
      
  });
  }catch(err){
      console.log(err);
      res.send("some error occured!")
  }
});

app.get("/user",(req,res)=>{
  let q=`SELECT * from user`;
  try{
      connection.query(q,(err,result)=>{
      if(err) throw err;
      res.render("users.ejs", {result});
      
  });
  }catch(err){
      console.log(err);
      res.send("some error occured!")
  }
});

app.get("/user/:id/edit", (req,res)=>{
  let id=req.params.id;
  let q=`SELECT * FROM user WHERE id='${id}'`
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      let data=result[0];
      console.log(data);
      res.render("editUser.ejs",{data});
    })
  } catch(e){
      console.log(e);
    }
});

app.patch("/user/:id",(req,res)=>{
  let id=req.params.id;
  let q=`SELECT * FROM user WHERE id='${id}'`;
  let{username,email,password}=req.body;
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      let data=result[0];
      if(data.password==password){
        q2=`UPDATE user set username=?, email=? WHERE id=?`;
        connection.query(q2,[username,email,id],(err,updateResult)=>{
          if(err) throw err;
          res.redirect("/user");
        })
      } else{
        res.send("Wrong password..retry again!");
      }
    })
  } catch(e){
      console.log(e);
    }
});

app.get("/user/new", (req,res)=>{
  res.render("newUser.ejs");
})

app.post("/user",(req,res)=>{
  let{newUsername, newEmail, password, confirmPassword}=req.body;
  let id=uuidv4();
  if(password==confirmPassword){
    try{
      let q3=`INSERT INTO user VALUES('${id}','${newUsername}','${newEmail}','${confirmPassword}')`;
      connection.query(q3,(err,result)=>{
        res.redirect("/user");
      })
    }catch(err){
      console.log(err);
    }
  }else{
     res.send("The entered password and confirm password should match!");
  }
});


app.get("/user/:id/delete",(req,res)=>{
  let id=req.params.id;
  res.render("deletePage.ejs",{id});
})

app.delete("/user/:id",(req,res)=>{
  let id= req.params.id;
  let {password}=req.body;
  
  let q4=`SELECT * FROM user WHERE  id='${id}'`;
  try{
    connection.query(q4,(err,result)=>{
      let data=result[0];
      if(data.password==password){
        let q5=`DELETE FROM user WHERE id='${id}'`;
        connection.query(q5,(err,result)=>{
          res.redirect("/user");
        })
      } else{
        res.send("Enter the password correctlt!");
      }
    })
  }catch(err){
    console.log(err);
  }
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});


