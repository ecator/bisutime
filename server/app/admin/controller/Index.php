<?php
/**
 * Created by PhpStorm.
 * User: qule
 * Date: 2017/4/14
 * Time: 11:11
 */

namespace app\admin\controller;

use think\Controller;
use think\Session;
use think\Db;

class Index extends Controller
{
    public function index(){
        $this->assign("title","二外时间后台");
        if (Session::has("admin") && Session::get("status")==1){
            $this->assign("admin",Session::get("admin"));
        }else{
            $this->assign("admin","");
        }
        return $this->fetch();
    }
    public function login($user,$password){
        $re=Db::table("admin")->where("user",$user)->find();
        if ($re && $re["pw"]==$password){
            //登录成功
            Session::set("admin",$user);
            Session::set("status",1);
            $this->success("登录成功","/admin");
        }else{
            //登录失败
            $this->error("登录失败","/admin");
        }
    }
    public function logout(){
        if (Session::has("status")){
            Session::set("status",0);
        }
        $this->redirect("/admin");
    }
}