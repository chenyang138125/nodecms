/**
 * Created by Administrator on 2017/4/24.
 */
var express = require('express');
var router = express.Router();
    router.all('/*',function (req,res,next) {
        if(req.session.user &&　req.session.user.role=='admin'){
            next()
        }else {
            res.redirect('/login')
        }
    });
    module.exports=router;