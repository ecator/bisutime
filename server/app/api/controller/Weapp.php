<?php
/**
 * Created by PhpStorm.
 * User: qule
 * Date: 2017/4/17
 * Time: 21:27
 */

namespace app\api\controller;

use think\Controller;
use think\Db;
use app\common\Time;
use app\common\Calendar;
class Weapp extends Controller
{
    public function index(){
        return json(new Time());
    }
    //获取日历配置
    public function getCalendar(){
        $basic=Db::table("calendar_title")->find();
        $calendar=new Calendar($basic["title"]);
        $calendar->start=new Time($basic["start"]);
        $calendar->end=new Time($basic["end"]);
        $types=array("holiday"=>"addHoliday","test"=>"addTest","study"=>"addStudy");
        foreach ($types as $type =>$add){
            foreach (Db::table("calendar_type")->where("type",$type)->select() as $key => $val){
                $calendar->$add(new Time($val["start"]),new Time($val["end"]));
            }
        }
        $replacements=Db::table("calendar_replace")->select();
        foreach ($replacements as $replacement) {
            $calendar->addReplacement($replacement["title"],new Time($replacement["date"]));
        }
        return json($calendar);
    }
    //获取通知
    public function getNotification(){
        $notification=new \stdClass();
        $notifications=Db::table("notification")->select();
        $notification->header=$notifications[0]["content"];
        $notification->footer=$notifications[1]["content"];
        return json($notification);
    }
    //获取多语言配置
    public function getLocale(){
        $locales=Db::table("locale")->select();
        return json($locales);
    }
    //根据语言数返回随机图片
    public function getImgs(){
        $langs=Db::query("SELECT language FROM locale GROUP BY language");
        return json(getRandomImgs(count($langs)));
    }
}