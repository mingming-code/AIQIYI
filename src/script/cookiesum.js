define([], function () {
    return {
        sum: function () {
            let count;
            if ($.cookie("cookienum")) {
                //    获取购物车总数
                count = +$.cookie("cookienum").split(',').reduce(function (prev, curr) {
                    return Number(prev) + Number(curr);
                })
            } else {
                count = 0;
            }
            // 头部显示购物车数量
            $(".carli").find("span").html(count)
            //存在用户名
            if ($.cookie("username")) {
                $(".head-top .left").html($.cookie("username") + ",欢迎来到爱奇艺商城")
            }
        }
    }
});