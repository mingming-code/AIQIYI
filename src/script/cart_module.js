define(['toTop'], function () {
    return {
        init: function () {
            // 头部HTML加载
            $(document).ready(function () {
                $("#head").load("head.html");
                $("#foot").load("foot.html")
            });
            // 当可视区加滚动条小于购物车下面导航的高度时,转为固定定位
            let $bottomnav = $(".order-bottom");
            let $wrap=$(".wrap");//下面导航的外层
            let $top = $(window).scrollTop();
            // 初始判断
            fix()
            $(window).on("scroll", function () {
                $top = $(window).scrollTop();
                fix()
            })
            function fix() {
                if ($wrap.offset().top >= document.documentElement.clientHeight + $top) {
                   
                    $bottomnav.css({
                        position: "fixed",
                        bottom: 0,
                    })
                } else {
                  
                    $bottomnav.css({
                        position: "static", 

                    })
                }
            }
        }
    }
});