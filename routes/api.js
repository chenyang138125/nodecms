/**
 * Created by Administrator on 2017/4/24.
 */
var express = require('express');
var router = express.Router();
var response = require('../core/response');
var userApi = require('../core/api/user');
var postApi = require('../core/api/post');
var encryption=require('../core/encryption');
var config=require('../config/config');
router.post("/login",function (req,res,next){
    userApi.login(req.body,req.session.user).then(function (data) {
        if(req.body.rememberme=='on'){
            req.session.cookie.maxAge=new Date().getTime()+60*60*24*7;
        }
        req.session.user=data.data;
        res.json(data);
    },function (data) {
        res.sendStatus(500)
    })
});
router.post('/loginout',function (req,res,next) {
    delete  req.session.user;
    res.sendStatus(200);
});
router.post('/post',function (req,res,next) {
    req.body.type=config.wp_option.post_type.POST;
    req.body.author=req.session.user.account;
    postApi.postPost(req.body).then(function (data) {
        res.json(response(0,data));
    })
});
module.exports = router;