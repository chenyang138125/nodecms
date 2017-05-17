/**
 * Created by Administrator on 2017/4/27.
 */
var modules=require('../../modules');
var config=require('../../config/config');
var Q=require('q');
var cache=require('../catcheData');
var fs=require('fs');
var path=require('path');
module.exports={
    createCategory:function (name,parent) {
       return modules.wp_category.create({name:name,type:"category",parent:0});
    },
    deleteCategory:function (id) {
       return modules.wp_category.destroy({where:{id:id}});
    },
    updateCategory:function (id,data) {
        return modules.wp_category.update(data,{where:{id:id}});
    },
    getCategorys:function () {
        var defer=Q.defer();
        modules.wp_category.findAll({where:{type:'category'}})
            .then(function (data) {
                defer.resolve(data || []);
            }).catch(function (err) {
            defer.reject(err);
        });
        return defer.promise;
    },
    updateMenu:function (content) {
        if(typeof(content) != 'string') content=JSON.stringify(content);
        return modules.wp_option.upsert({option_value:content},{where:{option_name:"menu"}})
    },
    getMenu:function () {
        return modules.wp_option.findOne({where:{option_name:'menu'}})
    },
    getMediaInfo:function () {
        var deffer=Q.defer();

        fs.readdir(path.join(__dirname,'../../public/upload/img/'),function (err,files) {
            if(err){
                deffer.reject(err.message);
            }else {
                var filetype = 'jpg,png,gif,ico,bmp';
                var results=[];
                files.map(function (file) {
                    var tmplist = file.split('.');
                    var _filetype = tmplist[tmplist.length - 1];
                    if (filetype.indexOf(_filetype.toLowerCase()) >= 0) {
                        results.push('http://localhost:3000/upload/img/'+file)
                    }
                });
                deffer.resolve(results);
            }

        });
        return deffer.promise;
    }
};