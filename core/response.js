/**
 * Created by Administrator on 2017/4/24.
 */
module.exports=function (statue,data,msg) {
    return {
        code:statue,
        data:data || {},
        msg:msg  || statue==0?'ok':'error'
    }
};