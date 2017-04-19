<?php
/**
 * Created by PhpStorm.
 * User: qule
 * Date: 2017/4/17
 * Time: 21:41
 * js Date 风格的时间对象，支持从一个字符串格式化
 */

namespace app\common;


class Time
{
    private $time=0;
    public $year;
    public $month;
    public $date;
    public $day;
    public $hours;
    public $minutes;
    public $seconds;
    public $milliseconds;
    public function __construct($str="")
    {
        if (!$str){
            $this->time=time();
        }else{
            $this->time=strtotime($str);
        }
        //初始化属性，方便转化成json对象
        $this->year=$this->getYear();
        $this->month=$this->getMonth();
        $this->date=$this->getDate();
        $this->day=$this->getDay();
        $this->hours=$this->getHours();
        $this->minutes=$this->getMinutes();
        $this->seconds=$this->getSeconds();
        $this->milliseconds=$this->getMilliseconds();

    }

    public function getYear(){
        return (int)date("Y",$this->time);
    }
    public function getMonth(){
        return (int)date("n",$this->time)-1;
    }
    public function getDate(){
        return (int)date("j",$this->time);
    }
    public function getDay(){
        return (int)date("w",$this->time);
    }
    public function getHours(){
        return (int)date("G",$this->time);
    }
    public function getMinutes(){
        return (int)date("i",$this->time);
    }
    public function getSeconds(){
        return (int)date("s",$this->time);
    }
    public function getMilliseconds(){
        return (int)date("u",$this->time);
    }
}