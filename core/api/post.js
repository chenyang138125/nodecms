/**
 * Created by Administrator on 2017/4/27.
 */
var modules = require('../../modules');
var config = require('../../config/config');
var Q = require('q');
var _ = require('underscore');
var cache = require('../catcheData');
var pinyin=require('pinyin');
var moment=require('date-utils');
module.exports = {
    /**
     * 获取已发布文章列表 放回信息包含：标题，id，分类，标签，摘要，发布时间，跟新时间.
     * @param page
     * @param limit
     * @param option
     * @returns {*}
     */
    getPostList: function (page, limit, option) {
        option = option || {};
        page = page || 0;
        limit = limit || 20;
        option.type = config.wp_option.post_type.POST;
        option.statue = config.wp_option.post_statue.PUBLISH;

        return modules.wp_post.findAndCount({
            where: option,
            limit: limit,
            offset: page * limit,
            attributes: {exclude: ['content', 'stick', 'type', 'statue']},
            order: [['createAt', 'DESC']]
        })
    },
    /**
     * 管理员获取文章 ：包含已删除的和草稿
     * @param page
     * @param limit
     * @param option
     * @returns {*}
     */
    getAdminPostList: function (param) {
        var defer = Q.defer();
        this.findPosts(param).then(function (data) {
            var result = {};
            var publishCount = 0,draftCount = 0,deleteCount = 0;

            data.rows.map(function (one) {
                if(one.deletedAt){
                    deleteCount++;
                }else if(one.statue==config.wp_option.post_statue.PUBLISH){
                    publishCount++;
                }else if(one.statue==config.wp_option.post_statue.DRAFT) {
                    draftCount++;
                }
            });
            result.posts=data.rows;
            result.publishCount=publishCount;
            result.draftCount=publishCount;
            result.deleteCount=publishCount;
            result.totalCount=data.count;
            defer.resolve(result);
        });
        return defer.promise;
    },
    getPageList: function (page, limit, option) {
        option = option || {};
        page = page || 0;
        limit = limit || 20;
        option.type = config.wp_option.post_type.PAGE;
        option.statue = config.wp_option.post_statue.PUBLISH;

        return modules.wp_post.findAndCount({
            where: option,
            limit: limit,
            offset: page * limit,
            attributes: {exclude: ['content', 'stick', 'type', 'statue']},
            order: [['createAt', 'DESC']]
        })
    },
    getAdminPageList: function (page, limit, option) {
        option = option || {};
        page = page || 0;
        limit = limit || 20;
        option.type = config.wp_option.post_type.PAGE;

        return modules.wp_post.findAndCount({
            where: option,
            limit: limit,
            offset: page * limit,
            attributes: {exclude: ['content', 'stick', 'type', 'statue']},
            order: [['createAt', 'DESC']],
            paranoid: false
        })
    },
    /**
     * 提交文章 含有id表示更新否则创建
     * @param post
     * @returns {*}
     */
    postPost: function (post) {
        if (post.id) {
            var defer=Q.defer();
             modules.wp_post.updatePost(post).then(function () {
                 defer.resolve({id:post.id})
             });
             return defer;
        } else {
            var pinyinStr=pinyin(post.title,{style:pinyin.STYLE_NORMAL});
            var date=new Date();
            post.link='/post/'+date.toFormat("YYYY/MM/DD")+"/";
            pinyinStr.map(function (one) {
                post.link+=one[0];
            });
            post.link+="/";
            return modules.wp_post.createPost(post);
        }
    },

    updateLink: function (link, id) {
        return modules.wp_post.updateLink(link, id);
    },
    findPosts: function (param) {
        var where = {};
        var page = param.page || 0;
        var limit = param.limit || 20;
        var paranoid = param.paranoid || true;
        if (param.statue) where.statue = param.statue;
        if (param.author) where.author = param.author;
        if (param.category) where.category = param.category;
        if (param.type) where.type = param.type;
        if (param.title) where.category = {$like: "%" + param.title + "%"};
        return modules.wp_post.findAndCount({
            where: where,
            limit: limit,
            offset: page * limit,
            paranoid: paranoid
        })
    },
    findOne:function (where) {
        return modules.wp_post.findOne({where:where});
    }

};