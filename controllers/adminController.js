const bcrypt = require('bcryptjs')
var admin = require('../models/admin');
var jwt = require('../auth/adminToken');
var pre = require('../models/preview');
const user = require('../models/user')

function Login(body,res){
    var e = body.email;
    admin.findOne({email:e},(err, result)=>{
        if(err)
            throw err;
        else{
            if(result==null){
                res.json({Message:'EMAIL NOT FOUND'});
           }
         else{
             result = result.toObject();
             bcrypt.compare(body.password , result.password, function(err, data) {
                 if (err) {
                   throw err
                 } else if (!data) {
                   res.json({Message:"Password doesn't match!"});
                 } else {
                     jwt.CreateToken(result,res);
                     console.log("Password matches! YOU ARE LOGED IN ..")
                 } 
               })
         }
        }
    })
}

function Signup(res){
    body={firstName:'AMREEN',lastName1:'KAUR',email:'AMY@GMAIL.COM',
        password:'AMY123',mobileNo:9876543210
 }

    const saltRounds = 10
    bcrypt.genSalt(saltRounds,(err,salt)=>{
        if(err)
            throw err
        else{
            bcrypt.hash(body.password,salt,(err,hash)=>{
                if(err)
                    throw err
                else{
                    body.password=hash;
                    var obj=new admin(body);
                    obj.save(function (err, result) {
                        if (err) 
                            res.json({err})
                        else
                        res.json({Message:"DONE .."});
                    });
                }
            })
        }
    })
}

// THIS IS FOR CREATING PREVIEW //
function preview(body,res){
    // var path=body.file.path
     console.log('p--------',body)
    var obj={
        previewType:body.previewType,
        previewName:body.previewName,
        email:body.email,
        logo:body.file.path,
        adminID:body.adminID,
        domainName:body.domainName,
        phoneNo:body.phoneNo,
        workingHour:body.workingHour
    }
    var object=new pre(obj);
    object.save(function (err, result) {
        if (err) 
            res.send({err});
        else
            res.json({Message:'PREVIEW DONE'});
    });
}

//--- TO GET ALL USERS ---//
function allusers(body,res){
    console.log('req-----',body.adminID)
    
    admin.findOne({_id:body.adminID},(err,result)=>{
        console.log('res----',result)
        if(err)
            res.json("err")
        else{
            if(result==null)
                res.json({Message:'NOT THE ADMIN'})
                else{
                    //res.json({result})
                    user.find({},(err, data)=>{
                        if(err)
                            res.json({err})
                        else{
                            
                            res.json({data})
                        }
                    })
                }
        }
    })
}

module.exports = {
    Login,Signup,preview,allusers
}