define([], function () {
    return {
        init: function () {
            // 注册按钮
            let $res = $(".logdis").find(".login-bottom").find("a");
            $res.on("click", function () {
                $(".logdis").hide();
                $(".resdis").show()
            })
            //登录按钮
            let $log=$(".resdis").find(".login-bottom").find("a");
            $log.on("click", function () {
                $(".logdis").show();
                $(".resdis").hide()
            })
        }
    }
});