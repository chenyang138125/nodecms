/**
 * Created by Administrator on 2017/4/25.
 */
(function ($) {
    $.fn.cusAjaxForm=function (cb) {
      this.ajaxForm({
          success:function (data) {
              if(data.code==0){
                  if(cb && typeof(cb)=="function"){
                      cb(data.data);
                  }
              }
          }
      })
    };
    $.$http={
        get:function (url,data,cb) {
            this.http(url,{data:data || {}},cb);
        },
        post:function (url,data,cb) {
            this.http(url,{data:data || {},type:"POST"},cb);
        },
        delete:function (url,cb) {
            this.http(url,{type:"DELETE"},cb);
        },
        put:function (url,data,cb) {
            this.http(url,{type:"PUT",data:data},cb);
        },
        http:function (url,option,success,err) {
            var defultOption={
                type:"GET",
                data:{},
                success:function (data) {
                    if(success && typeof(success)=="function"){
                        if(data.code==0){
                            success(data.data);
                        }
                    }
                },
                error:function (msg) {
                    if(err && typeof(err)=="function"){
                        err(msg);
                    }
                }
            };
            $.ajax(url,$.extend({},defultOption,option));
        }
    };
})(jQuery);