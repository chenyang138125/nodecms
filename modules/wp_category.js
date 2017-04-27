/**
 * Created by Administrator on 2017/4/27.
 */
module.exports=function (sequelize, DataTypes) {
    var wp_category=sequelize.define("wp_category",{
        //分类，标签
        type:DataTypes.STRING,
        name:DataTypes.STRING,
        parent:DataTypes.INTEGER
    });
    return wp_category;
};