/**
 * Created by Administrator on 2017/4/24.
 */
var express = require('express');
var router = express.Router();
var postApi=require('../core/api/post');
var cacheData=require('../core/catcheData');
router.get('/',function (req,res,next) {
    req.viewUrl='admin/index';
    next();
});
router.get('/menu',function (req,res,next) {
    
});
router.get('/category',function (req,res,next) {

});
router.get('/category/edit/:id',function (req,res,next) {

});
router.post('/category/update/:id',function (req,res,next) {

});
router.post('/category/create',function (req,res,next) {

});
router.get('/post',function (req,res,next) {
    req.viewUrl='admin/post';
    postApi.getAdminPostList(req.query).then(function (data) {
        req.resData=data;
        next();
    })
});
router.get('/post/edit/:id',function (req,res,next) {
    postApi.findOne({id:req.param('id')}).then(function (data) {
        req.viewUrl='admin/postEdit';
        req.resData={post:data};
        next();
    })
});
router.get('/post/new',function (req,res,next) {
    req.viewUrl='admin/postNew';
    next();
});
router.get('/*',function (req,res,next) {
    req.resData=req.resData || {};
    req.resData.pjax=req.header('pjax');
    req.resData.user=req.session.user;
    req.resData.category=req.query.category || "";
    req.resData.categories=cacheData.categories;
    req.resData.categoryMap=cacheData.categoryMap;
    req.resData.tags=cacheData.tags;
    req.resData.tagsMap=cacheData.tagsMap;
    res.render(req.viewUrl,req.resData);
});
module.exports = router;