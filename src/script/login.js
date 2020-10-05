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
            let $log = $(".resdis").find(".login-bottom").find("a");
            $log.on("click", function () {
                $(".logdis").show();
                $(".resdis").hide()
            })

            let $login = $(".login");
            let $register = $(".register");
            let $close = $(".close");
            $close.on("click", function () {
                $(".log_in").hide();
                $(".shade").hide();
            })
            $login.on("click", function () {
                $(".shade").show();
                $('.logdis').show();
            })
            $register.on("click", function () {
                $(".shade").show();
                $('.resdis').show();
            })
        }
    }
});