define([], function () {
    return {
        init: function () {
            // 头部HTML加载
            $(document).ready(function () {
                $("#head").load("head.html")
                $("#foot").load("foot.html")
            });
            // 左边导航收放
            $menuli = $(".searchResult_LUl .first i") //获取一级导航的图标
            $subUl = $(".ul_inner") //获取二级导航
            let flag = true; //定义初始按钮加号状态
            $menuli.on("click", function () {
                flag = !flag; //点击切换状态
                let index = ($(this).parent().parent().index());
                if (flag) {
                    $(this).css({
                        //加号位置
                        "background-position": "0px -255px"
                    });
                    $subUl.eq(index).hide();
                } else {
                    $(this).css({
                        // 减号位置
                        "background-position": "-25px -255px"
                    });
                    $subUl.eq(index).show();

                }
            })
            // 右边导航点击样式
            $headli = $(".head li");
            $headli.on("click", function () {
                $(this).addClass("active").siblings().removeClass("active")
            })
            //列表渲染
            $.ajax({
                url: "http://localhost/AIQIYI/php/aiqiyi.php",
                dataType: "json"
            }).done(function (data) {
                console.log(data)
                let $strhtml = ""
                $.each(data, function (index, value) {
                    $strhtml += `
                    <li>
                    <a href="detail.html?sid=${value.sid}">
                        <img src="${value.url}"
                            alt="">
                    </a>
                    <a href="" class="title">
                        <span class="orange">青春有你2</span>
                        ${value.title}
                    </a>
                    <p class="primess">
                        <span class="mess1">￥<span class="price">${value.price}</span></span>
                        <span class="mess2">销量: <span class="sail">${value.sailnumber}</span></span>
                    </p>

                </li>`
                })
                $(".datalist").html($strhtml)
            })
        }
    }
});