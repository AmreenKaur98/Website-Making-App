var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var websiteSchema = new Schema({
    webiteType:{
        type:String,
        required:true
    },
    websiteName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    logo:{
        type:String
    },
    userID:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    domainName:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    workingHour:{
        type:Number
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date
    }
})

module.exports = mongoose.model('website',websiteSchema);