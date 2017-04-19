<?php
/**
 * Created by PhpStorm.
 * User: qule
 * Date: 2017/4/17
 * Time: 17:27
 */

namespace app\admin\controller;
use think\Controller;
use think\Db;
use think\Request;

class Locale extends Controller
{
    public function index(){
        $this->assign("title","多语言配置");
        $locales=Db::table("locale")->select();
        //需要构造一个空的locale数组来渲染添加操作界面
        $add=array();
        foreach (Db::getTableInfo("locale","fields") as $key=>$val){
            $add[$val]="";
        }
        $locales[]=$add;
        $this->assign("locales",$locales);
        return $this->fetch();
    }
    public function addlocale(Request $request){
        $isdouble=Db::table("locale")->where("language",$request->post("language"))->find()?true:false;
        if (!$isdouble && Db::table("locale")->insert($request->post())){
            $this->success("增加成功","/admin/locale");
        }else{
            $this->success("增加失败","/admin/locale");
        }
    }
    public function setlocale(Request $request){
        if (Db::table("locale")->where("language",$request->post("language"))->update($request->post())){
            $this->success("修改成功","/admin/locale");
        }else{
            $this->success("修改失败","/admin/locale");
        }
    }
    public function dellocale($language){
        if (Db::table("locale")->where("language",$language)->delete()){
            $this->success("删除成功","/admin/locale");
        }else{
            $this->success("删除失败","/admin/locale");
        }
    }
}