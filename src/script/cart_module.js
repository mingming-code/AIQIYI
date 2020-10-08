define(['toTop', 'cookiesum', 'login'], function (totop, cookiesum, login) {
    return {
        init: function () {
            // 头部HTML加载
            $(document).ready(function () {
                $("#foot").load("foot.html", function () {
                    totop.init();
                });
            });
            //登录注册
            $("#login").load("login.html", function () {
                login.init();
            })
            // 调用获取购物车数量的模块
            cookiesum.sum();
            // 当可视区加滚动条小于购物车下面导航的高度时,转为固定定位
            let $bottomnav = $(".order-bottom");
            let $wrap = $(".wrap"); //下面导航的外层
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
            //获取存在cookie的sid和数量
            if ($.cookie("cookiesid") && $.cookie("cookienum")) {
                let sidarr = $.cookie("cookiesid").split(','); //取出sid将值转换成数组。
                let numarr = $.cookie("cookienum").split(','); //取出数量将值转换成数组。
                for (let i = 0; i < sidarr.length; i++) {
                    render(sidarr[i], numarr[i]);

                }
            } else {
                console.log("当前购物车为空");
                $(".nogoods").show();
                $(".main").hide()
            }
            let $inputs = null;

            function render(sid, num) {
                $.ajax({
                    url: "http://192.168.13.6/AIQIYI/php/getsid.php",
                    data: {
                        sid: sid
                    },
                    dataType: "json"
                }).done(function (data) {
                    console.log(data)
                    //克隆隐藏的不可见的列表
                    let itemlist = $(".goodslist:hidden").clone();
                    itemlist.find(".goodsdetail img").attr("src", data.url);
                    itemlist.find(".goodsdetail .img").attr("href", "detail.html?sid=" + sid);
                    itemlist.find(".goodsdetail .title").html(data.title);
                    itemlist.find(".primess .price").html(data.price);
                    itemlist.find(".buynum input").val(num);
                    itemlist.find('.sumprice').html((num * data.price).toFixed(2))
                    itemlist.listid = data.sid;
                    itemlist.show();
                    $(".item-list").append(itemlist);

                    calc()
                    //商品选择框的input集合
                    $inputs = $(".goodslist:visible").find(".good-checkbox")
                })
            }
            //总价和数量渲染
            function calc() {
                //已选择的商品数和总价,遍历可见的列表
                let allcount = 0;
                let allprice = 0;
                $(".goodslist:visible").each(function (index, element) {
                    if ($(element).find(".good-checkbox").prop("checked")) {
                        allcount += parseInt($(element).find(".buynum input").val());
                        allprice += parseFloat($(element).find(".sumprice").html())
                    }
                })

                $(".sumgoods").html(allcount);
                $(".order-bottom .sumprice").html(allprice.toFixed(2));
            }
            //全选按钮
            $(".qx").on("click", function () {
                $(".main").find("input").prop("checked", $(this).prop("checked"));
                //修改选择的商品，重新计算
                calc();
            })

            //将input的点击委托给item-list
            $(".item-list").on("click", $inputs, function (e) {
                // 如果是店铺的选择框
                if (e.target.className === "shopcheckbox") {
                    console.log("店铺选择框")
                    $(e.target).parent().siblings('div').find('.good-checkbox').prop("checked", $(e.target).prop("checked"))
                }
                // 如果是商品选择框
                if (e.target.className === "good-checkbox") {
                    console.log("商品选择框")
                    $(e.target).parent().siblings('div').find('.shopcheckbox').prop("checked", $(e.target).prop("checked"))
                }
                // 如果商品全部被选择
                if ($(".goodslist:visible").find(".good-checkbox:checked").size() === $inputs.length) {
                    $(".qx").prop("checked", true);
                } else {
                    $(".qx").prop("checked", false);
                }

                //添加一个商品
                if (e.target.className === "add") {
                    let num = $(e.target).parent().siblings("input").val()
                    num++;

                    $(e.target).siblings().css({
                        "background-position": "-180px -22px",
                        "cursor": "pointer"
                    })

                    $(e.target).siblings().hover(function () {

                        $(this).css({
                            "background-position": "-180px -44px",
                        })
                    }, function () {

                        $(this).css({
                            "background-position": "-180px -22px",
                        })
                    })

                    total(e, num)
                }
                //减去一个商品
                if (e.target.className === "minus") {
                    let num = $(e.target).parent().siblings("input").val();
                    num--;
                    if (num < 1) {
                        alert("商品不能再少了哦")
                        return;
                    }

                    if (num == 1) {
                        $(e.target).hover(function () {
                            $(this).css({
                                "background-position": "-180px -66px",
                                "cursor": "default"
                            })
                        }, function () {
                            $(this).css({
                                "background-position": "-180px -66px",
                            })
                        })
                    }
                    total(e, num)

                }
                calc();
                // 删除列表
                if (e.target.className === "del") {
                    $(e.target).parent().parent().parent().remove()

                }
            })
            //加减商品后重新计算总价和数量
            function total(e, num) {
                let priceAll = $(e.target).parent().parent().parent().parent().find(".sumprice");
                let price = $(e.target).parent().parent().parent().parent().find(".price");
                priceAll.html((num * price.html()).toFixed(2))
                $(e.target).parent().siblings("input").val(num)
            }
            // 清空购物车
            $(".clearcart").on("click", function () {
                let clear = confirm("你确定清空购物车吗");
                if (clear) {
                    $(".nogoods").show();
                    $(".main").remove();
                    /* 清缓存 */
                    $.cookie('cookiesid', "", {
                        expires: -1,
                        path: "/"
                    });
                    $.cookie('cookienum', "", {
                        expires: -1,
                        path: "/"
                    });

                }

            })
            //结算
            $(".settle-accounts").on("click", function () {
                if (parseFloat($(".totalmess .sumprice").html()) != 0.00) {
                    if ($.cookie("username")) {
                        alert("你将消费" + $(".totalmess .sumprice").html() + "元")
                    } else {
                        $(".shade").show();
                        $('.logdis').show();
                    }
                } else {
                    alert("请选择商品")
                }

            })
        }
    }
});