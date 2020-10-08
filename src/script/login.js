define(['sha1'], function () {
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
            //关闭登录注册
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

            // 得到焦点提示信息
            $(".login-main input").not('.resbtn').focus(function () {
                $(this).val("")
                $(this).siblings("p").show();
                $(this).css("color", "black")
            })
            // 登录
            $('.loginbtn').on('click', function () {
                $.ajax({
                    type: 'post',
                    url: ' http://192.168.13.6/AIQIYI/php/login.php',
                    data: {
                        username: $('.loginuser').val(),
                        password: hex_sha1($('.loginpass').val())
                    }
                }).done(function (result) {
                    if (result) {
                        // 登录成功
                        $(".log_in").hide();
                        $(".shade").hide();
                        $(".head-top .left").html($('.loginuser').val() + ",欢迎来到爱奇艺商城")
                        $.cookie('username', $('.loginuser').val());
                    } else {
                        $('.loginuser').val("");
                        $('.loginpass').val("")
                        alert('用户名或者密码错误');
                    }
                });
            });
            //注册
            let username = $(".resuser");
            let password = $(".respass");
            let email = $(".resemail");
            let $p1 = $(".resuser").siblings("p");
            let $p2 = $(".respass").siblings("p");
            let $p3 = $(".resemail").siblings("p");
            let $usernameflag = true;
            let $passwordflag = true;
            let $emailflag = true;
            username.blur(function () {
                if(username.val() === ""){
                    $p1.html("用户名不能为空");
                    $p1.css("color", "#f94343");
                    $usernameflag = false;
                    return;
                }
                $.ajax({
                    type: "post",
                    url: "http://192.168.13.6/AIQIYI/php/regist.php",
                    data: {
                        username: username.val(),
                    },
                }).done(function (data) {
                    if (data) {
                        $p1.html("√")
                        $p1.css("color", "#aaa")
                        $usernameflag = true;
                    } else {
                        $p1.html("该用户名已存在");
                        $p1.css("color", "#f94343")
                        $usernameflag = false;
                    }
                })
            })
            password.blur(function () {
                if (password.val() !== "") {
                    $p2.html("请输入密码");
                    $p2.css("color", "#aaa");
                    $passwordflag = true;
                  
                } else{
                    $p2.html("密码不能为空");
                    $p2.css("color", "#f94343");
                    $passwordflag = false;
                }
            });
           email.blur(function () {
                if (email.val() !== "") {
                    $p3.html("请输入邮箱");
                    $p3.css("color", "#aaa");
                    $passwordflag = true;
                  
                } else{
                    $p3.html("邮箱不能为空");
                    $p3.css("color", "#f94343");
                    $emailflag = false;
                }
            });
            $('form').on('submit', function() {
                
                if (username.val() == '') {
                    $p1.html("用户名不能为空");
                    $p1.css("color", "#f94343").show();
                    $usernameflag = false;
                }
                if (password.val() == '') {
                    $p2.html("密码不能为空");
                    $p2.css("color", "#f94343").show();
                    $passwordflag = false;
                }
                if (email.val() == '') {
                    $p3.html("邮箱不能为空");
                    $p3.css("color", "#f94343").show();
                    $emailflag = false;
                }
                if (!$usernameflag||!$passwordflag||$emailflag) {
                    return false; //阻止提交
                }             
            });
        }
    }
});