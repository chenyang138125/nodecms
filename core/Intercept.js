/**
 * Created by Administrator on 2017/4/24.
 */
var role=function (req,res,next) {
    next();
    /*if(req.originalUrl=="/v1/login" || req.originalUrl=="/v1/getUser") {
        next();
        return;
    }
    if(req.session.user && req.session.user.role=="admin"){
        next();
    }else {
            res.sendStatus(401);
    }*/
};
module.exports=exports;
exports.role=role;