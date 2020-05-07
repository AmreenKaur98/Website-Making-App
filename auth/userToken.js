var jwt = require('jsonwebtoken');
secretKey="secret_key_of_User";

function verify(req, res, next){
    jwt.verify(req.token,secretKey,(err,data)=>{
        if(err){
            res.status(401).json({status:"401",Message:'unauthenticated'});
            res.status(400).json({status:"400",Message:'Bad Request'});
            res.status(407).json({status:"407",Message:'Proxy Authentication Required'})  
            res.status(403).json({status:"403",Message:'Access token does not have the required scope'}) 
        }
        else{
            if(data.author=='USER')
            {
                req.query.userID=data._id
                req.body.userID=data._id
                //console.log('req--- ',req.query.userID);
                next()
            }
            else
                res.send('NOT AUTHORIZED...')
        }
    })
}
function CreateToken(body,res){
    console.log('BODY IN TOKEN',body)
    var obj={author:body.author,_id:body._id,email:body.email,mobileNo:body.mobileNo};
    //console.log('body-----',obj);
    jwt.sign(obj,secretKey,{ expiresIn: '1d' },(err,token)=>{
        if(err){
            throw err
        }
        else{
            obj.token = token;
            res.send(obj)
            next();
        }
    });
}
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } 
    else {
      res.status(403).json({status:"403",Message:'Forbidden'});
    }
  
} 
module.exports={
    CreateToken,
    verifyToken,
    verify
}