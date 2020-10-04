define(['toTop', 'cookiesum', 'pagination', 'jlazyload'], function (totop, cookiesum) {
    return {
        init: function () {
            // 头部HTML加载
            $(document).ready(function () {
                $("#head").load("head.html", function () {
                    // 调用获取购物车数量的模块
                    cookiesum.sum();
                })
                $("#foot").load("foot.html", function () {
                    totop.init();
                });
            });
            // 左边导航收放
            let $menuli = $(".searchResult_LUl .first i") //获取一级导航的图标
            let $subUl = $(".ul_inner") //获取二级导航
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
            let $headli = $(".head li");
            $headli.on("click", function () {
                $(this).addClass("active").siblings().removeClass("active")
            })

            // 封装重置数组
            function resetarr() {
                array_default = []; //排序前的li数组
                array = []; //排序中的数组
                prev = null;
                next = null;
                //将页面的li元素追加到两个数组中。
                $('.datalist li').each(function (index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            }
            //封装渲染数据
            function render(data) {
                let $strhtml = ""
                $.each(data, function (index, value) {
                    $strhtml += `
                    <li>
                    <a href="detail.html?sid=${value.sid}">
                    <img src="${value.url}"/>
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
            }
            //1.列表渲染-默认渲染第一页
            //排序
            let array_default = []; //排序前的li数组，默认数组
            let array = []; //排序中的数组
            let prev = null; //前一个价格
            let next = null; //后一个价格
            $.ajax({
                url: "http://localhost/AIQIYI/php/listdata.php",
                dataType: "json",
            }).done(function (data) {
                console.log(data)
                let $strhtml = ""
                $.each(data, function (index, value) {
                    //懒加载的img
                    // <img class="lazy" data-original="${value.url}" width="228" height="228"/>
                    $strhtml += `
                    <li>
                    <a href="detail.html?sid=${value.sid}">
                    <img src="${value.url}"/>
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

                //重置数组
                resetarr()
                //懒加载,元素高度大于可视区时才可以使用
                // $(function () {
                //     $("img.lazy").lazyload({
                //         effect: "fadeIn"
                //     });
                // });
            })

            // 2.分页
            $('.page').pagination({
                pageCount: 4, //总的页数 - 后端传入的。
                jump: true, //是否开启跳转到指定的页数，布尔值。
                coping: true, //是否开启首页和尾页，布尔值。
                prevContent: '上一页',
                nextContent: '下一页',
                homePage: '首页',
                endPage: '尾页',
                callback: function (api) {
                    $headli.removeClass("active") //分页时去除头部导航样式
                    console.log(api.getCurrent()); //获取的页码给后端
                    $.ajax({
                        url: 'http://localhost/AIQIYI/php/listdata.php',
                        data: {
                            page: api.getCurrent() //传输页面
                        },
                        dataType: 'json'
                    }).done(function (data) {
                        // 渲染
                        render(data);
                        //重置数组
                        resetarr();
                    });
                }
            });
            //3.排序
            let $defaultsort = $headli.eq(0) //默认排序的li
            let $pricesort = $headli.eq(1) //价格排序的li
            let $sailsort = $headli.eq(2) //销量排序的li
            //默认排序
            //append在追加的时候，如果追加的是jquery的元素对象，而jquery元素对象在你追加的元素中存在，直接取出存在的元素，从后面追加。
            //如果追加的是内容结构，依然和appendChild一样，后面继续追加。
            $defaultsort.on("click", function () {
                $.each(array_default, function (index, value) {
                    $('.datalist').append(value);
                });
                return;
            })
            // 按价格升序排序
            $pricesort.on("click", function () {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.price').html()); //获取上一个价格
                        next = parseFloat(array[j + 1].find('.price').html()); //获取下一个价格
                        //通过价格的判断，改变的是li的位置。
                        if (prev > next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $.each(array, function (index, value) {
                    $('.datalist').append(value);
                });
            })
            //按销量降序排
            $sailsort.on("click", function () {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.sail').html()); //获取上一个销量
                        next = parseFloat(array[j + 1].find('.sail').html()); //获取下一个销量
                        //通过价格的判断，改变的是li的位置。
                        if (prev < next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $.each(array, function (index, value) {
                    $('.datalist').append(value);
                });
            })
        }
    }
});