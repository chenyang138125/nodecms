/**
 * Created by Administrator on 2017/4/24.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
        account:{type:DataTypes.STRING,unique:true,allowNull:false},
        password:{type:DataTypes.STRING,allowNull:false},
        nickname:DataTypes.STRING,
        role:{type:DataTypes.ENUM,values:['admin','member','custom']}
    },{
        classMethods:{
            findByAccount:function (account,cb) {
                this.findOne({where:{account:account}})
                    .then(function (data) {
                        cb(data);
                    })
            }
        }
    });
    return User;
};