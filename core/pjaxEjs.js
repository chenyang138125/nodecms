/**
 * Created by Administrator on 2017/4/25.
 */
module.exports = function (app) {
    app.locals['header'] = function (pjax, data) {
        if (pjax) return "";
        var arrJs = [];
        return '<section class="content"><aside>' +
            '<ul class="admin-menu">' +
            '<li><a href="/admin/menu" data-pjax>菜单管理</a></li>' +
            '<li><a href="/admin/category" data-pjax>分类</a></li>' +
            '<li><a href="/admin/tag" data-pjax>标签</a></li>' +
            '<li><a href="/admin/post" data-pjax>文章</a></li>' +
            '<li><a href="/admin/page">页面</a></li>' +
            '</ul></aside><div id="container" class="container">'
    };
    app.locals['footer'] = function (pjax, js) {
        js = [
            "/lib/jquery-3.2.1.min.js",
            "/lib/jquery-form.min.js",
            "/javascripts/admin.js"
        ];
        if (pjax) return "";
        js = js || [];
        var arrJs = [];
        js.map(function (one) {
            arrJs.push("<script src='" + one + "'></script>")
        });
        return '</section></div>' + arrJs;
    }
};