const mongoose = require("mongoose"); 

const mongoconnection = mongoose.connect(db).then(()=>{console.log("database is connected ")})