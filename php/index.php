<?php
header('Access-Control-Allow-Origin:*'); //跨域访问的域名，*表示所有
header('Access-Control-Allow-Method:POST,GET'); //跨域支持的请求方式。
include "connect.php";
$result = $conn->query("select * from taobaogoods");
$arr = array(); //定义空数组
for ($i = 0; $i < $result->num_rows; $i++) {
    $arr[$i] = $result->fetch_assoc();
}
echo json_encode($arr);

// 接口地址
//http://192.168.13.6/AIQIYI/php/index.php