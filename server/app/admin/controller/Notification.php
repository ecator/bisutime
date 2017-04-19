<?php
/**
 * Created by PhpStorm.
 * User: qule
 * Date: 2017/4/17
 * Time: 16:49
 */

namespace app\admin\controller;
use think\Controller;
use think\Db;

class Notification extends Controller
{
    public function index(){
        $this->assign("title","通知管理");
        //notification只会储存两条数据，第一条是header，第二条是footer
        $re=Db::table("notification")->select();
        $notification=array();
        $notification["header"]=$re[0]["content"];
        $notification["footer"]=$re[1]["content"];
        $this->assign("notification",$notification);
        return $this->fetch();
    }
    public function setNotification($header,$footer){
        $re1=Db::table("notification")->where("name","header")->update(["content"=>$header]);
        $re2=Db::table("notification")->where("name","footer")->update(["content"=>$footer]);
        if ($re1+$re2){
            $this->success("修改成功","/admin/notification");
        }else{
            $this->error("修改失败","/admin/notification");
        }
    }
}