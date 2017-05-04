/**
 * Created by qule on 2017/4/14.
 */
$(document).ready(function () {
    //文档加载完毕
    getGallerys();
    //点击模态框放大图片
    $(".container").on("click","img",function () {
        $("#photomodal img.full-img").attr("src",$(this).attr("src"));
        $("#photomodal").modal();
    });
    //注册取消显示事件
    $(".container").on("click",".btn-warning",function () {
        // console.log($(this).data("filename"));
        $.post("/admin/gallery/setstatus","filename="+$(this).data("filename")+"&status=0",function (data) {
            if (data=="ok"){
                getGallerys();
            }
        })
    });
    //注册通过显示事件
    $(".container").on("click",".btn-success",function () {
        // console.log($(this).data("filename"));
        $.post("/admin/gallery/setstatus","filename="+$(this).data("filename")+"&status=1",function (data) {
            if (data=="ok"){
                getGallerys();
            }
        })
    });
    //注册删除事件
    $(".container").on("click",".btn-danger",function () {
        // console.log($(this).data("filename"));
        $.post("/admin/gallery/del","filename="+$(this).data("filename"),function (data) {
            if (data=="ok"){
                getGallerys();
            }
        })
    });
});
//生成图片详细表格
function getGallerys() {
    $.get("/admin/gallery/getall",function (data) {
        // console.log(data);
        var table="<table class='table'><tr><th>#</th><th>预览</th><th>作者</th><th>上传时间</th><th>操作</th></tr>";
        $.each(data,function (i,item) {
            if (item["status"]){
                //通过
                var status="<button class='btn btn-warning' data-filename='"+item["filename"]+"'>取消显示</button>";
                var tr="info";
            }else {
                //未通过
                var status="<button class='btn btn-success' data-filename='"+item["filename"]+"'>通过审核</button>";
                var tr="active";
            }
            var del="<button class='btn btn-danger' data-filename='"+item["filename"]+"'>删除</button>";
            table+="<tr class='"+tr+"'><td>"+String(i+1)+"</td><td><img class='lazy' src='/static/img/loading.gif' data-original='/gallery/"+item["filename"]+"' alt='"+item["photographer"]+"'></td><td>"+item["photographer"]+"</td><td>"+item["create_time"]+"</td><td>"+status+del+"</td></tr>";
        });
        table+="</table>";
        $(".container").html(table);
        //延迟加载图片
        $("img.lazy").lazyload({effect:"fadeIn",threshold:100});
    })
}