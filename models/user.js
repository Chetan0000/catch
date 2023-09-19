const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    }

},{
    timestamps:true
});



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,"./uploads/avatars");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, "user-profile-"+file.originalname+ '-' + Date.now());
    }
    
})



// static 

userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');


const user = mongoose.model('user', userSchema);

module.exports = user;
