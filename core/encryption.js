/**
 * Created by Administrator on 2017/4/24.
 */
var crypto=require('crypto');

module.exports={
    md5Pwd:function (str) {
        if(str && str.length>0){
            var decipher = crypto.createHmac('md5',"chenyang");
            return decipher.update(str).digest('hex')
        }
        return str;
    }
};