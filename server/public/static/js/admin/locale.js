/**
 * Created by qule on 2017/4/17.
 */
$(document).ready(function () {
    //表单提交事件
    $("form").submit(function () {
        $(this).find("input").each(function () {
            if (!this.value){
                alert("请输入"+this.name);
                this.focus();
                event.preventDefault();
                return false;
            }
        });
        return true
    });
});