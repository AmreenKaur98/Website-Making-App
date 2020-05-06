var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        required:true,
        unique:true
    },
    author:{
        type:String,
        default:'ADMIN',
        enum:['USER','ADMIN']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date
    }
});

module.exports = mongoose.model('admin',adminSchema);