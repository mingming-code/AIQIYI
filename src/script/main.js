//模块的配置
require.config({
    paths: { //路径
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        'jcookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.0/jquery.cookie.min',
        'jlazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.8.3/jquery.lazyload.min'
    },
    shim: { //让不支持AMD的模块，支持AMD模块
        'jcookie': {
            deps: ['jquery'], //依赖的模块
            exports: 'jcookie' //别名
        },
        'jlazyload': {
            deps: ['jquery'],
            exports: 'jlazyload'
        }
    }
});

require(['jquery', 'jcookie', 'jlazyload'], function() {
    //通过不同的页面调用不同的模块
    //1.获取script标签里面的自定义属性data-page
    let pagemod = $('#currentpage').attr('data-page'); //获取自定义属性的值 
    console.log(pagemod);
    //2.加载script标签里面约定的模块名。
    require([pagemod], function(page) {
        //调用了index_module  lsit_module  detail_module
        //page:index_module模块的返回值。
        //page.init():调用index_moudule模块的init()
        page.init();
    });
})