var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var previewSchema = new Schema({
    webiteType:{
        type:String,
        required:true
    },
    websiteName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        match:'^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$'
    },
    logo:{
        type:String
    },
    adminId:{
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
    images:[{
      type:String  
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date
    }
})

module.exports = mongoose.model('preview',previewSchema);