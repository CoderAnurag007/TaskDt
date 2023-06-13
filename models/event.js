const mongoose = require ("mongoose");
const eventSchema = new mongoose.Schema({
     type:{type:String}, 
     uid:{type:String}, 
     name:{type:String}, 
     tagline:{type:String}, 
     schedule:{type:Date, 
                 default : Date.now() }, 
     description :{type:String}, 
     file:{type:String}, 
     moderator:{type:String}, 
     sub_category:{type:String}, 
     rigor_rank:{type:Number},
     attendees:[
         {user:{type:String}}
     ]
}) 

module.exports = events = mongoose.model("event" , eventSchema); 