/**
 * Created by Administrator on 2017/4/27.
 */
//存储文章附加信息，如：自添加字段
module.exports=function (sequelize, DataTypes) {
    var wp_postmeta=sequelize.define("wp_postmeta",{
        post_id:DataTypes.INTEGER,
        meta_key:DataTypes.STRING,
        meta_value:DataTypes.STRING
    });
    return wp_postmeta;
};