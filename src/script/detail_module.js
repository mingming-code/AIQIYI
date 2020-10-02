define([], function () {
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
            //    加入购物车
            let count = $(".buynum").html()
            $(".join").on("click", function () {
                count++;
                $(".shadow").show();
                $(".showinfo").show();
                $(".buynum").html(count);
            });
            // 关闭
            $(".close").on("click",function(){
                $(".shadow").hide();
                $(".showinfo").hide()
            })
        }
    }
});