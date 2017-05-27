/**
 * Created by Administrator on 2017/4/27.
 */
var modules = require('../../modules');
var config = require('../../config/config');
var Q = require('q');
var underscore = require('underscore');
var pinyin = require('pinyin');
var moment = require('date-utils');
var response = require('../../core/response');
module.exports = {
    /**
     * 获取已发布文章列表 放回信息包含：标题，id，分类，标签，摘要，发布时间，跟新时间.
     * @param page
     * @param limit
     * @param option
     * @returns {*}
     */
    getPostList: function (param) {
        param=param || {};
        return this.findPosts(param).then();
    },
    /**
     * 提交文章 含有id表示更新否则创建
     * @param post
     * @returns {*}
     */
    postPost: function (post) {
        var _this = this;
        post.category=Number(post.category);
        if(isNaN(post.category)) post.category=-1;
        if (underscore._.isEmpty(post.meta) || !post.metaKey) post.meta = false;
        if (post.id) {
            return modules.wp_post.updatePost(post).then(function () {
                if (post.meta && post.metaKey) {
                    return _this.savePostMeta(post.id, post.meta, post.metaKey);
                }
            }).then(function () {
                return {id: post.id}
            });
        } else {
            return modules.wp_post.createPost(post).then(function (data) {
                if (post.meta) {
                    _this.savePostMeta(data.id, post.meta, post.metaKey);
                }
                return data;
            })
        }
    },

    updateLink: function (link, id) {
        return modules.wp_post.updateLink(link, id);
    },
    savePostMeta: function (postId, value, key) {
        return modules.wp_postmeta.findCreateFind({where:{post_id:postId,meta_key:key},defaults:{
            meta_value: JSON.stringify(value),
                meta_key: key,
                post_id: postId
        }}).then(function (ins,created) {
            if(!created){
                return modules.wp_postmeta.update({
                    meta_value: JSON.stringify(value),
                    meta_key: key,
                    post_id: postId
                },{where:{post_id:postId,meta_key:key}})
            }else {
                return ins;
            }
        })
    },

    findPosts: function (param) {
        var where = {};
        var page = param.page || 0;
        var limit = param.limit || 20;
        var paranoid = param.paranoid || true;
        page=Number(page);
        limit=Number(limit);
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
    findOne: function (where) {
        return modules.wp_post.findOne(
            {
                where: where,
                include: [{
                    model: modules.wp_postmeta,
                    required: false,
                    where: {meta_key: 'customField'}
                }]
            }
        )
            .then(function (post) {
                post=post.get();
                if (post.wp_postmeta && post.wp_postmeta.length == 1) {
                    post.meta = JSON.parse(post.wp_postmeta[0].meta_value);
                }
                delete post.wp_postmeta;
                return post;
            })
    },
    deletePost: function (id) {
        return modules.wp_post.destroy({where: {id: id}}).then(function (number) {
            if (number == 0) {
                return response(1, {}, '不存在的文章')
            } else {
                return response(0)
            }
        })
    }
};