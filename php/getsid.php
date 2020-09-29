<?php
header('Access-Control-Allow-Origin:*'); //跨域访问的域名，*表示所有
header('Access-Control-Allow-Method:POST,GET'); //跨域支持的请求方式。
include "connect.php";
if(isset($_GET["sid"])){
    $sid=$_GET["sid"];
    $res=$conn->query("select * from taobaogoods where sid={$sid}");
    echo json_encode($res->fetch_assoc()) ;//否则结果为Array
}else{
    echo "非法操作";
}


// 接口地址
//http://192.168.13.6/AIQIYI/php/getsid.php?sid=1
