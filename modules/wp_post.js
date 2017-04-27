/**
 * Created by Administrator on 2017/4/25.
 */
var Q=require("q");
module.exports=function (sequelize, DataTypes) {
    var wp_post=sequelize.define("wp_post",{
        title:{type:DataTypes.STRING,allowNull:false},
        link:{type:DataTypes.STRING,allowNull:false,unique:true},
        digest:DataTypes.TEXT,
        content:DataTypes.TEXT,
        category:DataTypes.STRING,
        tags:DataTypes.STRING,
        stick:DataTypes.BOOLEAN,
        type:DataTypes.STRING,
        statue:DataTypes.INTEGER,
        author:DataTypes.STRING
    },{
        classMethods:{
            createPost:function (post) {
                var defer=Q.defer();
                var that=this;

                if(post.stick){
                    this.update({stick:false},{where:{stick:true},hooks:false});
                }
                this.count({where:{link:post.link}}).then(function (number) {
                    if(number>0) {
                        var linkTemp=post.link.split('/');
                        linkTemp.push(linkTemp.pop()+"-"+number+1);
                        post.link=linkTemp.join("/")+"/"
                    }
                    return "";
                }).then(function () {
                   return that.create(post);
                }).then(function (postInstanse) {
                    defer.resolve(postInstanse)
                },function (err) {
                    defer.reject(err);
                });

                return defer.promise;
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