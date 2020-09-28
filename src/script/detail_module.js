define([], function() {
    return {
        init:function(){
             // 头部HTML加载
             $(document).ready(function () {
                 $("#head").load("head.html");
                 $("#foot").load("foot.html")
             });

             
        }
    } 
 });