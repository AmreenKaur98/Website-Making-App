var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
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
        default:'USER',
        enum:['USER','ADMIN']
    },
    status:{
        type:String,
        enum:['ACTIVE','BLOCKED','DELETED'],
        default:'ACTIVE'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date
    }
});

module.exports = mongoose.model('user',userSchema);