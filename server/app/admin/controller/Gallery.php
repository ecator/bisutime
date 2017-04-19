<?php
/**
 * Created by PhpStorm.
 * User: qule
 * Date: 2017/4/14
 * Time: 14:07
 */

namespace app\admin\controller;
use think\Controller;
use think\Db;
class Gallery extends Controller
{
    public function index(){
        $this->assign("title","图片审核");
        return $this->fetch();
    }

    //获取所有图片
    public function getAll(){
        $re=Db::table("gallery")->order("update_time desc")->select();
        return json($re);
    }

    //设置状态
    public function setStatus($filename,$status=0){
        $re=Db::table("gallery")->where("filename",$filename)->update(["status"=>$status]);
        if ($re){
            return "ok";
        }else{
            return "fail";
        }
    }

    //删除
    public function del($filename){
        $re=Db::table("gallery")->where("filename",$filename)->delete();
        if ($re){
            //删除磁盘上的文件
            unlink(ROOT_PATH."public".DS."gallery".DS.$filename);
            return "ok";
        }else{
            return "fail";
        }
    }
}