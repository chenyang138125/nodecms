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
        data.categories=cacheData.categories;
        data.categoryMap=cacheData.categoryMap;
        data.tags=cacheData.tags;
        data.tagsMap=cacheData.tagsMap;
        req.resData=data;
        next();
    })
});
router.get('/post/edit/:id',function (req,res,next) {

});
router.get('/post/new',function (req,res,next) {
    req.viewUrl='admin/postNew';
    next();
});
router.post('/post',function (req,res,next) {
    postApi.postPost(req.body).then(function (data) {
        res.redirect('/admin/post/edit/'+data.id);
    })
});
router.get('/*',function (req,res,next) {
    req.resData=req.resData || {};
    req.resData.pjax=req.header('pjax');
    req.resData.user=req.session.user;
    req.resData.category=req.query.category || "";
    res.render(req.viewUrl,req.resData);
});
module.exports = router;