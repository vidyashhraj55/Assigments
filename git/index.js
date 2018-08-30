const express= require("express");
const app=express();
const mongoose=require("mongoose");
require('dotenv').config()
app.use(express.json());
mongoose.connect(process.env.DB_URL,{useNewUrlParser: true},(err)=>{
    if(err)
     console.log("error");
    else
    console.log("success");
});
const user=require('./routers/router');
app.use('/user',user);

app.get('/',(req,res)=>{
    res.send("WELCOME TO NODE");

})
PORT=process.env.PORT;
app.listen(PORT,()=>console.log(`AT ${PORT} port is running`));