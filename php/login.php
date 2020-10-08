<?php
include "connect.php";
//解决跨域
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');

if(isset($_POST['username']) && isset($_POST['password'])){
    $user= $_POST['username'];
    $pass = $_POST['password'];
    $result = $conn->query("select * from registry where username='$user' and password='$pass'");
    if($result->fetch_assoc()){//登录成功
        echo true;
    }else{//失败
        echo false;
    }
}else{
    echo "非法操作";
}
// 接口地址
// http://192.168.13.6/AIQIYI/php/login.php