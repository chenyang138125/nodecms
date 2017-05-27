/**
 * Created by Administrator on 2017/4/27.
 */
/**
 * 自定义内容 ：自定义添加字段存储自己的信息。改文章不在文章列表显示
 */
var modules = require('../../modules');
module.exports = {
    modifyCustom:function (data,id) {
        var mData={
            option_name:'fields'+data.category,
            option_value:JSON.stringify(data)
        };
        if(id){
            return modules.wp_option.update(mData,{where:{id:id,option_name:{$like:"fields%"}}})
        }else {
          return  modules.wp_option.create(mData)
        }
    },
    findCustom:function (id) {
       if(id){
           return modules.wp_option.findOne({where:{id:id,option_name:{$like:"fields%"}}}).then(function (data) {
               var result;
               if(data && data.option_value){
                   result=JSON.parse(data.option_value);
                   result.id=data.id;
               }
               return result;
           })
       }else {
            return modules.wp_option.findAll({where:{option_name:{$like:'fields%'}}}).then(function (data) {
                var result=[];
                data.forEach(function (one) {
                    if(one.option_value) {
                        var field=JSON.parse(one.option_value);
                        field.id=one.id;
                        result.push(field);
                    }
                });
                return result;
            })
       }
    },
    findCustomByCategory:function (id) {
        return modules.wp_option.findAll({where:{option_name:'fields'+id}}).then(function (data) {
            var result=[];
            data.forEach(function (one) {
                if(one.option_value) {
                    var fields=JSON.parse(one.option_value);
                    result=result.concat(fields.fields);
                }
            });
            return result;
        })
    },
    deleteCutom:function (id) {
        return modules.wp_option.destroy({where:{id:id,option_name:{$like:"fields%"}}});
    }
};