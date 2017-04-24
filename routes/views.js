/**
 * Created by Administrator on 2017/4/24.
 */
var express = require('express');
var router = express.Router();
router.get('/',function (req,res,next) {
    res.render("index");
});
router.get("/login",function (req,res,next){
    res.render("login",{error:false});
});

module.exports = router;