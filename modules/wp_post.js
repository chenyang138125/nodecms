/**
 * Created by Administrator on 2017/4/25.
 */
var Q=require("q");
var moment=require('date-utils');
var config=require('../config/config');
module.exports=function (sequelize, DataTypes) {
    var wp_post=sequelize.define("wp_post",{
        title:{type:DataTypes.STRING,allowNull:false},
        digest:DataTypes.TEXT,
        content:DataTypes.TEXT,
        category:DataTypes.INTEGER,
        tags:DataTypes.STRING,
        stick:DataTypes.BOOLEAN,
        type:DataTypes.STRING,
        statue:DataTypes.STRING,
        author:DataTypes.STRING
    },{
        classMethods:{
            createPost:function (post) {
                var that=this;
                if(!post.statue)post.statue=config.wp_option.post_statue.PUBLISH;
                if(post.stick){
                    this.update({stick:false},{where:{stick:true},hooks:false}).then(function () {
                        return that.create(post);
                    });
                }else {
                    return that.create(post);
                }
            },
            updatePost:function (post) {
                if(post.stick){
                    this.update({stick:false},{where:{stick:true},hooks:false});
                }
                return  this.update(post,{where:{id:post.id}});
            },
            updateLink:function (link,id) {
                var defer=Q.defer();
                var that=this;
                this.count({where:{link:link}}).then(function (number) {
                    if (number > 0) {
                        var linkTemp = link.split('/');
                        linkTemp.push(linkTemp.pop() + "-" + number + 1);
                        link=linkTemp.join('/')+"/"
                    }
                    return that.update({link:link},{where:{id:id}});
                }).then(function (post) {
                    defer.resolve(post.link);
                });
                return defer.promise;
            }
        },
        paranoid:true
    });
    return wp_post;
};