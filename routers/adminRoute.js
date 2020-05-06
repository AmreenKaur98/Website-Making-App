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
 
module.exports = router