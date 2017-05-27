/**
 * Created by Administrator on 2017/5/2.
 */
var modules=require('../modules');
var adminApi=require('./api/admin');
module.exports={
    init:function () {
        modules.sequelize.sync().then(function () {
            modules.user.findAll().then(function (data) {
                if(data.length==0){
                    modules.user.create({account:'admin',password:encryption.md5Pwd('admin'),role:'admin',nickname:"系统管理员"});
                }
            })
        });
        adminApi.initCache();
    }
};