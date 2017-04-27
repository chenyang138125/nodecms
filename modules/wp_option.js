/**
 * Created by Administrator on 2017/4/25.
 */
module.exports=function (sequelize, DataTypes) {
    var wp_option=sequelize.define("wp_option",{
            option_name:{type:DataTypes.STRING,unique:true},
            option_value:DataTypes.TEXT
    },{
        classMethods:{
            /**
             * 获取配置
             * @param option_name 配置名称
             * @returns {Promise.<Array.<Instance>>}
             */
            getOption:function (option_name) {
                return this.findAll({where:{option_name:option_name}});
            },
            /**
             * 设置配置
             * @param name 配置名
             * @param value 值
             * @returns {Promise.<created>}
             */
            setOption:function (name,value) {
                return this.upsert({option_name:name,option_value:value});
            }
        }
    });
    return wp_option;
};