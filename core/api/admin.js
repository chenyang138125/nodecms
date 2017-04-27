/**
 * Created by Administrator on 2017/4/27.
 */
var modules=require('../../modules');
var config=require('../../config/config');
var Q=require('q');
module.exports={
    createCategory:function (name,parent) {
        return modules.wp_category.create({name:name,type:"tag",parent:parent});
    },
    deleteCategory:function (id) {
     sequelize.transaction(function (t) {
            // 注意，这时使用的是callback而不是promise.then()
            return modules.wp_category.destroy({where:{id:id},transaction:t})
                .then(function () {
                    modules.wp_post.update({category:""},{where:{category:id},transaction:t})
                })
        }).then(function () {
            // Committed
        }).catch(function (err) {
            // Rolled back
            console.error(err);
        });
    },
    updateCategory:function () {

    },
    getCategorys:function () {
        var defer=Q.defer();
        modules.wp_category.findAll({where:{type:'category'}})
            .then(function (data) {
                data =data ||[];
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
                defer.resolve(tree);
            }).catch(function (err) {
            defer.reject(err);
        });
        return defer.promise;
    },
    createTag:function () {

    },
    deleteTag:function () {

    },
    getTags:function () {

    },
    updateTag:function () {

    },
    updateMenu:function () {

    },
    getMenu:function () {
        
    }
};