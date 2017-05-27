/**
 * Created by Administrator on 2017/4/24.
 */
var express = require('express');
var router = express.Router();
var response = require('../core/response');
var userApi = require('../core/api/user');
var postApi = require('../core/api/post');
var adminApi = require('../core/api/admin');
var custom = require('../core/api/customPost');
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
    req.query.type=config.wp_option.post_type.POST;
    postApi.getPostList(req.query).then(function (data) {
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
    postApi.findOne({id:req.params.id}).then(function (data) {
        res.json(response(0,data))
    })
});
router.delete('/post/:id',function (req,res,next) {
    postApi.deletePost(req.params.id).then(function (data) {
        res.json(data)
    })
});
//页面
router.get('/pages',function (req,res,next) {
    req.query.type=config.wp_option.post_type.PAGE;
    postApi.getPostList(req.query).then(function (data) {
        res.json(response(0,data));
    })
});
router.post('/page',function (req,res,next) {
    req.body.type=config.wp_option.post_type.PAGE;
    postApi.postPost(req.body).then(function (data) {
        res.json(response(0,data));
    })
});
router.put('/page/:id',function (req,res,next) {
    req.body.id=req.param('id');
    postApi.postPost(req.body).then(function (data) {
        res.json(response(0,data));
    })
});
router.get('/page/:id',function (req,res,next) {
    postApi.findOne({id:req.params.id}).then(function (data) {
        res.json(response(0,data))
    })
});
router.delete('/page/:id',function (req,res,next) {
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
//自定义字段
router.get('/customs',function (req,res,next) {
    custom.findCustom().then(function (datas) {
        res.json(response(0,datas));
    })
});
router.get('/custom/:id',function (req,res,next) {
    custom.findCustom(req.params.id).then(function (data) {
        res.json(response(0,data));
    })
});
router.get('/custom/category/:id',function (req,res,next) {
    custom.findCustomByCategory(req.params.id).then(function (data) {
        res.json(response(0,data));
    })
});
router.post('/custom',function (req,res,next) {
   custom.modifyCustom(req.body).then(function (data) {
       res.json(response(0,data));
   }) 
});
router.put('/custom/:id',function (req,res,next) {
    custom.modifyCustom(req.body,req.params.id).then(function (data) {
        res.json(response(0,req.body));
    })
});
router.delete('/custom/:id',function (req,res,next) {
   custom.deleteCutom(req.params.id).then(function () {
       res.json(response(0,{}))
   })
});

router.put('/option/:key',function (req,res,next) {
    adminApi.setOption(req.params.id,req.body).then(function () {
        res.json(response(0,{}));
    })
});

router.get('/option/:key',function (req,res,next) {
    adminApi.getOption(req.param.key).then(function (data) {
        res.json(response(0,data));
    })
});

module.exports = router;