const mongoose = require("mongoose")
const {Router}= require ("express")
const express = require ("express")
const { v4: uuidv4 } = require('uuid');
const  dotenv = require('dotenv')
dotenv.config()
const events = require("./router/event.js")


const app = express() ; 
 const db=  require("./config/keys.js")

mongoose.connect(process.env.mongoURL , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{console.log("database connected ")})
.catch((err)=>{console.log(err.message , "error message ")})


app.use(express.json());

var cors = require("cors"); 
app.use(cors()); 

app.use("/api/v3/app", events)

const port = process.env.PORT || 5000 ; 
app.listen(port , ()=>{
     console.log(`server is running on port ${port}`)
})