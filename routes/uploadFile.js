/**
 * Created by Administrator on 2017/5/15.
 */
var express = require('express');
var router = express.Router();
var fs=require('fs');
var response = require('../core/response');
var path=require('path');
var multiparty = require('multiparty');
var util=require('util');
router.post('/upload',function (req,res,next) {
    // 解析一个文件上传
    var form = new multiparty.Form();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "public/upload/img";
    //设置单文件大小限制
    form.maxFilesSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和

    form.parse(req, function(err, fields, files) {
        if(err){
            res.json(response(1,{},err.code=='ETOOBIG'?"文件过大":err.message))
            return
        }
        //同步重命名文件名
        if(files && files.file && files.file.length==1){
            fs.rename(files.file[0].path,form.uploadDir+'/'+files.file[0].originalFilename,function (err) {
                if(err){
                    res.json(response(1,{},"重命名错误"))
                }else {
                    res.json(response(0,{filename:files.file[0].originalFilename,path:'http://localhost:3000/upload/img/'+files.file[0].originalFilename}));
                }
            });
        }else {
            res.json(response(1,{},"不符合上传规则"))
        }

    });
});
router.get('/images',function (req,res,next) {

    fs.readdir(path.join(__dirname,'../public/upload/img/'),function (err,files) {
        if(err){
            res.json(response(1,err.message))
        }else {
            var filetype = 'jpg,png,gif,ico,bmp';
            var results=[];
            files.map(function (file) {
                var tmplist = file.split('.');
                var _filetype = tmplist[tmplist.length - 1];
                if (filetype.indexOf(_filetype.toLowerCase()) >= 0) {
                    results.push('http://localhost:3000/upload/img/'+file)
                }
            });
            res.json(response(0,results))
        }

    });
});
module.exports = router;