/**
 * Created by Administrator on 2017/4/24.
 */
var express = require('express');
var router = express.Router();
var response = require('../core/response');
var userApi = require('../core/api/user');
var postApi = require('../core/api/post');
var encryption=require('../core/encryption');
router.post("/login",function (req,res,next){
    userApi.login(req.body,req.session.user).then(function (data) {
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

});
module.exports = router;