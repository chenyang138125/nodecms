/**
 * Created by Administrator on 2017/4/24.
 */
var express = require('express');
var router = express.Router();
var response = require('../core/response');
var userApi = require('../core/api/user');
var postApi = require('../core/api/post');
var adminApi = require('../core/api/admin');
var encryption=require('../core/encryption');
var config=require('../config/config');
router.post("/login",function (req,res,next){
    userApi.login(req.body,req.session.user).then(function (data) {
        if(req.body.remember=='on'){
            req.session.cookie.maxAge=new Date().getTime()+60*60*24*7;
        }
        req.session.user=data.data;
        res.json(response(0,data));
    },function (data) {
        res.sendStatus(500)
    })
});
router.get('/loginout',function (req,res,next) {
    delete  req.session.user;
    res.json(response(0))
});
router.get("/getUser",function (req,res,next) {
    res.json(response(0,{nickname:'admin',role:'admin'}));
    /*if(req.session.user){
        res.json(response(0,req.session.user));
    }else {
        res.sendStatus(401)
    }*/
});
//文章
router.get('/posts',function (req,res,next) {
    postApi.getAdminPostList(req.query).then(function (data) {
        res.json(response(0,data));
    })
});
router.post('/post',function (req,res,next) {
    req.body.type=config.wp_option.post_type.POST;
    postApi.postPost(req.body).then(function (data) {
        res.json(response(0,data));
    })
});
router.put('/post/:id',function (req,res,next) {
    req.body.id=req.param('id');
    postApi.postPost(req.body).then(function (data) {
        res.json(response(0,data));
    })
});
router.get('/post/:id',function (req,res,next) {
    postApi.findOne({id:req.param('id')}).then(function (data) {
        res.json(response(0,data))
    })
});
router.delete('/post/:id',function (req,res,next) {
    postApi.deletePost(req.param('id')).then(function (data) {
        res.json(data)
    })
});
//分类
router.delete("/category/:id",function (req,res,next) {
    adminApi.deleteCategory(req.param("id")).then(function (number) {
        res.json(response(0,{id:req.param("id")}));
    })
});
router.put('/category/:id',function (req,res,next) {
    adminApi.updateCategory(req.param("id"),req.body).then(function () {
        res.json(response(0,{}))
    })
});
router.post('/category',function (req,res,next) {
    adminApi.createCategory(req.body.name,0).then(function (data) {
        res.json(response(0,data))
    })
});
router.get('/category',function (req,res,next) {
    adminApi.getCategorys().then(function (data) {
        res.json(response(0,data))
    })
});
module.exports = router;