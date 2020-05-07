const bcrypt = require('bcryptjs')
var user = require('../models/user');
var web = require('../models/website');
var pre = require('../models/preview');
var jwt = require('../auth/userToken');

function Signup(body,res){
    console.log('in controller...');
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
                    var obj=new user(body);
                    obj.save(function (err, result) {
                        if (err) 
                            res.send(err);
                        else
                            res.json({Message:'DONE WITH THE SIGNUP....'});
                    });
                }
            })
        }
    })
}
function Login(body,res){
    console.log('IN LOGIN...')
    var e = body.email;
    user.findOne({email:e},(err, result)=>{
        if(err)
            throw err;
        else
            {
                if(result==null){
                       res.json({Message:'EMAIL NOT FOUND'});
                  }
                else{
                    result = result.toObject();
                    bcrypt.compare(body.password , result.password, function(err, data) {
                        if (err) {
                          throw err
                        } else if (!data) {
                          res.send("Password doesn't match!")
                        } else {
                            jwt.CreateToken(result,res);
                            console.log("Password matches! YOU ARE LOGED IN ..")
                        } 
                      })
                }
            }
    })
}

//---THIS IS TO CREATE THW WEBSITE FOR USER ----//
function Website(body,res){
    // var path=body.file.path
    // console.log('p--------',path)
    var obj={
        webiteType:body.webiteType,
        websiteName:body.websiteName,
        email:body.email,
        logo:body.file.path,
        userID:body.userID,
        domainName:body.domainName,
        phoneNo:body.phoneNo,
        workingHour:body.workingHour
    }
    var object=new web(obj);
    object.save(function (err, result) {
        if (err) 
            res.send({err});
        else
            res.json({Message:'WEBSITE DONE'});
    });
}

//---- FOR EDIT THE SITE ----//
function Site(body,res){
    console.log('body-----',body)
    user.find({_id:body.userID},(err,data)=>{
        if(err)
            res.json(err)
        else{
            if(data==null)
                res.json({data:'ID NOT EXISTS'})
            else{
                res.json(data)
            }
        }
    })
}

//--- TO GET ALL PREVIEW --//
function Preview(body,res){
    user.findOne({_id:body.userID},(err,data)=>{
        if(err)
            res.json({err})
        else{
            if(data==null)
                res.json({Message:'Not valid user'})
            else{
                pre.find({},(err,result)=>{
                    if(err)
                        res.json({err})
                    else{
                        if(result==null)
                            res.json({Message:'No preview'})
                        else
                            res.json({result})
                    }
                })
            }
        }
    })
}

module.exports={
    Signup,
    Login,
    Website,
    Site,
    Preview
}