/**
 * Created by qule on 2017/4/14.
 */
$(document).ready(function () {
    //登录提交事件
    $("#login").submit(function () {
        if (!this["user"].value){
            alert("请输入用户名");
            this["user"].focus();
            return false;
        }else if (!this['password'].value){
            alert("请输入密码");
            this['password'].focus();
            return false;
        }
        this["password"].value=$.md5(this["password"].value);
    });
});