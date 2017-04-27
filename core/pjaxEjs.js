/**
 * Created by Administrator on 2017/4/25.
 */
module.exports = function (app) {
    app.locals['header'] = function (pjax, data) {
        if (pjax) return "";
        var arrJs = [];
        return '<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<title>cms</title>' +

            '<link rel="stylesheet" href="/stylesheets/bootstrap.min.css"/>' +
            '<link rel="stylesheet" href="/stylesheets/admin.css"/>' +
            '</head>' +
            '<body>' +
            '<header class="header header-fixed navbar">' +
            '<div class="brand">' +
            '<a href="javascript:;" class="ti-menu off-left visible-xs" data-toggle="offscreen" data-move="ltr"></a>' +
            '<a href="/sysadmin/home" data-pjax="" class="navbar-brand">' +
            '<img src="/img/logo.png" alt="">' +
            '<span class="heading-font">' +
            'cms' +
            '</span></a></div>' +
            '<ul class="nav navbar-nav navbar-left">' +
            '<li class="hidden-xs">' +
            '<a href="javascript:;" class="toggle-sidebar">' +
            '<i class="ti-menu"></i>' +
            '</a></li></ul>' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li class="off-right">' +
            '<a href="javascript:;" data-toggle="dropdown">' +
            '<span class="hidden-xs ml10">' + data.nickname + '</span>' +
            '<i class="ti-angle-down ti-caret hidden-xs"></i>' +
            '</a>' +
            '<ul class="dropdown-menu animated fadeInLeft">' +
            '<li>' +
            '<a href="/admin/user/pass" data-toggle="modal" data-target="#homeDetail">修改登录密码</a>' +
            '</li>' +
            '</ul>' +
            '</li>' +
            '<li class="off-right">' +
            '<a href="/admin/logout">' +
            '<i class="ti-power-off"></i>' +
            '</a></li></ul></header>' +
            '<section class="content"><aside>' +
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