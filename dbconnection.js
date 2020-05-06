var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/royoApp';

mongoose.connect(mongoDB,{ useNewUrlParser: true ,useUnifiedTopology: true,useFindAndModify:false},function(err){
    if(err)
        throw err;
    else
        console.log('CONNECTED');
});