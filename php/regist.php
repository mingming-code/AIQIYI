<?php
include "connect.php";

//解决跨域
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');

if (isset($_POST["username"])||isset($_POST["submit"])) {
    $user = $_POST["username"];
    $res = $conn->query("select * from registry where username='$user'");
    if ($res->fetch_assoc()) {
        echo false;//存在返回false，不能注册
    } else {
        echo true;//不存在可以注册
    }
} else {
    exit('非法操作');//退出，并显示文字
}
if(isset($_POST["submit"])){
    $user=$_POST["username"];
    $pass=sha1($_POST["password"]);
    $email=$_POST["email"];
    $conn->query("insert registry values(default,'$user','$pass','$email',NOW())");
    header("location:http://localhost/AIQIYI/src/index1.html");
}
