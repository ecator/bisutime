/**
 * Created by qule on 2017/4/13.
 */
$(document).ready(function () {
    //上传图片表单上传事件
    $("form.upload").submit(function () {
        // console.log("photopath",this["photopath"].value);
        // console.log("photographer",this["photographer"].value);
        if (!this["photopath"].value){
            alert("啊咧咧，同学你好像忘了选择照片");
            this["photopath"].focus();
            return false;
        }else if (!this["photographer"].value){
            alert("君の名は。");
            this["photographer"].focus();
            return false;
        }
    });

    //点击模态框放大图片
    $(".thumbnail").click(function () {
        $("#photomodal img.full-img").attr("src",$(this).find("img").attr("src"));
        $("#photomodal").modal();
    });

    //实时显示时间
    setInterval(function () {
        var date=new Date;
        $(".time").text(date.getFullYear()+"年"+String(date.getMonth()+1)+"月"+date.getDate()+"日 "+date.getHours()+"时"+date.getMinutes()+"分"+date.getSeconds()+"秒");
    },1000);
});