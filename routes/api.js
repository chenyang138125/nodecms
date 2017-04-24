/**
 * Created by Administrator on 2017/4/24.
 */
var express = require('express');
var router = express.Router();
var response = require('../core/response');
var modules=require('../modules');
var encryption=require('./core/encryption');
router.post("/login",function (req,res,next){
    var account=req.body.account,pwd=req.body.password;
    if(account && account.length>0 && pwd && pwd.length>0){
        modules.user.findByAccount(account,function (data) {
            if(!data){
                res.json(response(1,{},"账号不存在"))
            }else if(encryption.md5Pwd(password)==data.password){
                req.session.user={nickname:data.nickname};
                res.json(response(0))
            }else {
                res.json(response(1,{},"账号密码错误"))
            }
        })
    }else {
        res.json(response(1,{},"登录名或者密码不能为空"));
    }

});
module.exports = router;