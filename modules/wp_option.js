/**
 * Created by Administrator on 2017/4/25.
 */
module.exports=function (sequelize, DataTypes) {
    var wp_option=sequelize.define("wp_option",{
            option_name:{type:DataTypes.STRING,unique:true},
            option_value:DataTypes.TEXT,
    },{
        timestamps:false
    });
    return wp_option;
};