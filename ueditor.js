/**
 * Created by Administrator on 2017/4/28.
 */
var bodyParser = require('body-parser');
var ueditor = require("ueditor");
var path = require('path');
module.exports=function (app) {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {

        if(true){
            var imgDir = '/upload/img/' //默认上传地址为图片
            var ActionType = req.query.action;
            if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
                var file_url = imgDir;//默认上传地址为图片
                /*其他上传格式的地址*/
                if (ActionType === 'uploadfile') {
                    file_url = '/upload/file/'; //附件保存地址
                }
                if (ActionType === 'uploadvideo') {
                    file_url = '/upload/video/'; //视频保存地址
                }
                res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
                res.setHeader('Content-Type', 'text/html');
            }
            //客户端发起图片列表请求
            else if (ActionType === 'listimage'){

                res.ue_list(imgDir);  // 客户端会列出 dir_url 目录下的所有图片
            }
            // 客户端发起其它请求
            else {
                res.setHeader('Content-Type', 'application/json');
                res.redirect('/ueditor/nodejs/config.json')
            }

        }else {
            res.sendStatus(401);
        }
    }));
};