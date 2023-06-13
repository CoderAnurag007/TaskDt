const dotenv = require('dotenv')
dotenv.config()
const multer = require("multer")
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage 



const url = process.env.MONGOURL ;

const storage = new GridFsStorage({
    url:url ,   
    options:{useUnifiedTopology:true , useNewUrlParser:true }, 
    file:(req, file )=>{ 

        const  match = ["image/png" , "image/jpeg" ,"image/jpg" ,"application/pdf"]; 
         
        if(match.indexOf(file.mimetype)=== -1 ){ 

           
            return `${Date.now()}-file-${file.originalname}`
        }
      
        return {
            //  bucketName : "photos", 
             filename : `${Date.now()}-file-${file.originalname}`
 
        }
    }

})

module.exports= multer({storage})