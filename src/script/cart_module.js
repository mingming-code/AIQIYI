define(['toTop'], function (totop) {
    return {
        init: function () {
            // 头部HTML加载
            $(document).ready(function () {
                $("#head").load("head.html");
                $("#foot").load("foot.html", function () {
                    totop.init();
                });
            });
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
                    render(sidarr[i], numarr[i])
                }
            } else {
                console.log("当前购物车为空");
            }

            function render(sid, num) {
                $.ajax({
                    url: "http://localhost/code/shoppingcar/php/gegtsid.php",
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
                    // //商品选择框的input集合
                    // $inputs = $(".goods-item:visible").find(".cart-checkbox input").not(".allsel")
                })
            }
            //总价和数量渲染
            function calc() {
                //已选择的商品数和总价,遍历可见的列表
                let allcount = 0;
                let allprice = 0;
                $(".goodslist:visible").each(function (index, element) {
                    if ($(element).find(".good-checkbox").prop("checked")) {
                        allcount += parseInt($(element).find("..buynum input").val());
                        allprice += parseFloat($(element).find(".sumprice").html())
                    }
                })

                $(".sumgoods").html(allcount);
                $(".order-bottom .sumprice").html(allprice.toFixed(2));
            }
            $(".good-checkbox").on("click", function () {
                console.log("dl")
                $(this).prop("checked");
             
                //修改选择的商品，重新计算
                calc();
            })
        }
    }
});