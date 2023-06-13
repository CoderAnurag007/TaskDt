const express = require("express")
const mongoose = require('mongoose');
const Event = require("../models/event.js")
const { v4: uuidv4 } = require('uuid');
const router = express.Router()
const grid = require('gridfs-stream')

const uploadFile = require('../utils/uploadFile.js')

//seting up the gridfs connection to mongo 
const conn = mongoose.connection;
let gfs, gridfsbuket;
conn.once('open', () => {
  gridfsbuket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs"
  })
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection('fs')
})






// @ post :  http://localhost:5000/api/v3/app/events
// @acess : public 
// @discription : adding an event with file 

router.post("/events", uploadFile.single('file'), async (req, res) => {
  try {
    
    const { type, name, tagline, schedule, description, moderator
      , category, sub_category, rigor_rank, attendees } = req.body
    const uid = uuidv4();
     var file ; 
     if(req.file){ file= req.file.filename }
    
    const data = {
      type, uid, name, tagline, schedule, description, file, moderator
      , category, sub_category, rigor_rank, attendees
    }

    const event = new Event(data)
    const saveddata = await event.save()
    return res.json(saveddata)
  } catch (err) {
    console.log(err.message)
    return res.json({ msg: err.message })
  }
})


// @ get :  http://localhost:5000/api/v3/app/events?id=event_id
// or get : http://localhost:5000/api/v3/app/events?type=latest&limit=4&page=1
// @acess : public 
// @discription : get an event from event id as query 
router.get("/events", async (req, res) => {
  try {
    var page = req.query.page;


    if (req.query.id) {
      const event_id = req.query.id
      const event = await Event.find({ _id: event_id })
      if (!event) { return res.status(404).json({ msg: " event not found " }) }
      return res.status(200).json(event)
    }
    if (req.query.type) {
      let limit = req.query.limit
      let skip = (page - 1) * limit

      let event = await Event.find({ type: req.query.type }).skip(skip).limit(limit)
      return res.status(200).json(event)
    }


  } catch (err) {

    return res.json({ error: err.message })
  }

})



// @ put :  http://localhost:5000/api/v3/app/events:id
// @acess : public 
// @discription : update an event from event id as query 

router.put('/events/:id', async (req, res) => {
  try {
    const { type, name, tagline, schedule, description, files, moderator
      , category, sub_category, rigor_rank, attendees } = req.body
    const event = await Event.findByIdAndUpdate(req.params.id,
      {
        type, name, tagline, schedule, description, files, moderator
        , category, sub_category, rigor_rank, attendees
      }, { new: true })

    const newdata = await event.save();

    return res.status(200).json(newdata)


  } catch (err) {
    return res.status(400).json({ msg: err.message })
  }
})


// @ delete :  http://localhost:5000/api/v3/app/events:id
// @acess : public 
// @discription :delete an event from event id as query 
router.delete('/events/:id', async (req, res) => {
  try {
    
    const event = await Event.findByIdAndDelete(req.params.id)
    if (!event) { return res.status(404).json({ msg: "event not found " }) }
    ;
    return res.status(200).json({ msg: "data deleted ", event })
  } catch (err) {
    return res.status(400).json({ msg: err.message })
  }



})



// @ get : http://localhost:5000/api/v3/app/getfile/1686637656518-file-334.PNG
// @acess : public 
// @discription :to get images/file 

router.get("/getfile/:filename", async(req, res)=>{ 
  try{ 
    const file = await gfs.files.findOne({filename:req.params.filename}); 
 
    const readStream = gridfsbuket.openDownloadStream(file._id); 
    readStream.pipe(res);  

  }catch(err){ 
    res.status(400).json(err)
   console.log(err) ; 


  }
})  



module.exports = router;
