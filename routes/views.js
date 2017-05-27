/**
 * Created by Administrator on 2017/4/24.
 */
var cache=require('../core/catcheData');
var express = require('express');
var router = express.Router();
router.get('/',function (req,res,next) {
    req.tplData={};
    req.tplName='layout';
    next()
});
router.get("/login",function (req,res,next){
    res.render("login",{error:false});
});
router.get('/*',function (req,res,next) {
    var data=req.tplData || {};
    data.topMenus=cache.menus.topMenus;
    data.bottomMenus=cache.menus.bottomMenus;
   res.render(req.tplName,data);
});

module.exports = router;