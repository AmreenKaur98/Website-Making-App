var express = require('express');
var router = express.Router();
var admincont = require('../controllers/adminController')
var jwt = require('../auth/adminToken');
var multer = require('multer');

var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/adminsignup',(req,res)=>{
    admincont.Signup(res);
})
router.post('/adminlogin',(req,res)=>{
    console.log('in admin-----')
    admincont.Login(req.body,res);
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
router.post('/addpreview',jwt.verifyToken,jwt.verify,upload.single('logo'),(req,res)=>{
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
        //console.log('body--------',req.body.file.path)
        admincont.preview(req.body,res);
        
    } 
})

router.get('/allusers',jwt.verifyToken,jwt.verify,(req,res)=>{
    
    admincont.allusers(req.body,res)
})
module.exports = router