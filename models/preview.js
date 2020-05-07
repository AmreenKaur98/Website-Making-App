var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var previewSchema = new Schema({
    previewType:{
        type:String,
        required:true
    },
    previewName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    logo:{
        type:String
    },
    adminID:{
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

module.exports = mongoose.model('preview',previewSchema);