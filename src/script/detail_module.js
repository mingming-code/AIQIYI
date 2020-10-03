define(['jcookie'], function () {
    return {
        init: function () {
            // 头部HTML加载
            $(document).ready(function () {
                $("#head").load("head.html");
                $("#foot").load("foot.html")
            });
            //数据渲染
            //获取sid，默认为1
            let sid = location.search.substring(1).split("=")[1];
            if (!sid) {
                sid = 1
            }
            $.ajax({
                url: 'http://localhost/AIQIYI/php/getsid.php',
                dataType: 'json',
                data: {
                    sid: sid
                }
            }).done(function (data) {
                console.log(data)
                $(".title").html(data.title);
                $(".price").html(data.price);
                $(".sailnum").html(data.sailnumber);
                $(".smallimg img").attr("src", data.url);
                $(".df img").attr("src", data.url);
                let $piclistarr = data.piclisturl.split(",");
                let $piclist = $(".piclist ul");
                let imgstr = "";
                $.each($piclistarr, function (index, value) {
                    //小图只渲染五张
                    if (index === 5) {
                        return false;
                    }
                    imgstr += ` <li><img src="${value}" alt=""></li>`
                })
                $piclist.html(imgstr);
                let $imgli = $(".piclist li");
                $imgli.hover(function () {
                    $(".smallimg img").attr("src", $(this).find("img").attr("src"));
                    $(".df img").attr("src", $(this).find("img").attr("src"));
                })
            })
            // 放大镜效果
            const $spic = $(".smallimg"); //小图
            const $bigimg = $(".bigimg"); //大图
            const $sf = $(".sf"); //小放
            const $df = $(".df"); //大放
            $spic.hover(function () {
                //设置小放的大小;
                let $width = $spic.width() * $df.width() / $bigimg.width();
                let $height = $spic.height() * $df.height() / $bigimg.height()

                $sf.css({
                    width: $width,
                    height: $height
                })
                //3.放大的比例>1  大图/小图
                let bili = $bigimg.width() / $spic.width();
                $sf.show();
                $df.show();
                //鼠标移动
                $spic.on("mousemove", function (e) {
                    let l = e.pageX - $spic.offset().left - $sf.width() / 2;
                    let t = e.pageY - $spic.offset().top - $sf.height() / 2;
                    //限制范围
                    if (l < 0) {
                        l = 0
                    }
                    if (l > $spic.width() - $sf.width()) {
                        l = $spic.width() - $sf.width()
                    }
                    if (t < 0) {
                        t = 0
                    }
                    if (t > $spic.height() - $sf.height()) {
                        t = $spic.height() - $sf.height()
                    }
                    $sf.css({
                        left: l,
                        top: t
                    })
                    $bigimg.css({
                        left: -l * bili,
                        top: -t * bili
                    })
                })
            }, function () {
                $sf.hide();
                $df.hide();
            })

            let count;
            if ($.cookie("cookienum")) {
                //    获取购物车总数
                count = $.cookie("cookienum").split(',').reduce(function (prev, curr) {
                    return Number(prev) + Number(curr);
                })
            } else {
                count = 0;
            }
            $(".buynum").html(count);
            let sidarr = []; //商品的id
            let numarr = []; //商品的数量
            //    加入购物车
            $(".join").on("click", function () {
                //获取购物车输入的数量转为整数
                let num = +$(".number").find("input").val();
                //如果商品小于等于0不能加入购物车
                if (num <= 0) {
                    alert("该宝贝不能减少了哦")
                    return;
                }
                count += num;
                $(".shadow").show();
                $(".showinfo").show();
                $(".buynum").html(count);

                // cookie存在，取出sid和数量
                if ($.cookie("cookiesid") && $.cookie("cookienum")) {
                    sidarr = $.cookie("cookiesid").split(','); //取出sid将值转换成数组。
                    numarr = $.cookie("cookienum").split(','); //取出数量将值转换成数组。
                }

                // sid在cookie数组中存在,如果是默认sid是1，需要转为字符串1
                if (sidarr.indexOf(String(sid)) != -1) {
                    // 查找sid在数组中的位置
                    let sidindex = $.inArray(String(sid), sidarr)
                    numarr[sidindex] = Number(numarr[sidindex]) + Number(num)
                    //sid存在重置当前sid的数量
                    $.cookie('cookienum', numarr, {
                        expires: 10,
                        path: "/"
                    });
                } else { //sid在cookie数组中不存在
                    sidarr.push(sid)
                    numarr.push(num)
                    $.cookie('cookiesid', sidarr, {
                        expires: 10,
                        path: "/"
                    });
                    $.cookie('cookienum', numarr, {
                        expires: 10,
                        path: "/"
                    });

                }
            });
            // 关闭
            $(".close").on("click", function () {
                $(".shadow").hide();
                $(".showinfo").hide()
            })
        }
    }
});