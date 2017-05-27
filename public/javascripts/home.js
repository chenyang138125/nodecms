/**
 * Created by Administrator on 2017/5/27.
 */
$(".team .avatar").on('click',function () {
    var des=$(this).attr("data-des");
    var name=$(this).attr("data-name");
    var job=$(this).attr("data-job");
    var avatar=$(this).css("backgroundImage");
    $("#team-dialog .name").html(name);
    $("#team-dialog .job").html(job);
    $("#team-dialog .team-des").html(des);
    $("#team-dialog .avatar").css("backgroundImage",avatar);
    $("#team-dialog").show();
    $(".team .bg-fade").show()
});

$(".close").on("click",function () {
    var $dialog= $(this).parent().parent();
    $dialog.hide();
    $dialog.parent().find(".bg-fade").hide();
});

$(".cus-banner .layered-item").on("click",function () {
    if($(this).hasClass('active'))return false;
    $(".cus-banner .layered-item.active").removeClass("active");
    $(this).addClass('active');
    var content=$(this).attr("data-content");
    var bg_img=$(this).attr("data-bg");
    $(".cus-banner .banner-item .banner-content").html(content);
    $(".cus-banner .layered-banner-bg").attr('src',bg_img);
});
var mySwiper = new Swiper('.swiper-container', {
//                autoplay: 5000//可选选项，自动滑动
    pagination : '.swiper-pagination',
    paginationClickable: true,
    paginationElement : 'div',
    paginationBulletRender: function (swiper, index, className) {
        return '<div class="'+className+' cus-pagination"><span class="pagination-icon"></span><span class="pagination-name">' + window.bannerNames[index]+ '</span></div>';
    }
});
$('.swiper-pagination').append('<div class="pagination-hr"></div>');
