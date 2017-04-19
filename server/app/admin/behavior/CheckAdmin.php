<?php
/**
 * Created by PhpStorm.
 * User: qule
 * Date: 2017/2/25
 * Time: 18:50
 * 检测是否是管理员登录状态
 * 本钩子会在admin模块初始化的时候开始执行
 */

namespace app\admin\behavior;
use think\Session;
use think\Controller;

class CheckAdmin extends Controller
{
    public function run(){
//        dump($_SERVER);
        if (Session::has("status") && Session::get("status")==1){
            return true;
        }elseif($_SERVER['PATH_INFO']=="/admin" || $_SERVER['PATH_INFO']=="/admin/index/login"){
            //管理登录首页或者验证行为
            return true;
        }else{
            $this->error("非法操作","/admin");
            return false;
        }
    }

}