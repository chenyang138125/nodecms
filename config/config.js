/**
 * Created by Administrator on 2017/4/24.
 */
module.exports={
    redis:{
        host:'127.0.0.1',
        port:6379,
        db:'session-db'
    },
    sequelize:{
        "username": "root",
        "password": "root",
        "database": "simplecms",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    wp_option:{
        top_menu:"top_menu",
        bottom_menu:'bottom_menu',
        post_category:'post_category',
        post_tag:"post_tag",
        post_type:{
            POST:"post",
            PAGE:"page"
        },
        post_statue:{
            PUBLISH:'publish',
            DRAFT:"draft"
        },
        FORMAT:"YYYY-MM-DD"
    },
    status:{
        SUCCESS:{code:0,msg:"OK"},
        PASSWORD_ERROR:{code:101,msg:"密码错误"},
        EMPTY_ACCOUNT:{code:102,msg:"空账号"},
        ERR_SERVICE:{code:103,msg:"服务器错误"},
        OTHER_ERR:{code:104}
    },
};