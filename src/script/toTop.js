define([], function () {
    return {
        init: function () {
            // 回到底部
            $('.toTop').on('click', function () {
                $('html,body').animate({
                    scrollTop: 0
                }, 300)
            })
            //高度小于可视区显示
            let $top = $(window).scrollTop();
            let $scrollmenu = $(".scrollmenu")
            if ($top > 0) {
                $scrollmenu.show()
            } else {
                $scrollmenu.hide()

            }
            $(window).on("scroll", function () {
                $top = $(window).scrollTop();
                if ($top > 0) {
                    $scrollmenu.show()
                  
                } else {
                    $scrollmenu.hide()

                }
            })
        }
    }
})