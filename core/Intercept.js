/**
 * Created by Administrator on 2017/4/24.
 */
var role=function (req,res,next) {
    if(req.originalUrl=="/v1/login") {
        next();
        return;
    }
    if(req.session.user && req.session.user.role=="admin"){
        next();
    }else {
        if(req.method.toLowerCase()=="post"){
            res.sendStatus(401);
        }else {
            res.redirect('/login?redirect_to='+req.originalUrl);
        }
    }
};
module.exports=exports;
exports.role=role;