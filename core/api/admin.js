/**
 * Created by Administrator on 2017/4/27.
 */
var modules=require('../../modules');
var config=require('../../config/config');
var Q=require('q');
var cache=require('../catcheData');
var fs=require('fs');
var path=require('path');
var resetMenu=function (isTop) {
    admin.getOption(isTop?'option_menu_top':'option_menu_bottom').then(function (data) {
        var menus;
        try {
            menus = JSON.parse(data.option_value);
        }catch (e){
            menus=[];
        }
        createMenuLink(menus);
        if(isTop){
            cache.menus.topMenus=[{link:"sa",name:"ddd"}];
        }else {
            cache.menus.bottomMenus=[{link:"sa",name:"ddd"}];
        }
    })
}
var createMenuLink=function (menus) {
    menus.forEach(function (menu) {
        switch (menu.type){
            case '页面':
                menu.link='/page/'+menu.id;
                break;
            case '文章分类':
                menu.link='/posts/?category='+menu.id;
                break;
            case 'url':
                menu.link=menu.url;
                break;
        }
        if(menu.children && menu.children.length){
            createMenuLink(menu.children);
        }
    });
}
var admin={
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
    },

    setOption:function (key,value) {
        if(typeof(value)=='object' || typeof(value)==='array')value=JSON.stringify(value);
        return modules.wp_option.upsert({option_name:key,option_value:value}).then(function (data) {
            if(key==='option_menu_top' || key=='option_menu_bottom'){
                resetMenu(key==='option_menu_top')
            }
            return data;
        })
    },
    getOption:function (key) {
        return modules.wp_option.findOne({where:{option_name:key}});
    },
    initCache:function () {
        resetMenu(true);
        resetMenu(false);
    }
};
module.exports=admin;