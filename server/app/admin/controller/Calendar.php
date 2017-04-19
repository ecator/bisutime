<?php
/**
 * Created by PhpStorm.
 * User: qule
 * Date: 2017/4/14
 * Time: 17:02
 */

namespace app\admin\controller;
use think\Controller;
use think\Db;

class Calendar extends Controller
{
    //输出设置标题页面
    public function title(){
        $this->assign("title","校历标题");
        $this->assign("calendar",Db::table("calendar_title")->find());
        return $this->fetch();
    }
    //设置校历标题
    public function setTitle($id=1,$title,$start,$end){
        $re=Db::table("calendar_title")->where("id",$id)->update(["title"=>$title,"start"=>$start,"end"=>$end]);
        if ($re){
            $this->success("修改成功","/admin/calendar/title");
        }else{
            $this->error("修改失败","/admin/calendar/title");
        }
    }

    //输出校历类型
    public function type(){
        $this->assign("title","校历类型");
        $this->assign("calendars",Db::table("calendar_type")->order("start desc")->select());
        $types=array("holiday","test","study");
//        dump($types);
        $this->assign("types",$types);
        return $this->fetch();
    }

    //修改校历类型
    public function setType($id,$start,$end,$type){
        $re=Db::table("calendar_type")->where("id",$id)->update(["type"=>$type,"start"=>$start,"end"=>$end]);
        if ($re){
            $this->success("修改成功","/admin/calendar/type");
        }else{
            $this->error("修改失败","/admin/calendar/type");
        }
    }
    //增加校历类型
    public function addType($start,$end,$type){
        $re=Db::table("calendar_type")->insert(["start"=>$start,"end"=>$end,"type"=>$type]);
        if ($re){
            $this->success("添加成功","/admin/calendar/type");
        }else{
            $this->error("添加失败","/admin/calendar/type");
        }
    }
    //删除校历
    public function delType($id){
        $re=Db::table("calendar_type")->where("id",$id)->delete();
        if ($re){
            $this->success("删除成功","/admin/calendar/type");
        }else{
            $this->error("删除失败","/admin/calendar/type");
        }
    }

    //输出日期替换面板
    public function replace(){
        $this->assign("title","校历日期替换");
        $this->assign("calendars",Db::table("calendar_replace")->order("date desc")->select());
        return $this->fetch();
    }
    //修改替换类型
    public function setReplace($id,$title,$date){
        $re=Db::table("calendar_replace")->where("id",$id)->update(["title"=>$title,"date"=>$date]);
        if ($re){
            $this->success("修改成功","/admin/calendar/replace");
        }else{
            $this->error("修改失败","/admin/calendar/replace");
        }
    }
    //删除替换类型
    public function delReplace($id){
        $re=Db::table("calendar_replace")->where("id",$id)->delete();
        if ($re){
            $this->success("删除成功","/admin/calendar/replace");
        }else{
            $this->error("删除失败","/admin/calendar/replace");
        }
    }
    //增加替换类型
    public function addReplace($title,$date){
        $re=Db::table("calendar_replace")->insert(["title"=>$title,"date"=>$date]);
        if ($re){
            $this->success("增加成功","/admin/calendar/replace");
        }else{
            $this->error("增加失败","/admin/calendar/replace");
        }
    }
}