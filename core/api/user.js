/**
 * Created by Administrator on 2017/4/24.
 */
var Q=require("q");
var modules=require('../../modules');
var config=require('../../config/config');
var encryption=require('../../core/encryption');
module.exports={
    login:function (param) {
        var defer=Q.defer();
        var account=param.account,pwd=param.password;
        if(account && account.length>0 && pwd && pwd.length>0){
            modules.user.findByAccount(account,function (data) {
                var result={};
                if(!data){
                    result=config.status.EMPTY_ACCOUNT;
                }else if(encryption.md5Pwd(pwd)==data.password){
                    result=config.status.SUCCESS;
                    result.data={nickname:data.nickname,role:data.role};
                }else {
                    result=config.status.PASSWORD_ERROR;
                }
                defer.resolve(result);
            },function (err) {
                defer.reject(config.status.ERR_SERVICE);
            })
        }else {
          var  result=config.status.OTHER_ERR;
            result.msg="账号密码不能为空";
            defer.resolve(result)
        }
        return defer.promise;
    },
    modifyInfo:function (req,res,next) {

    }
};