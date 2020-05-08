var express = require('express');
var router = express.Router();
var joi = require('../auth/jioSchema');
var controller = require('../controllers/userController');
var jwt = require('../auth/userToken');
var multer = require('multer')

var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/signup',joi.validation,(req,res)=>{
    console.log('IN USER SINGNUP')
    controller.Signup(req.body,res);
})

router.post('/login',(req,res)=>{
    //console.log('body---',req.body)
    controller.Login(req.body,res);
})

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})
var upload = multer({storage:storage});
router.post('/website',jwt.verifyToken,jwt.verify,upload.single('logo'),(req,res)=>{
    //console.log('REQUEST----',req.file)
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        res.json({Message:'NO FILE SELECTED'})
    }
    else{
        console.log('body admin-----',req.body);
        //var obj={addsData:file,adminID:req.query.adminID}
        //console.log('req---',obj)
        req.body.file=req.file
        console.log('body--------',req.body.file.path)
        controller.Website(req.body,res);
        
    } 
})

router.put('/editSite',jwt.verifyToken,jwt.verify,(req,res)=>{
    //console.log('IN EDIT----',req.body)
    controller.Site(req.body,res)
})

router.get('/getpreview',jwt.verifyToken,jwt.verify,(req,res)=>{
    //console.log(req.query,'in preview----',req.body);
    controller.Preview(req.body,res)
})
module.exports = router