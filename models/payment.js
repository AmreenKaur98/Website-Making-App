var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = new Schema({
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
    mobileNo:{
        type:String,
        required:true,
        unique:true
    },
    mode:{
        type:String,
        enum:['ONLINE','OFFLINE']
    },
    paymentAmt:{
        type:Number,
        required:true
    },
    paymentDone:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('admin',adminSchema);