// 数据渲染
define([], function () {
    return {
        init: function () {
            $(document).ready(function () {
                // 头部HTML加载
                $("#head").load("head.html", function () {
                    // 异步的,头部加载成功后执行头部轮播的代码
                    // 头部广告轮播
                    let $lunboli = $(".lunbo li");
                    let $left = $(".head-btn .left");
                    let $right = $(".head-btn .right");
                    let length = $lunboli.size();
                    let count = 1;
                    let timer = null;

                    function tabswitch() {
                        if (count > length - 1) {
                            count = 0
                        }
                        if (count < 0) {
                            count = length - 1;
                        }
                        $lunboli.eq(count).show().siblings().hide()
                    }

                    $right.on("click", function () {
                        tabswitch();
                        count++;
                    })
                    $left.on("click", function () {
                        console.log("左")
                        tabswitch();
                        count--;
                    })
                    timer = setInterval(function () {
                        tabswitch()
                        count++;
                    }, 3000)
                    $(".head-btn,.lunbo").hover(function () {
                        clearInterval(timer)
                    }, function () {
                        timer = setInterval(function () {
                            tabswitch()
                            count++;
                        }, 2000)
                    })
                })
                $("#foot").load("foot.html");
            });

            //数据渲染
            ! function () {
                $.ajax({
                    url: "http://localhost/AIQIYI/php/index.php",
                    dataType: "json",
                }).done(function (data) {
                    console.log(data)
                    let $srchtml = "";
                    let $srchtml2 = "";
                    $.each(data, function (index, value) {
                        // 渲染10条
                        if (index == 10) {
                            return false;
                        }
                        $srchtml += `
                        <li>
                        <a href="detail.html?sid=${value.sid}">
                            <div>
                                <img src="${value.url}"
                                    alt="">
                            </div>
                            <p class="title">${value.title}</p>
                            <p>
                                <span class="bgmess">迷你无线</span>
                                <i class="des">自带充电仓</i>
                            </p>
                            <p class="pricemess">
                                <span class="price">￥${value.price}</span>
                                <span class="sail">已售<b class="sails">${value.sailnumber}</b></span>
                            </p>
                        </a>
                    </li> 
                     `
                        if (index < 5) {
                            $srchtml2 += `
                        <li>
                        <div>
                            <img class="img"
                                src="${value.url}"
                                alt="">
                        </div>
                        <div class="sortright">
                            <h2></h2>
                            <p class="des">${value.title}</p>
                            <p class="pricmess">
                                <span class="price">￥${value.price}</span>
                                <span>已售<span class="sail">${value.sailnumber}</span></span>
                            </p>
                        </div>
                    </li>
                        `
                        }

                    })
                    $('.main-goods-list').html($srchtml)
                    $(".sortlist1").html($srchtml2)
                })
            }()

            // 导航栏样式切换
            $navli = $("nav ul li");
            $navli.on("click", function () {
                $(this).addClass("active").siblings().removeClass("active")
            })
            // 回到底部
            $('.toTop').on('click', function () {
                $('html,body').animate({
                    scrollTop: 0
                }, 300)
            })
            //高度小于可视区显示
            $top = $(window).scrollTop();
            $scrollmenu = $(".scrollmenu")

            function showtop() {
                if ($top > 0) {
                    $scrollmenu.show()
                } else {
                    $scrollmenu.hide()
                }
            }
            showtop();
            $(window).on("scroll", function () {
                $top = $(window).scrollTop();
                showtop()
            })
            // banner轮播图
            let $banner = $(".banner")
            let $leftarrow = $(".banner .left");
            let $rightarrow = $(".banner .right");
            let $circle = $(".banner ol li"); //轮播图下面的小圆圈
            let $liimg = $(".banner ul li") //轮播图图片
            let cirindex = 0;
            let timer1 = null;
            $banner.hover(function () {
                $(".arrow").stop().animate({
                    "opacity": 0.7
                }, 800);
                clearInterval(timer1)
            }, function () {
                $(".arrow").stop().animate({
                    "opacity": 0
                }, 800);
                timer1 = setInterval(function () {
                    $rightarrow.click()
                }, 1000)
            })
            $rightarrow.on("click", function () {
                cirindex++;
                tabswitch1();
            });
            $leftarrow.on("click", function () {
                cirindex--;
                tabswitch1()
            });
            timer1 = setInterval(function () {
                $rightarrow.click()
            }, 1000)
            // 封装轮播图切换
            function tabswitch1() {
                if (cirindex > $circle.size() - 1) {
                    cirindex = 0;
                };
                if (cirindex < 0) {
                    cirindex = $circle.size() - 1;
                }
                $liimg.stop().animate({
                    "opacity": 0
                })
                $liimg.eq(cirindex).stop().animate({
                    "opacity": 1
                })
                $circle.eq(cirindex).addClass("active").siblings("li").removeClass("active");
            }
        }
    }
})