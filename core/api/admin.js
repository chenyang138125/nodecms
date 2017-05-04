/**
 * Created by Administrator on 2017/4/27.
 */
var modules=require('../../modules');
var config=require('../../config/config');
var Q=require('q');
var cache=require('../catcheData');
module.exports={
    createCategory:function (name,parent) {
        var that=this;
       return modules.wp_category.create({name:name,type:"category",parent:0})
            .then(function (data) {
                 that.resetCatgoryCache();
                 return data;
            });
    },
    deleteCategory:function (id) {
        var that=this;
       return modules.wp_category.destroy({where:{id:id}}).then(function () {
           return  that.resetCatgoryCache();
       });
    },
    updateCategory:function (id,data) {
        var that=this;
        return modules.wp_category.update(data,{where:{id:id}}).then(function () {
            return  that.resetCatgoryCache();
        });
    },
    getCategorys:function () {
        var defer=Q.defer();
        modules.wp_category.findAll({where:{type:'category'}})
            .then(function (data) {
                defer.resolve(data || []);
               /* data =data ||[];
                //建立分类树形结构
                var pos={};
                var tree=[];
                var i=0;
                while(data.length!=0){
                    if(!data[i].parent){
                        tree.push({
                            id:data[i].id,
                            name:data[i].name,
                            children:[]
                        });
                        pos[data[i].id]=[tree.length-1];
                        data.splice(i,1);
                        i--;
                    }else{
                        var posArr=pos[data[i].parent];
                        if(posArr!=undefined){

                            var obj=tree[posArr[0]];
                            for(var j=1;j<posArr.length;j++){
                                obj=obj.children[posArr[j]];
                            }

                            obj.children.push({
                                id:data[i].id,
                                name:data[i].name,
                                children:[]
                            });
                            pos[data[i].id]=posArr.concat([obj.children.length-1]);
                            data.splice(i,1);
                            i--;
                        }
                    }
                    i++;
                    if(i>data.length-1){
                        i=0;
                    }
                }
                defer.resolve(tree);*/
            }).catch(function (err) {
            defer.reject(err);
        });
        return defer.promise;
    },
    updateMenu:function () {

    },
    getMenu:function () {
        
    },
    resetCatgoryCache:function () {
        var defer=Q.defer();
        this.getCategorys().then(function (data) {
            cache.categories=data || [];
            cache.categoryMap={};
            cache.categories.map(function (one) {
                cache.categoryMap[one.id]=one.name;
            });
            defer.resolve();
        });
        return defer.promise;
    }
};