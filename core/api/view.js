/**
 * Created by Administrator on 2017/5/27.
 */
var modules=require('../../modules');
var post=require('./post');
module.exports={
  getHomeData:function () {
        var result={};
       return post.findPosts({category:1},true).then(function (banners) {
              result.banners=banners;
              return post.findPosts({category:2},true);
        }).then(function (layers) {
            result.layers=layers;
            return result;
        })
  }
};